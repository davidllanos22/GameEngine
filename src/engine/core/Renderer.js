Renderer = function(game){
	this.game = game;
	this.pixi = this.game.pixi;

	this.ctx = this.game.ctx;

	this.renderCounter = 0;
	this.clearColor = "black";

}

Renderer.prototype = {

	drawRect: function(x,y,w,h,color){
		this.ctx.fillStyle=color;
		this.ctx.fillRect(x,y,w,h);
		this.renderCounter++;
	},
	//todo 
	setClearColor: function(color){
		this.clearColor = color;
	},
	clearScreen: function(color){
		this.drawRect(0,0,this.game.width,this.game.height,color)
		
	},
	drawString: function(text,x,y,size,color){
		this.ctx.fillStyle=color;
		this.ctx.font=size+"px pixel";
		this.ctx.fillText(text,x,size+y);
		this.renderCounter++;
	},
	/*
		img			- Specifies the image, canvas, or video element to use	 
		sx			- Optional. The x coordinate where to start clipping
		sy			- Optional. The y coordinate where to start clipping
		swidth 	-	Optional. The width of the clipped image
		sheight	- Optional. The height of the clipped image
		x				- The x coordinate where to place the image on the canvas
		y				- The y coordinate where to place the image on the canvas
		width		-	Optional. The width of the image to use (stretch or reduce the image)
		height	- Optional. The height of the image to use (stretch or reduce the image)
	*/
	drawImage: function(src,x,y){
		this.ctx.drawImage(src,0,0,src.width,src.height,x,y,src.width,src.height);
		this.renderCounter++;
	},
	drawImageSection: function(src,x,y,xx,yy,w,h){
		this.ctx.drawImage(src,xx*w,yy*h,w,h,x,y,w,h);
		this.renderCounter++;
	},
	//todo make draw part of an image
	drawImageOld: function(src,x,y,xo,yo,s){
		this.ctx.drawImage(src,xo*s,yo*s,s,s,x,y,s,s);
		this.renderCounter++;
	},
	drawImageRot: function(src,x,y,xo,yo,s,rot){
		this.ctx.save();
		this.ctx.translate(x+s/2,y+s/2);
		this.ctx.rotate(rot);
		this.ctx.drawImage(src,xo*s,yo*s,s,s,-s/2,-s/2,s,s);
		this.ctx.restore();
		this.renderCounter++;
	}	
}