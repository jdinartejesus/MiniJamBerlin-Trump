exports.init = function(stage, preload, width, height) {

	var TRUMP_WIDTH = 120;
	var MAX_ACCEL = 10;
	var ACCELERATION_PER_FRAME = 1;
	var BULLET_SPEED = 10;
	var FIRE_DELAY = 15;

	var accel = 0;

	function addImage(id, x, y) {
		var image = preload.getResult(id);
		var bitmap = new createjs.Bitmap(image);
		bitmap.x = x;
		bitmap.y = y;
		stage.addChild(bitmap);
		return bitmap;
	}

	var bullets = [];

	var bg = addImage('bg',0,0);
	var trump = addImage('trump', width/2, height-140);

	var moveLeft = false;
	var moveRight = false;
	var firing = false;

	var currentFireDelay = 0;
	function fireTick() {
		if (currentFireDelay > 0) {
			return;
		}
		currentFireDelay = FIRE_DELAY;
		var bullet = addImage('bullet', trump.x+75, trump.y-15);
		bullets.push(bullet);
	}

	createjs.Ticker.addEventListener("tick", handleTick);
	function handleTick(event) {
	     if (moveLeft && accel > -MAX_ACCEL) {
	     	if (accel > 0) {
	     		accel -= 4*ACCELERATION_PER_FRAME ; 
	     	} else {
	     		accel -= ACCELERATION_PER_FRAME ; 
	     	}
	     }
	     if (moveRight && accel < MAX_ACCEL) {
	     	if (accel < 0) {
	     		accel += 4*ACCELERATION_PER_FRAME ; 
	     	} else {
	     		accel += ACCELERATION_PER_FRAME ; 
	     	}
	     }
	     if (!moveRight && !moveLeft) {
	     	if (accel > 0) {
	     		accel = accel - ACCELERATION_PER_FRAME ; 
	     	} else {
	     		accel = accel + ACCELERATION_PER_FRAME ;  
	     	}
	     	if (almostEqual(accel,0)) {
	     		accel = 0;
	     	}
	     }

	     moveTrump();

	     if (firing) {
	     	fireTick();
	     }

	     // Move Bullets
	     bullets.forEach(function(bullet) {
	     	bullet.y -= BULLET_SPEED;
	     });

	     stage.update();
	 }

	 function moveTrump() {
	 	trump.x += accel;
	 	if (trump.x > width - TRUMP_WIDTH) {
	 		trump.x = width - TRUMP_WIDTH;     	
	 	}
	 	if (trump.x < 0) {
	 		trump.x = 0;     	
	 	}
	 }

	 window.onkeydown = function(event) {
	 	keyHandler(event.keyCode, true);
	 };

	 window.onkeyup = function(event) {
	 	keyHandler(event.keyCode, false);
	 };

	 window.onmousedown = function(event) {
	 	if (event.button == 0) {
	 		firing = true;
	 	} 
	 	if (event.button == 2) {
	 		altFiring = true;
	 	}
	 };
	 window.onmouseup = function(event) {
	 	if (event.button == 0) {
	 		firing = false;
	 	}
	 	if (event.button == 2) {
	 		altFiring = true;
	 	}
	 };

	 function keyHandler(keyCode, down) {
	 	switch (event.keyCode) {
			case 37: // left
			moveLeft = !!down;
			break;
			case 39:  // right
			moveRight = !!down;
			break;
		};
	}

	function almostEqual(a,b) {
		return Math.abs(a-b) < ACCELERATION_PER_FRAME + 0.1;
	}


}