var game = new Game(640,480);

var player1;

var xx,
    yy;

var player = game.loader.loadImage("player.png");
var tree = game.loader.loadImage("tree.png");
var grass= game.loader.loadImage("grass.png");
var f = game.loader.loadImage("font2.png");


game.init = function(){
  game.graphics.clearColor = "#6fbc73";
 
  game.gameScale = 2;
  game.showFps = true;
  game.fillScreen = true;
  game.currentCamera.useLimit = true;
  game.currentCamera.limit = new Math.Vector2(game.width,game.height);
  player1 = new Player(200, 200, true);
  
  game.currentScene.add(player1);

  for (var i = 0; i <10; i++) {
    game.currentScene.add(new Player(Math.randomTo(game.width*3), Math.randomTo(game.height*3), false));
  };
  for (var i = 0; i <100; i++) {
    game.currentScene.add(new Tree(Math.randomTo(game.width*3), Math.randomTo(game.height*3)));
  };

  for (var i = 0; i <400; i++) {
    game.currentScene.add(new Grass(Math.randomTo(game.width*3), Math.randomTo(game.height*3)));
  };

  xx = 22 + player1.position.x - (game.width / 2) / game.gameScale;
  yy = 22 + player1.position.y - (game.height / 2) / game.gameScale;
  
  game.currentCamera.setPosition(xx, yy, false);

}

game.update = function(){
  if(game.input.check(Keys.SPACE)){
    game.currentCamera.shake(400,1);
  } 
  xx = 22 + player1.position.x - (game.width / 2) / game.gameScale;
  yy = 22 + player1.position.y - (game.height / 2) / game.gameScale;

  game.currentCamera.setPosition(xx, yy, true);
}
game.render = function(){
  game.graphics.print("David",player1.position.x,player1.position.y-20,20,"red");
  game.graphics.print("David",Math.floor(game.currentCamera.position.x),Math.floor(game.currentCamera.position.y)+20,20,"red");
}

Player = function(x,y,control) {
  Entity.call(this,x,y,"Player");
  this.control = control;
  this.rect = new Rectangle(x+20,y+20,30,20);
  this.spd = new Math.Vector2(0.4, 0.4);
  this.direction = 0;
}

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

Player.prototype.render = function(){
  game.graphics.imageSection(player,this.position.x+2,this.position.y+10,2,0,64,90,64,90);
  game.graphics.imageSection(player,this.position.x,this.position.y,this.direction,0,64,90,64,90);
  //game.graphics.rect(this.rect.position.x,this.rect.position.y,this.rect.size.x,this.rect.size.y,"red");

}

Player.prototype.update = function(){
  this.direction = 0;

  if(this.control ){
    
    var up = this.willCollide(0,-this.spd.y);
    var down = this.willCollide(0,this.spd.y);
    var left = this.willCollide(-this.spd.x,0);
    var right = this.willCollide(this.spd.x,0);

    if(game.input.gamepad && game.input.gamepad.connected){
      var xxx = parseFloat(game.input.gamepad.axes[0]);
      var yyy = parseFloat(game.input.gamepad.axes[1]);
      xxx = xxx.toFixed(1);
      yyy = yyy.toFixed(1);

      var vX = this.spd.x*(1.5*xxx);
      var vY = this.spd.y*(1.5*yyy);
      var col = this.willCollide(vX, vY);
      if(!col)this.position.add(new Math.Vector2(vX,vY));
    }
    



    if(game.input.check(Keys.LEFT) || game.input.check(Keys.A)){
      if(!left)this.position.subtractX(this.spd);
    }
    if(game.input.check(Keys.UP) || game.input.check(Keys.W)){
      if(!up)this.position.subtractY(this.spd);
      this.direction = 1;
    }
    if(game.input.check(Keys.DOWN) || game.input.check(Keys.S)){
      if(!down)this.position.addY(this.spd); 
      
    }
    if(game.input.check(Keys.RIGHT) || game.input.check(Keys.D)){
      if(!right)this.position.addX(this.spd);
    }
    
  }
  
  this.rect.position = this.position.copy().add(new Math.Vector2(15,60));
}

Player.prototype.willCollide = function(xx,yy){
  var rect = this.rect;

  rect.position.x += xx;
  rect.position.y += yy;
  for(var i = 0; i<game.currentScene.childs.length;i++){
    var e = game.currentScene.childs[i];
    if(e != this && e.rect!=null){
      if(rect.collides(e.rect)){
        this.rect.position = this.position.copy().add(new Math.Vector2(15,60));
        return true;
      }
    }
  }
  this.rect.position = this.position.copy().add(new Math.Vector2(15,60));
  return false;
}

Tree = function(x,y) {
  Entity.call(this,x,y,"Player");
  this.rect = new Rectangle(x+14,y+60,30,20);
}

Tree.prototype = Object.create(Entity.prototype);
Tree.prototype.constructor = Tree;

Tree.prototype.render = function(){
  game.graphics.imageSection(tree,this.position.x,this.position.y-80,0,0,64,180,64,180);
  //game.graphics.rect(this.rect.position.x,this.rect.position.y,this.rect.size.x,this.rect.size.y,"red");

}
Grass = function(x,y) {
  Entity.call(this,x,y,"Player");
  this.i = Math.randomTo(2);
}

Grass.prototype = Object.create(Entity.prototype);
Grass.prototype.constructor = Grass;

Grass.prototype.render = function(){
  game.graphics.imageSection(grass,this.position.x,this.position.y+64,this.i,0,32,32,32,32);
}