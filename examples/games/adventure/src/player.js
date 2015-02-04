Player = function(x, y, control) {
  Entity.call(this, x, y, "Player");
  this.control = control;
  this.rect = new Rectangle(x + 20, y + 80, 30, 40);
  this.spd = new Math.Vector2(1, 1);
  this.direction = 0;
}

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

Player.prototype.render = function() {
  game.graphics.imageSection(player, this.position.x, this.position.y, 0, 0, 63, 137, 63, 137);
  game.graphics.rect(this.rect.position.x, this.rect.position.y, this.rect.size.x, this.rect.size.y, "red");

}

Player.prototype.update = function() {
  this.direction = 0;
  
  if (this.control) {
    
    var up = this.willCollide(0, -this.spd.y);
    var down = this.willCollide(0, this.spd.y);
    var left = this.willCollide(-this.spd.x, 0);
    var right = this.willCollide(this.spd.x, 0);
    
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
      if (!left)
        this.position.subtractX(this.spd);
    }
    if (game.input.check(Keys.UP) || game.input.check(Keys.W)) {
      if (!up)
        this.position.subtractY(this.spd);
      this.direction = 1;
    }
    if (game.input.check(Keys.DOWN) || game.input.check(Keys.S)) {
      if (!down)
        this.position.addY(this.spd);
    
    }
    if (game.input.check(Keys.RIGHT) || game.input.check(Keys.D)) {
      if (!right)
        this.position.addX(this.spd);
    }
  
  }
  
  this.rect.position = this.position.copy().add(new Math.Vector2(20, 80));
}

Player.prototype.willCollide = function(xx, yy) {
  var rect = this.rect;
  
  rect.position.x += xx;
  rect.position.y += yy;
  for (var i = 0; i < game.currentScene.childs.length; i++) {
    var e = game.currentScene.childs[i];
    if (e != this && e.rect != null) {
      if (rect.collides(e.rect)) {
        this.rect.position = this.position.copy().add(new Math.Vector2(20, 80));
        return true;
      }
    }
  }
  this.rect.position = this.position.copy().add(new Math.Vector2(20, 80));
  return false;
}
