const jwt = require("jsonwebtoken");
const path = require("path");
const Users = require(path.join(__dirname, "../models/user.model"));

var verifyToken = (req, res, next) => {
  if (
    req.headers &&
    req.headers.auth &&
    req.headers.auth.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.auth.split(" ")[1],
      process.env.SECRET,
      function (err, decode) {
        if (err) {
          res.status(403).json({ message: "Invalid JWT Passed" });
          next();
        }

        Users.findById(decode.id)
          .then((user) => {
            req.user = user;
            next();
          })
          .catch((err) => {
            res.status(500).json({ message: err.message });
          });
      }
    );
  } else {
    res.status(403).json({ message: "Not authorized" });
    next();
  }
};

module.exports = verifyToken;
