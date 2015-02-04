Box = function(x,y){
  Entity.call(this, x, y, "Box");
  this.rect = new Rectangle(x+10, y+90, 50, 40);
  this.disabled = false;
  this.type = Math.randomTo(1);
}
Box.prototype = Object.create(Entity.prototype);
Box.prototype.constructor = Box;

Box.prototype.render = function() {
  if(!this.disabled)game.graphics.imageSection(boxes, this.position.x, this.position.y+80, this.type, 0, 70, 70, 70, 70);
  //if(!this.disabled)game.graphics.rect(this.rect.position.x, this.rect.position.y, this.rect.size.x, this.rect.size.y, "red");

}
Box.prototype.take = function(player){
  player.item = this;
  this.disabled = true;
  this.oldRect = this.rect.copy();
  this.rect = null;
}
Box.prototype.release = function(player){
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