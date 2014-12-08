Game = function(width,height){
	this.cvs = document.createElement("canvas");
	this.cvs.tabIndex = 1;
	this.ctx = this.cvs.getContext("2d");
	this.focused = false;
	this.showPauseWhenNotFocused = true;
	this.fillScreen = true;
	this.meter;

	var game = this;

	this.cvs.onfocus = function(){
		game.onFocusInternal();
	}
	this.cvs.onblur = function(){
		game.onBlurInternal();
	}
	window.onresize = function(){
		game.onResizeInternal();
	}

	if(width == 0 || height == 0) Utils.logErr("Width and Height can't be 0.");
	
	this.width = width;
	this.height = height;

	this.cvs.width = this.width;
	this.cvs.height = this.height;

	document.body.appendChild(this.cvs);   

	this.preInit();
	
}

Game.prototype = {

	preInit: function (){
		Utils.log("init");

		this.initDone = false;
		
		this.loader = new Loader();
		this.renderer = new Renderer(this);
		this.input = new Input(this);
		

		this.init();

		this.run();

	},

	run: function (){
		Utils.log("running");

		this.fps = 60;
		this.dt = 0;
		this.start = new Date().getTime();
		this.step = 10 / this.fps;
		this.meter = new FPSMeter({position:"absolute",width:100,theme:"transparent"});
		this.loop(this);
		
	},

	loop: function(game){
		this.meter.tickStart();
		var now = new Date().getTime();
		var elapsed = now - game.start;
		
		game.start = elapsed;
		game.dt += Math.min(1,(elapsed)/1000);
		
		while(game.dt > game.step){
			game.dt -= game.step;
			game.preUpdate();
		}

		game.preRender();
		this.meter.tick();

		window.requestAnimationFrame(function(){
			game.loop(game);
		});
	},

	preUpdate: function(){
		if(!this.initDone){
			this.initDone = true;
			this.init();
		}
		this.cvs.width = this.width;
		this.cvs.height = this.height

		if(!this.showPauseWhenNotFocused || this.focused)this.update();
	},
	
	init: function(){
	},
	preRender: function (){

		this.render();
		if(this.showPauseWhenNotFocused && !this.focused){
			this.renderer.drawRect(0,0,this.width,this.height,"rgba(0,0,0,0.8)");
			this.renderer.drawString("- PAUSED - ",this.width/2,this.height/2,20,"white");
		}
	},
	render: function (){
	},

	update: function (){
	},

	setSize: function(w,h){
		if(w == 0 || h == 0) Utils.logErr("Width and Height can't be 0.");
		this.width = w;
		this.height = h;

		Utils.log("Size set to "+w+", "+h);
	},
	onFocusInternal: function(){
		this.focused = true;
		this.onFocus();
	},
	onBlurInternal: function(){
		this.focused = false;
		this.onBlur();
	},
	onResizeInternal: function(){
		if(this.fillScreen) this.setSize(window.innerWidth,window.innerHeight);
	},
	onFocus: function(){
		//
	},
	onBlur: function(){
		//
	}

}

