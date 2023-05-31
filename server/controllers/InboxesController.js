const Inbox = require('../models/InboxModel')
const Message = require('../models/MessageModel')

const getInbox = async (req, res) => {
    
    try{
        const inbox = Inbox.find({owner: req.user.id})
        return res.json({
            success: true, data: inbox
        })
    }catch{
        res.json({
            success: false, data: {
                message:'failed to get your inbox!'
            }
        })
    }
}

module.exports = {
    getInbox
}