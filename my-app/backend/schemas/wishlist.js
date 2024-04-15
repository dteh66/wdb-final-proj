const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  wishlist_uid: {
    type: String,
    required: true,
    unique: true,
  },
  user_uid: {
    type: String,
    required: true,
  },
  wish_list: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
    },
  ],
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;