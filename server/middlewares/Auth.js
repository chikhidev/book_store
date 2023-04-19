const jwt = require('jsonwebtoken');
require("dotenv").config()

//generate token middleWare
const generateToken = id => {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({_id:id }, secret, { expiresIn: '2d' });
    return token
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


module.exports = {
    authenticateToken, generateToken
}

