const express = require("express");
const userRoutes = express.Router();
const path = require("path");
const userController = require(path.join(
  __dirname,
  "../controllers/user.controllers"
));

// register request
userRoutes.post("/users/register", userController.register);
// login request
userRoutes.post("/users/login", userController.login);

module.exports = userRoutes;
