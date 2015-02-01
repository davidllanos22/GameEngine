Graphics = function(game){
	this.game = game;
	this.ctx = this.game.ctx;

	this.renderCounter = 0;
	this.clearColor = "#000000";
	this.font = new Font();
}

Graphics.prototype = {

	rect: function(x,y,w,h,color){
		// x = Math.floor(x);
		// y = Math.floor(y);
		// w = Math.floor(w);
		// h = Math.floor(h);
		this.ctx.fillStyle=color;
		this.ctx.fillRect(x,y,w,h);
		this.renderCounter++;
	},
	//todo 
	setClearColor: function(color){
		this.clearColor = color;
	},
	clear: function(){
		this.rect(0,0,this.game.width/this.game.scale,this.game.height/this.game.scale,this.clearColor)
		
	},
	print: function(text,x,y,size,color){
		//x = Math.floor(x);
		//y = Math.floor(y);

		//this.ctx.fillStyle=color;
		for(i = 0; i< text.length; i++){
			this.font.render(text.charAt(i),x+this.font.separation*i,y,this.game.graphics);	
		}
		
		//this.ctx.font=size+"px pixel";
		//this.ctx.fillText(text,x,size+y);
		this.renderCounter++;
	},
	setFont: function(newFont){
		this.font = newFont;
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
	image: function(src,x,y){
		x = Math.floor(x);
		y = Math.floor(y);
		this.ctx.drawImage(src,0,0,src.width,src.height,x,y,src.width,src.height);
		this.renderCounter++;
	},
	imageSection: function(src,x,y,xx,yy,sw,sh,w,h){
		x = Math.floor(x);
		y = Math.floor(y);
		xx = Math.floor(xx);
		yy = Math.floor(yy);
		w = Math.floor(w);
		h = Math.floor(h);

		if(w < 0 ) w = 0;
		if(h < 0 ) h = 0;

		this.ctx.drawImage(src,xx*sw,yy*sh,sw,sh,x,y,w,h);
		this.renderCounter++;
	},
	imageSectionRot: function(src,x,y,xx,yy,sw,sh,w,h,rot){
		x = Math.floor(x);
		y = Math.floor(y);
		xx = Math.floor(xx);
		yy = Math.floor(yy);
		w = Math.floor(w);
		h = Math.floor(h);

		if(w < 0 ) w = 0;
		if(h < 0 ) h = 0;

		this.ctx.save();
		this.ctx.translate(x+(w/2),y+(h/2));
		this.ctx.rotate(rot);
		//this.ctx.drawImage(src,xo*s,yo*s,s,s,-s/2,-s/2,s,s);
		this.ctx.drawImage(src,xx*sw,yy*sh,sw,sh,-w/2,-h/2,w,h);
		this.ctx.restore();
		this.renderCounter++;
	}	
}