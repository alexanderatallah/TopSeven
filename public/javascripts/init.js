'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  $("#refresher").click(refreshArticles);
});

/**
 * Checks if a helpers has been seen before, and
 * if it has, hides it.
 */
function checkHelper(helperId) {
  var helpers = localStorage.helpers ? JSON.parse(localStorage.helpers) : {};
  if (helpers[helperId]) {
    $("#" + helperId).hide();
  } else {
    helpers[helperId] = true;
    localStorage.helpers = JSON.stringify(helpers);
  }
}

function articleClick() {
  $(".article-list").on("click", ".list-group-item", function() {
    $(this).closest(".article-list")
      .find(".list-group-item.active")
      .removeClass("active");
    $(this).addClass("active");
  });
}

function refreshArticles() {
  // GOOGLE ANALYTICS
  // ga("send", "event", "index", "reload");
  // END GOOGLE ANALYTICS

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

  var template = function(article, i) {
    var thumbnail = "";
    if (article.media && article.media[0].type=="image") {
      var metadata = article.media[0]['media-metadata'];
      thumbnail = '<img src="' + metadata[0].url + '" class="thumbnail" />';
    }
    return '<a href="/article?id=' + article.id +'" class="list-group-item swipe" data-id="' + article.id + '">' +
      '<div class="rank">' + (i + 1) + '</div>' + 
      thumbnail +
      '<h4 class="list-group-item-heading">' + article.title + '</h4>' +
      '<p class="list-group-item-text">' + article.abstract + '</p>' + 
    '</a>';
  }

  var articleList = "";
  var limit = _excludeSeen ? Seven.SEVEN : articles.length;
  var i = 0;
  while (i < limit) {
    var article = articles[i];
    if (_excludeSeen && Seven.isSeen(article)) {
      // This will load new articles
      if (limit < articles.length) limit++;
    } else {
      articleList += template(article, i); 
    }
    i++;
  }


  $(".article-list").find('.list-group')
    .html(articleList);

  scrollAnimation();
}

function enableSwiping() {
  var animationDuration = 300;
  $('.article-list').hammer().on("swipeleft", ".swipe", function(e) {
    var id = $(this).closest('a').data("id");
    console.log(id);

    var $ghostDiv = $("<div class='ghostDiv ghostDivDelete' />").html("<div>Deleted</div>");
    $ghostDiv.css({
      top: $(this).offset().top,
      height: $(this).height(),
    });
    $ghostDiv.appendTo("body");

    $(this).animate({left: "-100%"}, animationDuration, function() {
      var el = this;
      $ghostDiv.fadeOut(1000, function() {
        $(el).remove();
        $(this).remove();
      });
      scrollAnimation();
    });
    var article = Seven.getArticle(id);

    Seven.deleteArticle(article);
  }).on("swiperight", ".swipe", function(e) {
    var id = $(this).closest('a').data("id");
    console.log(id);

    var $ghostDiv = $("<div class='ghostDiv ghostDivSave' />").html("<div>Saved</div>");
    $ghostDiv.css({
      top: $(this).offset().top,
      height: $(this).height(),
    });
    $ghostDiv.appendTo("body");

    $(this).animate({left: "100%"}, animationDuration, function() {
      var el = this;
      $ghostDiv.fadeOut(1000, function() {
        $(el).remove();
        $(this).remove();
      });
      scrollAnimation();
    });
    var article = Seven.getArticle(id);

    Seven.saveArticle(article);
  });

  // $('.article-list').hammer().on("tap", ".swipe", function(e) {
  //   window.location = $(e.target).closest('a')[0].href;
  // });
}

