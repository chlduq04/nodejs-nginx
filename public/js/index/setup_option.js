/**
 * New node file
 */
var option = function(){
	this.click_target = {};
	this.click_box_count = 0;
	this.situation_type = ["situation", "non-situation", "project-situation", "new-situation"];
	this.search_key_list = ["ip", "title"];
	this.situation_type_prefix = "ssv-";
	this.situation_info_value = "siv-";
	this.situation_info_detail = "infos-";
	this.now_active_panel = $(".tab-pane.active");
	this.home_tab = $("#home");
	this.home_add = $(".active-target-home");
	this.mousedown = false;
	this.add_option = false;
	this.seat_option = false;
}

option.prototype.reset = function(){
	for(var i in this.click_target){
		$("div[ip='"+i+"']").removeClass("clickbox");
	}
	this.click_target = {};
	this.click_box_count = 0;
}

function jquery_extends(){
	if(jQuery){
		$.fn.extend({
			clk_toggle : function(on_func, off_func){
				var self = this;
				this.swt = false;
				$(this).bind("click",function(){
					this.swt = !this.swt;
					if(this.swt){
						on_func(this);
					}else{
						off_func(this);
					}
				})
			},

			clk_toggles : function(){
				var self = this;
				this.swt = false;
				this.argus = arguments;
				return (function(target, argu){
					target.bind("click",function(){
						if(this.swt == undefined || this.swt+1 == argu.length){
							this.swt = 0;
						}else{
							this.swt++;
						}
						argu[this.swt](target);
					})
				})(self, arguments)
			}
		})
	};
}