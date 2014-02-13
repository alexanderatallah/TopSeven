'use strict';

$(document).ready(function() {
  var article = NYT.getArticle(getParam("id"));
  $("#articleTitle").text(article.title);
  $("#articleFrame").attr('src', article.url);
});