const mongoose = require('mongoose')
const {bookSchema} = require("./bookModel")

const UserSchema = new mongoose.Schema({
    username: {
      type: String, required: true, unique: true
    },
    email: {
      type: String, required: true, unique: true
    },
    password: {
        type: String, required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    avatar: {
      type: String, default: 'https://icons8.com/icon/98957/user'
    },
    bio: {
      type: String, default: ''
    },
    address: {
      type: String, default: ''
    },
    createdAt: {
      type: Date, default: Date.now
    },
    updatedAt: {
      type: Date, default: Date.now
    },
    age: {
      type: Number
    },
    store: {
      type: [bookSchema]
    },
    saved:{
      type:[bookSchema]
    },
    shoppingCard:{
      type:[bookSchema]
    }
  });
  
  module.exports = {
    userModel : mongoose.model('User', UserSchema)
  }