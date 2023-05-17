const Order = require('../models/OrderModel').orderModel;
const User = require('../models/userModel');

// GET /orders
const getOrders = async (req, res) => {


    try{
        const query = req.query; // Assuming the query parameters are passed in the request query string

        let orders;
        if (Object.keys(query).length === 0)
            orders = await Order.find().populate('buyer books');
        else
            orders = await Order.find(query).populate('buyer books');

        res.json({ success: true, data: orders }); 
    }catch(err){
        res.json({ success: false, data: {message:'Error'} });
    }
  };
  
//GET /order/:id
const getOrder = async (req, res) => {
    try {
      const orderId = req.params.id; // Assuming the order ID is passed as a URL parameter
      const order = await Order.findById(orderId).populate('customer publisher items.book');
      
      if (!order) {
        return res.status(404).json({ success: false, data:{message: 'Order not found'} });
      }
      
      res.json({ success: true, data: order });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, data:{message: 'Internal server error'} });
    }
  };
  

  // POST /orders
  const createOrder = async (req, res) => {
    try {
      const { note, shippingAddress } = req.body;

      const buyer = await User.findById(req.user.id);
    //   const books = await Book.find({ _id: { $in: bookId } });
  
      const order = new Order({ buyer, note, shippingAddress, totalAmount:0 });
  
      // Calculate the total amount based on the books
    //   const totalAmount = books.reduce((total, book) => total + book.price, 0);
    //   order.totalAmount = totalAmount;
  
      await order.save();
  
      res.json({ success: true, data: { message: 'Order added for ' + buyer.username , order } });
    } catch (err) {
      console.error(err);
      res.json({ success: false, data: { message: 'Error', err } });
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
    getOrders, createOrder, updateOrder, deleteOrder, getOrder
}