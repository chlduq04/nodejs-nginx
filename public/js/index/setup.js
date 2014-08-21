var each_func = function(){}
each_func.prototype.search = function(e){
	var success = "Empty";
	$("#search-input").val();
}

each_func.prototype.change_button_color = function(e, before, after){
	$(e).removeClass("btn-default").addClass("btn-primary");
}

each_func.prototype.open_new_info_panel = function(e){
	$(".new-info-manager").css("display","block");
	default_option.add_option = true;
}

each_func.prototype.close_new_info_panel = function(e){
	$(".new-info-manager").css("display","none");
	default_option.add_option = false;
}

each_func.prototype.open_seat_info_change = function(e){
	$(".btn-toolbar").css("display","block");
	default_option.seat_option = true;
}

each_func.prototype.close_seat_info_change = function(e){
	$(".btn-toolbar").css("display","none");
	default_option.seat_option = false;
	default_option.reset();
}

each_func.prototype.set_seat_info_change = function(e){
	$(".situation-status-value").removeClass("active");
	$(e).addClass("active");
	
	for(var i in default_option.click_target){
		var targetdiv = default_option.now_active_panel.find("div[ip='"+i+"']");
		targetdiv.removeClass(targetdiv.attr("class").match(/(\S*)situation\S*/g)[0]).addClass($(e).attr("class").match(/ssv-\S*/g)[0].replace(default_option.situation_type_prefix,""));
	}
}

each_func.prototype.click_box_for_seat = function(e){
	default_option.mousedown = true;
	if(default_option.click_target[$(e).attr("ip")]){
		delete default_option.click_target[$(e).attr("ip")];
		default_option.click_box_count--;
		$(e).removeClass("clickbox");

		if(default_option.click_box_count == 1){
			for(var index in default_option.click_target){
				for(var i=0 ; i < default_option.situation_type.length ; i++){
					if( $("div[ip='"+index+"']").is("."+default_option.situation_type[i])){
						$("."+default_option.situation_type_prefix + default_option.situation_type[i]).addClass("active");
					}
				}
			}
		}else{
			$(".situation-status-value").removeClass("active");
		}
	}else{
		default_option.click_target[$(e).attr("ip")] = true;
		default_option.click_box_count++;
		$(e).addClass("clickbox");
		if(default_option.click_box_count == 1){
			for(var i=0 ; i < default_option.situation_type.length ; i++){
				if($(e).is("."+default_option.situation_type[i])){
					$("."+default_option.situation_type_prefix + default_option.situation_type[i]).addClass("active");
				}
			}
		}else{
			$(".situation-status-value").removeClass("active");
		}
	}	
}

each_func.prototype.click_box_for_info = function(e){
	var target = default_option.now_active_panel.find(".section-info-panel")
	target.html("").html("<div class='section-detail-info'>ip : "+$(e).attr("ip")+"</div>");
	var all = $(e).children();
	for(var i = 0, length = all.length ; i < length ; i++){
		var name = $(all[i]).attr("alt");
		var value = $(all[i]).html();
		target.append("<div class='section-detail-info'><span>"+name+" : </span><span>"+value+"</span></div>");
	}
}


//each_func.prototype.









var bind_func = function(){
	this.each_funcs = new each_func();
}

bind_func.prototype.init = function(){
	this.set_search();
	this.set_info();
	this.set_seat();
	this.set_seat_mouse($(".box"));
	this.set_tab();
	this.set_new_info_manager();
	this.wsk;
}

bind_func.prototype.send_wsk = function(){}

bind_func.prototype.set_search = function(){
	var self = this;
	$("#search-btn").bind("click",function(){
		self.each_funcs.search();
	});
}
bind_func.prototype.set_info = function(){
	var self = this;
	$(".btn-add-info").clk_toggle(function(e){
		self.each_funcs.change_button_color(e, "btn-default", "btn-primary");
		self.each_funcs.open_new_info_panel(e);
	},function(e){
		self.each_funcs.change_button_color(e, "btn-primary", "btn-default");
		self.each_funcs.close_new_info_panel(e);
	})
}

bind_func.prototype.set_seat = function(){
	var self = this;
	
	$(".btn-seat-info").clk_toggle(function(e){
		self.each_funcs.change_button_color(e, "btn-default", "btn-primary");
		self.each_funcs.open_seat_info_change(e);
	},function(e){
		self.each_funcs.change_button_color(e, "btn-primary", "btn-default");
		self.each_funcs.close_seat_info_change(e);
	})

	$(".situation-status-value").live("click", function(){
		self.each_funcs.set_seat_info_change(this);
		
		if(default_option.now_active_panel.attr("id") == "home"){
			self.wsk.set_seat({
				target : default_option.click_target, 
				status : $(this).attr("class").match(/ssv-\S*/g)[0].replace(default_option.situation_type_prefix,"")
			});
		}		
	})
}


bind_func.prototype.set_seat_mouse = function(target){
	var self = this;
	target.bind("mousedown",function(){
		if(default_option.seat_option){
			self.each_funcs.click_box_for_seat(this);
		}else{
			self.each_funcs.click_box_for_info(this);
		}
	}).bind("mouseup",function(){
		if(default_option.seat_option){
			default_option.mousedown = false;
		}
	}).tooltip();
}


