const Model = require("../models/Model");
const Category = Model.categoryModel

const getCategoryWithBooksByName = async (req, res) => {
  var name = req.query.name;
  var page = parseInt(req.query.page) || 1
  var pageSize = parseInt(req.query.pageSize) || 10

  if (pageSize < 1 || pageSize > 100)
    return res.status(400).json({ success: false, data: { message: 'Taille de page non valide' } });

  try {
    if (!name) name = '';
    const skip = (page - 1) * pageSize;
    const categories = await Category.findOne({ name: { $regex: `${name}`, $options: 'i' } })
      .populate('books')
      .skip(skip)
      .limit(parseInt(pageSize));

    const totalCategories = await Category.countDocuments({ name: { $regex: name, $options: 'i' } });
    const totalPages = Math.ceil(totalCategories / pageSize);

    return res.status(200).json({ success: true, data: {
      categories,
      page,
      pageSize,
      totalCategories,
      totalPages
    } });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, data: { message: 'Impossible de récupérer les catégories' } });
  }
}
const getAllCategories = async (req, res) => {
    var { name } = req.query;
    var page = parseInt(req.query.page) || 1
    var pageSize = parseInt(req.query.pageSize) || 10
  
    if (pageSize < 1 || pageSize > 100)
      return res.status(400).json({ success: false, data: { message: 'Taille de page non valide' } });
  
    try {
      if (!name) name = '';
      const skip = (page - 1) * pageSize;
      const categories = await Category.find({ name: { $regex: name, $options: 'i' } })
        .populate('books')
        .skip(skip)
        .limit(parseInt(pageSize));
  
      const totalCategories = await Category.countDocuments({ name: { $regex: name, $options: 'i' } });
      const totalPages = Math.ceil(totalCategories / pageSize);
  
      return res.status(200).json({ success: true, data: {
        categories,
        page,
        pageSize,
        totalCategories,
        totalPages
      } });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, data: { message: 'Impossible de récupérer les catégories' } });
    }
};

const getCategoryById = async (req, res) => {
try {
    const id = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // default limit of 10
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const category = await Category.findById(id)
    .populate({
        path: 'books',
        options: {
        skip: startIndex,
        limit: limit
        }
    });

    if (!category) {
    return res.status(404).json({
        success: false,
        data: {
        message: 'Catégorie introuvable',
        },
    });
    }

    const totalBooks = category.books.length;
    const totalPages = Math.ceil(totalBooks / limit);

    // Only show the books that are within the limit
    category.books = category.books.slice(startIndex, endIndex);

    return res.status(200).json({
    success: true,
    data: {
        category,
        totalPages,
        currentPage: page,
        totalBooks
    },
    });
} catch (error) {
    console.error(error);
    return res.status(500).json({
    success: false,
    data: {
        message: `Impossible d'obtenir la catégorie`,
    },
    });
}
};

const makeCategory = async (req, res) => {
    try {
      const { name, description } = req.body;
  
      // Check if category with same name already exists
      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        return res.status(400).json({ success: false, message: 'La catégorie avec le même nom existe déjà' });
      }
  
      const category = await Category.create({ name, description });
  
      return res.status(201).json({
        success: true,
        data: {
          category,
        },
      });
    }
    catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        data: {
          message: 'Échec de la création de la catégorie',
        },
      });
    }
};

const updateCategoryById = async (req, res) => {
    const id = req.params.id;
    const { name, description } = req.body;
  
    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { name, description },
        { new: true }
      );
  
      return res
        .status(200)
        .json({ success: true, data: { category: updatedCategory } });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, data: { message: 'Échec de la mise à jour de la catégorie' } });
    }
};
  

module.exports = {
    getAllCategories, getCategoryWithBooksByName, getCategoryById, makeCategory, updateCategoryById
}