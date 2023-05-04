const Middleware = require('../middlewares/Middleware');
const User = require('../models/userModel')

const Book = require('../models/Model').bookModel;

// find all books in the store
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({ success: true, data: { books } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, data: { message: 'Failed to get all books' } });
  }
};

// find a book by its ID
const getBookById = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ success: false, data: { message: 'Book not found' } });
    return res.status(200).json({ success: true, data: { book } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, data: { message: 'Failed to get book' } });
  }
};

// create a new book
const createBook = async (req, res) => {

  const { title, author,
    description, publisher,
    publicationDate, language,
    price, category,
    stock, imageUrl } = req.body;

      try {

        // Check if a book with the same title already exists
        const bookCount = await Book.countDocuments({ title: title });
        if (bookCount > 0) {
          return res.status(400).json({
            success: false,
            data: {
              message: "There's already a book with the same title",
            },
          });
        }

        const book = new Book({
          title,
          author,
          description,
          publisher,
          publicationDate,
          language,
          price,
          category,
          stock,
          imageUrl,
          createdBy: req.user.id
        });
        

        await book.save();
        
        // Update the store array of the user with the ID of the created book
        await User.findByIdAndUpdate(req.user.id, { $push: { store: book._id } });

        return res.status(201).json({ success: true, data: {...book, message:'Book created successfully' } });


      } catch (error) {
        console.error(error);
       return res.status(500).json({ success: false, data: { message: 'Failed to create book' } });
      }
 

  
};

// update a book's information
const updateBook = async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  try {
    const book = await Book.findByIdAndUpdate(id, updates, { new: true });
    if (!book) return res.status(404).json({ success: false, data: { message: 'Book not found' } });
    return res.status(200).json({ success: true, data: { book } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, data: { message: 'Failed to update book' } });
  }
};

// delete a book
const deleteBook = async (req, res) => {
    const id = req.params.id;
    try {
      const book = await Book.findByIdAndDelete(id);
      if (!book) {
        return res.status(404).json({ success: false, data: { message: 'Book not found' } });
      }
      return res.status(200).json({ success: true, data: { message: 'Book deleted successfully' } });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, data: { message: 'Failed to delete book' } });
    }
  };


  module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
  };