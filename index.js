let static = require('node-static');

let http = require('http'); 
let ws = require('ws');

let file = new static.Server('./public');
 
let http_server = http.createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
});

let ws_server = new  ws.WebSocket.Server({ server: http_server });

http_server.listen(8080);

let p1_conn;
let p2_conn;

ws_server.on('connection', function (conn){
	console.log('EVENT: Connection');
	
	if(p1_conn == undefined){
		p1_conn = conn;

		p1_conn.send('{"player_num":1}');

		p1_conn.on('message', function(data){
			if(p2_conn == undefined)
				return;
			p2_conn.send(data.toString());

			let parsed_data = JSON.parse(data);
			if (parsed_data.collided != undefined && parsed_data.collided === true) {
				console.log(parsed_data.player + "has died");
				p1_conn.send('{"Game Over": ' + parsed_data.player + '}');
				p2_conn.send('{"Game Over": ' + parsed_data.player + '}');
			}
     	});
	}

	else if(p2_conn == undefined){
		p2_conn = conn;

		p2_conn.send('{"player_num":2}');

		p2_conn.on('message', function(data){
			if(p1_conn == undefined)
				return;
			p1_conn.send(data.toString());

			let parsed_data = JSON.parse(data);
			if (parsed_data.collided != undefined && parsed_data.collided === true) {
				console.log(parsed_data.player + "has died");
				p1_conn.send('{"Game Over": ' + parsed_data.player + '}');
				p2_conn.send('{"Game Over": ' + parsed_data.player + '}');
			}
		});
	}
});
