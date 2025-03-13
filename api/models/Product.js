const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  // Add other fields as needed
});

module.exports = mongoose.model('Product', productSchema);

