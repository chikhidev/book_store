require('dotenv').config()
const mongoose = require('mongoose');

const uri = process.env.DB_URL;
const connectDB = async () => {
  try {
    
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('database Connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
