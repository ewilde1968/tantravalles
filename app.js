
/**
 * Module dependencies.
 */

var express = require('express'),
    Database = require('./model/database'),
    routes = require('./routes'),
    user = require('./routes/user'),
    http = require('http'),
    path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('tantravallesCookieSecret'));
app.use(express.session({ secret: 'tantravallesSessionSecret'}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
//app.use( function(q,r,n) {user.ensureSignedIn(q,r,n);});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/', routes.signin);
app.get('/users', user.list);
app.get('/user/new', user.newUser);
app.post('/user/new', user.createUser);
app.get('/user/:id', user.ensureSignedIn, user.home);
app.post('/user/:id', user.ensureSignedIn, user.update);

// setup DB
app.database = new Database();
app.database.initialize();

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});