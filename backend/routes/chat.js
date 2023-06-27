const express = require("express");
const User = require("../models/User");
const Chat = require("../models/Chat");
const router = express.Router();

//get all chats of one person
router.get("/all", async (req, res) => {
    try {
        const user = await User.findById(req.body.userId)
        var chats = []
        for(let i =0 ; i< user.connections.length; i++){
            const chat = await Chat.findById(user.connections[i].chatId)
            chats.push(chat.toObject())
        }
        res.status(200).json(chats);
    } catch (err) {
      res.status(404).json(err);
    }
  });



module.exports = router;