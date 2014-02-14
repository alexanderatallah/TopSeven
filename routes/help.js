/*
 * GET help page.
 */

exports.helpPage = function(req, res){
  res.render('help', { title: 'Help' });
};