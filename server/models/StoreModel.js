const mongoose = require('mongoose');

const StoreSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    rating: {
        type: Number, max: 100, default: 0
    },
    peopleRated: {type: Number},
    books: [
        {type:mongoose.Schema.Types.ObjectId, ref: 'Book', required: true}
    ]
})

module.exports = mongoose.model('Store', StoreSchema)