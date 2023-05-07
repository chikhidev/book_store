const Model = require("../models/Model");
const Category = Model.categoryModel

const getAllCategories = async (req, res) => {
    var { name } = req.query;
    var page = parseInt(req.query.page) || 1
    var pageSize = parseInt(req.query.pageSize) || 10
  
    if (pageSize < 1 || pageSize > 100) {
      return res.status(400).json({ success: false, data: { message: 'Invalid pageSize' } });
    }
  
    try {
      if (!name) name = '';
      const skip = (page - 1) * pageSize;
      const categories = await Category.find({ name: { $regex: name, $options: 'i' } })
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
      return res.status(500).json({ success: false, data: { message: 'Failed to retrieve categories' } });
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
        message: 'Category not found',
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
        message: 'Failed to get category',
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
        return res.status(400).json({ success: false, message: 'Category with same name already exists' });
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
          message: 'Failed to create category',
        },
      });
    }
};

module.exports = {
    getAllCategories, getCategoryById, makeCategory
}