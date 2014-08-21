var mysql = require('mysql')
var connection = mysql.createConnection({
	host :'localhost',
	port : 3306,
	user : 'root',
	password : 'ungdbdb',
	database : 'seat_manager',
	connectionLimit:20,
    waitForConnections:false
})

var db_table = {
		user : "sm_users",
		tab : "sm_tab",
		collect_info : "sm_info"
}

module.exports.Initialize = function(){
}

module.exports.check_login = function(user_id, user_pass, func){
	var query = 'SELECT * FROM '+db_table.user+' where user_id = '+mysql.escape(user_id)+'AND password = '+mysql.escape(user_pass);
	connection.query(query,function(err, rows){
		func(rows);
//		DB_OUT(rows);
	})
}

module.exports.check_session_id = function(user_id, func){
	connection.query('SELECT id FROM '+db_table.user+' where user_id = '+mysql.escape(user_id),function(err, rows){
		if(rows.length > 0){
			func( rows[0].id );
		}else{
			func( false );
		}
	})
}

module.exports.check_session_passwd = function(user_id, func){
	connection.query('SELECT password FROM '+db_table.user+' where user_id = '+mysql.escape(user_id),function(err, rows){
		if(rows.length > 0){
			func( rows[0].password );
		}else{
			func( false );
		}
	})
}
