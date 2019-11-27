var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express-handlebars'), hbs;
var logger = require('morgan');
var errorHandler = require('errorhandler');
var Middleware = require('./utilities/Middleware');
var bodyParser = require('body-parser');
var config = require('./config');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var busboy = require('connect-busboy');
var loop = require('handlebars-loop');
//var paginateHelper = require('express-handlebars-paginate');

// var multer = require('multer');
// const upload = multer({ dest: 'tmp/csv/' });
var app = express();

app.set('port', config[config.environment].application.port);
app.set('views', path.join(__dirname, 'views'));

/* Morgan - https://github.com/expressjs/morgan
 HTTP request logger middleware for node.js */
 app.use(logger({ format: 'dev', immediate: true }));

/* express-handlebars - https://github.com/ericf/express-handlebars
A Handlebars view engine for Express. */
hbs = handlebars.create({
	helpers:{
		ifCond: function(v1, operator, v2, options){
			 
		   v1 = v1.toString(); 
		   v2 = v2.toString();  
			
		   switch (operator) {
			 case '==':
				 return (v1 == v2) ? options.fn(this) : options.inverse(this);
			 case '===':
				 return (v1 === v2) ? options.fn(this) : options.inverse(this);
			 case '<':
				 return (v1 < v2) ? options.fn(this) : options.inverse(this);
			 case '<=':
				 return (v1 <= v2) ? options.fn(this) : options.inverse(this);
			 case '>':
				 return (v1 > v2) ? options.fn(this) : options.inverse(this);
			 case '>=':
				 return (v1 >= v2) ? options.fn(this) : options.inverse(this);
			 case '&&':
				 return (v1 && v2) ? options.fn(this) : options.inverse(this);
			 case '||':
				 return (v1 || v2) ? options.fn(this) : options.inverse(this);
			 default:
				 return options.inverse(this);
			}
		},
		for: function(from, to, incr, block) {
			var accum = '';
			for(var i = from; i <= to; i += incr)
				accum += block.fn(i);
			return accum;
		},
	},
	defaultLayout: 'main'
 });

app.use(cookieParser('secret'));
app.use(session({
    cookie: { 
       // maxAge: 60000 
    }
}));
app.use(flash());

app.use(Middleware.MyNotifications);

/* errorhandler - https://github.com/expressjs/errorhandler
 Show errors in development. */
 app.use(errorHandler({ dumpExceptions: true, showStack: true }));
 app.use(busboy());


// Register `hbs.engine` with the Express app.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(function(request, response, next){
    response.locals.session = request.session;
    next();
});


app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// require('./utilities/seeds');
require('./router')(app);

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});