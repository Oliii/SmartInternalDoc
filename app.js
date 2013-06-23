
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , sass = require('node-sass')
  , partials = require('express-partials')
  , mongoose = require('mongoose');

  mongoose.connect('mongodb://localhost/ManageDocDb');

  var db = mongoose.connection;

 db.on('error', function() {
 	console.log('error connecting to database');
 });

 db.once('open', function callback () {
  console.log('yay !!');
});

var app = express();

app.configure(function() {
	// all environments
	app.set('port', process.env.PORT || 8080);
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
	      src: __dirname  + '/public'
	    , dest: __dirname + '/public'
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

var kittySchema = mongoose.Schema({
    name: String
})

kittySchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name"
  console.log(greeting);
}

var Kitten = mongoose.model('Kitten', kittySchema);

var fluffy = new Kitten({ name: 'fluffy' });
//fluffy.speak() // "Meow name is fluffy"

fluffy.save(function (err, fluffy) {
  if (err) {
  	console.log('error')
  }
  fluffy.speak();
});

Kitten.find(function (err, kittens) {
  if (err) {
  	console.log('error')
  }
  console.log(kittens)
})



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
