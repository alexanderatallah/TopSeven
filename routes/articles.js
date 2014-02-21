var models = require('../models');

/*
 * GET index page.
 */

exports.indexPage = function(req, res){
  res.render('index');
};


/*
 * GET article page.
 */

exports.articlePage = function(req, res){
  var articleId = req.query.id;
  models.Article
    .find({"article_id": articleId})
    .exec(afterSearch);

  function afterSearch(err, results) {
    if(err) console.log(err);
    var a = results[0] || new models.Article({
      "article_id": articleId,
      "view_count": 0
    });
    a.view_count = a.view_count + 1;
    a.save(afterSave);
  }

  function afterSave(err, results) {
    if(err) console.log(err);
    res.render('article');
  }
};

