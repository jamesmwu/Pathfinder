var mongoose = require('mongoose');


const chatSchema = new mongoose.Schema(
  {
    messages: [{ body: String, date: Date, sender: String }],
    active: {
      type: Boolean,
      default: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Chat', chatSchema);