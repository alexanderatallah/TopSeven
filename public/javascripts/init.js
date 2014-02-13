'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  initPage();
  articleClick();

});

/*
 * Function that is called when the document is ready.
 */
function initPage() {
  // add any functionality and listeners you want here

  /*$('#swipe').swiperight(function(e){
  	alert('You swiped right');
  });*/
  $('#swipe').swipe({
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
  	}
  });

  $('#swipe').click(function(e) {
  	e.preventDefault();
  })

}

function articleClick() {
  $(".article-list .list-group-item").click(function() {
    $(this).closest(".article-list")
      .find(".list-group-item.active")
      .removeClass("active");
    $(this).addClass("active");
  });
}