bind_func.prototype.set_tab = function(){
	var self = this;
	$(".nav.nav-tabs").live("click",function(e){
		self.set_now_active();
		$(".active-pane-target").css("display","none");
		$(".active-target-"+default_option.now_active_panel.attr("id")).css("display","block")
		default_option.reset();
	})

	$(".tab-manager").bind("click", function(e){
		var target = $("#tab-input").val().trim();
		if(target.length > 0){
			$(".active-target-home").find("a")
			$(".reset-status").append($("<div class='active-pane-target active-target-"+target+"'></div>"));
			$("#myTab").append( $("<li></li>").html($("<a></a>").attr({ "href" : "#"+target, "role" : "tab", "data-toggle":"tab"}).html(target)) );
			$("#main-tab-content").append($("<div></div>").attr({"class":"tab-pane", "id":target}).html( $(".base-membership").clone().attr({"id":target+"-sec-membership", "class":""}) ));
			$("#"+target+"-sec-membership").find(".box").addClass("new-tab-"+target);
			$(".active-pane-target").css("display","none");
			$(".active-target-"+default_option.now_active_panel.attr("id")).css("display","block");
			self.set_seat_mouse($("."+"new-tab-"+target));
		}
	});

	$(".tsv-delete").bind("click",function(e){
		var id = default_option.now_active_panel.attr("id");
		if(id != "home"){
			default_option.now_active_panel.remove();
			$("#myTab").find("li.active").remove();
			$("#myTab").find("a").first().click();
			$(".siv-"+id).remove();
		}
	})
}

bind_func.prototype.set_new_info_manager = function(){
	var self = this;
	$("#new-info-btn").bind("click",function(e){
		var new_info_input = $("#new-info-input").val().replace(/\ /g,'_');
		var new_name = $('<a class="btn btn-default situation-info-value" href="#fakelink"></a>').append($('<span class=""></span>').html(new_info_input)).addClass(default_option.situation_info_value+new_info_input);
		var new_info = $('<div class="situation-detail-info" alt='+new_info_input+'>'+new_info_input+'</div>').addClass("infos-"+new_info_input);
		new_name.append($('<div class="btn btn-default del-info-value" href="#fakelink"></div>').addClass("del-info-"+new_info_input).append($('<span class="">x</span>')));
		$(".reset-status").find(".active-target-"+default_option.now_active_panel.attr("id")).append(new_name);
		default_option.now_active_panel.find(".box").append(new_info);
		self.set_open_info_manager($(".siv-"+new_info_input));
		self.set_del_info_manager($(".del-info-"+new_info_input));
		if(default_option.now_active_panel.attr("id") == "home"){
			self.wsk.set_add({ 
				name : new_info_input
			});
		}

	})

	$(".situation-detail-info").live("click", function(e){
		$(this).addClass("active").css({"color":"#2ecc71"});
		$(".tooltip-box-background").css({"display":"block"});
		$(".input-box-tag").attr({"placeholder":$(this).attr("alt")});
		$("#tooltip-box-info").css({top : ($(this).position().top - 60)+"px", left : ($(this).position().left + $(this).width()/2 - $("#tooltip-box-info").width()/2)+"px"})
	})

	$(".tooltip-box-background").bind("click",function(e){
		if(this == e.target){
			$(this).css({"display":"none"});
			$(".situation-detail-info.active").removeClass("active");
		}
	});

	$(".button-box-tag").bind("click",function(e){
		self.wsk.set_infovalue({
			target : $(".situation-detail-info.active").parent().attr("ip"),
			alt : $(".situation-detail-info.active").attr("alt"),
			value : $(".input-box-tag").val()
		});
		$(".situation-detail-info.active").removeClass("active").html($(".input-box-tag").val());
		$(".tooltip-box-background").css("display","none");
	})

}

bind_func.prototype.set_open_info_manager = function(target){
	var self = this;
	target.clk_toggles(function(e){
		if(default_option.now_active_panel.attr("id") == "home"){
			self.wsk.set_infoclick({ 
				target : e.attr("class").replace(/\ /g,'.') 
			})
		}
		var info_prefix = "info-";
		$(e).removeClass("btn-default").addClass("btn-primary");
		$("."+$(e).attr("class").match(/(\S*)siv-\S*/g)[0].replace("siv", "infos")).css({"display":"block"});
	},function(e){
		if(default_option.now_active_panel.attr("id") == "home"){
			self.wsk.set_infoclick({ 
				target : e.attr("class").replace(/\ /g,'.') 
			})
		}
		$(e).removeClass("btn-primary").addClass("btn-danger");
	},function(e){
		if(default_option.now_active_panel.attr("id") == "home"){
			self.wsk.set_infoclick({ 
				target : e.attr("class").replace(/\ /g,'.') 
			})
		}
		$(e).removeClass("btn-danger").addClass("btn-default");
		$("."+$(e).attr("class").match(/(\S*)siv-\S*/g)[0].replace("siv", "infos")).css({"display":"none"});
	})
}

bind_func.prototype.set_del_info_manager = function(target){
	var self = this;
	target.bind("click",function(e){
		if(	default_option.now_active_panel.attr("id") == "home"){
			self.wsk.set_infodel({ 
				target : $(this).attr("class").replace(/\ /g,'.') 
			})
		}
		default_option.now_active_panel.find("."+$(".del-info-value").parent().attr("class").match(/(\S*)siv-\S*/g)[0].replace(default_option.situation_info_value,"infos-")).remove();
		$(this).parent().remove();
	})
}

bind_func.prototype.set_now_active = function(){
	default_option.now_active_panel = $(".tab-pane.active");
}

$(document).ready(function(){
	jquery_extends();
	default_option = new option();
	page_func = new bind_func();
	page_func.init();
})