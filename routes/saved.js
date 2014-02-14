/*
 * GET saved page.
 */

exports.savedPages = function(req, res){
  res.render('saved');
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