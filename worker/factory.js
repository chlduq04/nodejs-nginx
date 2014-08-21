var WorkerManager = function(){ this.worker };
WorkerManager.prototype.init = function(){
	if(!!window.Worker){ 
		if(this.worker) this.worker.terminate();
		this.worker = new Worker("../js/worker.js");  //새로운 워커(객체)를 생성한다       
	}
	else{
		console.log("This browser can't use web worker")
	}
}

WorkerManager.prototype.start = function(returnObj, callback){
	var self = this;
	if(typeof returnObj == "function"){
		this.worker.postMessage(returnObj.toString()); //워커에게 메시지를 전달한다        
		this.worker.onmessage = function(event){ //워커로부터 전달되는 메시지를 받는다
			callback(event.data);
			self.worker.terminate();
		};
	}else{
		console.log("Data type : " + typeof returnObj + " need function");
	}
}

WorkerManager.prototype.stop = function(){
	if(this.worker){
		this.worker.terminate();
	}
}


var WorkerFactory = function(){};
WorkerFactory.prototype.add = function(returnObj, callback){
	var Workers = new WorkerManager();
	Workers.init();
	Workers.start(returnObj, callback);
	Workers = undefined;
}

/*
 * 
(function(){
	var wf = new WorkerFactory();
	wf.add(function(){return true},function(e){console.log(e)});
	wf.add(function(){return false},function(e){console.log(e)});
})()
 */