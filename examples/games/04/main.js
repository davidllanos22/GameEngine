var game = new Game(640,480);

var player1;

var player,
    tree,
    grass,
    f,
    xx,
    yy;


function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
 
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
 
    // Firefox supports PNG and JPEG. You could check img.src to
    // guess the original format, but be aware the using "image/jpg"
    // will re-encode the image.
    var dataURL = canvas.toDataURL("image/png");
 
    return dataURL/*.replace(/^data:image\/(png|jpg);base64,/, "")*/;
}
game.init = function(){
  game.graphics.clearColor = "#6fbc73";
  player = game.loader.loadImage("player.png");
  tree = game.loader.loadImage("tree.png");
  grass= game.loader.loadImage("grass.png");
  f= game.loader.loadImage("font2.png");
  game.gameScale = 2;
  game.showFps = true;
  game.fillScreen = true;

  player1 = new Player(-10, -10, true);
  
  game.currentScene.add(player1);

  for (var i = 0; i <10; i++) {
    game.currentScene.add(new Player(Math.randomTo(game.width)-100, Math.randomTo(game.height)-100, false));
  };
  for (var i = 0; i <100; i++) {
    game.currentScene.add(new Tree(Math.randomTo(game.width*2)-100, Math.randomTo(game.height*2)-100));
  };

  for (var i = 0; i <400; i++) {
    game.currentScene.add(new Grass(Math.randomTo(game.width*2)-100, Math.randomTo(game.height*2)-100));
  };

  game.currentScene.add(new Tree(30, 20));

  xx = 22 + player1.position.x - (game.width / 2) / game.gameScale;
  yy = 22 + player1.position.y - (game.height / 2) / game.gameScale;
  
  game.currentCamera.setPosition(xx, yy, false);

}

game.update = function(){
  if(game.input.check(Keys.SPACE)){
    game.currentCamera.shake(400,1);
  } 
}
game.render = function(){
  game.graphics.print("David",player1.position.x,player1.position.y-20,20,"red");
}
game.currentScene.update = function(){
  xx = 22 + player1.position.x - (game.width / 2) / game.gameScale;
  yy = 22 + player1.position.y - (game.height / 2) / game.gameScale;

  game.currentCamera.setPosition(xx, yy, true);
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
  game.graphics.imageSection(player,this.position.x+2,this.position.y+10,2,0,64,90);
  game.graphics.imageSection(player,this.position.x,this.position.y,this.direction,0,64,90);
  //game.graphics.rect(this.rect.position.x,this.rect.position.y,this.rect.size.x,this.rect.size.y,"red");

}

Player.prototype.update = function(){
  this.direction = 0;

  if(this.control ){
    
    var up = this.willCollide(0,-this.spd.y);
    var down = this.willCollide(0,this.spd.y);
    var left = this.willCollide(-this.spd.x,0);
    var right = this.willCollide(this.spd.x,0);

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
    var e = this.game.currentScene.childs[i];
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
  game.graphics.imageSection(tree,this.position.x,this.position.y-80,0,0,64,180);
  //game.graphics.rect(this.rect.position.x,this.rect.position.y,this.rect.size.x,this.rect.size.y,"red");

}
Grass = function(x,y) {
  Entity.call(this,x,y,"Player");
  this.i = Math.randomTo(2);
}

Grass.prototype = Object.create(Entity.prototype);
Grass.prototype.constructor = Grass;

Grass.prototype.render = function(){
  game.graphics.imageSection(grass,this.position.x,this.position.y+64,this.i,0,32,32);
}