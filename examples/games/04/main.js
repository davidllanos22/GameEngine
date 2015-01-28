var game = new Game(640,480);

var player1;

var player,
    tree,
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
    game.currentScene.add(new Tree(Math.randomTo(game.width*2)-100, Math.randomTo(game.height*2)-100, false));
  };

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
  game.graphics.print("Hola que ase!:D",-200,0,20);
}
game.currentScene.update = function(){
  xx = 22 + player1.position.x - (game.width / 2) / game.gameScale;
  yy = 22 + player1.position.y - (game.height / 2) / game.gameScale;

  game.currentCamera.setPosition(xx, yy, true);
}


Player = function(x,y,control) {
  Entity.call(this,x,y,"Player");
  this.control = control;
  this.rect = new Rectangle(x,y,16,16);
  this.spd = new Math.Vector2(0.4, 0.4);
  this.direction = 0;

}

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

Player.prototype.render = function(){
  game.graphics.imageSection(player,this.position.x+2,this.position.y+10,2,0,64,90);
  game.graphics.imageSection(player,this.position.x,this.position.y,this.direction,0,64,90);

}

Player.prototype.update = function(){
  if(this.control){
    this.direction = 0;
    if(game.input.check(Keys.LEFT) || game.input.check(Keys.A)) 
      this.position.subtractX(this.spd);
    else if(game.input.check(Keys.RIGHT) || game.input.check(Keys.D)) 
      this.position.addX(this.spd);
    if(game.input.check(Keys.UP) || game.input.check(Keys.W)){
      this.position.subtractY(this.spd);
      this.direction = 1;
    }
    else if(game.input.check(Keys.DOWN) || game.input.check(Keys.S)){
      this.position.addY(this.spd); 
      
    }
  }
  
  this.rect.position = this.position;
}

Tree = function(x,y,control) {
  Entity.call(this,x,y,"Player");
  this.rect = new Rectangle(x,y,64,180);
}

Tree.prototype = Object.create(Entity.prototype);
Tree.prototype.constructor = Tree;

Tree.prototype.render = function(){
  game.graphics.imageSection(tree,this.position.x,this.position.y-80,0,0,64,180);

}

Tree.prototype.update = function(){
  this.rect.position = this.position;
}