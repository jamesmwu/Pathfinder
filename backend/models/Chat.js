var mongoose = require('mongoose');


const chatSchema = new mongoose.Schema(
    {
      messages: [{ body: String, date: Date,sender: String}]
    },
    { timestamps: true }
  );
 
module.exports = mongoose.model('Chat', chatSchema);