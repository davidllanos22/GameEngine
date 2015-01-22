var game = new Game(640,480);

var pos = new Math.Vector2(-10,-10);
var pos2 = new Math.Vector2(0,0);
var spd = new Math.Vector2(0.5,0.5);

var sprites,
    anim,
    xx,
    yy;

game.init = function(){
  game.renderer.clearColor = "grey";
  sprites = game.loader.loadImage("sprites.png");
  game.gameScale = 3;

  xx = 8 + pos.x - (game.width / 2) / game.gameScale;
  yy = 8 + pos.y - (game.height / 2) / game.gameScale;

  game.currentCamera.setPosition(xx, yy, false);

  anim = new Animation(100,[[0,0],[1,0]]);
}

game.render = function(){
  game.renderer.drawImageSection(sprites,pos2.x,pos2.y,0,0,16,16);
  anim.render(sprites,pos.x,pos.y,16,16);
}

game.update = function(){
  if(game.input.check(Keys.LEFT) || game.input.check(Keys.A)) 
    pos.subtractX(spd);
  else if(game.input.check(Keys.RIGHT) || game.input.check(Keys.D)) 
    pos.addX(spd);
  if(game.input.check(Keys.UP) || game.input.check(Keys.W)) 
    pos.subtractY(spd);
  else if(game.input.check(Keys.DOWN) || game.input.check(Keys.S)) 
    pos.addY(spd);
}

game.currentScene.update = function(){
  xx = 8 + pos.x - (game.width / 2) / game.gameScale;
  yy = 8 + pos.y - (game.height / 2) / game.gameScale;

  game.currentCamera.setPosition(xx, yy, true);
}