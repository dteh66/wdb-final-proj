// Item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // Add more fields as per your requirements (e.g., price, description, etc.)
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;