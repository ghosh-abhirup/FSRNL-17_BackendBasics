const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const Users = require(path.join(__dirname, "../models/user.model"));

require("dotenv").config();

exports.register = (req, res) => {
  const { fullName, email, role, password } = req.body;

  const user = new Users({
    fullName,
    email,
    role,
    password: bcrypt.hashSync(password, 10),
  });

  user
    .save()
    .then((data) => {
      res.json({ message: "User registered successfully" });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

//login
exports.login = (req, res) => {
  const { email, password } = req.body;

  Users.findOne({ email })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "User not found" });
      }

      //compare password
      var compare = bcrypt.compareSync(password, data.password);

      if (!compare) {
        res.status(401).json({ message: "Invalid Password" });
      }

      // create a jwt
      var token = jwt.sign({ id: data._id }, process.env.SECRET);
      res.send({
        user: {
          id: data._id,
          email: data.email,
          fullName: data.fullName,
        },
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
