Rectangle = function(w,h){
	this.x;
	this.y;
	this.w=w;
	this.h=h;
}

Rectangle.prototype = {

	setPosition: function(x,y){
		this.x=x;
		this.y=y;
	},
	
	setSize: function(w,h){
		this.w=w;
		this.h=h;
	},

	collides: function(rect){
		return ( this.x < rect.x + rect.w && this.x + this.w > rect.x && this.y < rect.y + rect.h && this.y + this.h > rect.y);
	}
}