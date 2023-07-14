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

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const chatRoute = require("./routes/chat")
const articleRoute = require("./routes/article")

var Image = require('./models/Image.js');

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
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now());
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

app.post('/api/upload-image', upload.single('image'), async (req, res, next) => {
    try {
        var obj = {
            name: req.body.name,
            desc: req.body.desc,
            img: {
                data: fs.readFileSync(path.join(__dirname + '/public/images/' + req.file.filename)),
                contentType: 'image/png'
            }
        };
        /*
        imgSchema.create(obj)
        .then ((err, item) => {
            if (err) {
                console.log(err);
            }
            else {
                item.save();
                //res.redirect('/');
                res.status(200).json();
            }
        });
        */
        const img = await new Image(obj);
        const newimg = img.save();
        res.status(200).json(newimg);
    } catch (err) {
        console.log(err);
    }

});
//end multer image upload test

/* calling listen when i do socket stuff
app.listen(8800, () => {
  console.log("Node server is running!");
});
*/

