const {mongoose} = require('../server.imports');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }]
});

const Category = mongoose.model('Category', categorySchema);

module.exports = {
  categoryModel: Category,
  categorySchema
};
