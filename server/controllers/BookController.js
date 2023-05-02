const Book = require('../models/Model').bookModel

// find all books in the store
const getAllBooks = async ()  => {
    try {
      const books = await Book.find({});
      return books;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get all books');
    }
  }
  
  // find a book by its ID
  const getBookById = async id => {
    try {
      const book = await Book.findById(id);
      if (!book) throw new Error('Book not found');
      return book;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get book');
    }
  }
  
  // create a new book
  const createBook = async (title, author, description, publisher, publicationDate, language, price, category, stock, imageUrl) => {
    try {
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
        imageUrl
      });
      await book.save();
      return book;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create book');
    }
  }
  
  // update a book's information
  const updateBook = async (id, updates) => {
    try {
      const book = await Book.findByIdAndUpdate(id, updates, { new: true });
      if (!book) throw new Error('Book not found');
      return book;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update book');
    }
  }
  
  // delete a book
  const deleteBook = async (id) => {
    try {
      const book = await Book.findByIdAndDelete(id);
      if (!book) throw new Error('Book not found');
      return book;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete book');
    }
  }
  


  module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
  };