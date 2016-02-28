/* global createjs */

exports.init = function (preload, stage, width, height) {

  var dollars = 0;
  var lives = 3;
  var timeNewItem = 0;
  var imgs = ['holyBible', 'dollarBills'];

  UI();

  createjs.Ticker.addEventListener('tick', function () {

    if (timeNewItem == 50) {
      var item = randomItem(imgs);
      addingItem(item);
      timeNewItem = 0;
    }

    for (var j = 0; j < stage.children.length; j++) {
      var currentItem = stage.children[j];
      if (currentItem.name === imgs[0] || currentItem.name === imgs[1]) {
        collectItem(currentItem);
        moveItem(currentItem);
      }else if (currentItem.name === 'bullet') {
        shootItem(currentItem, stage.children);
      }
    }

    timeNewItem++;
    stage.update();
  });

  function UI() {

    var dollarsText = new createjs.Text(dollars + "$" , "20px Arial", "#FFF");
    var livesText = new createjs.Text("lives " + lives, "20px Arial", "#FFF");

    dollarsText.x = width - 100;
    dollarsText.y = height - 100;
    dollarsText.name = 'dollars';

    livesText.x = width - 100;
    livesText.y = height - 125;
    livesText.name = 'lives';

    stage.addChild(dollarsText, livesText);
  }

  function randomItem(items) {

    if (!items) {return;}

    var randomItem = Math.floor(Math.random() * (100 - 0) + 0);

    if (randomItem <= 30) {
      return items[1];
    }else {
      return items[0];
    }
  }

  function moveItem(item) {
    var randomSpeed = Math.floor(Math.random() * (5 - 1) + 1);

    if (item.y > height) {
      stage.removeChild(item);
      console.log('true');
      return;
    }

    return item.y += randomSpeed;
  }

  function collectItem(item) {
    var ICONBORDER = 75;

    if (item.name !== 'dollarBills' && item.name !== 'holyBible') { return; }

    var trump = stage.getChildByName('trump');

    if (item.x > trump.x - ICONBORDER &&
        item.x < trump.x + ICONBORDER &&
        item.y > trump.y - ICONBORDER &&
        item.y < trump.y + ICONBORDER) {

      if (item.name === 'holyBible') {

        stage.removeChild(item);
        stage.update();
        GameOver();
        item.image = new createjs.Bitmap(preload.getResult('dollarTrump'));

      }else if(item.name === 'dollarBills') {
        updateDollars();
      }

      stage.removeChild(item);
    }
  }

  function updateDollars() {
    dollars += 100;

    var newtext = new createjs.Text(dollars + "$" , "20px Arial", "#FFF");
    newtext.x = width - 100;
    newtext.y = height - 100;
    newtext.name = 'dollars';

    var oldText = stage.getChildByName('dollars');
    stage.removeChild(oldText);
    stage.addChild(newtext);
  }

  function GameOver() {
    lives--;

    if (lives === 0) {
      lives = 3;
      alert('Game Over');
    }

    var newtext = new createjs.Text("lives " + lives, "20px Arial", "#FFF");
    newtext.x = width - 100;
    newtext.y = height - 125;
    newtext.name = 'lives';

    var oldText = stage.getChildByName('lives');
    stage.removeChild(oldText);
    stage.addChild(newtext);
  }

  function shootItem(bullet, items) {
    var ICONBORDER = 50;

    for (var i = 0; i < items.length; i++) {
      if (items[i].name === 'holyBible') {
        if (bullet.x > items[i].x - ICONBORDER &&
          bullet.x < items[i].x + ICONBORDER &&
          bullet.y > items[i].y - ICONBORDER &&
          bullet.y < items[i].y + ICONBORDER) {

          stage.removeChild(items[i], bullet);
        }
      }
    }
  }

  function addingItem(item) {

    var ICONBORDER = 100;
    var newItem = new Image();
    newItem = new createjs.Bitmap(preload.getResult(item));
    newItem.name = item;
    var newItemY, newItemX;
    var lastItem = stage.children[stage.children.length - 1];

    newItemX = Math.floor(Math.random() * ((width - ICONBORDER) - ICONBORDER) + ICONBORDER);
    newItemY = -ICONBORDER;

    if (stage.children.length > 0) {
      do {
        newItemX = Math.floor(Math.random() * ((width - ICONBORDER) - ICONBORDER) + ICONBORDER);
      }while (newItemX >= lastItem.x - ICONBORDER && newItemX <= lastItem.x + ICONBORDER);
    }

    newItem.name = item;
    newItem.x = newItemX;
    newItem.y = newItemY;

    stage.addChild(newItem);
  }
};
