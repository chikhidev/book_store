const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderNumber: { type: Number, required: true },
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
  totalAmount: { type: Number, required: true },
  status: { type: String, required: true },
  date: { type: Date, required: true },
});

module.exports = {
    orderSchema,
    orderModel:mongoose.model('Order', orderSchema)
};