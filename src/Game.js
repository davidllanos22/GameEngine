var meter;



Utils = {};

Utils.log = function (x){		
	console.log("%c [GAME ENGINE - LOG]: "+x,'color: #1010DD');
}

Utils.logObj = function (x){		
	console.log(x);
}

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
	}
}

Game = function(width,height){
	this.cvs = document.createElement("canvas");
	this.ctx = this.cvs.getContext("2d");

	this.width = width;
	this.height = height;

	this.cvs.width = this.width;
	this.cvs.height = this.height;

	document.body.appendChild(this.cvs);   

	Utils.logObj(this);

	this.init();
}

Game.prototype = {

	init: function (){
		Utils.log("init");
		
		this.renderer = new Renderer(this);

		this.run();

	},

	run: function (){
		Utils.log("running");

		this.fps = 60;
		this.dt = 0;
		this.start = new Date().getTime();
		this.step = 1 / this.fps;
		meter = new FPSMeter({position:"relative",width:100});
		meter.set('graph', 1);
		this.loop(this);
		
	},

	loop: function(game){
		meter.tickStart();
		var now = new Date().getTime();
		var elapsed = now - game.start;
		
		game.start = elapsed;
		game.dt += Math.min(1,(elapsed)/1000);
		
		while(game.dt > game.step){
			game.dt -= game.step;
			game.update();
		}

		game.render();
		meter.tick();

		window.requestAnimationFrame(function(){
			game.loop(game);
		});
	},

	render: function (){
		this.renderer.clearScreen("black");
		this.renderer.drawRect(0,0,16,16,"red");
	},

	update: function (){

	}
}