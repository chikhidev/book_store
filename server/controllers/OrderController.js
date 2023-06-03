const Order = require('../models/OrderModel').orderModel;
const User = require('../models/userModel');
const Book = require('../models/bookModel').bookModel
const Message = require('../models/MessageModel');
const Inbox = require('../models/InboxModel');

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
        res.json({ success: false, data: {message:'Erreur'} });
    }
};
  
//GET /order/:id
const getOrder = async (req, res) => {
    try {
      const orderId = req.params.id;
      const order = await Order.findById(orderId).populate('customer publisher items.book');
      
      if (!order) {
        return res.status(404).json({ success: false, data:{message: 'Commande introuvable'} });
      }
      
      res.json({ success: true, data: order });
    } catch (err) {
      console.Erreur(err);
      res.status(500).json({ success: false, data:{message: 'Erreur interne du serveur'} });
    }
};
  

// POST /order
const createOrder = async (req, res) => {
    try {
      const { book, note, shippingAddress, qte } = req.body;

      const customer_id = req.user.id
      const customer = await User.findById(customer_id).select('username');
      if (!customer)
        return res.json({ success: false, data: { message: "Vous ne pouvez pas passer de commande" } });

        // salah added this line
      const book_found = await Book.findByIdAndUpdate(book, { $inc: { stock: -qte } } );
      // instead of :
      // const book_found = await Book.findById(book);
      if (!book_found)
        return res.json({ success: false, data: { message: "Livre introuvable" } });
  
      if (book_found.stock == 0)
        return res.json({ success: false, data: { message: "Ce livre n'est pas en stock" } });

      if (book_found.stock < qte)
        return res.json({ success: false, data: { message: `Impossible de commander cette quantité, il ne reste que ${book_found.stock}` } });

          const order = new Order({ customer: customer_id, book, qte, note, shippingAddress });
          const messageOfCustomer = new Message({ 
            sender: req.user.id, 
            content: `${req.user.username} vous a demandé une commande`,
            order: order._id
          });
    
    const seller = book_found.createdBy;
    const inbox_found = await Inbox.findOne({ owner: seller });

    try {
      if (!inbox_found) {
        const inboxOfSeller = new Inbox({
          owner: seller,
          messages: [messageOfCustomer._id]
        });
        await inboxOfSeller.save();
      } else {
        inbox_found.messages.push(messageOfCustomer._id);
        await inbox_found.save();
      }
      await messageOfCustomer.save()
      
      return res.json({ success: true, data: { message: 'Votre commande a été créée avec succès', order } });
    } catch (err) {
      return res.json({ success: false, data: { message: "Une erreur s'est produite lors de l'enregistrement de votre commande, veuillez réessayer !" } });
    }

  } catch (err) {
    console.error(err);
    return res.json({ success: false, data: { message: 'Erreur', err } });
  }
};
  
  

  // PUT /orders/:id
const updateOrder = async (req, res) => {
    const { book, qte, note, shippingAddress } = req.body;

    try {
        const order = await Order.findById(req.params.id).populate('book');

        if(order.customer == req.user.id)
          return res.status(404).json({ success: false, data: { message: "Ce n'est pas votre ordre de le mettre à jour" } });

        if (!order)
            return res.status(404).json({ success: false, data: { message: 'Commande introuvable' } });

        order.book = book || order.book;
        order.qte = qte || order.qte;
        order.note = note || order.note;

        for (const key in shippingAddress) {
            if (shippingAddress[key] && shippingAddress[key] !== order.shippingAddress[key])
                order.shippingAddress[key] = shippingAddress[key];
        }

        const seller = order.book.createdBy

        const messageOfCustomer = new Message({ 
          sender: req.user.id, 
          content: `${req.user.username} a mis à jour sa commande`,
          order: order._id
        });
        
        const inbox_found = Inbox.find({owner: seller})

        try{
          if (!inbox_found){
            const inboxOfSeller = new Inbox({
              owner: seller,
              messages: [messageOfCustomer._id]
            });
            await inboxOfSeller.save()
          }else{
            inbox_found.messages.push(messageOfCustomer._id)
            await inbox_found.save()
          }
          await messageOfCustomer.save()

          await order.save();
          
        }catch(err) {
          return res.json({
            success: false, data: {
              message: `il y a eu une erreur lors de la mise à jour de la commande`
            }
          })
        }

        res.json({ success: true, data: { message: 'Commande mise à jour', order } });
    } catch (err) {
        res.status(500).json({ success: false, data: { message: 'Erreur', Erreur: err } });
    }
};



