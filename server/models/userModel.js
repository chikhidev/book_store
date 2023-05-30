const mongoose = require('mongoose')
const {bookSchema} = require("./bookModel")
const {orderSchema} = require("./OrderModel")
const Auth = require("../middlewares/Auth")

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: {type: String},
    lastName: {type: String},
    isAdmin:{type: Boolean, default: false},
    avatar: { type: String, default: '/user/default'},
    premuim: { type: Boolean, default: false},
    bio: {type: String, default: ''},
    address: {type: String, default: ''},
    createdAt: {type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now},
    age: {type: Number}
  });
  

  module.exports = mongoose.model('User', UserSchema);