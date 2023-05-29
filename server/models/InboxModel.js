const mongoose = require('mongoose');

const inboxSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', requried: true
    },
    messages: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message', required: true }],
    },
});

const Inbox = mongoose.model('Inbox', inboxSchema);

module.exports = Inbox;
