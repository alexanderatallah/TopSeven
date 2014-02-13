'use strict';

var SEVEN = 7;

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  initPage();
  articleClick();
  refresherClick();
})

/*
 * Function that is called when the document is ready.
 */
function initPage() {
  // add any functionality and listeners you want here
}

function articleClick() {
  $(".article-list .list-group-item").click(function() {
    $(this).closest(".article-list")
      .find(".list-group-item.active")
      .removeClass("active");
    $(this).addClass("active");
  });
}

function refresherClick() {
  $("#refresher").click(function() {
    var spinner = $(this).find(".spinner-inline");
    spinner.addClass("spin");
    NYT.fetchArticles(function(results) {
      spinner.removeClass("spin");
      replaceArticles(results);
    });
  });
}

function replaceArticles(articles) {
  var template = function(article) {
    return '<a href="/article?id=' + article.id +'" class="list-group-item">' +
      '<div class="rank">' + article.rank + '</div>' + 
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
