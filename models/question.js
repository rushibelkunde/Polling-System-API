const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{
    option: { type: String, required: true },
    votes: { type: Number, default: 0 }
  }]
});

const Quetion = mongoose.model('Question', questionSchema);

module.exports = Quetion;