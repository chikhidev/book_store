const Joi = require('joi')

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
              message:"Try again! your inputs aren't correct"
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
            message:"Try again! your inputs aren't correct",
            error:err
          }
        });
    }
  }
}


const createBook = async (req, res, next) => {

  const query = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    description: Joi.string().required(),
    publisher: Joi.string().required(),
    publicationDate: Joi.date().required(),
    language: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    stock: Joi.number().required(),
    imageUrl: Joi.string().uri().required(),
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



  module.exports = {
    validateEmailPass, validateUserNameEmailPass, createBook, updatePassword
  }