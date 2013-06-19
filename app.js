
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , sass = require('node-sass')
  , connect = require('connect')
  , partials = require('express-partials');

var app = express();

app.configure(function() {
	// all environments
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');

	// set EJS as default template engine
	app.engine('html', require('ejs').renderFile);
	// set html as view engine (allow to avoid file extension in render methods)
	app.set('view engine', 'html');

	// load the express-partials middleware
	app.use(partials());

	// deal with favicon browsers request
	app.use(express.favicon());
	// log all requests
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);

	app.use(sass.middleware({
	      src: __dirname  + '/public/css/sass'
	    , dest: __dirname + '/public/css'
	    , debug: true
  	}));

	// Serve static files from public directory
	app.use(express.static(path.join(__dirname, 'public')));
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
