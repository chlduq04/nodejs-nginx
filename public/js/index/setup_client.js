/**
 * New node file
 */

$(document).ready(function(){
	page_func.wsk = new wsk_client();
	page_func.wsk.init();
	page_func.wsk.get_seat();
	page_func.wsk.get_add();
	page_func.wsk.get_infoclick();
	page_func.wsk.get_infodel();
	
})

var wsk_client = function(){
	this.wsk_sync = new websocketSync();
	this.REQ = {
			seat : "manager-seat",
			add : "manager-add",
			info_click : "manager-infoclick",
			info_del : "manager-infodel"
	}

	this.RES = {
			seat : "manager-seat-res",
			add : "manager-add-res",
			info_click : "manager-infoclick-res",
			info_del : "manager-infodel-res"
	}
}

wsk_client.prototype.init = function(){
	this.wsk_sync.init();
}

wsk_client.prototype.get_infodel = function(){
	var self = this;
	this.wsk_sync.get(self.RES.info_del, function(data){
		var target = $("."+data.target);
		$(".tab-pane.active").find("."+$(".del-info-value").parent().attr("class").match(/(\S*)siv-\S*/g)[0].replace(default_option.situation_info_value,"infos-")).remove();
		target.parent().remove();
	});
}

wsk_client.prototype.get_infoclick = function(){
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

wsk_client.prototype.get_add = function(){
	var self = this;
	this.wsk_sync.get(self.RES.add, function(e){
		var new_info_input = e.name.replace(/\ /g,'_');
		var new_name = $('<a class="btn btn-default situation-info-value" href="#fakelink"></a>').append($('<span class=""></span>').html(new_info_input)).addClass(default_option.situation_info_value+new_info_input);
		var new_info = $('<div class="situation-detail-info" alt='+new_info_input+'>'+new_info_input+'</div>').addClass("infos-"+new_info_input);
		new_name.append($('<div class="btn btn-default del-info-value" href="#fakelink"></div>').addClass("del-info-"+new_info_input).append($('<span class="">x</span>')));
		$(".reset-status").find(".active-target-"+$(".tab-pane.active").attr("id")).append(new_name);
		$(".tab-pane.active").find(".box").append(new_info);
	});
}

wsk_client.prototype.get_seat = function(){
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