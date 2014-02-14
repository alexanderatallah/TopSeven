/*
 * GET deleted articles.
 */

exports.deletedPages = function(req, res){
  res.render('trash');
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