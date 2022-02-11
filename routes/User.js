const express = require("express");
const Role = require("../database/models/role");
const User = require("../database/models/user");
const user_role = require("../database/models/association/user_role");
const router = express.Router();
const bcrypt = require("bcrypt");
const { authentication } = require("../middlewares/authentication");
const { decode } = require("jsonwebtoken");
const { Branch } = require("../database/models/user");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
// router.use(authentication);
router.get("/", async (request, response) => {
  try {
    const keyword = request.query.keyword;
    if (!keyword || keyword === "") {
      const users = await User.findAll({
        include: [Role, Branch],
      });
      return response.json({ data: users, status: 200 });
    } else {
      const users = await User.findAll(
        {
          where: {
            [Op.or]: [
              { firstNameTH: { [Op.like]: `%${keyword}%` } },
              { lastNameTH: { [Op.like]: `%${keyword}%` } },
              { email: { [Op.like]: `%${keyword}%` } },
              { ac_position: { [Op.like]: `${keyword}%` } },
            ],
          },
        },
        {
          include: [Role, Branch],
        }
      );
      return response.json({ data: users, status: 200 });
    }
  } catch (e) {
    return response.json({ error: "Network Error", status: 500, e: e });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const users = await User.findOne({ where: { id }, include: [Role,Branch] });
    return response.json({ data: users, status: 200 });
  } catch (e) {
    return response.json({ error: "Network Error", status: 500 });
  }
});

router.put("/editProfile/",authentication, async (request, response) => {
  try {
    const requestUser = request.user;
    const user = await User.update(request.body, {
      where: { id: requestUser.id },
    });
    response.json({
      data: user,
      token: jwt.sign(user, process.env.SECRETE),
    });
  } catch (e) {
    return response.json({ error: "Network Error", status: 500 });
  }
});

router.put("/:id",authentication, async (request, response) => {
  try {
    const { roles } = request.user;
    const hasRole = roles.map((item) => item.name);
    if (hasRole.some((item) => item === "แอดมิน")) {
      let _data = {
        ...request.body,
        // password: await bcrypt.hash(request.body.password, 10),
      };
      // const roles = request.body.roles;
      const user = await User.update(_data, {
        where: { id: request.params.id },
      });
      const role = request.body.roleId;
      const roled = await Role.findAll({
        where: {
          id: role,
        },
      });
      user_role
        .destroy({
          where: {
            userId: request.params.id,
          },
        })
        .then(async () => {
          const updateUser = await User.findOne({
            where: {
              id: request.params.id,
            },
          });
          updateUser.addRole(roled, { through: { user_role } });
        });
      return response.json({ data: user, status: 200 });
    }
    return response.json({ error: "access forbidden", status: 403 });
  } catch (e) {
    console.log(e);
    return response.json({ error: "Network Error", status: 500 });
  }
});
router.post("/", async (request, response) => {
  try {
    const user = request.body;
    const newUser = await User.create({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    });
    const roleId = request.body.roleId;
    if (roleId) {
      const role = await Role.findAll({ where: { id: roleId } });
      newUser.addRole(role, { through: { user_role } });
    }
    return response.json({ data: newUser, status: 200 });
  } catch (e) {
    if (e.name === "SequelizeUniqueConstraintError")
      return response.json({ error: "email is duplicate.", status: 400 });
    console.log(e);
    return response.json({ error: "Network Error", status: 500 });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const user = decode(request.headers.token);
    if (request.params.id == user.id)
      return response.json({ status: 400, error: "cannot self remove." });
    await User.destroy({ where: { id: request.params.id } });
    return response.json({ data: request.params.id, status: 200 });
  } catch (e) {
    if (e.name === "SequelizeUniqueConstraintError")
      return response.json({ error: "email is duplicate.", status: 400 });
    return response.json({ error: "Network Error", status: 500 });
  }
});

module.exports = router;
