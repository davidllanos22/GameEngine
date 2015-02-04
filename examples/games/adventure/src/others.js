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
  this.i = Math.randomTo(2);
}

Grass.prototype = Object.create(Entity.prototype);
Grass.prototype.constructor = Grass;

Grass.prototype.render = function() {
  game.graphics.imageSection(grass, this.position.x, this.position.y + 64, this.i, 0, 32, 32, 32, 32);
}
