const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.set('strictQuery', false);

mongoose
    .connect(
        'DB CONNECTION STRING HERE',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log('Connected to DB'))
    .catch(console.error);

app.listen(3001, () => console.log('Server listening on port 3001'));





//Post model for easy reference @Aaron
const Post = require('./models/post');

//Posts endpoints
app.get('/feed', async (req, res) => {
    const feed = await Post.find();

    res.json(feed);
});

app.post('/feed/new', (req, res) => {
    const post = new Post({
        content: req.body.content,
        user: req.body.user,
        timestamp: Date.now(),
    });

    post.save();

    res.json(post);
});

app.delete('/feed/delete/:_id', async (req, res) => {
    const result = await Post.findByIdAndDelete(req.params._id);

    res.json(result);
});

app.put('/feed/edit/:_id', async (req, res) => {
    const post = await Post.findById(req.params._id);

    post.content = req.body.content;
    post.save();

    res.json(post);
});

app.put('/feed/update/:_id', async (req, res) => {
    const post = await Post.findById(req.params._id);

    post.num_likes++;
    post.save();

    res.json(post);
});

app.get('/feed/:username', async (req, res) => {
    const posts = await Post.find({ user: req.params.username });

    res.json(posts);
});
