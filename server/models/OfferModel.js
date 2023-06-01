const mongoose = require('mongoose')

const OfferSchema = mongoose.Schema({
    banner: {type: String, required: true},
    store: {type: mongoose.Schema.Types.ObjectId, ref: 'Store'}
})

module.exports = mongoose.model('Offer', OfferSchema)