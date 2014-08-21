
module.exports.Connection = function (path, get_func, post_func) {
	app.get(path, function (req, res) { // 웹서버 기본주소로 접속 할 경우 실행 . ( 현재 설정은 localhost 에 3303 port 사용 : 127.0.0.1:3303 )
		if( get_func != undefined && get_func != null ){
			get_func(req, res);
		}
	});
	
	app.post(path, function(req, res) {
		if( post_func != undefined && post_func != null ){
			post_func(req, res);
		}
	});
}

