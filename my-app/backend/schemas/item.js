const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  item_uid: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;