
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
  // var article = {
  //   title: req.query.title,
  //   url: req.query.url
  // };
  res.render('article');
};