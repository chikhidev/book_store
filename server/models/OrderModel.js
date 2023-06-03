const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  book: { type: Schema.Types.ObjectId, ref: 'Book', required:true },
  qte: {type: Number, required:true, default: 1, min: 0},
  status: { type: String, default: 'pending', required:true },
  note: { type: String, default: 'This order will be sent to the seller\nPaiement when recieving' },
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



module.exports = {
    orderSchema,
    orderModel: mongoose.model('Order', orderSchema)
};