Box = function(x,y){
  Entity.call(this, x, y, "Box");
  this.rect = new Rectangle(x+10, y+90, 50, 40);
}
Box.prototype = Object.create(Entity.prototype);
Box.prototype.constructor = Box;

Box.prototype.render = function() {
  game.graphics.imageSection(boxes, this.position.x, this.position.y+80, 0, 0, 70, 70, 70, 70);
  //game.graphics.rect(this.rect.position.x, this.rect.position.y, this.rect.size.x, this.rect.size.y, "red");

}