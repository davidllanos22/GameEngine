Renderer = function(game){
	this.game = game;
	this.ctx = this.game.ctx;
}

Renderer.prototype = {

	drawRect: function(x,y,w,h,color){
		this.ctx.fillStyle=color;
		this.ctx.fillRect(x,y,w,h);
	},
	clearScreen: function(color){
		this.ctx.fillStyle=color;
		this.ctx.fillRect(0,0,this.game.width,this.game.height);
	},
	drawString: function(text,x,y,size,color){
		this.ctx.fillStyle=color;
		this.ctx.font=size+"px pixel";
		this.ctx.fillText(text,x,size+y);
	},
	drawImage: function(src,x,y,xo,yo,s){
		this.ctx.drawImage(src,xo*s,yo*s,s,s,x,y,s,s);
	},
	drawImageRot: function(src,x,y,xo,yo,s,rot){
		this.ctx.save();
		this.ctx.translate(x,y);
		this.ctx.rotate(rot);
		this.ctx.drawImage(src,xo*s,yo*s,s,s,-s/2,-s/2,s,s);
		this.ctx.restore();
	}	
}