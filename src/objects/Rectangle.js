/**
* Rectangle class.
* @constructor
* @param {int} x - X position of the new instance.
* @param {int} y - Y position of the new instance.
* @param {int} w - Width new instance.
* @param {int} h - Height of the new instance.
*/
Rectangle = function(x,y,w,h){
	this.position = new Math.Vector2(x,y);
	this.size = new Math.Vector2(w,h);
}

Rectangle.prototype = {

	setPosition: function(x,y){
		this.position.x = x;
		this.position.y = y;
	},
	setSize: function(w,h){
		this.size.x = w;
		this.size.y = h;
	},

	collides: function(rect){
		if(rect != null)
			return ( 	this.position.x < rect.position.x + rect.size.x &&
						 		this.position.x + this.size.x > rect.position.x && 
						 		this.position.y < rect.position.y + rect.size.y && 
						 		this.position.y + this.size.y > rect.position.y );
	},
	collidesAt: function(rect, xx, yy){
		var rectMod = this.copy();
  
	  rectMod.position.x += xx;
	  rectMod.position.y += yy;
	
	  return rectMod.collides(rect);
	},
	copy: function(){
		return new Rectangle(this.position.x,this.position.y,this.size.x,this.size.x);
	}
}