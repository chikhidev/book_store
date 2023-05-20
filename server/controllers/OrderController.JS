const Order = require('../models/OrderModel').orderModel;
const User = require('../models/userModel');
const Book = require('../models/bookModel').bookModel

// GET /orders
const getOrders = async (req, res) => {


    try{
        const query = req.query; // Assuming the query parameters are passed in the request query string

        let orders;
        if (Object.keys(query).length === 0)
          orders = await Order.find({customer: req.user.id});

        else
            orders = await Order.find({...query, customer: req.user.id});

        res.json({ success: true, data: orders }); 
    }catch(err){
        res.json({ success: false, data: {message:'Error'} });
    }
  };
  
const getCurrentUserOrders = async (req, res) => {
  try{
      let orders = await Order.find({customer: req.user.id});
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
  

// POST /order
const createOrder = async (req, res) => {
    try {
      const { book, note, shippingAddress, qte } = req.body;

      const customer_id = req.user.id
      const customer = await User.findById(customer_id).select('username');
      if (!customer)
        return res.json({ success: false, data: { message: 'You can\'t make an order' } });

      const book_found = await Book.findById(book);
      if (!book_found)
        return res.json({ success: false, data: { message: 'Book not found' } });
  
      const order = new Order({ customer: customer_id, book, qte, note, shippingAddress });
  
      try{
        await order.save();
        return res.json({ success: true, data: { message: 'Your order sent' , order } });
      }catch(err){
        return res.json({ success: false, data: { message: 'There was an error while saving your order, please try again!' } });
      }
  
    } catch (err) {
      console.error(err);
      return res.json({ success: false, data: { message: 'Error', err } });
    }
  };
  
  

  // PUT /orders/:id
const updateOrder = async (req, res) => {
    const { book, qte, shippingAddress } = req.body;

    try{
            
        const order = await Order.find({customer: req.params.id});

        if (!order) {
            return res.status(404).json({ success: false, data: { message: 'Order not found' }});
        }

        (book != order.book) && ( order.book = book)
        (qte != order.qte) && ( order.qte = qte)
        (note != order.note) &&( order.note = note)
        
        for (var key in order.shippingAddress){
          if (shippingAddress[key] && (shippingAddress[key] != order.shippingAddress[key]))
            order.shippingAddress[key] = shippingAddress[key]
        }

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
    getOrders, createOrder, updateOrder, deleteOrder, getOrder,
    getCurrentUserOrders
}