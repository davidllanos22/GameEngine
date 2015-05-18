/**
* Rectangle class.
* @constructor
* @param {int} x - X position of the new instance.
* @param {int} y - Y position of the new instance.
* @param {int} w - Width new instance.
* @param {int} h - Height of the new instance.
*/
class Rectangle{
	constructor(x,y,w,h){
		this.position = new Math.Vector2(x,y);
		this.size = new Math.Vector2(w,h);
	}
	setPosition(x,y){
		this.position.x = x;
		this.position.y = y;
	}

	setSize(w,h){
		this.size.x = w;
		this.size.y = h;
	}

	collides(rect){
		if(rect != null)
			return ( 	this.position.x < rect.position.x + rect.size.x &&
						 		this.position.x + this.size.x > rect.position.x && 
						 		this.position.y < rect.position.y + rect.size.y && 
						 		this.position.y + this.size.y > rect.position.y );
	}

	collidesAt(rect, xx, yy){
		var rectMod = this.copy();
  
	  rectMod.position.addX(xx);
	  rectMod.position.addY(yy);
	
	  return rectMod.collides(rect);
	}

	copy(){
		return new Rectangle(this.position.x, this.position.y, this.size.x, this.size.x);
	}
}