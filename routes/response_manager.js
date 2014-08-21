/**
 * New node file
 */
var init_response = {
		title : "page",
		manager : 0,
		success : "",
		error : ""
};

var target_response = null;

module.exports.make = function( title, manager, dic ){
	target_response = $.extend( init_response , { title : title, manager : manager });
	target_response = $.extend( target_response , dic );
	return target_response;
}


