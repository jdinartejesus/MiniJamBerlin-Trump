/* global createjs, GAMEFPS, preload, stage */
exports.fallingObjects = function (items, container) {
  if (!items || !container) { return; }

  var HEIGHT = 600;

  var objectsContainer = new createjs.Container();
  var timeNewItem = 0;

  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener('tick', function (event) {

    if (timeNewItem == 50) {
      var item = randomItem(items);
      addingItem(item, objectsContainer);
      timeNewItem = 0;
    }

    for (var j = 0; j < objectsContainer.children.length; j++) {
      moveItem(objectsContainer.children[j]);

      if (objectsContainer.children[j].y > HEIGHT) {
        objectsContainer.removeChildAt(j);
      }
    }

    timeNewItem++;
    container.update();
  });

  container.addChild(objectsContainer);
};

var randomItem = function (items) {

  if (!items) {return;}

  var randomItem = Math.floor(Math.random() * (100 - 0) + 0);

  if (randomItem <= 30) {
    return items[1];
  }else {
    return items[0];
  }
};

var moveItem = function (item) {
  var randomSpeed = Math.floor(Math.random() * (5 - 1) + 1);
  return item.y += randomSpeed;
};

var addingItem = function (item, container) {

  var WIDTH = 1000;
  var ICONBORDER = 16;
  var newItem = new Image();
  newItem = new createjs.Bitmap(item);
  var newItemY, newItemX;

  var lastItem = container.children[container.children.length - 1];

  newItemX = Math.floor(Math.random() * ((WIDTH - ICONBORDER) - ICONBORDER) + ICONBORDER);
  newItemY = 10;

  if (container.children.length > 0) {
    do {
      newItemX = Math.floor(Math.random() * ((WIDTH - ICONBORDER) - ICONBORDER) + ICONBORDER);
    }while (newItemX >= lastItem.x - ICONBORDER && newItemX <= lastItem.x + ICONBORDER);
  }

  newItem.x = newItemX;
  newItem.y = newItemY;

  container.addChild(newItem);
};
