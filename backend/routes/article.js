const express = require("express");
const Article = require("../models/Article");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/add", async (req, res) => {
    try {
      const newArticle = await new Article({
        title: req.body.title,
        author: req.body.author,
        bodyText: req.body.body,
        subArticles: req.body.subArticles,
        tags: req.body.tags,
      });
      const article = await newArticle.save();
      res.status(200).json(article);
    } catch (err) {
      console.log(err);
    }
  });

router.get("/all", async (req, res) => {
try {
    var articles;
    if(req.body.tags == null || req.body.tags.length ==0){
      articles = await Article.find();
      console.log("no tags");
    }
    else{
      console.log("finding by tag");
      articles = await Article.find({tags: {$in: req.body.tags}});
    }
    res.status(200).json(articles);
} catch (err) {
    console.log(err);
}
});


module.exports = router;
