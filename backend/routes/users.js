const express = require("express");
const User = require("../models/User");
const Chat = require('../models/Chat');
const bcrypt = require("bcrypt");
const router = express.Router();

const MENTEE = 1;
const MENTOR = 2;
const MENTOR_AND_MENTEE = 3;
const TAGS = ["Computer Science", "Pre-Med", "Engineering", "Chemistry", "UC Berkeley", "UCLA", "Caltech", "Research", "Graduate School"];

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
  try {
    res.status(200).json(TAGS);
  } catch (err) {
    console.log(err);
  }
});


//update tags, add tags array in request body
router.put("/update-tags/:id", async (req, res) => {
  if (req.body.userId == req.params.id) {
    try {
      const user = await User.findById(req.body.userId);
      user.tags = req.body.tags;
      await user.save();
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
router.get("/connections/", async (req, res) => {
  try {
    //console.log(req.query.userId)
    const user = await User.findById(req.query.userId);
    //console.log(user)
    const friends = await Promise.all(
      user.connections.map((connection) => {
        return User.findById(connection.userId);
      })
    );
    console.log(friends);
    let connectionsList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      // Only unpack the properties we need, then push
      connectionsList.push({ _id, username, profilePicture });
    });
    res.status(200).json(connectionsList);
  } catch (err) {
    res.status(400).json(err);
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
        const chat = await new Chat();
        const chatId = chat._id;
        await user.updateOne({ $push: { connections: { userId: req.body.userId, chatId: chatId} } }); // Update both users involved using $push syntax
        await currentUser.updateOne({ $push: { connections: { userId: req.params.id, chatId: chatId} } }); // Update both users involved
        await chat.save();
        res.status(200).json({chatId: chatId});
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
      if (user.connections.some(obj => obj.userId==req.body.userId)) {
        const chatId = user.connections.find(obj => obj.userId==req.body.userId).chatId;
        Chat.findByIdAndDelete(chatId);
        await user.updateOne({ $pull: { connections: { userId: req.body.userId } } }); // Update both users involved using $push syntax
        await currentUser.updateOne({ $pull: { connections: { userId: req.params.id } } }); // Update both users involved
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


router.post("/all-mentors", async (req, res) => {
  console.log(req.body.tags);
  try {
    var mentors = await User.find({ $or: [{ userType: MENTOR }, { userType: MENTOR_AND_MENTEE }] });
    if (req.body.tags == null || req.body.tags.length == 0) {
      mentors = await User.find({ $or: [{ userType: MENTOR }, { userType: MENTOR_AND_MENTEE }] });
    }
    else {
      console.log("finding by tag");
      mentors = await User.find({
        $and: [
          { $or: [{ userType: MENTOR }, { userType: MENTOR_AND_MENTEE }] },
          { tags: { $in: req.body.tags } }
        ]
      });

    }
    var resplist = [];
    for (let i = 0; i < mentors.length; i++) {
      const { password, updatedAt, ...other } = mentors[i]._doc;
      resplist.push(other);
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
