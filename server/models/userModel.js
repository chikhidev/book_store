const mongoose = require('mongoose')
const {bookSchema} = require("./bookModel")
const {orderSchema} = require("./OrderModel")
const Auth = require("../middlewares/Auth")

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
    isAdmin:{
        type: Boolean,
        default: false
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
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
    },
    saved:{
      type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
    },
    shoppingCard:{
      type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
    },
    orders: {
      type: [orderSchema]
    }
  });
  

  module.exports = mongoose.model('User', UserSchema);