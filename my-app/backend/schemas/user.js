const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_uid: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  wishlist_uid: {
    type: String,
    required: true,
  },
  friendslist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;