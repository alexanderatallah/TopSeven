window.NYT = {
  API_KEY_: "524a862fb70db9b6a0202562125bd2eb:3:56094140",

  /**
   * NYT URL that will give us lots and lots of whatever we're looking for.
   * 
   * @private
   */
  mostViewedURL_: function() {
    return "http://api.nytimes.com/svc/mostpopular/v2/" + 
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
   * Parses NYT articles
   *
   * @private
   */
  parseArticles_: function(data, callback) {
    console.log(data);
    callback(data);
  }
};