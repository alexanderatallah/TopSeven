
/*
 * GET home page.
 */

exports.welcomePage = function(req, res){
  res.render('welcome', { title: 'Top Seven' });
};