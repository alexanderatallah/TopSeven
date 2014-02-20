var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
  "article_id": String,
  "view_count": Number
});

exports.Article = mongoose.model('Article', ArticleSchema);
