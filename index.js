const express = require("express");
const bodyParser = require("body-parser");
const server = express();
const cors = require("cors");
require("dotenv").config();
const Role = require("./database/models/user");
const User = require("./database/models/role");
const user_role = require("./database/models/association/user_role");
const  logger = require("./middlewares/logger");
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "localhost";

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(logger)

server.use("/api", require("./routes"));

server.listen(PORT, HOST, () => {
  console.log(`Server is running on ${HOST}:${PORT}`);
});

