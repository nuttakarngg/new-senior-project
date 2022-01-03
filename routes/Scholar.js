const express = require("express");
const router = express.Router();
const Role = require("../database/models/role");
const Scholar = require("../database/models/scholar");
const { authentication } = require("../middlewares/authentication");
router.use(authentication);
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

module.exports = router;
