const Order = require('../models/OrderModel');

// GET /orders
getOrders = async (req, res) => {
    const orders = await Order.find().populate('customer publisher items.book');
    res.json({ success: true, data: orders });
  };
  

  // POST /orders
createOrder = async (req, res) => {
    const { customer, publisher, items } = req.body;
  
    const order = new Order({ customer, publisher, items });
  
    // Calculate the total amount
    order.total = items.reduce((total, item) => total + item.quantity * item.price, 0);
  
    await order.save();
  
    res.json({ success: true, data: order });
  };
  

  // PUT /orders/:id
updateOrder = async (req, res) => {
    const { customer, publisher, items } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
        return res.status(404).json({ success: false, data: { message: 'Order not found' }});
    }

    order.customer = customer;
    order.publisher = publisher;
    order.items = items;

    // Calculate the total amount
    order.total = items.reduce((total, item) => total + item.quantity * item.price, 0);

    await order.save();

    res.json({ success: true, data: order });
    };



// DELETE /orders/:id
deleteOrder = async (req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
        return res.status(404).json({ success: false, data: { message: 'Order not found' }});
    }

    res.json({ success: true, data: {} });
    };


module.exports = {
    getOrders, createOrder, updateOrder, deleteOrder
}