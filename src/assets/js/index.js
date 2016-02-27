window.onload = function () {

  // Global Values
  var WIDTH = 768;
  var HEIGHT = 1024;

  // Components
  var fallingObjects = require('./fallingObjects.js');

  // Canvas Settings
  var canvas = document.getElementById('donaldtrump');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  canvas.getContext('2d');

  var stage = new createjs.Stage(canvas);

  // Loading Images
  var preload = new createjs.LoadQueue();
  preload.loadManifest([
  {
    id: 'holyBible', src: '../images/holyBible.png',
  },
  {
    id: 'dollarBills', src: '../images/dollarBills.png',
  }

  // Add images here and ID
  ]);
  preload.on('complete', init, this);

  function init() {

    fallingObjects('holyBible', stage);
    stage.update();
  }
};
