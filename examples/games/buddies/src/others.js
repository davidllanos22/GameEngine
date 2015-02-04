Tree = function(x, y) {
  Entity.call(this, x, y, "Tree");
  this.rect = new Rectangle(x + 70, y + 40, 15, 30);
}

Tree.prototype = Object.create(Entity.prototype);
Tree.prototype.constructor = Tree;

Tree.prototype.render = function() {
  game.graphics.imageSection(tree, this.position.x, this.position.y - 230, 0, 0, 156, 321, 156, 321);
  game.graphics.rect(this.rect.position.x, this.rect.position.y, this.rect.size.x, this.rect.size.y, "red");

}
Grass = function(x, y) {
  Entity.call(this, x, y, "Grass");
  this.rect = new Rectangle(x+10, y+90, 50, 40);
  this.disabled = false;
  this.type = Math.randomTo(1);
}

Grass.prototype = Object.create(Entity.prototype);
Grass.prototype.constructor = Grass;

Grass.prototype.render = function() {
  if(!this.disabled)game.graphics.imageSection(boxes, this.position.x, this.position.y+80, this.type, 0, 70, 70, 70, 70);
}

Grass.prototype.take = function(player){
  player.item = this;
  this.disabled = true;
  this.oldRect = this.rect.copy();
  this.rect = null;
}
Grass.prototype.release = function(player){
  this.disabled = false;
 
  //this.position.x +=100;
  
  this.rect = this.oldRect.copy();
  console.log(this.oldRect.position)
  if(player.direction == 0)
    this.rect.position = this.position.copy().add(new Math.Vector2(60,90));
  if(player.direction == 1)
    this.rect.position = this.position.copy().add(new Math.Vector2(10,30));

  if(player.direction == 2)
    this.rect.position = this.position.copy().add(new Math.Vector2(-40,90));

  if(player.direction == 3)
    this.rect.position = this.position.copy().add(new Math.Vector2(10,130));


  this.position = this.rect.position.copy().add(new Math.Vector2(-10,-90)); 
  console.log(this.rect.position)
  player.item = null;
}
