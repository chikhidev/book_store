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
  
//GET /order/:id
const getOrder = async (req, res) => {
    try {
      const orderId = req.params.id;
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
  
      if (book_found.stock == 0)
        return res.json({ success: false, data: { message: 'This book is not in stock' } });

      if (book_found.stock < qte)
        return res.json({ success: false, data: { message: `Cannot order this quantity, there is only ${book_found.stock} left` } });

      const order = new Order({ customer: customer_id, book, qte, note, shippingAddress });
  
      try{
        await order.save();
        return res.json({ success: true, data: { message: 'Your created sucessfully' , order } });
      }
      catch(err){
        return res.json({ success: false, data: { message: 'There was an error while saving your order, please try again!' } });
      }
  
    }
    catch (err) {
      console.error(err);
      return res.json({ success: false, data: { message: 'Error', err } });
    }
};
  // PUT /orders/:id
  const updateOrder = async (req, res) => {
    const { book, qte, note, shippingAddress } = req.body;

    try {
        const order = await Order.findById(req.params.id);

        if(order.customer == req.user.id)
          return res.status(404).json({ success: false, data: { message: "It's not your order to update it" } });

        if (!order)
            return res.status(404).json({ success: false, data: { message: 'Order not found' } });

        order.book = book || order.book;
        order.qte = qte || order.qte;
        order.note = note || order.note;

        for (const key in shippingAddress) {
            if (shippingAddress[key] && shippingAddress[key] !== order.shippingAddress[key])
                order.shippingAddress[key] = shippingAddress[key];
        }

        await order.save();

        res.json({ success: true, data: { message: 'Order updated', order } });
    } catch (err) {
        res.status(500).json({ success: false, data: { message: 'Error', error: err } });
    }
};
// DELETE /orders/:id
const deleteOrder = async (req, res) => {
  try {
      const order = await Order.findById(req.params.id);

      if (!order)
          return res.status(404).json({ success: false, data: { message: 'Order not found' }});

      if (req.user.id !== order.customer)
          return res.status(403).json({ success: false, data: { message: "It's not your order to cancel" }});

      try{
        await order.remove();
        res.json({ success: true, data: { message: 'Order deleted successfully' } });
      }catch{
        res.json({ success: false, data: { message: 'There was an error while cancelling the order' } });
      }
  } catch(err) {
      res.status(500).json({ success: false, data: { message: 'Error', error: err } });
  }
};
const submitOrder = async (req, res) => {
  try{
    const id = req.params.id;

    const order = await Order.findById(id).select('customer book qte status').populate('book')
    if(!order)
      return res.json({success:false, data:{message:"Order not found"}})

    if (order.book.createdBy !== req.user.id)
      return res.json({success:false, data:{message:"This book is not attached to you, can't submit this request"}})

    try{
      switch(order.status){
        case "pending":
          order.status = "confirmed";
          await order.save();
          break;
        case "confirmed":
          return res.json({success:false, data:{message:"This order is already confirmed"}})
        case "delivered":
          return res.json({success:false, data:{message:"This order is already delivered"}})
        default:
          return res.json({success:false, data:{message:"There was an error processing"}})
      }
    }catch{
      return res.json({success:false, data:{message:"Please try again later"}})
    }

  }catch(err) {
      res.status(500).json({ success: false, data: { message: 'Error', error: err } });
  }
}


module.exports = {
    getOrders, createOrder, updateOrder, deleteOrder, getOrder,
    submitOrder
}