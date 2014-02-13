'use strict';

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
    NYT.fetchArticles(function(data) {
      spinner.removeClass("spin");
      replaceArticles(data.results);
    });
  });
}

function replaceArticles(articles) {
  
}
