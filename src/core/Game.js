/**
* Main Game class.
* @constructor
* @param {int} width - The width of the window.
* @param {int} height - The height of the window.
* @param {element} element - HTML element to contain the game.
*/
Game = function(width,height,element){

	this.useGL = false;

	this.cvs = document.createElement("canvas");
	this.cvs.tabIndex = 1; // Set canvas tabIndex to 1. Used for focus and blur.
	this.cvs.style.outline = "none";

	if(!this.useGL)this.ctx = this.cvs.getContext("2d");
	else {
		this.gl = this.cvs.getContext("experimental-webgl") || this.cvs.getContext("webgl");
		console.log(this.gl);

		this.gl.canvas.width = width*2;
		this.gl.canvas.height = height*2;
		this.gl.viewport(0, 0, width, height);
		this.gl.clearColor(1.0, 0.0, 0.0, 1.0);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	}

	if(element != undefined){
		element.appendChild(this.cvs);
	}else{
		document.body.appendChild(this.cvs);
	}

	
	// Focus

	this.focused = true;
	this.showPauseWhenNotFocused = false;
	if(this.focused) this.cvs.focus();


	// FPS

	this.meter = new FPSMeter({position:"absolute",width:100,theme:"transparent"});
	this.meter.hide();
	this.showFps = false;

	// Scaling 

	this.fillScreen = false;
	this.gameScale = 1;
	this.scale = 1;
	this.fillScreenWithRatio = false;
	this.ratio = 0;
	this.pixelart = true;

	// Size

	this.setSize(width, height);

	// Events

	var game = this;

	this.cvs.onfocus = function(){game.onFocusInternal();} 
	this.cvs.onblur = function(){game.onBlurInternal();} 
	window.onresize = function(){game.onResizeInternal();}
	this.cvs.oncontextmenu = function (e) {e.preventDefault();};
	
	this.initInternal(); 
}

