const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'pending', required:true },
  note: { type: String, default: 'This order will be sent to the seller, you have to wait for his response\nPaiement when recieving' },
  date: { type: Date, default: Date.now },
  shippingAddress: {
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
  }
});

/*

order:{
  _id: orderID,
  to: Object('userID') [ref: user], --> get user with the 'id' (buyer)
  books: [Object('bookID')] -- the books should be of the same buyer, otherways it requires making a new order
  status: 'pending',
  date: 'YY-MM-DD'
}

user/admin (seller):{
  _id: userID
  username: '...',
  email: '...'
}

*/

module.exports = {
    orderSchema,
    orderModel: mongoose.model('Order', orderSchema)
};