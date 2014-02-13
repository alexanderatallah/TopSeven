'use strict';

var SEVEN = 7;

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  initArticles();
  articleClick();
  swiping();
  $("#refresher").click(refreshArticles);
});

function initArticles() {
  var articles = NYT.loadArticles();
  if (!articles || articles.length == 0) refreshArticles();
  else replaceArticles(articles);
}

function swiping() {
  $('.swipe').swipe({
    swipe:function(event,direction,distance,duration,fingerCount) {
      event.preventDefault();
      console.log(direction);
      $(this).hide();
      if(direction == 'right'){
        //move JSON object article to the "saved articles" list

      }
      if(direction == 'left'){
        //move JSON object article to the "deleted articles" list

      }
    },
    tap:function(event,target){
      //console.log(event);
      console.log($(target).closest('a').href);
      // window.location = url;
    }
  });

  $('.swipe').click(function(e) {
    e.preventDefault();
  });
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
