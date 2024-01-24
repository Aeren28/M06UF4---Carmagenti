let player_num = 0;

let player1;
let player2;
let player3;

const socket = new WebSocket("ws://10.40.1.101:8080");

socket.addEventListener("open", function(event){
});

socket.addEventListener("message", function(event){
	console.log("Server: ", event.data);

	let data = JSON.parse(event.data);

	if(data.player_num != undefined){
		player_num = data.player_num;
		console.log("Player num: ", player_num);
	}
	if(data.x != undefined){
		if(player_num == 2){
			if (data.n == 1) {
				player1.x = data.x,
				player1.y = data.y,
				player1.rotation = data.r
			}
			else if (data.n == 3) {
				player3.x = data.x,
				player3.y = data.y,
				player3.rotation = data.r
			}
		}
		else if(player_num == 1){
			if (data.n == 2) {
				player2.x = data.x,
				player2.y = data.y,
				player2.rotation = data.r
			}
			
			else if (data.n == 3) {
				player3.x = data.x,
				player3.y = data.y,
				player3.rotation = data.r
			}
		}
		else if(player_num == 3){
			if (data.n == 1) {
				player1.x = data.x,
				player1.y = data.y,
				player1.rotation = data.r
			}
			else if (data.n == 2) {
				player2.x = data.x,
				player2.y = data.y,
				player2.rotation = data.r
			}
		}
	}

});

const config = {
type: Phaser.AUTO,
width: 800,
height: 600,
scene:{
	preload: preload,
	create: create,
	update: update
  }
}

const game = new Phaser.Game(config);

const car_speed = 2;
const car_rotation = 2;

let player1_angle = 0;
let player2_angle = 0;
let player3_angle = 0;

let car_move;

function preload ()
{
	this.load.image('car1', 'assets/PNG/Cars/car_black_small_1.png');
	this.load.image('car2', 'assets/PNG/Cars/car_blue_small_1.png');
	this.load.image('car3', 'assets/PNG/Cars/car_red_small_1.png');

}

function create ()
{
	player1 = this.add.image(400, 555, 'car1');
	player2 = this.add.image(500, 555, 'car2');
	player3 = this.add.image(300, 555, 'car3');

	car_move = this.input.keyboard.createCursorKeys();

}

function update ()
{
	if(player_num == 0)
		return;

	if(player_num == 1){
		if( car_move.up.isDown){
			player1.y -= car_speed*Math.cos(player1_angle*Math.PI/180);
			player1.x += car_speed*Math.sin(player1_angle*Math.PI/180);
		}
	
		if( car_move.down.isDown){
			player1.y += car_speed*Math.cos(player1_angle*Math.PI/180);
			player1.x -= car_speed*Math.sin(player1_angle*Math.PI/180);
		}
	
		if(car_move.left.isDown){
			player1_angle -= car_rotation;
		}
	
		if(car_move.right.isDown){
			player1_angle += car_rotation;
		}

		player1.rotation = player1_angle*Math.PI/180;

 		 var player_data = {
			n: player_num,
			x: player1.x,
			y: player1.y,
			r: player1.rotation
  		};

 		socket.send(JSON.stringify(player_data));

	}
	else if(player_num == 2){
		if( car_move.up.isDown){
			player2.y -= car_speed*Math.cos(player2_angle*Math.PI/180);
			player2.x += car_speed*Math.sin(player2_angle*Math.PI/180);
		}
	
		if( car_move.down.isDown){
			player2.y += car_speed*Math.cos(player2_angle*Math.PI/180);
			player2.x -= car_speed*Math.sin(player2_angle*Math.PI/180);
		}
	
		if(car_move.left.isDown){
			player2_angle -= car_rotation;
		}
	
		if(car_move.right.isDown){
			player2_angle += car_rotation;
		}

		player2.rotation = player2_angle*Math.PI/180;

 		 var player_data = {
			n: player_num,
			x: player2.x,
			y: player2.y,
			r: player2.rotation
  		};

 		socket.send(JSON.stringify(player_data));

	}
	else if(player_num == 3){
		if( car_move.up.isDown){
			player3.y -= car_speed*Math.cos(player3_angle*Math.PI/180);
			player3.x += car_speed*Math.sin(player3_angle*Math.PI/180);
		}
	
		if( car_move.down.isDown){
			player3.y += car_speed*Math.cos(player3_angle*Math.PI/180);
			player3.x -= car_speed*Math.sin(player3_angle*Math.PI/180);
		}
	
		if(car_move.left.isDown){
			player3_angle -= car_rotation;
		}
	
		if(car_move.right.isDown){
			player3_angle += car_rotation;
		}

		player3.rotation = player3_angle*Math.PI/180;

 		 var player_data = {
			n: player_num,
			x: player3.x,
			y: player3.y,
			r: player3.rotation
  		};

 		socket.send(JSON.stringify(player_data));

	}

}

