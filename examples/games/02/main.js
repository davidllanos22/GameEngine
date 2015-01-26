var game = new Game(640,480); // create a new instance of the game

var player;
var ball;

game.init = function() {
	player = new Pad(game.width/2-10, game.height-40, "#cc0000");
  ball = new Ball(game.width/2-10, game.height/2-10);
	game.currentScene.add(player);
  game.currentScene.add(ball);

  game.graphics.setClearColor("#999999");
}

game.update = function(){
	if(game.input.check(Keys.D) || game.input.check(Keys.RIGHT))
		player.position.x++;
  if(game.input.check(Keys.A) || game.input.check(Keys.LEFT))
    player.position.x--;

  if(player.rect.collides(ball.rect)){
    if(ball.position.y <= player.position.y+10){
      ball.position.y = player.position.y-20;
      if(ball.position.y <= player.position.y+10){
        if(ball.position.x > player.position.x+30) if(ball.vx < 0) ball.vx *= -1;
        if(ball.position.x < player.position.x+30) if(ball.vx > 0) ball.vx *= -1;
        ball.vy *= -1;
      }
    }
  }

}


/*
  PAD
*/

Pad = function(x, y, color){
	Entity.call(this, x, y, "Pad");
	this.color = color;
  this.rect = new Rectangle(x, y, 60, 20);
}

Pad.prototype = Object.create(Entity.prototype);
Pad.prototype.constructor = Pad;

Pad.prototype.render = function() {
	game.graphics.rect(this.position.x, this.position.y, 60, 20, this.color);
}

Pad.prototype.update = function(){
  if(this.position.x > game.width - 60)
    this.position.x = game.width - 60;
  if(this.position.x < 0)
    this.position.x = 0;
  this.rect.position = this.position;
}


/*
  BALL
*/

Ball = function(x, y){
  Entity.call(this, x, y, "Ball");
  this.vx = 0.6;
  this.vy = 0.6;
  this.rect = new Rectangle(x, y, 20, 20);
}

Ball.prototype = Object.create(Entity.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.render = function() {
  game.graphics.rect(this.position.x, this.position.y, 20, 20, "white");
}
Ball.prototype.update = function(){
  this.position.x += this.vx;
  this.position.y += this.vy;

  if(this.position.x > game.width - 20){
    this.position.x = game.width - 20;
    this.vx *= -1;
  } 
  if(this.position.x < 0){
    this.position.x = 0;
    this.vx *= -1;
  }

  if(this.position.y > game.height - 20){
    this.position.x = game.width / 2 - 10;
    this.position.y = game.height / 2 - 10;
  } 
  if(this.position.y < 0){
    this.position.y = 0;
    this.vy *= -1;
  }
  this.rect.position = this.position;
}
