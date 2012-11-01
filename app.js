var express = require('express')
	,http = require('http')
	,path = require('path')
	,db = require('./mongodb_provider')
	,user = require('./user')
	,MongoStore = require('connect-mongo')(express)
  ,crypto = require('crypto');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session({
  	secret: 'tramontinavse', 
	  store: new MongoStore({
		  db: 'exchange_auction_db'
		})
  }));
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

var	routes = require('./routes')(/*parameters for router*/{app: app, db: db, user: user, crypto: crypto});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Exchange auction listening on port " + app.get('port'));
});
