const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  session_uid: {
    type: String,
    required: true,
    unique: true,
  },
  user_uid: {
    type: String,
    required: true,
  },
  random_string: {
    type: String,
    required: true,
  },
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;