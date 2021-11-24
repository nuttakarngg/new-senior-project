const express = require("express");
const { Op } = require("sequelize");
const Branch = require("../database/models/branch");
const Role = require("../database/models/role");
const User = require("../database/models/user");
const router = express.Router();
router.get("/", async (request, response) => {
  try {
    const { keyword, branchList, acPosition } = request.query;
    console.log(keyword, branchList, "ac" + acPosition);
    const researcher = await User.findAll({
      include: [
        {
          model: Role,
          where: {
            id: 2,
          },
        },
        {
          model: Branch,
          where:
            branchList?.length > 0
              ? {
                  id: branchList || [],
                }
              : null,
        },
      ],
      where: {
        [Op.and]: {
          [Op.or]: {
            phone: {
              [Op.like]: `%${keyword}%`,
            },
            expertOf: {
              [Op.like]: `%${keyword}%`,
            },
            institution: {
              [Op.like]: `%${keyword}%`,
            },
            firstNameTH: {
              [Op.like]: `%${keyword}%`,
            },
            lastNameTH: {
              [Op.like]: `%${keyword}%`,
            },
            email: {
              [Op.like]: `%${keyword}%`,
            },
          },
          ac_position: {
            [Op.like]: acPosition === "" ? "%ศาสตราจารย์%" : `%${acPosition}%`,
          },
        },
      },
    });
    return response.json({
      status: 200,
      data: researcher,
    });
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
