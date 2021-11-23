const { verify } = require("jsonwebtoken");
const { Role } = require("../database/models/user");
const User = require("../database/models/user");

const authentication = (request, response, next) => {
  try {
    const token = request.headers.token;
    if (!token) return response.status(403).json({ error: "Unauthorized" });
    verify(token, process.env.SECRETE || "", async (err, decode) => {
      if (err) {
        return response.status(403).json({ error: "access forbidden." });
      }
      const user = await User.findOne({
        where: { id: decode.id },
        include: Role,
      });
      request.user = user.toJSON();
      if (Object.keys(user).length > 0) {
        return next();
      } else {
        return response.status(403).json({ error: "access forbidden." });
      }
    });
  } catch (e) {
    return response.status(500).json({ error: "network error." });
  }
};

module.exports = { authentication };
