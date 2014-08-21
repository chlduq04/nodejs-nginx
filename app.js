/*** Module dependencies.*/

DEBUG_MODE = true
COUT_MODE = true
, DB_OUT = function(value){
	if(DEBUG_MODE){console.log(value);}
}
, CON_OUT = function(value){
	if(COUT_MODE){console.log(value);}
}

express = require('express')
, routes = require('./routes')
, user = require('./routes/user')
, websocket = require('./routes/websocket')
, http = require('http')
, path = require('path')
, engine = require('ejs')
, app = express()
, database = require('./routes/db_manager')
, session = require('./routes/session_manager')
, $ = require('jquery')(require('jsdom').jsdom().createWindow())
, async = require('async');

var index = require('./routes/index')
, main = require('./routes/main');



//all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret : "ung_session"}));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-promise')());

//development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}
//app.get('/users', user.list);

index.Initialize(app);
main.Initialize(app);
websocket.Initialize();

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});