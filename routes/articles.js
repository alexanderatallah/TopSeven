var models = require('../models');

/*
 * GET index page.
 */

exports.indexPage = function(req, res){
  var options = {
    "fancy": true,
    "experiment": false
  };
  res.render('index', options);
};

exports.indexPageSimple = function(req, res){
  var options = {
    "fancy": false,
    "experiment": false
  };
  res.render('index', options);
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

/*
 * GET article info as JSON.
 */

exports.metadata = function(req, res){
  var articleIds = req.query.articleIds;

  models.Article
    .where("article_id")
    .in(articleIds)
    .exec(afterQuery);

  function afterQuery(err, results) {
    if(err) console.log(err);
    // console.log(results);
    res.json(results);
  }
};

