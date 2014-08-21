/**
 * New node file
 */

var session_check_login = { start : 1, end : 20 }

module.exports.write = function(req, res, name){
	req.session.value = unique_id;
	res.end();
};

module.exports.read= function(req, res, name){
	return req.session.unique_id;
	res.end();
};

module.exports.set_login = function(req, res, data){
	req.session.user_id = data[0].user_id;
	req.session.unique_id = data[0].id + data[0].password.substring(session_check_login.start, session_check_login.end);
};

module.exports.get_login = function(req, success, error){
	async.series(
			{
				func1 : function(callback) {
					var result = database.check_session_id(req.session.user_id, function(e){callback(null, e)});
				},
				func2 : function(callback) {
					var result = database.check_session_passwd(req.session.user_id, function(e){callback(null, e)});
				}
			},
			function(err, results) {
				var result = arguments[1];
				if(result.func1 == false || result.func2 == false){
					error();
				}else{
					console.log(req.session.unique_id+" : "+result.func1 + result.func2.substring(session_check_login.start, session_check_login.end));
					if(req.session.unique_id == result.func1 + result.func2.substring(session_check_login.start, session_check_login.end)){
						success();
					}else{
						error();
					}
				}
			}
	);
//	req.session.name = data[0].id + data[0].password.substring(session_check_login.start, session_check_login.end);
}
