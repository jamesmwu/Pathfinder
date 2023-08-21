const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const multerS3 = require('multer-s3');
const aws = require('aws-sdk')
const fs = require('fs');
const path = require("path");
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const { promisify } = require('util');

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const chatRoute = require("./routes/chat");
const articleRoute = require("./routes/article");

//var Image = require('./models/Image.js');
const User = require("./models/User");
const unlinkAsync = promisify(fs.unlink);
var app = express(),
    s3 = new aws.S3();

//Allow cross origin requests
app.use(cors());
dotenv.config();

//CHANGE THIS TO SOMETHING MORE SECURE!
aws.config.update({
  // secretAccessKey: 'NBhSxllkFLKY5E7GdJnYzdMbt+4ghxsfDI1fVd5B',
  // accessKeyId: 'AKIAWU5FKKMT3QOVBFGX',
  region: 'us-east-2'
});

mongoose.connect(
  process.env.MONGO_URL + process.env.DATABASE,
  { useNewUrlParser: true, useUnifiedTopology: true },
)
  .then(() => console.log('connected to Mongoose'))
  .catch(e => console.log(e));

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/articles", articleRoute);

//socket stuff

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"]

  }
});
require('./chatSocket')(io);
server.listen(8800, () => console.log(`socket listening on port 8800`));

//end socket stuff



app.use("/images", express.static(path.join(__dirname, "public/images")));

// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     let uploadPath = '';
//     console.log(req.body.category);
//     if (req.body.category === "profile") {
//       uploadPath = 'public/images/profile';
//     }
//     else if (req.body.category === "article") {
//       uploadPath = 'public/images/article';
//     }
//     else {
//       uploadPath = 'public/images';
//     }
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
//   }
// });

var upload = multer({
  storage: multerS3({
      s3: s3,
      bucket: 'awspathfinderbucket',
      key: function (req, file, cb) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop())
      }
  })
});

const profilePath = "public/images/profile";
// app.post('/api/upload-profile-pic', upload.single('image'), async (req, res, next) => {
//   try {
//     if (!req.file) {
//       return res.status(400).send('No file uploaded.');
//     }
//     const user = await User.findById(req.body.userId);
//     if (user.profilePicture != "") {
//       try {
//         await Image.findByIdAndDelete(user.profilePicture);
//       }
//       catch (err) {
//         console.log("tried to delete old file");
//         console.log(err);
//       }
//     }
//     const { originalname, buffer, mimetype } = req.file;
//     const newImage = new Image({
//       name: originalname,
//       data: buffer,
//       contentType: mimetype,
//     });
//     user.profilePicture = newImage._id;
//     await newImage.save();
//     console.log(req.file.filename);
//     user.profilePicture = req.file.filename;
//     user.save();
//     res.status(200).json(user);
//   } catch (err) {
//     console.log(err);
//     res.send(err);
//   }

// });
// app.post('/api/upload-profile-pic', upload.single('image'), async (req, res, next) => {
//   try {
//     if (!req.file) {
//       return res.status(400).send('No file uploaded.');
//     }
//     const user = await User.findById(req.body.userId);
//     const file = req.file;
//     var Blob = req.file.buffer;

//     const S3_BUCKET = 'awspathfinderbucket';
//     const AWS_ACCESS_KEY_ID ='AKIAWU5FKKMT3QOVBFGX';
//     const AWS_SECRET_ACCESS_KEY = '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';
    
//     AWS.config.update({
//       accessKeyId: AWS_ACCESS_KEY_ID,
//       secretAccessKey: AWS_SECRET_ACCESS_KEY
//     });

//     const s3 = new AWS.S3();
//     var params = {
//       Bucket: S3_BUCKET,
//       Key: file.name,
//       Body: Blob
//     };
//     s3.upload(params, function(err, data) {
//       console.log(err, data);
//     });
    
//     user.profilePicture = file.name
//     user.save();
//     res.status(200).json(user);
//   } catch (err) {
//     console.log(err);
//     res.send(err);
//   }

// });
app.post('/api/upload-profile-pic', upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    const user = await User.findById(req.body.userId);

    // const S3_BUCKET = 'awspathfinderbucket';
    // const AWS_ACCESS_KEY_ID ='AKIAWU5FKKMT3QOVBFGX';
    // const AWS_SECRET_ACCESS_KEY = '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';
    user.profilePicture = req.file.location;
    console.log(req.file);
    user.save();
    res.send({
      message: "Uploaded!",
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }

});

// app.post('/api/get-profile-pic', async function (req, res, next) {
//   try{
//     const user = await User.findById(req.body.userId);
//     const fileId = user.profilePicture;
//     const image = await Image.findById(fileId);
//     if (!image) {
//       return res.status(404).json({ error: 'Image not found.' });
//     }
//     res.set('Content-Type', image.contentType);
//     res.send(image.data);
//   }
//   catch (err){
//     console.log(err)
//     res.status(500).json({ err: 'Failed to retrieve the image.' });
//   } 
// });

/* calling listen when i do socket stuff
app.listen(8800, () => {
  console.log("Node server is running!");
});
*/

