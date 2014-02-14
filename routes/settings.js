/*
 * GET help page.
 */

exports.settingsPage = function(req, res){
  res.render('settings', { title: 'Settings' });
};