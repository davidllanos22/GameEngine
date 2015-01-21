/**
* Main Game class.
* @constructor
* @param {int} width - The width of the window.
* @param {int} height - The height of the window.
*/
Game = function(width,height){

	this.cvs = document.createElement("canvas"); // Create canvas Element.
	this.cvs.tabIndex = 1; // Set canvas tabIndex to 1. Used for focus and blur.
	this.cvs.style.outline = "none";
	this.ctx = this.cvs.getContext("2d"); // Get context from canvas.

	document.body.appendChild(this.cvs); // Append the canvas to the body.

	this.focused = true; //
	this.showPauseWhenNotFocused = false; // Show a pause screen when blur.
	this.fillScreen = false; // Set the width and height to fill the screen.
	this.meter = new FPSMeter({position:"absolute",width:100,theme:"transparent"}); // Create a new FPSMeter instance.
	this.meter.hide(); // Hide FPSMeter.
	this.showFps = false; // Set showFps.
	this.gameScale = 1; // Set initial scale for the game.
	this.scale = 1;
	this.fillScreenWithRatio = true; // Set the width and height to fill the screen conserving the original ratio (with borders).
	this.ratio = 0;
	this.pixelart = true;

	var game = this; // Local variable to use on the next events.

	this.cvs.onfocus = function(){game.onFocusInternal();} // Add event listener to onfocus. 
	this.cvs.onblur = function(){game.onBlurInternal();} // Add event listener to onblur. 
	window.onresize = function(){game.onResizeInternal();} // Add event listener to onresize. 
	this.cvs.oncontextmenu = function (e) {e.preventDefault();};

	if(width == 0 || height == 0) Utils.logErr("Width and Height can't be 0."); // Throw an error if w or h = 0.
	
	this.width = width; // Set width.
	this.height = height; // Set height.

	this.cvs.width = this.width; // Set width.
	this.cvs.height = this.height; // Set height.
	this.cvs.style.width = this.width;
	this.cvs.style.height = this.height;

	

	this.initInternal(); // Call initInternal function.
	
}

Game.prototype = {
	/**
	* Internal initialization.
 	*/
	initInternal: function (){
		Utils.log("init"); // Log init.
		//--
		this.initDone = false; // TODO: CHANGE THIS WHEN PRELOADER IS DONE.
		


		this.loader = new Loader(); // Create a new instance of the Loader.
		this.renderer = new Renderer(this); // Create a new instance of the Renderer.
		this.input = new Input(this); // Create a new instance of the Input.
		this.timerManager = new TimerManager(this);

		if(this.pixi)this.pixiStage.addChild(this.renderer.graphics);	
		this.currentScene = new Scene(this,"Scene 01");
		this.currentCamera = new Camera(this,"Camera 01");
	
		Utils.log("running"); // Log running.

		this.fps = 60; // Set fps.
		this.dt = 0; // Set dt.
		this.start = new Date().getTime(); // Get actual time.

		this.step = 10 / this.fps; // Set step.
		


		this.loop(this); // Call loop function to start game loop.
		
	},
	/**
	* Game loop. Calls internal render and update.
	* @param {Game} game - Instance of game class.
	*/
	loop: function(game){
		this.meter.tickStart(); // Start FPSMeter counter.
		var now = new Date().getTime(); // Get actual time.
		var elapsed = now - game.start; // Set elapsed time.
		
		game.start = elapsed; // Set start time.
		game.dt += Math.min(1,(elapsed)/1000); // Set dt.
		
		while(game.dt > game.step){
			game.dt -= game.step; // Set dt.
			game.updateInternal(); // Call updateInternal function.
		}

		game.renderInternal(); // Call renderInternal function.
		this.meter.tick(); // Finish FPSMeter counter.

		window.requestAnimationFrame(function(){game.loop(game);}); // Create infinite loop with requestAnimationFrame.
	},
	/**
	* Internal update function used by the engine. Do not use this function in your game. Use update instead.
	*/
	updateInternal: function(){
		//--
		if(!this.initDone){ // TODO: CHANGE THIS WHEN PRELOADER IS DONE.
			this.initDone = true; // TODO: CHANGE THIS WHEN PRELOADER IS DONE.
			this.init(); // TODO: CHANGE THIS WHEN PRELOADER IS DONE.
			this.originalWidth = this.width;
			this.onResizeInternal();
		}
		//--
		if(!this.showPauseWhenNotFocused || this.focused){
			this.timerManager.update();
			this.currentScene.updateInternal();

			this.update(); // Call update function when focused.
		}
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

			this.ctx.save()

			this.renderer.renderCounter=0; // Reset the render call count.

			this.render(); // Call render function.

			this.currentScene.renderInternal();
			this.ctx.restore();
		

		if(this.showPauseWhenNotFocused && !this.focused){ // Show Pause when blur and showPauseWhenNotFocused = true.
			this.renderer.drawRect(0,0,this.width,this.height,"rgba(0,0,0,0.8)"); // Fill screen with alpha rect.
			this.renderer.drawString("- PAUSED - ",this.width/2-40,this.height/2-20,20,"white"); // Draw pause text.
		}

		if(this.showFps)this.renderer.drawString("fps "+Math.round(this.meter.fps),8,8,20,"white");

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
		this.focused = true; // Set focused.
		this.onFocus(); // Call onFocus.
	},
	/**
	* Internal onBlur function. Do not use this function in your game. Use onBlur instead.
	*/
	onBlurInternal: function(){
		this.focused = false; // Set focused.
		this.onBlur(); // Call onBlur.
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
			this.scale = nWidth/this.originalWidth; //original width
			this.scale *= this.gameScale;
			this.setSize(Math.floor(nWidth),Math.floor(nHeight)); // Fill screen if fillScreen = true.
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
		if(width == 0 || height == 0) Utils.logErr("Width and Height can't be 0."); // Throw an error if w or h = 0.
		this.width = width; // Set width.
		this.height = height; // Set height.

		this.cvs.width = this.width; // Set canvas width.
		this.cvs.height = this.height // Set canvas height.
	}

}

