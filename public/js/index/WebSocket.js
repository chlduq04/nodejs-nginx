var websocketSync = function(){

	this.socket = io.connect('http://211.189.127.141:3001');

	this.REQ = {
			HANDSHAKE : "handshake"
	}

	this.RES = {
			HANDSHAKE : "handshake-response"
	}
}

websocketSync.prototype.init = function(){
	var self = this;
	this.handshake();
}

websocketSync.prototype.set = function(name, value){
	this.socket.emit(name, value);
}

websocketSync.prototype.get = function(name, func){
	this.socket.on(name, function (data) {
		func(data);
	});
}

websocketSync.prototype.handshake = function(){
	var self = this;
	this.get(self.REQ.HANDSHAKE, function(data){
		console.log(data);
		self.socket.emit(self.RES.HANDSHAKE, "first-handshake");
	});
}




































//var echoSocket;
//var arrbuf;
//var THRESHOLD = 10240;
//
//$(document).ready(function(){
//	if(window.WebSocket){
//		console.log("Support");
//	}else{
//		console.log("Not Support");
//	}
//})
//
//var webSocketConnection = function(){
//	var self = this;
//	
//	this.BASIC_OPTIONS = { 
//			close_code : 1000, 
//			close_reason : "success"
//	};
//	
//	this.BASIC_HANDLER= {
//			CBString : function(e){console.log("message : string",e,e.data);},
//			CBArraybuffer : function(e){console.log("message : arraybuffer",e,e.data); this.arrbuf = new Uint8Array(e.data);},
//			CBBlob : function(e){var blob = e.data; console.log("메시지 도착: " + blob.size + " 바이트");}
//	};
//	
//	this.Socket;
//	
//	this.arrbuf;
//}
//
//webSocketConnection.prototype.OptionHandler = function( options ){
//	$.extend(this.BASIC_OPTIONS, this.BASIC_OPTIONS, options);
//}
//
//webSocketConnection.prototype.CallbackHandler = function( options ){
//	$.extend(this.BASIC_HANDLER, this.BASIC_HANDLER, options);
//}
//
//webSocketConnection.prototype.setConnectionHandler = function(url){
//	var self = this;
//	this.Socket = new WebSocket("ws://211.189.127.141:3001/");
//	this.Socket.onopen = function(e){
//		console.log("message : open",e);
//		self.Socket.send("Start Chatting Service");
//	}
//	
//	this.Socket.onmessage = function(e){
//		if(typeof e.data === "string"){
//			self.MessageStringHandler(e);
//		}
//		else if(e.data instanceof ArrayBuffer){
//			self.MessageArrayBufferHandler(e);
//		}
//		else if(e.data instanceof Blob){
//			self.MessageBlobHandler(e);
//		}else{
//			console.log("message : etc",e,e.data);
//		}
//	}
//	this.Socket.onerror = this.ErrorHandler;
//	this.Socket.onclose = this.CloseHandler;
//}
//
//webSocketConnection.prototype.setCloseHandler = function(code, reason, data){
//	var self = this;
//	if(data != null && data != undefined ){
//		this.Socket.send(data);
//	}
////	this.Socket.close(1000, "정상 종료");
////	this.Socket.close(1001, "없어짐");
////	this.Socket.close(1002, "프로토콜 에러");
////	this.Socket.close(1003, "잘못된 데이터 타입");
////	this.Socket.close(1004, "예비 : 사용하면 안된다");
////	this.Socket.close(1005, "예비 : 사용하면 안된다");
////	this.Socket.close(1006, "예비 : 사용하면 안된다");
////	this.Socket.close(1007, "잘못된 데이터");
////	this.Socket.close(1008, "정책에 위배되는 메세지");
////	this.Socket.close(1009, "너무 긴 메세지");
////	this.Socket.close(1010, "익스텐션 필요");
////	this.Socket.close(1011, "예상하지 못한 상황");
////	this.Socket.close(1015, "TLS 실패");
////	this.Socket.close(4000~4999, "사용자 설정가능 코드");
//	this.Socket.close(this.BASIC_OPTIONS.close_code, this.BASIC_OPTIONS.close_reason);
//}
//
//
//webSocketConnection.prototype.MessageStringHandler = function(e){
//	this.BASIC_HANDLER.CBString(e);
//}
//
//webSocketConnection.prototype.MessageArrayBufferHandler = function(e){
//	this.BASIC_HANDLER.CBArraybuffer(e)
//}
//
//webSocketConnection.prototype.MessageBlobHandler = function(e){
//	this.BASIC_HANDLER.CBBlob(e);
//}
//
//webSocketConnection.prototype.ErrorHandler = function(e){
//	console.log("websocket : error", e);
//}
//
//webSocketConnection.prototype.CloseHandler = function(e){
//	console.log("websocket : close", e);
//}
//
//webSocketConnection.prototype.SendFileHandler = function(file){
//	var self = this;
//	var reader = new FileReader();
//	reader.readAsArrayBuffer(file);
//	reader.onload = function() {
//		console.log("송신 중: " + file.name);
//		this.Socket.send(reader.result);
//	}
//}
//
//webSocketConnection.prototype.SendHandler = function(data){
//	var self = this;
//	if(this.Socket.readyState === WebSocket.OPEN){
//		this.Socket.send(data);
//	}
//}
//
//webSocketConnection.prototype.BufferSendHandler = function(data, delay){
//	var self = this;
//	setInterval(function(){
//		if(self.Socket.bufferedAmout < THRESHOLD){
//			self.Socket.send(data);
//		}
//	}, delay)
//}
//
