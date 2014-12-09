/**
* Main Game class.
* @constructor
* @param {int} width - The width of the window.
* @param {int} height - The height of the window.
*/
Game = function(width,height){
	this.cvs = document.createElement("canvas"); // Create canvas Element.
	this.cvs.tabIndex = 1; // Set canvas tabIndex to 1. Used for focus and blur.
	this.ctx = this.cvs.getContext("2d"); // Get context from canvas.
	this.focused = false; // 
	this.showPauseWhenNotFocused = true; // Show a pause screen when blur.
	this.fillScreen = true; // Set the width and height to fill the screen.
	this.meter = new FPSMeter({position:"absolute",width:100,theme:"transparent"}); // Create a new FPSMeter instance.

	var game = this; // Local variable to use on the next events.

	this.cvs.onfocus = function(){game.onFocusInternal();} // Add event listener to onfocus. 
	this.cvs.onblur = function(){game.onBlurInternal();} // Add event listener to onblur. 
	window.onresize = function(){game.onResizeInternal();} // Add event listener to onresize. 


	if(width == 0 || height == 0) Utils.logErr("Width and Height can't be 0."); // Throw an error if w or h = 0.
	
	this.width = width; // Set width.
	this.height = height; // Set height.

	this.cvs.width = this.width; // Set width.
	this.cvs.height = this.height; // Set height.

	document.body.appendChild(this.cvs); // Append the canvas to the body.

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
		
		Utils.log("running"); // Log running.

		this.fps = 60; // Set fps.
		this.dt = 0; // Set dt.
		this.start = new Date().getTime(); // Get actual time.

		this.step = 10 / this.fps; // Set step.
		
		this.loop(this); // Call loop function to start game loop.
		
	},
	/**
	* Game loop. Calls internal render and uodate.
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
		}
		//--
		if(!this.showPauseWhenNotFocused || this.focused)this.update(); // Call update function when focused.
	},
	/**
	* Internal render function used by the engine. Do not use this function in your game. Use render instead.
	*/
	renderInternal: function (){
		this.renderer.renderCounter=0; // Reset the render call count.
		this.render(); // Call render function.

		if(this.showPauseWhenNotFocused && !this.focused){ // Show Pause when blur and showPauseWhenNotFocused = true.
			this.renderer.drawRect(0,0,this.width,this.height,"rgba(0,0,0,0.8)"); // Fill screen with alpha rect.
			this.renderer.drawString("- PAUSED - ",this.width/2,this.height/2,20,"white"); // Draw pause text.
		}
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

		Utils.log("Size set to "+width+", "+height);
	}

}

