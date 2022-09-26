const path = require("path");
const Books = require(path.join(__dirname, "../models/book.model"));

//get all books
exports.allBooks = (req, res) => {
  Books.find({})
    .then((data) => {
      if (!data) {
        res.status(400).json({ message: "Data not found" });
      }
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error" });
    });
};

// get by id
exports.bookById = (req, res) => {
  const id = req.params.id;

  Books.findById(id)
    .then((data) => {
      if (!data) {
        res.status(400).json({ message: "Data not found" });
      }
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error" });
    });
};

// create new book
exports.createBook = (req, res) => {
  const { name, author } = req.body;

  const newBook = new Books({
    name,
    author,
  });

  newBook
    .save()
    .then((data) => {
      if (!data) {
        res.status(400).json({ message: "Data not found" });
      }
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error" });
    });
};

// update book by id
exports.updateBookById = (req, res) => {
  const userRole = req.user.role;

  if (userRole !== "Admin") {
    res.status(403).json({ message: "Only admins are allowed" });
  }

  const id = req.params.id;

  Books.updateOne({ _id: id }, req.body)
    .then((data) => {
      if (!data) {
        res.status(400).json({ message: "Data not found" });
      }
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error" });
    });
};

// delete book by id
exports.deleteBookById = (req, res) => {
  const userRole = req.user.role;

  if (userRole !== "Admin") {
    res.status(403).json({ message: "Only admins are allowed" });
  }

  const id = req.params.id;

  Books.deleteOne({ _id: id })
    .then((data) => {
      if (!data) {
        res.status(400).json({ message: "Data not found" });
      }
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error" });
    });
};

// delete all
exports.deleteBook = (req, res) => {
  const userRole = req.user.role;

  if (userRole !== "Admin") {
    res.status(403).json({ message: "Only admins are allowed" });
  }

  Books.deleteMany({})
    .then((data) => {
      if (!data) {
        res.status(400).json({ message: "Data not found" });
      }
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error" });
    });
};
