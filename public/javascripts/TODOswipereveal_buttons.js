function enableSwiping() {
  var animationDuration = 300;

  $('.article-list').hammer()
    .on("dragleft", '.swipe', function(e) {
      $(this).css({left: e.gesture.deltaX});
    })
    .on("dragend", '.swipe', function(e) {
      e.preventDefault(); e.stopPropagation();
      if (e.gesture.deltaX < 0) {
        toggleButtons(this);
      }
    })
    .on("dragright", '.swipe', function(e) {
      if ($(this).data('swiped')) {
        $(this).animate({left: 0}, animationDuration, function() {
          $(this).data('swiped', false);
        });
      }
    });



  // .on("swipeleft", ".swipe", function(e) {
  //   var id = $(this).closest('a').data("id");
  //   console.log(id);

  //   $(this).animate({left: "-100%"}, animationDuration, function() {
  //     $(this).hide();
  //     scrollAnimation();
  //   });
  //   var article = Seven.getArticle(id);

  //   Seven.deleteArticle(article);
  // }).on("swiperight", ".swipe", function(e) {
  //   var id = $(this).closest('a').data("id");
  //   console.log(id);

  //   $(this).animate({left: "100%"}, animationDuration, function() {
  //     $(this).hide();
  //     scrollAnimation();
  //   });
  //   var article = Seven.getArticle(id);

  //   Seven.saveArticle(article);
  // });

  // $('.article-list').hammer().on("tap", ".swipe", function(e) {
  //   window.location = $(e.target).closest('a')[0].href;
  // });
  function toggleButtons(el) {
    if (e) {e.preventDefault(); e.stopPropagation();}

    var $article = $(el);
    if ($article.data('swiped')) {
      $article.animate({left: 0}, animationDuration, function() {
        $(this).data('swiped', false);
      });
    } else {
      $buttons = $article.next('.actionButtons').fadeIn();
      var target = -1*$buttons.width();
      $article.animate({left: target}, animationDuration, function() {
        $(this).data('swiped', true);
      });
    }
  }
}