// DELETE /orders/:id
const deleteOrder = async (req, res) => {
  try {
      const order = await Order.findById(req.params.id).populate('book');

      if (!order)
          return res.status(404).json({ success: false, data: { message: 'Commande introuvable' }});

      if (req.user.id !== order.customer)
          return res.status(403).json({ success: false, data: { message: "Ce n'est pas votre ordre d'annuler" }});

      const seller = order.book.createdBy

      const messageOfCustomer = new Message({ 
        sender: req.user.id, 
        content: `${req.user.username} annulé sa commande`,
        order: order._id
      });
      
      const inbox_found = Inbox.find({owner: seller})

      try{
        if (!inbox_found){
          const inboxOfSeller = new Inbox({
            owner: seller,
            messages: [messageOfCustomer._id]
          });
          await inboxOfSeller.save(messageOfCustomer)
        }else{
          inbox_found.messages.push(messageOfCustomer._id)
          await inbox_found.save()
        }
        await messageOfCustomer.save()
        await order.remove();
        res.json({ success: true, data: { message: 'Commande annulée avec succès' } });
      }catch{
        res.json({ success: false, data: { message: "Une erreur s'est produite lors de l'annulation de la commande" } });
      }
  } catch(err) {
      res.status(500).json({ success: false, data: { message: 'Erreur', Erreur: err } });
  }
};



const submitOrder = async (req, res) => {
  try{
    const id = req.params.id;

    const order = await Order.findById(id).select('customer book qte status').populate('book')
    if(!order)
      return res.json({success:false, data:{message:"Commande introuvable"}})

    if (order.book.createdBy !== req.user.id)
      return res.json({success:false, data:{message:"Ce livre ne vous est pas associé. Impossible d'envoyer cette demande."}})

    try{

      const messageToCustomer = new Message({ 
        sender: req.user.id, 
        content: `${req.user.username} accepté votre commande`,
        order: order._id
      });
      
      const inbox_found = Inbox.find({owner: order.customer})

      switch(order.status){
        case "pending":
          try{
            order.status = "confirmed";

            if (!inbox_found){
              const inboxOfSCustomer = new Inbox({
                owner: order.customer,
                messages: [messageOfCustomer._id]
              });
              await inboxOfSCustomer.save()
            }else{
              inbox_found.messages.push(messageOfCustomer._id)
              await inbox_found.save()
            }
            await messageToCustomer.save()

            await order.save();
          }catch{
            return res.json({success:false, data:{message:"il y a eu une erreur lors de la soumission de cette commande"}})
          }
          break;
        case "confirmed":
          return res.json({success:false, data:{message:"Cette commande est déjà confirmée"}})
        case "delivered":
          return res.json({success:false, data:{message:"Cette commande est déjà livrée"}})
        default:
          return res.json({success:false, data:{message:"Il y a eu une erreur de traitement"}})
      }
    }catch{
      return res.json({success:false, data:{message:"Veuillez réessayer plus tard"}})
    }

  }catch(err) {
      res.status(500).json({ success: false, data: { message: 'Erreur', Erreur: err } });
  }
}


module.exports = {
    getOrders, createOrder, updateOrder, deleteOrder, getOrder,
    submitOrder
}