require('dotenv').config()
const { mongoose } = require('./server.imports');
const { bookModel } = require("./models/bookModel")
const { userModel } = require("./models/userModel")
const {createUser} = require("./controllers/UserController")
const uri = process.env.DB_URL;
const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    //create user
    console.log('database Connected');

    // counts the books
    userModel.countDocuments({}).exec().then(res=>console.log(res))
  
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
