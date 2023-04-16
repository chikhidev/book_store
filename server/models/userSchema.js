const {mongoose} = require('../requires')

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
        type: String, required: true
    },
    lastName: {
        type: String, required: true
    },
    avatar: {
      type: String, default: 'https://icons8.com/icon/98957/user'
    },
    bio: {
      type: String, default: ''
    },
    createdAt: {
      type: Date, default: Date.now
    },
    updatedAt: {
      type: Date, default: Date.now
    }
  });
  
  module.exports = mongoose.model('User', UserSchema);