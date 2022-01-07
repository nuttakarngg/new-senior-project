const express = require("express");
const Research = require("../database/models/research");
const router = express.Router();
const Role = require("../database/models/role");
const Scholar = require("../database/models/scholar");
const { authentication } = require("../middlewares/authentication");
const { fn, col } = require("sequelize");
// router.use(authentication);
router.get("/", async (request, response) => {
  try {
    let data = await Scholar.findAll();
    return response.status(200).json({ data });
  } catch (e) {
    return response.status(500).json({ error: "Network Error" });
  }
});
router.post("/", async (request, response) => {
  try {
    let newScholar = await Scholar.create(request.body);
    return await response.json({ data: newScholar });
  } catch (e) {
    console.log(e);
    return response.status(500).json({ error: "Network Error" });
  }
});
router.get("/getOwner", async (req, res) => {
  try {
    const scholarOwner = await Research.findAll({
      attributes: [[fn("distinct", col("researchScholarOwner")), "name"]],
    });
    return res.status(200).json({ data: scholarOwner });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Network Error" });
  }
});
module.exports = router;
