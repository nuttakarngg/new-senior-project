const express = require("express");
const Research = require("../database/models/research");
const User = require("../database/models/user");
const router = express.Router();
router.get("/", async (request, response) => {
  return response.json({
    status: 200,
    data: await Research.findAll({
      include: User,
    }),
  });
});
router.post("/", (request, response) => {
  const research = request.body;
  let result = Research.create(research);
  return response.json({
    status: 200,
    data: result,
  });
});
module.exports = router;
