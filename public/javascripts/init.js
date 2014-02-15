'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  articleClick();
  $("#refresher").click(refreshArticles);
});

function articleClick() {
  $(".article-list").on("click", ".list-group-item", function() {
    $(this).closest(".article-list")
      .find(".list-group-item.active")
      .removeClass("active");
    $(this).addClass("active");
  });
}

function refreshArticles() {
  var spinner = $("#refresher").find(".spinner-inline");
  spinner.addClass("spin");
  Seven.fetchArticles(function(results) {
    spinner.removeClass("spin");
    replaceArticles(results);
  });
}

/*
 * THESE FUNCTIONS BELOW ARE CALLED FROM SCRIPTS BELOW
 * THE HTML IN THE HANDLEBARS FILES, FOR RESPECTIVE PAGES
 *
 */
function initArticles() {
  var articles = Seven.loadArticles();
  if (!articles || articles.length == 0) refreshArticles();
  else replaceArticles(articles);
}

function initSavedArticles() {
  var saved = Seven.loadSavedArticles();
  if (!saved || saved.length == 0) return;
  else replaceArticles(saved, false);
}

function initDeletedArticles() {
  var deleted = Seven.loadDeletedArticles();
  if (!deleted || deleted.length == 0) return;
  else replaceArticles(deleted, false);
}

function replaceArticles(articles, _excludeSeen) {
  if (_excludeSeen === undefined) _excludeSeen = true;

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
  var limit = _excludeSeen ? Seven.SEVEN : articles.length;
  for (var i = 0; i < limit; i++) {
    var article = articles[i];
    if (_excludeSeen && Seven.isSeen(article)) continue;
    articleList += template(article);
  }

  $(".article-list").find('.list-group')
    .html(articleList);

  enableSwiping();
}

function enableSwiping() {
  $('.swipe').swipe({
    swipe:function(event,direction,distance,duration,fingerCount) {
      event.preventDefault();
      console.log(direction);
      var id = $(this).closest('a')[0].href.substring(33);
      console.log(id);
      $(this).hide();
      var article = Seven.getArticle(id);
      
      if(direction == 'right'){
        //move JSON object article to the "saved articles" list
        Seven.saveArticle(article);  
      }
      if(direction == 'left'){
        //move JSON object article to the "deleted articles" list
        Seven.deleteArticle(article);
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

