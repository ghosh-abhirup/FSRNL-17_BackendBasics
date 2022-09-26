var mongoose = require("mongoose");

var usersSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "fuullName is not present"],
  },
  email: {
    type: String,
    unique: [true, "Email already in DB"],
    required: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum: ["Normal", "Admin"],
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Users", usersSchema);
