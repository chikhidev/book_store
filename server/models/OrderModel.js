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

order: {
  buyer: Object('userID'),
  books: [
    Object('bookID'), Object('bookID')
  ],
  totalAmount: 400,
  status: 'processing',
  date: '2023-05-02'
}

user/admin (seller):{
  
}

*/

module.exports = {
    orderSchema,
    orderModel:mongoose.model('Order', orderSchema)
};