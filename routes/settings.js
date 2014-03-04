/*
 * Settings page.
 */

exports.settingsPage = function(req, res){
  res.render('settings', { title: 'Settings' });
};

/**
* filters articles by category checked
*/
exports.filter = function(req,res) {
	console.log(req);
	console.log(res);
	res.render('settings', { title: 'Settings' });
}
