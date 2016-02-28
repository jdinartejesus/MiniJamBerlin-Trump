/* global createjs */

exports.init = function (preload, stage, width, height) {

  var timeNewItem = 0;
  var imgs = ['holyBible', 'dollarBills'];

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
        item.image = new createjs.Bitmap(preload.getResult('dollarTrump'));
      }

      stage.removeChild(item);
    }
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
