/* global createjs, GAMEFPS, preload, stage */
exports.fallingObejcts = function (items, container) {
  if (!items || !container) { return; }

  var objectsContainer = new createjs.Container();
  var timeNewItem = 0;

  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener('tick', function (event) {

    timeNewItem++;

    if (timeNewItem == 20) {
      addingItem(items, objectsContainer);
      timeNewItem = 0;
    }

    for (var j = 0; j < objectsContainer.children.length; j++) {
      moveItem(objectsContainer.children[j]);

      if (objectsContainer.children[j].y > HEIGHT) {
        objectsContainer.removeChildAt(j);
      }
    }
  });

  stage.addChild(objectsContainer);
};

var moveItem = function (item) {
  var randomSpeed = Math.floor(Math.random() * (5 - 1) + 1);
  return item.y += randomSpeed;
};

var addingItem = function (item, container) {

  var ICONBORDER = 16;
  var newItem = new Image();
  newItem = new createjs.Bitmap(preload.getResult(item));
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
  stage.update();
};
