var game = new Game(640,480); // create a new instance of the game

var player;
var ball;

game.init = function() {
	player = new Pad(game.width/2-30,game.height-40,"red");
  ball = new Ball(game.width/2-10,game.height/2-10);
	game.currentScene.add(player);
  game.currentScene.add(ball);
	
}
game.render = function(){
	game.renderer.clearScreen("#b7ceed");
}
game.update = function(){
	if(game.input.check(Keys.D) || game.input.check(Keys.RIGHT))
		player.x++;
  if(game.input.check(Keys.A) || game.input.check(Keys.LEFT))
    player.x--;

  if(player.rect.collides(ball.rect)){
    if(ball.y <= player.y+10){
      ball.y = player.y-20;
      if(ball.y <= player.y+10){
        if(ball.x > player.x+30) if(ball.vx < 0) ball.vx *= -1;
        if(ball.x < player.x+30) if(ball.vx > 0) ball.vx *= -1;
        ball.vy *= -1;
      }
    }
  }

}
game.reset = function() {

}


/*
  PAD
*/

Pad = function(x,y,color){
	Entity.call(this,x,y,"Pad");
	this.color = color;
  this.rect = new Rectangle(this.x,this.y,60,20);
}

Pad.prototype = Object.create(Entity.prototype);
Pad.prototype.constructor = Pad;

Pad.prototype.render = function() {
	game.renderer.drawRect(this.x,this.y,60,20,this.color);
}

Pad.prototype.update = function(){
  if(this.x>game.width-60)
    this.x = game.width-60;
  if(this.x<0)
    this.x = 0;
  this.rect.setPosition(this.x,this.y);
}


/*
  BALL
*/

Ball = function(x,y){
  Entity.call(this,x,y,"Ball");
  this.vx = 0.6;
  this.vy = 0.6;
  this.rect = new Rectangle(this.x,this.y,20,20);
}

Ball.prototype = Object.create(Entity.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.render = function() {
  game.renderer.drawRect(this.x,this.y,20,20,"white");
}
Ball.prototype.update = function(){
  this.x += this.vx;
  this.y += this.vy;

  if(this.x>game.width-20){
    this.x = game.width-20;
    this.vx *= -1;
  } 
  if(this.x<0){
    this.x = 0;
    this.vx *= -1;
  }

  if(this.y>game.height-20){
    this.x = game.width/2-10;
    this.y = game.height/2-10;
  } 
  if(this.y<0){
    this.y = 0;
    this.vy *= -1;
  }
  this.rect.setPosition(this.x,this.y);
}
