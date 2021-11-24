const express = require("express");
const User = require("../database/models/user");
const Role = require("../database/models/role");
const bcrypt = require("bcrypt");
const { sign, decode } = require("jsonwebtoken");
const Branch = require("../database/models/branch");
const router = express.Router();

router.get("/login", async (request, response) => {
  try {
    const user = await User.findOne({ where: { email: request.query.email } });
    if (user) {
      const { password } = user.toJSON();
      if (await bcrypt.compare(request.query.password, password)) {
        return response.json({
          token: sign(user.toJSON(), process.env.SECRETE || ""),
          status: 200,
        });
      }
    }
    return response.status(403).json({
      error: "username or password incorrect!",
      status: 403,
    });
  } catch (e) {
    return response.status(500).json({ error: "network error." });
  }
});

router.get("/", async (request, response) => {
  try {
    const token = request.headers.token;
    if (!token) return response.status(403).json({ error: "access forbidden" });
    const decodeToken = decode(token);
    const user = await User.findOne({
      where: { id: decodeToken.id },
      include: [Branch, Role],
    });
    if (user) {
      return response.json({ status: 200, data: user, result: true });
    } else {
      return response.json({ status: 403, error: "access forbidden" });
    }
  } catch (e) {
    return response.json({ status: 500, error: "network error." });
  }
});

router.get('/test',(req,res)=>{
  
})
module.exports = router;
