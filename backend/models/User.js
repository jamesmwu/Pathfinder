const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    connections:[{ userId: String, chatId:String}],
    description: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    userType: { //1 is mentor, 2 is mentee, 3 is both?
      type: Number,
      enum: [1, 2, 3],
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("User", UserSchema);
