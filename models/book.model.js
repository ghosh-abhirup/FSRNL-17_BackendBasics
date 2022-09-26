var mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name not entered"],
  },
  author: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Books", bookSchema);
