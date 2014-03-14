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
  if (!helpers[helperId]) {
    if ('welcomeHelper' == helperId) {
      $("#lightbox").html($("#welcomeHelper").html()).fadeIn();
      $("#lightbox").one('click', function() {
        markHelperAsSeen();
        $(this).fadeOut(400, function() { $(this).empty(); });
      });
    } else {
      $("#" + helperId).slideDown();
      if ('trashHelper' != helperId) markHelperAsSeen();
    }
  }
  function markHelperAsSeen() {
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
    replaceArticles(results, true, false);
  });
}

/*
 * THESE FUNCTIONS BELOW ARE CALLED FROM SCRIPTS BELOW
 * THE HTML IN THE HANDLEBARS FILES, FOR RESPECTIVE PAGES
 *
 */

function replaceArticles(articles, _excludeSeen, _resetList) {
  if (_excludeSeen === undefined) _excludeSeen = true;
  if (_resetList === undefined) _resetList = false;

  var template = function(article, i) {
    var thumbnail = "";
    if (article.media && article.media[0].type=="image") {
      var metadata = article.media[0]['media-metadata'];
      thumbnail = '<img src="' + metadata[0].url + '" class="thumbnail" />';
    }
    return '<a href="/article?id=' + article.id +'" class="list-group-item" data-id="' + article.id + '">' +
      '<div class="rank">' + (i + 1) + '</div>' + 
      thumbnail +
      '<h4 class="list-group-item-heading">' + article.title + '</h4>' +
      '<p class="list-group-item-text">' + article.abstract + '</p>' + 
    '</a>';
  }

  var articleList = "";
  // var limit = _excludeSeen ? Seven.SEVEN : articles.length;
  // var i = 0;
  // while (i < limit) {
  //   var article = articles[i];
  //   if (_excludeSeen && Seven.isSeen(article)) {
  //     // This will load new articles
  //     if (limit < articles.length) limit++;
  //   } else {
  //     articleList += template(article, i); 
  //   }
  //   i++;
  // }

  var listSize = 0;
  for(var i = 0; i < articles.length; i++) {
    var article = articles[i];
    if (_excludeSeen && Seven.isSeen(article)) {
      //
    } else {
      articleList += template(article, listSize);
      listSize++;
    }
    if (listSize >= 7) break;
  }

  if (articleList.length)
    $(".article-list").find('.list-group')
      .html(articleList);
  else {
    alert("You're up to date! Here come your deleted articles. Check back next week for new ones.");
    window.location = "/trash";
  }

  if (window.scrollAnimation!== undefined) scrollAnimation();
}
