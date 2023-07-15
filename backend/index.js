const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const fs = require('fs');
const path = require("path");
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const { promisify } = require('util')

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const chatRoute = require("./routes/chat")
const articleRoute = require("./routes/article")

//var Image = require('./models/Image.js');
const User = require("./models/User");
const unlinkAsync = promisify(fs.unlink)
const app = express();

//Allow cross origin requests
app.use(cors());

dotenv.config();
mongoose.connect(
    process.env.MONGO_URL,
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
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]

    }
});
require('./chatSocket')(io);
server.listen(8800, () => console.log(`socket listening on port 8800`));

//end socket stuff



//multer image upload tests 
//https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/#
app.use("/images", express.static(path.join(__dirname, "public/images")));

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadPath = '';
        console.log(req.body.category);
        if(req.body.category === "profile"){
            uploadPath = 'public/images/profile';
        }
        else if(req.body.category === "article"){
            uploadPath = 'public/images/article';
        }
        else{
            uploadPath= 'public/images';
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    }
});

const upload = multer({ storage });

/*
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded");
  } catch (error) {
    console.log(error);
  }
});
*/
const profilePath = "public\\images\\profile\\";
app.post('/api/upload-profile-pic', upload.single('image'), async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        const user = await User.findById(req.body.userId);
        if(user.profilePicture != ""){
          try{
            await unlinkAsync(profilePath+user.profilePicture);
          }
          catch(err){
            console.log("tried to delete old file");
            console.log(err);
          }
        }
        console.log(req.file.filename);
        user.profilePicture = req.file.filename;
        user.save();
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.send(err);
    }

});

app.get('/api/get-profile-pic', async function (req, res, next) {
    const user = await User.findById(req.body.userId);
    const filename = user.profilePicture;
    const filePath = path.join(profilePath, filename); // Update the path to match your file storage location
    fs.stat(filePath, function (err, stat) {
      if (err || !stat.isFile()) {
        return res.status(404).send('File not found.');
      }
      res.sendFile(__dirname +'\\'+ filePath);
    });
  });

/* calling listen when i do socket stuff
app.listen(8800, () => {
  console.log("Node server is running!");
});
*/

