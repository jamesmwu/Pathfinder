var mongoose = require('mongoose');


const articleSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        default: ""
      },
      author: {
        type: String,
        required: true,
        default: "Pathfinder Staff"
      },
      bodyText:{
        type: Array,
        required: true,
        default: []
      },
      subArticles:{
        type: Array,
        required: true,
        default: []
      },
      tags:{
        type: Array,
        required: true,
        default: []
      },
    },
    { timestamps: true }
  );
 
module.exports = mongoose.model('Article', articleSchema);