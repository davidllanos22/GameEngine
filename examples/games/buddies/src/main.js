var game = new Game(640, 480);

var player1;

var xx, yy;

var player = game.loader.loadImage("media/player.png");
var tree = game.loader.loadImage("media/tree.png");
var grass = game.loader.loadImage("media/grass.png");
var boxes = game.loader.loadImage("media/boxes.png");

game.init = function() {
  game.graphics.clearColor = "#6fbc73";
  
  game.gameScale = 1;
  game.fillScreen = false;
  //game.input.setCursorStyle("none");
  game.currentCamera.useLimit = true;
  game.currentCamera.limit = new Math.Vector2(game.width, game.height);
  player1 = new Player(200, 200, true);
  
  game.currentScene.add(player1);
  /*
  for (var i = 0; i <10; i++) {
    game.currentScene.add(new Player(Math.randomTo(game.width*3), Math.randomTo(game.height*3), false));
  };
  */
  for (var i = 0; i <20; i++) {
    game.currentScene.add(new Box(Math.randomTo(100), Math.randomTo(200)));
  };

  for (var i = 0; i <20; i++) {
    game.currentScene.add(new Grass(Math.randomTo(100)+300, Math.randomTo(200)));
  };
  
  xx = 22 + player1.position.x - (game.width / 2) / game.gameScale;
  yy = 22 + player1.position.y - (game.height / 2) / game.gameScale;
  
  game.currentCamera.setPosition(xx, yy, false);

}

game.update = function() {
  if (game.input.check(Keys.SPACE)) {
    //game.currentCamera.shake(400, 1);
  }
  xx = 22 + player1.position.x - (game.width / 2) / game.gameScale;
  yy = 22 + player1.position.y - (game.height / 2) / game.gameScale;

//game.currentCamera.setPosition(xx, yy, true);
 // console.log(player1.viewRect.position)
}
game.render = function() {
  game.graphics.print("David", player1.position.x, player1.position.y - 20, 20, "red");
}
