
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var mongoose = require('mongoose');

var welcome = require('./routes/welcome');
var articles = require('./routes/articles');
var saved = require('./routes/saved');
var trash = require('./routes/trash');
var help = require('./routes/help');
var settings = require('./routes/settings');

// Models
var models = require('./models');

// Connect to the Mongo database, whether locally or on Heroku
var local_database_name = 'seven';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);

// Engines
var app = express();
var hbs = handlebars.create({defaultLayout: 'main'});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('miaparthalex12642'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Routes
app.get('/', welcome.welcomePage);
app.get('/index', articles.indexPage);
app.get('/article', articles.articlePage);
app.get('/saved', saved.savedPages);
app.get('/trash', trash.deletedPages);
app.get('/help', help.helpPage);
app.get('/settings',settings.settingsPage);

// Partials
handlebars.create().loadPartials(function (err, partials) {
  //console.log(partials);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
