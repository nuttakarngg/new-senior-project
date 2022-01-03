const express = require("express");
const router = express.Router();

router
  .use("/auth", require("./Auth"))
  .use("/role", require("./Role"))
  .use("/user", require("./User"))
  .use("/researcher", require("./Researcher"))
  .use("/research", require("./Research"))
  .use("/branch", require("./branch"))
  .use("/data", require("./DataVisulization"))
  .use("/upload", require("./fileUpload"))
  .use("/scholar", require("./Scholar"))
  .use("/mining", require("./Mining"));

module.exports = router;
