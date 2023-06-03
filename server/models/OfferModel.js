const mongoose = require('mongoose')

const OfferSchema = mongoose.Schema({
    banner: {type: String, required: true},
    discount: {type: Number, max: 100, min: 1, required: true},
    store: {type: mongoose.Schema.Types.ObjectId, ref: 'Store'}
})

module.exports = mongoose.model('Offer', OfferSchema)