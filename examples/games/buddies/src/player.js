Player = function(x, y, control) {
  Entity.call(this, x, y, "Player");
  this.control = control;
  this.rect = new Rectangle(x + 20, y + 80, 30, 40);
  this.viewRect = new Rectangle(x + 20, y + 80, 30, 30);
  this.spd = 1;
  this.direction = 0;
  this.vi = new Math.Vector2(0,0);
  this.item = null;
  this.boxTimer = new Timer(20,false,null,null,null);
}

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

Player.prototype.render = function() {
  game.graphics.imageSection(player, this.position.x, this.position.y, 0, 0, 63, 137, 63, 137);
  //game.graphics.rect(this.rect.position.x, this.rect.position.y, this.rect.size.x, this.rect.size.y, "red");
  game.graphics.rect(this.viewRect.position.x, this.viewRect.position.y, this.viewRect.size.x, this.viewRect.size.y, "green");
   if(this.item instanceof Box || this.item instanceof Grass){
    game.graphics.imageSection(boxes, this.position.x-5, this.position.y+60, this.item.type, 0, 70, 70, 70, 70);
   }
}

Player.prototype.update = function() {
  
  if (this.control) {
    
    // this should only be executed when a key is pressed and not everytick. wasting a lot of memory
    var up = this.willCollide(0, -this.spd);
    var down = this.willCollide(0, this.spd);
    var left = this.willCollide(-this.spd, 0);
    var right = this.willCollide(this.spd, 0);
    
    if (game.input.gamepad && game.input.gamepad.connected) {
      var xxx = parseFloat(game.input.gamepad.axes[0]);
      var yyy = parseFloat(game.input.gamepad.axes[1]);
      xxx = xxx.toFixed(1);
      yyy = yyy.toFixed(1);
      
      var vX = this.spd.x * (1.5 * xxx);
      var vY = this.spd.y * (1.5 * yyy);
      var col = this.willCollide(vX, vY);
      if (!col)
        this.position.add(new Math.Vector2(vX, vY));
    }
    
    
    
    
    if (game.input.check(Keys.LEFT) || game.input.check(Keys.A)) {
      this.direction = 2;
      if (!left)
        this.position.subtractX(this.spd);
    }
    if (game.input.check(Keys.UP) || game.input.check(Keys.W)) {
      this.direction = 1;
      if (!up)
        this.position.subtractY(this.spd);
    }
    if (game.input.check(Keys.DOWN) || game.input.check(Keys.S)) {
      this.direction = 3;
      if (!down)
        this.position.addY(this.spd);
    }
    if (game.input.check(Keys.RIGHT) || game.input.check(Keys.D)) {
      this.direction = 0;
      if (!right)
        this.position.addX(this.spd);
    }
  
    this.rect.position = this.position.copy().add(new Math.Vector2(20, 80));

    if(this.direction == 0)
      this.viewRect.position = this.rect.position.copy().add(new Math.Vector2(40,0));
    if(this.direction == 1)
      this.viewRect.position = this.rect.position.copy().add(new Math.Vector2(0,-40));
    if(this.direction == 2)
      this.viewRect.position = this.rect.position.copy().add(new Math.Vector2(-40,0));
    if(this.direction == 3)
      this.viewRect.position = this.rect.position.copy().add(new Math.Vector2(0,40));
  }

  var what = this.interact();
  if(what != null && game.input.pressed(Keys.SPACE)){
    if(!this.item)
      what.take(this);
  }

  if(game.input.pressed(Keys.SPACE) && what == null && this.item){
      this.item.release(this);  
  }

  if(this.item){
    this.item.position = this.position;
    this.spd = 0.5;
  }else this.spd = 1;

}
Player.prototype.interact = function(){
   for (var i = 0; i < game.currentScene.childs.length; i++) {
    var e = game.currentScene.childs[i];
    if (e != this.viewRect && e != this && e.rect != null) {
      if (this.viewRect.collides(e.rect)) {
        return e;
      }
    }
   }
   return null;
}
Player.prototype.willCollide = function(xx, yy) {
  for (var i = 0; i < game.currentScene.childs.length; i++) {
    var e = game.currentScene.childs[i];
    if (e != this && e.rect != null) {
      if (this.rect.collidesAt(e.rect,xx,yy)) {
        this.rect.position = this.position.copy().add(new Math.Vector2(20, 80));
        return true;
      }
    }
  }
  this.rect.position = this.position.copy().add(new Math.Vector2(20, 80));
  return false;
}