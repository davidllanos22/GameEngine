var game = new Game(640,480);

var player1;
var player2;

var sprites,
    xx,
    yy;

game.init = function(){
  game.renderer.clearColor = "grey";
  sprites = game.loader.loadImage("sprites.png");
  game.gameScale = 3;

  

  player1 = new Player(-10, -10, true);
  player2 = new Player(0, 0, false);
  
  game.currentScene.add(player1);
  game.currentScene.add(player2);

  xx = 8 + player1.position.x - (game.width / 2) / game.gameScale;
  yy = 8 + player1.position.y - (game.height / 2) / game.gameScale;
  
  game.currentCamera.setPosition(xx, yy, false);

}

game.render = function(){
  game.renderer.drawRect( game.currentCamera.rect.position.x,game.currentCamera.rect.position.y,
                          game.currentCamera.rect.size.x,game.currentCamera.rect.size.y,"rgba(255,0,0,0.5)");
}

game.update = function(){
  console.log(player1.onScreen()+" "+player2.onScreen());
}

game.currentScene.update = function(){
  xx = 8 + player1.position.x - (game.width / 2) / game.gameScale;
  yy = 8 + player1.position.y - (game.height / 2) / game.gameScale;

  game.currentCamera.setPosition(xx, yy, true);
}


Player = function(x,y,control) {
  Entity.call(this,x,y,"Player");
  this.control = control;
  this.rect = new Rectangle(x,y,16,16);
  this.spd = new Math.Vector2(0.5, 0.5);

  this.anim = new Animation(100,[[0,0],[1,0]]);
}

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

Player.prototype.render = function(){
  this.anim.render(sprites,this.position.x,this.position.y,16,16);
}

Player.prototype.update = function(){
  if(this.control){
    if(game.input.check(Keys.LEFT) || game.input.check(Keys.A)) 
      this.position.subtractX(this.spd);
    else if(game.input.check(Keys.RIGHT) || game.input.check(Keys.D)) 
      this.position.addX(this.spd);
    if(game.input.check(Keys.UP) || game.input.check(Keys.W)) 
      this.position.subtractY(this.spd);
    else if(game.input.check(Keys.DOWN) || game.input.check(Keys.S)) 
      this.position.addY(this.spd); 
  }
  
  this.rect.position = this.position;
}