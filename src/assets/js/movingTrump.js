/* global createjs */

exports.init = function (stage, preload, width, height) {

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
    bitmap.name = id;
    stage.addChild(bitmap);
    return bitmap;
  }

  var bg = addImage('bg', 0, 0);
  var trump = addImage('trump', width / 2, height - 140);

  var inputs = {
    moveLeft: false,
    moveRight: false,
    firing: false
  };

  var currentFireDelay = 0;
  var bullets = [];

  function fireTick() {
    if (currentFireDelay > 0) {
      currentFireDelay--;
      return;
    }

    currentFireDelay = FIRE_DELAY;
    var bullet = addImage('bullet', trump.x + 75, trump.y - 15);
    bullets.push(bullet);
  }

  function updateBullets() {
    bullets.forEach(function (bullet) {
      if(bullet.y < 0){
        stage.removeChild(bullet);
        return;
      }

      bullet.y -= BULLET_SPEED;
    });
  }

  createjs.Ticker.addEventListener('tick', handleTick);

  function handleTick() {
    if (inputs.moveLeft && accel > -MAX_ACCEL) {
      if (accel > 0) {
        accel -= 4 * ACCELERATION_PER_FRAME;
      } else {
        accel -= ACCELERATION_PER_FRAME;
      }
    }

    if (inputs.moveRight && accel < MAX_ACCEL) {
      if (accel < 0) {
        accel += 4 * ACCELERATION_PER_FRAME;
      } else {
        accel += ACCELERATION_PER_FRAME;
      }
    }

    if (!inputs.moveRight && !inputs.moveLeft) {
      if (accel > 0) {
        accel = accel - ACCELERATION_PER_FRAME;
      } else {
        accel = accel + ACCELERATION_PER_FRAME;
      }

      if (almostEqual(accel, 0)) {
        accel = 0;
      }
    }

    if (inputs.firing) {
      fireTick();
    }

    moveTrump();
    updateBullets();

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

  window.onkeydown = function (event) {
    keyHandler(event.keyCode, true);
  };

  window.onkeyup = function (event) {
    keyHandler(event.keyCode, false);
  };

  function keyHandler(keyCode, keyDown) {
    if (event.keyCode == 37) { // left
      inputs.moveLeft = !!keyDown;
    } else if (event.keyCode == 39) {
      inputs.moveRight = !!keyDown;
    } else if (event.keyCode == 32) {
      inputs.firing = !!keyDown;
    }
  }

  function almostEqual(a, b) {
    return Math.abs(a - b) < ACCELERATION_PER_FRAME + 0.1;
  }
};
