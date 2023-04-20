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

  module.exports = {
    validateEmailPass, validateUserNameEmailPass
  }