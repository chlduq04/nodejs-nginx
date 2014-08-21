function progressBar(options){
	var self = this;
	this.default_options = {};
	this.check_func = [];
	this.WF = new WorkerFactory();

	$.extend(this.default_options ,this.default_options ,options);
	$("#progress-bar").css({width:"0%"})
}

progressBar.prototype.start_persent = function(persent, delay){
	var self = this;
	this.interval = 
		setInterval(function(){
			if(self.now_persent < persent){
				self.now_persent++;
				$("#progress-bar").css({width:self.now_persent+"%"})
			}
			if(self.now_persent >= 100){
				window.clearInterval(self.interval);
			}
		}, delay);
}

progressBar.prototype.start_funcs = function(funcs, delay){
	var self = this;
	this.nums = funcs.length;
	this.count = 0;
	this.each_persent = Math.floor(100 / this.nums);
	this.max_present = this.each_persent * this.nums;
	this.persent = 0;
	this.now_persent = 0;
	this.now_func = 0;
	this.interval = 
		setInterval(function(){
			if(self.now_persent < self.persent){
				self.now_persent++;
				$("#progress-bar").css({width : self.now_persent+"%"})
			}
			if(self.now_persent == self.max_present){
				window.clearInterval(self.interval);
				$("#progress-bar").css({width:"100%"})
			}
		}, delay);
	
	this.func_interval = setInterval(function(){
		$.when( funcs[self.now_func++]() ).done(function() {
			self.persent += self.each_persent;
			self.count++;
		});
		
		if(self.now_func == self.nums){
			window.clearInterval(self.func_interval);
		}
	},1000);
}

progressBar.prototype.start_workers = function(funcs, delay){
	var self = this;
	this.nums = funcs.length;
	this.count = 0;
	this.each_persent = Math.floor(100 / this.nums);
	this.max_present = this.each_persent * this.nums;
	this.persent = 0;
	this.now_persent = 0;
	this.now_func = 0;
	this.interval = 
		setInterval(function(){
			if(self.now_persent < self.persent){
				self.now_persent++;
				$("#progress-bar").css({width : self.now_persent+"%"})
			}
			if(self.now_persent == self.max_present){
				window.clearInterval(self.interval);
				$("#progress-bar").css({width:"100%"})
			}
		}, delay);
	
	for(var i=0;i<this.nums;i++){
		this.WF.add(funcs[i], function(e){
			self.persent += self.each_persent;
			self.count++;
		})
	}
}

progressBar.prototype.end = function(){
	window.clearInterval(this.interval);
}


/*
function test(){
	var kk = new progressBar();
	kk.start_workers([test1,test2,test3,test4], 50);
}

function test1(){
	for(var i=0;i<10000;i++){
		var j = i+i;
	}
	return true;
}

function test2(){
	for(var i=0;i<10000;i++){
		var j = i+i;
	}
	return true;
}

function test3(){
	for(var i=0;i<10000;i++){
		var j = i+i;
	}
	return true;
}

function test4(){
	for(var i=0;i<10000;i++){
		var j = i+i;
	}
	return true;
}
 */

//var get_wanting_course = function(student_number, grade) {
//var want_course = null;
//$.ajax({
//type:"post",
//contentType:"application/json+sua; charset=UTF-8",
//url: '/sugang/SgscAct/findHeemangSuupSearchs.do',
//async:false,
//data: JSON.stringify({"strSuupYear":"2014","strSuupTerm":"20","strHakbun":student_number,"strJojikGb":"3","strGrade":grade}),
//}).done(function ( data ) {
//want_course = data.DS_SUUPGG03TTM01[0].list;
//});
//return want_course;
//}