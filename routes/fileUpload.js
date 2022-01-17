const { response } = require("express");
const express = require("express");
const multer = require("multer");
const User = require("../database/models/User");
const { authentication } = require("../middlewares/authentication");
const router = express.Router();
router.use(authentication);
const upload = multer({
  storage: multer.diskStorage({
    destination: "public/profiles",
    filename: function (req, file, cb) {
      //req.body is empty...
      //How could I get the new_file_name property sent from client here?
      cb(
        null,
          Date.now() +
          "." +
          file.originalname.split(".")[1]
      );
    },
  }),
});
router.post("/userProfile", upload.single("image"), async function (req, res, next) {
  try {
    console.log(req.user.id);
    await User.update(
      {
        image: req.file.filename,
      },
      {
        where: {
          id: req.user.id,
        },
      }
    )
    return res.status(200).json({})
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  } catch (e) {
    return res.status(500).json({})
  }
});

module.exports = router;
