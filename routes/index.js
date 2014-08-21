
/*
 * GET home page.
 */

var page = require('./page');
var response = require('./response_manager');

function get_method(req, res){
	session.get_login(req, function(){
		websocket.User(req.session.unique_id);
		res.render('index', response.make('index', false ));
	}, function(){
		res.render('main', response.make('main', false ));
	});
}
function post_mehtod(req, res){

}

module.exports.Initialize = function(){
	page.Connection('/index', get_method, post_mehtod);
}















/*

module.exports.WebSocket = function (websocket) {

	var WSKsocket = new WSK(websocket, {port:3001});
	WSKsocket.listen();
}



var chattingLog = function(){
	var self = this;
	this.chatdic = {};
	this.date = new Date();
};

chattingLog.prototype.putLog = function(log){
	this.chatdic[this.date.getTime()] = log; 
	console.log(this.date.getTime()+" : "+log);
}

chattingLog.prototype.getLog = function(){
	return this.chatdic; 
}

var connections = Object.create(null);
var repl = require("repl");


var WSK = function(websocket, options){
	var self = this;
	this.wsk = websocket;
	this.chat_log = new chattingLog();
	this.BASIC_OPTIONS = {
			ip : '211.189.127.141',
			port : 3001
	};
	$.extend(this.BASIC_OPTIONS, this.BASIC_OPTIONS, options);
}

WSK.prototype.listen = function(){
	var self = this;
	this.wsk.listen(self.BASIC_OPTIONS.port, self.BASIC_OPTIONS.ip, function(conn){
		conn.id = Math.random().toString().substr(2);
		console.log("Start!" + ": " +conn.id);
		connections[conn.id] = conn;

		conn.on("data",function(opcode, data){
			console.log("id : "+conn.id+", code : "+opcode+", message : ", data);
			for(var c in connections){
				connections[c].send(data);
			}
			//conn.send(data);
		})

		conn.on("close", function(opcode, reason){
			console.log("close ", opcode, reason);
			delete connections[conn.id];
		})
	})
}

repl.start({"eval":remoteMultiEval});

function remoteMultiEval(cmd, context, filename, callback){
	for(var c in connections){
		connections[c].send(cmd);
	}
	callback(null, "결과 유보");
}
 */
