const jwt = require("jsonwebtoken");
const CONST = require("../constant/jwtconstant");

class Auth {
  static authenticate(req, res, next) {
    // TODO: cek apakah user punya token/ga & ambil payloadnya
    // 1. get token dari header
    const authHeader = req.get("Authorization");

    // 2. check token existence
    let token;
    if (authHeader && authHeader.startsWith("Bearer"))
      token = authHeader.split(" ")[1];
    else
      return res.status(401).send({
        message: "Silahkan login",
        data: null,
      });

    // 3. validate token
    const payload = jwt.verify(token, CONST.JWT.SECRET);

    req.userEmail = payload.email;

    next();
  }

  static checkUserIsJavid(req, res, next) {
    // TODO: pastikan user yang masuk payloadnya adalah javid@gmail.com
    if (req.userEmail === "admin@gmail.com") {
      next();
    } else {
      return res.status(401).send({
        message: "anda bukan admin",
        data: null,
      });
    }
  }
}

module.exports = Auth;
