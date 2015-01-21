var game = new Game(640,480);

var sprites;
var anim;

game.init = function(){
  sprites = game.loader.loadImage("sprites.png");
  game.gameScale = 2;

  anim = new Animation(100,[[0,0],[1,0]]);
}

game.render = function(){
  game.renderer.clearScreen("grey");
  game.renderer.drawRect(0,0,50,50,"#ffff00");

  game.renderer.drawImageSection(sprites,20,20,0,0,16,16);
  anim.render(sprites,0,0,16,16);

}