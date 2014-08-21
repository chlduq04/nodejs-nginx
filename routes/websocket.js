var io = require('socket.io').listen(3001);
var usernames = {};
var numUsers = 0;
var addedUser = false;
var motion_length = 0;
var motion = [];
var protocal = {
		"manager-seat" : function(data){
			console.log(data);
			this.broadcast.emit('manager-seat-res', data);
			motion[motion_length++] = { func : 'manager-seat-res', data : data }
		},
		"manager-add" : function(data){
			console.log(data);
			this.broadcast.emit('manager-add-res', data);
			motion[motion_length++] = { func : 'manager-add-res', data : data }
		},
		"manager-infoclick" : function(data){
			console.log(data);
			this.broadcast.emit('manager-infoclick-res', data);
			motion[motion_length++] = { func : 'manager-infoclick-res', data : data }
		},
		"manager-infodel" : function(data){
			console.log(data);
			this.broadcast.emit('manager-infodel-res', data);
			motion[motion_length++] = { func : 'manager-infodel-res', data : data }
		},
		"manager-infovalue" : function(data){
			console.log(data);
			this.broadcast.emit('manager-infovalue-res', data);
			motion[motion_length++] = { func : 'manager-infovalue-res', data : data }
		}
	
}

module.exports.Initialize = function () {
	io.sockets.on('connection', function (socket) {
		socket.on('handshake-response', function (data) {
			++numUsers;
			console.log(data);
		});
		
		for(var i=0, length = motion.length ; i < length ; i++ ){
			socket.emit(motion[i].func, motion[i].data);
		}

		for( var index in protocal ){
			socket.on(index,protocal[index]);
		}

		socket.on('disconnect', function(data){
			console.log("disconnect");
			if (addedUser) {
				delete usernames[socket.username];
				--numUsers;
				console.log(numUsers);
			}
			if(numUsers <= 0){
			}
		})

	});
}

module.exports.User = function( username ){



}