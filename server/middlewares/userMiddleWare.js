const jwt = require('jsonwebtoken');
const Joi = require('joi')
require("dotenv").config()

//generate token middleWare
const generateToken = (req, res, next) => {
    console.log("inside mid ",req.body.username)  

    const { username } = req.body;
    const secret = process.env.JWT_SECRET;
  
    const token = jwt.sign({ username }, secret, { expiresIn: '1h' });
  
    // set the token in the response headers for the client to access
    res.setHeader('Authorization', `Bearer ${token}`);
    next();
};

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, '_token', (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.userId = decoded.userId;
    next();
  });
};

const validateCreate = (data) =>{
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
  
  return schema.validate(data)
}

const validateDrop = (data) =>{
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
  
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(),
  });
  
  return schema.validate(data)
}

module.exports = {
    authenticateToken, generateToken, validateCreate, validateDrop
}

