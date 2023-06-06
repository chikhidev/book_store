const Inbox = require('../models/InboxModel')
const Message = require('../models/MessageModel')

const getInbox = async (req, res) => {
    try {
        const inbox = await Inbox.findOne({ owner: req.user.id }).populate({
            path: "messages",
            populate: {
              path: "sender order"
            },
          });
      return res.json({
        success: true,
        data: inbox,
      });
    } catch (error) {
      console.log("Erreur lors de la récupération de la boîte de réception :", error);
      res.status(500).json({
        success: false,
        data: {
          message: "Impossible de récupérer votre boîte de réception !",
        },
      });
    }
  };
  

const getInboxMessage = async (req, res) => {
    try{
        const id = req.params.id;
        const message = await Message.findById(id).populate({
              path: "sender",
              select : "-_id username email"
        })
        return res.json({
            success: true, data: message
        })
    }
    catch {
        res.json({
            success: false, data: {
                message:"n'a pas réussi à obtenir votre boîte de réception !"
            }
        })
    }
}

const toggleMessageRead = async (req, res) => {
    try{
        const id = req.params.id;
        const message = await Message.findById(id)
        if (message)
        {
            console.log(message);
            message.isRead = !message.isRead;
            await message.save();
      
            return res.json({
                success: true, data: message
            })
        }
        else {
            throw new Error("message n'est pas la")
        }
    }
    catch {
        res.json({
            success: false, data: {
                message:"n'a pas reussi de change le isRead !"
            }
        })
    }
}

module.exports = {
    getInbox, getInboxMessage, toggleMessageRead
}