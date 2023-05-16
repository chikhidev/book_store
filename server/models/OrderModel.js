const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
  totalAmount: { type: Number, required: true },
  status: { type: String, required: true, default: 'processing' },
  note: { type: String },
  date: { type: Date, required: true }
});

/*

order:{
  _id: orderID,
  buyer: Object('userID') [ref: user],
  books: [
    Object('bookID'), Object('bookID') [ref: book]
  ],
  totalAmount: ...,
  status: 'processing',
  date: 'YY-MM-DD'
}

user/admin (seller):{
  username: '...',
  email! '...'
}

*/

module.exports = {
    orderSchema,
    orderModel:mongoose.model('Order', orderSchema)
};