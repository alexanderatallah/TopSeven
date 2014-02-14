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
      var id = $(this).closest('a')[0].href.substring(33);
      console.log(id);
      $(this).hide();
      var article = NYT.getArticle(id);
      
      if(direction == 'right'){
        //move JSON object article to the "saved articles" list
        NYT.addSavedArticle(article);  
      }
      if(direction == 'left'){
        //move JSON object article to the "deleted articles" list
        NYT.deleteArticle(article);
      }
    },
    tap:function(event,target){
      window.location = $(target).closest('a')[0].href;
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
    var thumbnail = "";
    if (article.media && article.media[0].type=="image") {
      var metadata = article.media[0]['media-metadata'];
      thumbnail = '<img src="' + metadata[0].url + '" class="thumbnail" />';
    }
    return '<a href="/article?id=' + article.id +'" class="list-group-item swipe">' +
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
 //EASILY GENERALIZABLE TO POPULATE SAVED + DELETED LISTS
