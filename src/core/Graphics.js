/**
* Graphics class.
* @constructor
* @param {Game} game - Instance of the Game class.
*/
Graphics = function(game){
	this.game = game;
	this.ctx = this.game.ctx;

	this.renderCounter = 0;
	this.clearColor = "#000000";
	this.font = new Font();
}

Graphics.prototype = {
	point: function(x,y,color){
		this.setColor(color);
		this.ctx.fillRect(x,y,1,1);
		this.renderCounter++;
	},
	line: function(x0,y0,x1,y1,color){
		this.setColor(color);
		this.ctx.beginPath();
    this.ctx.moveTo(x0, y0);
    this.ctx.lineTo(x1, y1);
    this.ctx.stroke();
	},
	rect: function(x,y,w,h,color){
		// x = Math.floor(x);
		// y = Math.floor(y);
		// w = Math.floor(w);
		// h = Math.floor(h);
		this.setColor(color);
		this.ctx.fillRect(x,y,w,h);
		this.renderCounter++;
	},
	circle: function(x,y,r,color){
		this.setColor(color);
		this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    this.ctx.fill();
	},
	setClearColor: function(color){
		this.clearColor = color;
	},
	clear: function(){
		this.rect(0,0,this.game.width/this.game.scale,this.game.height/this.game.scale,this.clearColor);
		
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
	setColor: function(color){
		this.ctx.strokeStyle = color;
		this.ctx.fillStyle = color;

	},
	setFont: function(newFont){
		this.font = newFont;
	},
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