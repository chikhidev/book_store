require("dotenv").config()
const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

//generate token middleWare
const generateToken = payload => {
    const secret = process.env.JWT_SECRET;
    return jwt.sign(payload, secret, { expiresIn: '2d' });

};

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

    if (!token)
    {
      return res.status(401).json({success:false,data:{ message: "Vous n'êtes pas autorisé, veuillez vous connecter"} });
    }
    // Verify the JWT token
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) return res.status(403).json({success:false, data:{ message: "Votre session a expiré, veuillez vous connecter !", err }});
      req.user = payload

      next()
    
    })
  
};


const isAdmin = async (req, res, next) => {
  try
  {
    
    if (!req.user) {
      return res.status(401).json({ success: false, data: { message: 'Unauthorized: User not found' } });
    }

    if (!req.user.isAdmin) {
      return res.status(401).json({ success: false, data: { message: 'Non autorisé : utilisateur introuvable' } });
    }
    next();
  }
  catch (error)
  {
    console.error(error);
    return res.status(500).json({ success: false, data: { message: 'Erreur du serveur' } });
  }
};

module.exports = {
    authenticateToken, generateToken, isAdmin
}

