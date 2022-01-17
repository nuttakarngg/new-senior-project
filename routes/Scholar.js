const express = require("express");
const Research = require("../database/models/research");
const router = express.Router();
const Role = require("../database/models/role");
const Scholar = require("../database/models/scholar");
const { authentication } = require("../middlewares/authentication");
const multer = require("multer");
const { fn, col } = require("sequelize");
const upload = multer({
  storage: multer.diskStorage({
    destination: "public/scholarFiles",
    filename: function (req, file, cb) {
      //req.body is empty...
      //How could I get the new_file_name property sent from client here?
      cb(null, Date.now() + "." + file.originalname.split(".")[1]);
    },
  }),
});
router.use(authentication);
router.get("/", async (request, response) => {
  try {
    let data = await Scholar.findAll();
    return response.status(200).json({ data });
  } catch (e) {
    return response.status(500).json({ error: "Network Error" });
  }
});
router.post("/", upload.single("file"), async (request, response) => {
  try {
    let newScholar = await Scholar.create({
      ...JSON.parse(request.body.scholar),
      file: request.file?.filename || null,
    });
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
router.delete("/:id", async (req, res) => {
  try {
    return res.status(200).json({
      data: await Scholar.destroy({
        where: {
          id: req.params.id,
        },
      }),
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Network Error" });
  }
});
module.exports = router;
