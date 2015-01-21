var game = new Game(640,480);

var sprites;
var anim;
var x=0,y=0,spd =0.5;

game.init = function(){
  game.renderer.clearColor = "grey";
  sprites = game.loader.loadImage("sprites.png");
  game.gameScale = 2;

  anim = new Animation(100,[[0,0],[1,0]]);
}

game.render = function(){

  //game.renderer.drawRect(0,0,50,50,"#ffff00");

  game.renderer.drawImageSection(sprites,20,20,0,0,16,16);
  anim.render(sprites,x,y,16,16);
  game.renderer.drawString(game.width+" "+(x-(game.width/game.scale)/2),0,0,20,"red");

}

game.update = function(){


  if(game.input.check(Keys.LEFT))x-=spd;
  if(game.input.check(Keys.RIGHT))x+=spd;
  if(game.input.check(Keys.UP))y-=spd;
  if(game.input.check(Keys.DOWN))y+=spd;

  
}

game.currentScene.update = function(){
  game.currentCamera.setPosition(x-(game.width/game.scale)/2,y-(game.height/game.scale)/2,true);
  //game.currentCamera.setRotation(game.currentCamera.angle+1);
}