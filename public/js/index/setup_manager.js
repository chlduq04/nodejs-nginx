/**
 * New node file
 */

$(document).ready(function(){
	page_func.wsk = new wsk_manager();
	page_func.wsk.init();
})

var wsk_manager = function(){
	this.wsk_sync = new websocketSync();

	this.REQ = {
			seat : "manager-seat",
			add : "manager-add",
			info_click : "manager-infoclick",
			info_del : "manager-infodel",
			info_value : "manager-infovalue"
	}

	this.RES = {
			seat : "manager-seat-res",
			add : "manager-add-res",
			info_click : "manager-infoclick-res",
			info_del : "manager-infodel-res",
			info_value : "manager-infovalue-res"
	}
}

wsk_manager.prototype.init = function(){
	this.wsk_sync.init();
	this.get_seat();
	this.get_add();
	this.get_infoclick();
	this.get_infodel();
	this.get_infovalue();
}

wsk_manager.prototype.set_infovalue = function(data){
	var self = this;
	this.wsk_sync.set(self.REQ.info_value, data);
}
wsk_manager.prototype.get_infovalue = function(){
	var self = this;
	this.wsk_sync.get(self.RES.info_value, function(data){
		$(".tab-pane.active").find("div[ip='"+data.target+"']").find("div[alt='"+data.alt+"']").html(data.value).css({"color":"#2ecc71"});
	});
}




wsk_manager.prototype.set_infodel = function(data){
	var self = this;
	this.wsk_sync.set(self.REQ.info_del, data);
}
wsk_manager.prototype.get_infodel = function(){
	var self = this;
	this.wsk_sync.get(self.RES.info_del, function(data){
		var target = $("."+data.target);
		$(".tab-pane.active").find("."+$(".del-info-value").parent().attr("class").match(/(\S*)siv-\S*/g)[0].replace(default_option.situation_info_value,"infos-")).remove();
		target.parent().remove();
	});
}



wsk_manager.prototype.set_infoclick = function( data ){
	var self = this;
	this.wsk_sync.set(self.REQ.info_click, data);
}
wsk_manager.prototype.get_infoclick = function(){
	var self = this;
	this.wsk_sync.get(self.RES.info_click, function(data){
		var target = $("."+data.target);
		if(target.is(".btn-default")){
			var info_prefix = "info-";
			target.removeClass("btn-default").addClass("btn-primary");
			$("."+target.attr("class").match(/(\S*)siv-\S*/g)[0].replace("siv", "infos")).css({"display":"block"});
		}else if(target.is(".btn-primary")){
			target.removeClass("btn-primary").addClass("btn-danger");
		}else if(target.is(".btn-danger")){
			target.removeClass("btn-danger").addClass("btn-default");
			$("."+target.attr("class").match(/(\S*)siv-\S*/g)[0].replace("siv", "infos")).css({"display":"none"});
		}else{

		}
	});
}



wsk_manager.prototype.set_add = function( data ){
	var self = this;
	this.wsk_sync.set(self.REQ.add, data);
}
wsk_manager.prototype.get_add = function(){
	var self = this;
	this.wsk_sync.get(self.RES.add, function(e){
		var new_info_input = e.name.replace(/\ /g,'_');
		var new_name = $('<a class="btn btn-default situation-info-value" href="#fakelink"></a>').append($('<span class=""></span>').html(new_info_input)).addClass(default_option.situation_info_value+new_info_input);
		var new_info = $('<div class="situation-detail-info" alt='+new_info_input+'>'+new_info_input+'</div>').addClass("infos-"+new_info_input);
		new_name.append($('<div class="btn btn-default del-info-value" href="#fakelink"></div>').addClass("del-info-"+new_info_input).append($('<span class="">x</span>')));
		$(".reset-status").find(".active-target-"+$(".tab-pane.active").attr("id")).append(new_name);
		$(".tab-pane.active").find(".box").append(new_info);

		page_func.set_open_info_manager($(".siv-"+new_info_input));
		page_func.set_del_info_manager($(".del-info-"+new_info_input));
	});
}



wsk_manager.prototype.set_seat = function(data){
	var self = this;
	this.wsk_sync.set(self.REQ.seat, data);
}
wsk_manager.prototype.get_seat = function(){
	var self = this;
	this.wsk_sync.get(self.RES.seat, function(e){
		var target = e.target;
		var status = e.status;
		console.log(e);
		for(var i in target){
			var targetdiv = $(".tab-pane.active").find("div[ip='"+i+"']");
			targetdiv.removeClass(targetdiv.attr("class").match(/(\S*)situation\S*/g)[0]).addClass(status);
		}
	});
}