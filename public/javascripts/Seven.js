'use strict';

window.Seven = {
  SEVEN: 7,

  /**
   * Saves articles
   * 
   * @public
   */
  saveArticles: function(articles) {
    localStorage['articles'] = JSON.stringify(articles);
  },

  saveSavedArticles: function(articles) {
    localStorage['saved-articles'] = JSON.stringify(articles);
  },

  saveDeletedArticles: function(articles) {
    localStorage['deleted-articles'] = JSON.stringify(articles);
  },

  /**
   * Loads articles
   * 
   * @public
   */
  loadArticles: function() {
    return this.load_('articles');
  },

  loadSavedArticles: function() {
    return this.load_('saved-articles');
  },

  loadDeletedArticles: function() {
    return this.load_('deleted-articles')
  },

  load_: function(namespace) {
    localStorage[namespace] = localStorage[namespace] || JSON.stringify([]);
    return JSON.parse(localStorage[namespace]);
  },

  /**
   * Gets an article by id
   *
   * @optional _cachedArticles, a cached JSON version
   *
   * @public
   */
  getArticle: function(id, _cachedArticles) {
    var articles = _cachedArticles || this.loadArticles();
    for (var i = 0; i < articles.length; i++) {
      var article = articles[i];
      if (article.id == id) return article;
    }
    return null;
  },

  /**
   * Marks an article as deleted, removing it from the list
   *
   * @optional articles, a cached JSON version
   *
   * @public
   */
  deleteArticle: function(article) {
    var deleted = this.loadDeletedArticles();
    deleted.unshift(article);
    this.saveDeletedArticles(deleted);

    this.markAsSeen_(article);
  },

  saveArticle: function(article) {
    var saved = this.loadSavedArticles();
    saved.unshift(article);
    this.saveSavedArticles(saved);

    this.markAsSeen_(article);
  },

  isSeen: function(article) {
    var seen = this.loadSeenArticles_();
    return seen[article.id] == true;
  },

  // @private
  markAsSeen_: function(article) {
    var seen = this.loadSeenArticles_();
    seen[article.id] = true;
    localStorage['seen'] = JSON.stringify(seen);
  },

  // @private
  loadSeenArticles_: function() {
    localStorage['seen'] = localStorage['seen'] || JSON.stringify({});
    return JSON.parse(localStorage['seen']);
  },

//keeps checks checked in local storage
/*$(':checkbox').click(function()){
  var name = $(this).attr('name');
  var value = $(this).val();
  $(document).ready(function (){
    $(':checkbox').each(function(){
      $(this).prop('checked',localStorage.getItem(this.name) == 'checked');
    });
    });
  }*/


  //////////////////////////////////////////////
  ////////////// New York Times ////////////////
  //////////////////////////////////////////////

  API_KEY_: "524a862fb70db9b6a0202562125bd2eb:3:56094140",

  /**
   * NYT URL that will give us lots and lots of whatever we're looking for.
   * 
   * @private
   */
  mostViewedURL_: function() {
    return "//api.nytimes.com/svc/mostpopular/v2/" + 
    "mostviewed/all-sections/7.jsonp?api-key=" + 
    this.API_KEY_;
  },


  /**
   * Sends an XHR GET request
   * 
   * @public
   */
  fetchArticles: function(callback) {
    var nyt = this;
    var fetchArticlesCb = function(res) {
      nyt.parseArticles_(res, callback);
    }
    $.get(this.mostViewedURL_(), fetchArticlesCb, 'jsonp');
  },



  /**
   * Parses NYT articles, adding rank, etc.
   *
   * @private
   */
  parseArticles_: function(data, callback) {
    console.log(data);
    var articles = data.results;

    for(var i = 0; i < articles.length; i++) {
      var article = articles[i];
      article.rank = this.rankArticle(article, i);
    }

    this.saveArticles(articles);
    callback(articles);
  },

  /**
   * Ranks an article
   * @optional _i index of article in list
   * @public
   */
  rankArticle: function(article, _i) {
    return article.views || ((_i || 0) + 1);
  }
}