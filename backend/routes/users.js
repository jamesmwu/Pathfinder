const express = require("express");
const User = require("../models/User");
const Chat = require('../models/Chat')
const bcrypt = require("bcrypt");
const router = express.Router();

const MENTOR = 1
const MENTEE = 2
const MENTOR_AND_MENTEE = 3
const TAGS = ["Computer Science",  "Pre-Med", "Engineering", "Chemistry", "Psychology", "UC Berkeley", "UCLA", "Caltech"];

// UPDATE USER
router.put("/update-user/:id", async (req, res) => {
  if (req.body.userId == req.params.id) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await User.findByIdAndUpdate(req.body.userId, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      console.log(err);
    }
  } else {
    return res.status(403).json("No permissions");
  }
});



router.get('/all-tags', async (req, res) => {
    try{
        res.status(200).json(TAGS);
    } catch (err) {
        console.log(err);
    }
});


//update tags, add tags array in request body
router.put("/update-tags/:id", async (req, res) => { 
  if (req.body.userId == req.params.id) {
    try {
      const user = await User.findById(req.body.userId)
      for(let i = 0; i< req.body.tags.length; i++){
        if(user.tags.indexOf(req.body.tags[i])==-1){
          user.tags.push(req.body.tags[i])
        }
      }
      await user.save()
      res.status(200).json("tags has been updated");
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log(req.body.userId);
    console.log(req.params.id);
    return res.status(403).json("No permissions");
  }
});

// GET USER BY ID OR USERNAME
router.get("/", async (req, res) => {
  try {
    const userId = req.query.userId;
    const username = req.query.username;
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    // _doc carries the entire document object in MongoDB. need to remove password and other extranneous information from the response.
    res.status(200).json(other);
  } catch (err) {
    res.status(404).json(err);
  }
});

// GET FOLLOWING/FRIENDS
router.get("/connections/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.connections.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let connectionsList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      // Only unpack the properties we need, then push
      connectionsList.push({ _id, username, profilePicture });
    });
    res.status(200).json(connectionsList);
  } catch (err) {
    console.log(err);
  }
});

// add connection between people, creates a chat
router.put("/:id/add-connection", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      // If not already connected
      if (!user.connections.some(e => e.userId == req.body.userId)) {
        const chat = new Chat();
        await user.updateOne({ $push: { connections: {userId:req.body.userId, chatId:chat._id} } }); // Update both users involved using $push syntax
        await currentUser.updateOne({ $push: { connections: {userId:req.params.id, chatId:chat._id} } }); // Update both users involved
        await chat.save()
        res.status(200).json("connected user");
      } else {
        res.status(403).json("Already connected");
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(403).json("Can't connect to self");
  }
});

// remove connection between people, deletes chat
router.put("/:id/remove-connection", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        // If not already connected
        if (user.connections.includes(req.body.userId)) {
          const chatId = user.connections.findOne({userId: req.body.userId}).chatId;
          Chat.findByIdAndDelete(chatId)
          await user.updateOne({ $pull: { connections: {userId:req.body.userId} } }); // Update both users involved using $push syntax
          await currentUser.updateOne({ $pull: { connections: {userId:req.params.id} } }); // Update both users involved
          res.status(200).json("removed user");
        } else {
          res.status(403).json("Already removed");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      res.status(403).json("Can't remove self");
    }
  });


  router.get("/all-mentors", async (req, res) => {
    try {
      var mentors = await User.find({$or:[{userType: MENTOR}, {userType:MENTOR_AND_MENTEE}]})
      var resplist = []
      for(let i = 0; i< mentors.length; i++){
        const { password, updatedAt, ...other } = mentors[i]._doc;
        resplist.push(other)
      }
      res.status(200).json(resplist);
    } catch (err) {
      console.log(err);
    }
  });


// DELETE USER
router.delete("/delete-user/:id", async (req, res) => {
  if (req.body.userId == req.params.id) {
    try {
      await User.findByIdAndDelete(req.body.userId);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      console.log(err);
    }
  } else {
    return res.status(403).json("No permissions");
  }
});

module.exports = router;
