'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  articleClick();
  $("#refresher").click(refreshArticles);
  // scrollAnimation();
});

function articleClick() {
  $(".article-list").on("click", ".list-group-item", function() {
    $(this).closest(".article-list")
      .find(".list-group-item.active")
      .removeClass("active");
    $(this).addClass("active");
  });
}

function scrollAnimation() {
  $(window).scroll(setCascade);
  setCascade();

  function setCascade() {
    var edge = $(window).scrollTop();

    $(".article-list .list-group-item").each(function(i) {
      var thisEdge = $(this).offset().top;
      if (thisEdge <= edge) return;
      var zoomFactor = 4.0/Math.log(thisEdge - edge);
      if (zoomFactor > 1) zoomFactor = 1;
      $(this).css("zoom", zoomFactor);
      // var fontSize = parseInt(14 - (thisEdge - edge)/40, 10);
      // $(this).css({
      //   'font-size': fontSize + 'px',
      //   'height': fontSize*10 + 'px'
      // });
    });
    // if (osMenu <= edge && osFoot > edge) {
    //   elWrap.addClass("dock").removeClass("stop");
    // }
    // else {
    //   elWrap.removeClass("dock stop");
    // }
    // if (osFoot <= edge) {
    //   elMenu.css("top", osFoot);
    //   elWrap.removeClass("dock").addClass("stop");
    // }
  }
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
      if (limit < articles.length) limit++;
    } else {
      articleList += template(article, i); 
    }
    i++;
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
      var id = $(this).closest('a').data("id");
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

