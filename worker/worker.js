onmessage = function(event){
	var sendData;
	try{
		sendData = eval("("+event.data+")()");
	}catch(e){
		sendData = e;
	}
	postMessage(sendData);
}
