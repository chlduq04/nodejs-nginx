var page = require('./page');
var response = require('./response_manager');

function get_method(req, res){
	console.log("get");
	res.render('main', response.make('index', true ));
}

function post_mehtod(req, res){
	CON_OUT(req.body);
	database.check_login(req.body.id, req.body.password, function(e){
		if(e.length == 1){
			session.set_login(req, res, e);
			websocket.User(req.session.unique_id);
			if(e[0].manager == 1){
				res.render('index', response.make('index', true ));
			}else{
				res.render('index', response.make('index', false ));
			}
		}else{
			res.render('main', response.make('main', false , { error : "아이디나 비밀번호가 잘못되었습니다." }));
		}
	});
	/*
	*/
}

module.exports.Initialize = function(){
	page.Connection('/', get_method, post_mehtod);
}