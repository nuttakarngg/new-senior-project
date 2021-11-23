const express = require("express");
const router = express.Router();
const Role = require("../database/models/role");
const { authentication } = require("../middlewares/authentication");
router.use(authentication);
router.get("/", async (request, response) => {
  try {
    const roles = await Role.findAll();
    return response.json({ status: 200, data: roles });
  } catch (e) {
    if (e.errors[0].validatorKey === "not_unique")
      return response.json({ error: "role is dupplicate", status: 400 });
    return response.json({ error: "Network Error", status: 500 });
  }
});
router.post("/", async (request, response) => {
  try {
    const newRole = await Role.create({
      name: request.body.name,
    });
    return response.json({ status: 200, data: newRole });
  } catch (e) {
    if (e.errors[0].validatorKey === "not_unique")
      return response.json({ error: "role is dupplicate", status: 400 });
    return response.json({ error: "Network Error", status: 500 });
  }
});

module.exports = router;
