const Joi = require('joi')
const fs = require('fs')
const Model = require('../models/Model')

const validateUserNameEmailPass = (req, res, next) =>{
    try{
      const {email, username, password} = req.body

      const schema = Joi.object({
        username: Joi.string()
          .alphanum()
          .min(3)
          .max(30)
          .required(),
      
        email: Joi.string()
          .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
          .required(),
      
        password: Joi.string()
          .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
          .required(),
      });
      
      const {error} = schema.validate({username, email, password})
      if (error) {
        return res.status(400).json({
            success: false,
            data: error.details
          });
      }
      
      next()
    }
    catch(err){
      if (err) {
        return res.status(400).json({
            success: false,
            data: {
              message:"Essayer à nouveau! vos entrées ne sont pas correctes"
            }
          });
      }
    }
}
  
const validateEmailPass = (req, res, next) =>{

  
  try{
    const {email, password} = req.body

      const schema = Joi.object({
        email: Joi.string()
          .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
          .required(),
      
        password: Joi.string()
          .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
          .required(),
      });
      
      const {error} = schema.validate({email: email, password:password})
      if (error) {
        return res.status(400).json({
            success: false,
            data: error.details
          });
      }
      
      next()

  }catch(err){
    if (err) {
      return res.status(400).json({
          success: false,
          data: {
            message:"Essayer à nouveau! vos entrées ne sont pas correctes",
            error:err
          }
        });
    }
  }
}



///bokss

const createBook = async (req, res, next) => {

  try {
    const bookSchema = Joi.object({
      title: Joi.string().required(),
      author: Joi.string().required(),
      description: Joi.string().required(),
      publisher: Joi.string().required(),
      publicationDate: Joi.date().required(),
      language: Joi.string().required(),
      price: Joi.number().required(),
      categories: Joi.string().required(),
      stock: Joi.number().required()
    });

    const { error, value } = bookSchema.validate(req.body);

    if (error) {
      fs.unlinkSync(req.imagePath);
      return res.status(400).json({
        success: false,
        data: {
          message: error.details[0].message
        }
      });
    }

    // If validation passes, pass the request to the next middleware
    next();
  } catch (error) {
    fs.unlinkSync(req.imagePath);
    console.error(error);
    return res.status(500).json({ success: false, data: { message: 'Échec de la création du livre' } });
  }
}

const updatePassword = async (req, res, next) => {

  const query = Joi.object({
    oldPassword: Joi.string().required().label('Old password'),
    newPassword: Joi.string().required().label('New password')
  });

    const { error, value } = query.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        data: {
          message: error.details[0].message,
        },
      });
    }
    next()
}

const searchUsers = async (req, res, next) => {
  const query = Joi.object({
    query: Joi.string().allow('').trim().label('query').required()
  });

  try {
    const validatedQuery = await query.validateAsync(req.query);
    req.query = validatedQuery;
    next();
  } catch (error) {
    res.status(400).json({
      success:false,
      data:{
        message: "Aucune requête n'est fournie",
        err: error.details[0].message
      }
    });
  }
}

const createCategory = async (req, res, next)=>{
  const query = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required()
  });

    const { error, value } = query.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        data: {
          message: error.details[0].message,
        },
      });
    }
    next()
}

const updateCategory = async (req, res, next) => {
  const id = req.params.id;
  const { name, description } = req.body;

  try {
    const category = await Model.categoryModel.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        data: { message: 'Catégorie introuvable' },
      });
    }

    if (category.name === name && category.description === description) {
      return res.status(400).json({
        success: false,
        data: { message: 'Vous devez fournir des modifications pour mettre à jour la catégorie !' },
      });
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      data: { message: 'Something went wrong!' },
    });
  }
};




//orders

const createOrder = async (req, res, next) =>{
  const query = Joi.object({
    book: Joi.string().required(),
    note: Joi.string().allow('').optional(),
    qte: Joi.number().required(),
    shippingAddress: Joi.object({ 
      addressLine1: Joi.string().required().label('adress line 1'),
      addressLine2: Joi.string().allow('').optional().label('adress line 2'),
      city: Joi.string().required().label('city'),
      state: Joi.string().required().label('state'),
      postalCode: Joi.string().required().label('postal code'),
      country: Joi.string().required().label('country')
    }).required()
  });

    const { error, value } = query.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        data: {
          message: error.details[0].message,
        }
      });
    }
    next()
}

// sotres:

const createStore = async (req, res, next) => {
  const query = Joi.object({
    description: Joi.string().optional()
  });

    const { error, value } = query.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        data: {
          message: error.details[0].message,
        }
      });
    }
    next()
}

const getStore = async (req, res, next) => {
  const query = Joi.object({
    id: Joi.string().required()
  });

    const { error, value } = query.validate(req.params);
    if (error) {
      return res.status(400).json({
        success: false,
        data: {
          message: error.details[0].message,
        }
      });
    }
    next()
}



//users

const uploadUserProfile = async (req, res, next) => {
  try {
    const profileSchema = Joi.object({
      image: Joi.file().required(),
    });

    const { error, value } = profileSchema.validate(req.body);

    if (error) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        success: false,
        data: {
          message: error.details[0].message
        }
      });
    }

    // If validation passes, pass the request to the next middleware
    next();
  } catch (error) {
    fs.unlinkSync(req.file.path);
    console.error(error);
    return res.status(500).json({ success: false, data: { message: 'Échec du téléchargement de votre image' } });
  }
}



  module.exports = {
    validateEmailPass, validateUserNameEmailPass, createBook, updatePassword, searchUsers,
    createCategory, updateCategory,
    createOrder,
    createStore, getStore,
    uploadUserProfile
  }