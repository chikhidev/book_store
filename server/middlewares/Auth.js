require("dotenv").config()
const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

//generate token middleWare
const generateToken = payload => {
  console.log('payload for genrating toke: ',payload)
    const secret = process.env.JWT_SECRET;
    return jwt.sign(payload, secret, { expiresIn: '1h' });

};

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

    if (!token)
    {
      return res.status(401).json({success:false,data:{ message: 'You are not authorized'} });
    }
    // Verify the JWT token
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) return res.status(403).json({success:false, data:{ message: 'Access token is not valid' }});
  
      console.log(payload)
      req.user = payload
      next()
    
    })
  
};


const isAdmin = async (req, res, next) => {
  console.log(req.user)
  try
  {
    
    if (!req.user) {
      return res.status(401).json({ success: false, data: { message: 'Unauthorized: User not found' } });
    }

    if (!req.user.isAdmin) {
      return res.status(401).json({ success: false, data: { message: 'Unauthorized: You are not an admin' } });
    }

    next();
  }
  catch (error)
  {
    console.error(error);
    return res.status(500).json({ success: false, data: { message: 'Server error' } });
  }
};

module.exports = {
    authenticateToken, generateToken, isAdmin
}

