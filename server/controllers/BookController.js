const User = require('../models/userModel')
const {mongoose} = require('../server.imports')
const fs = require('fs')
const Category = require('../models/CategoryModel').categoryModel
const Book = require('../models/Model').bookModel;
const Store = require('../models/StoreModel')

const getBooks = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const title = req.query.title;
  const author = req.query.author ;
  const publisher = req.query.publisher;
  const publicationDate = req.query.publicationDate;
  const language = req.query.language;
  const price = parseFloat(req.query.price);
  const category = req.query.category;
  const createdBy = req.query.createdBy;
  const dateRegex = new RegExp(/^\d{4}-\d{2}-\d{2}$/);

  const query = {};

  if (createdBy) {
    query.createdBy = new RegExp(createdBy, 'i');
  }
  if (title) {
    query.title = new RegExp(title, 'i');
  }
  if (author) {
    query.author = new RegExp(author, 'i');
  }
  if (publisher) {
    query.publisher = new RegExp(publisher, 'i');
  }
  if (publicationDate && dateRegex.test(publicationDate)) {
    query.publicationDate = new RegExp(publicationDate, 'i');
  }
  if (language) {
    query.language = new RegExp(language, 'i');
  }
  if (price) {
    query.price = { $lte: parseFloat(price) };
  }
  if (category) {
    query.category = new RegExp(category, 'i');
  }

  try {
    const books = await Book.find(query).select('-createdAt -updatedAt -author')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();

    const totalBooksCount = await Book.countDocuments(query).exec();
    const totalPages = Math.ceil(totalBooksCount / pageSize);

    return res.status(200).json({
      success: true,
      data: { books },
      page,
      pageSize,
      totalPages,
      totalBooksCount,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, data: { message: 'Échec de la récupération des livres'  } });
  }
};

const getLatestBooks =  async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const sort = req.query.sort;

  const sortQuery = {};

  if (sort == "asc") 
    sortQuery["createdAt"] = -1;
    else if (sort == "desc")
    sortQuery["createdAt"] = 1;

    try {
      const books = await Book.find().select('-description -createdAt -updatedAt -author')
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .sort(sortQuery)
        .exec();

      const totalBooksCount = await Book.countDocuments(sortQuery).exec();
      const totalPages = Math.ceil(totalBooksCount / pageSize);

      return res.status(200).json({
        success: true,
        data: { books },
        page,
        pageSize,
        totalPages,
        totalBooksCount,
      });
    }
    catch (error) {
      console.error(error);
    }
  
  return res
  .status(500)
  .json({ success: false, data: { message: 'Échec de la récupération des derniers livres' } });
}
  // find a book by its ID
const getBookById = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Book.findById(id).populate('createdBy');
    if (!book) return res.status(404).json({ success: false, data: { message: 'Livre introuvable' } });
    return res.status(200).json({ success: true, data: { book } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, data: { message: 'Échec de la récupération du livre' } });
  }
};

// create a new book
const createBook = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      data: { message: 'Aucun fichier téléchargé' }
    });
  }

  const {
    title,
    author,
    description,
    publisher,
    publicationDate,
    language,
    price,
    categories,
    stock
  } = req.body;

  try {

    if (description.length > 100) {
      return res.status(400).json({
        success: false,
        data: { message: 'La description est trop longue, 100 caractères maximum' }
      });
    }

    // Check if a book with the same title already exists
    const bookCount = await Book.countDocuments({ title: title });
    if (bookCount > 0) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        success: false,
        data: { message: 'Il y a déjà un livre avec le même titre' }
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
      stock,
      imageUrl: `/images/books/${req.file.filename}`,
      createdBy: req.user.id
    });

    for (const category of categories.split(' ')) {
      const cat = await Category.findOne({ name: category });
      if (!cat) {
        const new_cat = new Category({ name: category });
        book.categories.push(new_cat._id);
        new_cat.books.push(book._id);
        await new_cat.save();
      } else {
        book.categories.push(cat._id);
        cat.books.push(book._id);
        await cat.save();
      }
    }

    const store = await Store.findOne({ owner: req.user.id });
    if (store) {
      store.books.push(book._id);
      await store.save();

      await book.save();

      // Update the store array of the user with the ID of the created book
      await User.findByIdAndUpdate(req.user.id, { $push: { store: book._id } });

      return res.status(201).json({
        success: true,
        data: { message: 'Livre créé avec succès', book }
      });
      
    } else {
      fs.unlinkSync(req.file.path);
      return res.json({
        success: false,
        data: { message: "Votre boutique n'existe pas" }
      });
    }

    
  } catch (error) {
    console.error(error);
    fs.unlinkSync(req.file.path);
    return res.status(500).json({
      success: false,
      data: { message: 'Échec de la création du livre' }
    });
  }
};


// update a book's information
const updateBook = async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  try {
    const book = await Book.findByIdAndUpdate(id, updates, { new: true });
    if (!book) return res.status(404).json({ success: false, data: { message: 'Livre introuvable' } });
    return res.status(200).json({ success: true, data: { book } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, data: { message: 'Échec de la mise à jour du livre' } });
  }
};

// delete a book
const deleteBook = async (req, res) => {
    const id = req.params.id;
    try {
      const book = await Book.findByIdAndDelete(id);
      if (!book) {
        return res.status(404).json({ success: false, data: { message: 'Livre introuvable' } });
      }
      return res.status(200).json({ success: true, data: { message: 'Livre supprimé avec succès' } });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, data: { message: 'Échec de la suppression du livre' } });
    }
};


  module.exports = {
    getBooks,
    getLatestBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
  };