const Order = require('../models/OrderModel');

// GET /orders
const getOrders = async (req, res) => {
    try{
        const orders = await Order.find().populate('customer publisher items.book');
        res.json({ success: true, data: orders }); 
    }catch(err){
        res.json({ success: false, data: {message:'Error'} });
    }
  };
  

  // POST /orders
const createOrder = async (req, res) => {
    const { customer, publisher, items } = req.body;
    try{
        const order = new Order({ customer, publisher, items });
  
        // Calculate the total amount
        order.total = items.reduce((total, item) => total + item.quantity * item.price, 0);
      
        await order.save();
      
        res.json({ success: true, data: {message:'Order created', order}  });
    }catch(err){
        res.json({ success: false, data: {message:'Error', err} });
        
    }
   
  };
  

  // PUT /orders/:id
const updateOrder = async (req, res) => {
    const { customer, publisher, items } = req.body;

    try{
            
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

        res.json({ success: true, data:{message: 'Order updated', order} });
    }catch(err){
        res.json({ success: true, data: {message:'Error', err} });

    }

    };



// DELETE /orders/:id
const deleteOrder = async (req, res) => {
    try{
        const order = await Order.findByIdAndDelete(req.params.id);

        if (!order) {
            return res.status(404).json({ success: false, data: { message: 'Order not found' }});
        }
    
        res.json({ success: true, data: {message:'Order deleted successfully'} });
    }catch(err){
        res.json({ success: true, data: {message:'Error', err} });

    }
    };


module.exports = {
    getOrders, createOrder, updateOrder, deleteOrder
}