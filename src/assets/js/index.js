window.onload = function () {

  // Global Values
  var WIDTH = 1000;
  var HEIGHT = 600;

  // Components
  var fallingObjects = require('./fallingObjects.js');
  var movingTrump = require('./movingTrump.js');

  // Canvas Settings
  var canvas = document.getElementById('donaldtrump');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  var ctx = canvas.getContext('2d');

  var stage = new createjs.Stage(canvas);

  // Loading Images
  var preload = new createjs.LoadQueue();
	preload.loadManifest([{
			id: 'holyBible',
			src: '../images/holyBible.png',
		}, {
			id: 'dollarBills',
			src: '../images/dollarBills.png',
		}, {
			id: 'example',
			src: '../images/example.png'
		}, {
			id: 'bg',
			src: '../images/space.png',
		}, {
			id: 'heaven',
			src: '../images/heaven.png',
		}, {
			id: 'hell',
			src: '../images/hell.png',
		}, {
			id: 'trump',
			src: '../images/trump.png'
		}, {
			id: 'bullet',
			src: '../images/bullet.png'
		}
	]);
  preload.on('complete', init, this);

  function init() {
  	createjs.Ticker.setFPS(60);
  	movingTrump.init(stage, preload, WIDTH, HEIGHT);
    fallingObjects('holyBible', stage);
    stage.update();
  }
};
