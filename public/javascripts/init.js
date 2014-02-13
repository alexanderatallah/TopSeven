'use strict';

var SEVEN = 7;

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  initArticles();
  articleClick();
  $("#refresher").click(refreshArticles);
})

function initArticles() {
  var articles = NYT.loadArticles();
  if (!articles || articles.length == 0) refreshArticles();
  else replaceArticles(articles);
}

function articleClick() {
  $(".article-list .list-group-item").click(function() {
    $(this).closest(".article-list")
      .find(".list-group-item.active")
      .removeClass("active");
    $(this).addClass("active");
  });
}

function refreshArticles() {
  var spinner = $("#refresher").find(".spinner-inline");
  spinner.addClass("spin");
  NYT.fetchArticles(function(results) {
    spinner.removeClass("spin");
    replaceArticles(results);
  });
}

function replaceArticles(articles) {
  var template = function(article) {
    var thumbnail = "";
    if (article.media && article.media[0].type=="image") {
      var metadata = article.media[0]['media-metadata'];
      thumbnail = '<img src="' + metadata[0].url + '" class="thumbnail" />';
    }
    return '<a href="/article?id=' + article.id +'" class="list-group-item">' +
      '<div class="rank">' + article.rank + '</div>' + 
      thumbnail +
      '<h4 class="list-group-item-heading">' + article.title + '</h4>' +
      '<p class="list-group-item-text">' + article.abstract + '</p>' + 
    '</a>';
  }

  var articleList = "";
  for (var i = 0; i < SEVEN; i++) {
    var article = articles[i];
    articleList += template(article);
  }

  $("#articleList").find('.list-group')
    .html(articleList);
}
