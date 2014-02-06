'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  initPage();
  articleClick();
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