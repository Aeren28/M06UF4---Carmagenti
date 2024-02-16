let player_num = 0;

let player1;
let player2;
let player3;

let bullet;
let enemyBullet;
let canShoot = true;

const bullet_speed = 3;

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
	else if(data.bx != undefined){
		if(enemyBullet == undefined){

			enemyBullet = global_game.add.image(data.bx, data.by, "bullet");
			enemyBullet.setScale(0.01);
			enemyBullet.rotation = data.br;
		}

		enemyBullet.y -= bullet_speed * Math.cos(enemyBullet.rotation);
		enemyBullet.x += bullet_speed * Math.sin(enemyBullet.rotation);

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

let player1_angle = -1.5;
let player2_angle = -1.5;
let player3_angle = -1.5;

let car_move;
let bullet_shoot;

function preload ()
{
	this.load.image('car1', 'assets/PNG/Cars/car_black_small_1.png');
	this.load.image('car2', 'assets/PNG/Cars/car_blue_small_1.png');
	this.load.image('car3', 'assets/PNG/Cars/car_red_small_1.png');

	this.load.image('track', 'assets/PNG/Track/track.png');

	this.load.image('bullet', 'assets/PNG/Bullet/bullet.png');

}

function create ()
{
	track = this.add.image(400, 300, 'track').setDisplaySize(800,600);

	player1 = this.add.image(272, 508, 'car1');
	player2 = this.add.image(272, 554, 'car2');
	player3 = this.add.image(272, 544, 'car3');

	player1.setScale(0.5);
	player2.setScale(0.5);
	player3.setScale(0.5);

	car_move = this.input.keyboard.createCursorKeys();
	bullet_shoot = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

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

		if (bullet_shoot.isDown && canShoot) {
            bullet = this.add.image(
                player1.x + (2 * player1.width / 3)* Math.sin(player1_angle * Math.PI / 180),
                player1.y - (2 * player1.width / 3) * Math.cos(player1_angle * Math.PI / 180),
                "bullet"
            );
            bullet.setScale(0.01);
            bullet.rotation = player1_angle * Math.PI / 180;
            canShoot = false;
        }

		player1.rotation = player1_angle*Math.PI/180;

 		 let player_data = {
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

		if (bullet_shoot.isDown && canShoot) {
            bullet = this.add.image(
                player2.x + (2 * player2.width / 3)* Math.sin(player2_angle * Math.PI / 180),
                player2.y - (2 * player2.width / 3) * Math.cos(player2_angle * Math.PI / 180),
                "bullet"
            );
            bullet.setScale(0.01);
            bullet.rotation = player2_angle * Math.PI / 180;
            canShoot = false;
        }

		player2.rotation = player2_angle*Math.PI/180;

 		 let player_data = {
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

		if (bullet_shoot.isDown && canShoot) {
            bullet = this.add.image(
                player3.x + (2 * player3.width / 3)* Math.sin(player3_angle * Math.PI / 180),
                player3.y - (2 * player3.width / 3) * Math.cos(player3_angle * Math.PI / 180),
                "bullet"
            );

            bullet.setScale(0.01);
            bullet.rotation = player3_angle * Math.PI / 180;
            canShoot = false;
        }

		player3.rotation = player3_angle*Math.PI/180;

 		 let player_data = {
			n: player_num,
			x: player3.x,
			y: player3.y,
			r: player3.rotation
  		};

 		socket.send(JSON.stringify(player_data));

	}

	if (bullet == undefined || canShoot) {
        return;
    }

    bullet.y -= bullet_speed * Math.cos(bullet.rotation);
    bullet.x += bullet_speed * Math.sin(bullet.rotation);

    let bullet_data = {
        bx: bullet.x,
        by: bullet.y,
        br: bullet.rotation
    }

    socket.send(JSON.stringify(bullet_data));

}

