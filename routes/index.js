const express = require("express");
const router = express.Router();

router
  .use("/auth", require("./Auth"))
  .use("/role", require("./Role"))
  .use("/user", require("./User"))
  .use("/researcher", require("./Researcher"))
  .use("/research", require("./Research"))
  .use("/branch", require("./branch"));

module.exports = router;
