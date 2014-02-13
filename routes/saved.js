/*
 * GET saved articles page.
 */
 
var data = require('../data.json');

exports.savedPage = function(req, res){
console.log(data);
  res.render('saved', { title: 'Saved Articles' }, data);
};

/*
http://localhost:3000/article?title=List%20group%20item%20heading&url=http://cs147.stanford.edu/ * GET article page.
 */

exports.articlePage = function(req, res){
  var article = {
    title: req.query.title,
    url: req.query.url
  };
  res.render('article', article);
};

function localStorage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
};

localStorage.setItem('savedPage','article');
var saved = localStorage.getItem('article');
// -> gets "saved article"

if (localStorage && localStorage.getItem('')){
	render()
}
