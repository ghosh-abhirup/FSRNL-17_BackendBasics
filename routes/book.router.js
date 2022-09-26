const express = require("express");
const path = require("path");
const bookRouter = express.Router();
const bookController = require(path.join(
  __dirname,
  "../controllers/book.controllers"
));

var jwtAuth = require("../middlewares/authJWT");

// get all books
bookRouter.get("/books", bookController.allBooks);
// get book by id
bookRouter.get("/books/:id", bookController.bookById);
//post new book
bookRouter.post("/books", bookController.createBook);
//update book by id
bookRouter.put("/books/:id", jwtAuth, bookController.updateBookById);
//delete book by id
bookRouter.delete("/books/:id", jwtAuth, bookController.deleteBookById);
// //delete all books
bookRouter.delete("/books", jwtAuth, bookController.deleteBook);

module.exports = bookRouter;
