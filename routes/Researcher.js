const express = require("express");
const Role = require("../database/models/role");
const User = require("../database/models/user");
const router = express.Router();
router.get("/", async (request, response) => {
  await User.sync();
  response.json({
    status: 200,
    data: await User.findAll({
      include: {
        model: Role,
        where: {
          id: 5,
        },
      },
    }),
  });
});
module.exports = router;