Game.prototype = {
	/**
	* Internal initialization.
 	*/
	initInternal: function (){
		var self = this;

		this.loader = new Loader();
		this.graphics = new Graphics(this);
		this.input = new Input(this); 
		this.timerManager = new TimerManager(this);

		var loadingScreen = new Scene(this,"Loading");

		loadingScreen.render = function(){
			self.graphics.print("Loading: "+self.loader.numResourcesLoaded+"/"+self.loader.numResources,self.width/2,self.height/2)
		}
		this.currentScene = loadingScreen;
		this.currentCamera = new Camera(this,"Default Camera");
		
		this.loader.loadAll(function(){
			self.currentScene.changeScene(new Scene(self,"Default Scene"));
			self.init();
			self.originalWidth = self.width;
			self.onResizeInternal();

		});

		

		this.fps = 60;
		this.dt = 0;
		this.start = new Date().getTime();

		this.step = 10 / this.fps;
		
		this.loop(this);

	},
	/**
	* Game loop. Calls internal render and update.
	* @param {Game} game - Instance of game class.
	*/
	loop: function(game){
		this.meter.tickStart();

		var now = new Date().getTime();
		var elapsed = now - game.start;
		
		game.start = elapsed;
		game.dt += Math.min(1,(elapsed)/1000);
		
		while(game.dt > game.step){
			game.dt -= game.step;
			game.updateInternal();
		}

		game.renderInternal();
		this.meter.tick();

		window.requestAnimationFrame(function(){game.loop(game);});
	},
	/**
	* Internal update function used by the engine. Do not use this function in your game. Use update instead.
	*/
	updateInternal: function(){
		if(!this.loader.loaded)this.loader.check();

		if(!this.showPauseWhenNotFocused || this.focused){
			this.timerManager.update();
			this.currentScene.updateInternal();
			if(this.input.gamepad)this.input.gamepad = navigator.getGamepads && navigator.getGamepads()[0];
			//console.log(this.input.gamepad.axes);
			if(this.loader.loaded)this.update();
		}

		//this shouldn't be here

		this.input.mouseClick = [false,false,false];
		this.input.mouseRelease = [false,false,false];
		
	},
	/**
	* Internal render function used by the engine. Do not use this function in your game. Use render instead.
	*/
	renderInternal: function (){
		//todo change to a function
		
		if(this.pixelart){
			this.ctx.imageSmoothingEnabled = false;
			this.ctx.webkitImageSmoothingEnabled = false;
			this.ctx.mozImageSmoothingEnabled = false;
			this.ctx.msImageSmoothingEnabled = false;
		}else{
			this.ctx.imageSmoothingEnabled = true;
			this.ctx.webkitImageSmoothingEnabled = true;
			this.ctx.mozImageSmoothingEnabled = true;
			this.ctx.msImageSmoothingEnabled = true;
		}

		this.graphics.clear();
		this.graphics.renderCounter=0; 

		this.ctx.save()

		this.ctx.scale(this.gameScale,this.gameScale);
		this.ctx.translate(Math.floor(-this.currentCamera.position.x),Math.floor(-this.currentCamera.position.y));
		this.ctx.rotate(this.currentCamera.angle*Math.PI/180);
		
		this.currentScene.renderInternal();


		if(this.loader.loaded)this.render();

		this.ctx.restore();
		
		if(this.showPauseWhenNotFocused && !this.focused){
			this.graphics.rect(0,0,this.width,this.height,"rgba(0,0,0,0.8)");
			this.graphics.print("- PAUSED - ",((this.width/2)-40)/this.scale,((this.height/2)-20)/this.scale,20,"white");
		}

		if(this.showFps)this.graphics.print("FPS: "+Math.round(this.meter.fps),8,8,20,"white");

	},
	/**
	* Main init function.
	*/
	init: function(){
	},
	/**
	* Main render function.
	*/
	render: function (){
	},
	/**
	* Main update function.
	*/
	update: function (){
	},
	/**
	* Internal onFocus function. Do not use this function in your game. Use onFocus instead.
	*/
	onFocusInternal: function(){
		this.focused = true;
		this.onFocus();
	},
	/**
	* Internal onBlur function. Do not use this function in your game. Use onBlur instead.
	*/
	onBlurInternal: function(){
		this.focused = false;
		this.onBlur();
	},
	/**
	* Internal onResize function. Do not use this function in your game. Use onResize instead.
	*/
	onResizeInternal: function(){
		if(this.fillScreen)this.setSize(window.innerWidth,window.innerHeight); // Fill screen if fillScreen = true.
		else if(this.fillScreenWithRatio){
			this.ratio = this.width/this.height;
			var nWidth = window.innerWidth/this.ratio;
			var nHeight = nWidth/this.ratio;
			if(nHeight>window.innerHeight){
				nHeight = window.innerHeight;
				nWidth = nHeight*this.ratio;
			}
			if(nHeight<window.innerHeight){
				nHeight = window.innerHeight;
				nWidth = nHeight*this.ratio;
			}
			if(nWidth>window.innerWidth){
				nWidth = window.innerWidth;
				nHeight = nWidth/this.ratio;
			}
			this.scale = nWidth/this.originalWidth;
			this.scale *= this.gameScale;
			this.setSize(Math.floor(nWidth),Math.floor(nHeight));
			this.ctx.scale(this.scale,this.scale);

		}
		
	},
	/**
	* Function triggered when the game takes focus.
	*/
	onFocus: function(){
	},
	/**
	* Function triggered when the game loses focus.
	*/
	onBlur: function(){
	},
	/**
	* Function triggered when the game is resized.
	*/
	onResize: function(){
	},
	/**
	* Sets the size of the game.
	* @param {int} width - The width of the window.
	* @param {int} height - The height of the window.
	*/
	setSize: function(width,height){
		if(width == 0 || height == 0) Utils.logErr("Width and Height can't be 0.");

		this.width = width;
		this.height = height;

		this.cvs.width = this.width;
		this.cvs.height = this.height;
		this.cvs.style.width = this.width;
		this.cvs.style.height = this.height;
	}
}