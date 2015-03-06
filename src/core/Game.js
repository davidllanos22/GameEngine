/**
* Main Game class.
* @constructor
* @param {int} width - The width of the window.
* @param {int} height - The height of the window.
* @param {element} element - HTML element to contain the game.
*/
Game = function(width,height,element){
	/**
	* Internal initialization.
 	*/
	var initInternal = function (game){

		game.loader = new Loader();
		game.graphics = new Graphics(game);
		game.input = new Input(game); 
		game.timerManager = new TimerManager(game);

		var loadingScreen = new Scene(game,"Loading");

		loadingScreen.render = function(){
			game.graphics.setClearColor("#0d4c57");
			var string = "Loading: " + game.loader.numResourcesLoaded + " of " + game.loader.numResources;
			game.graphics.print(string, game.getSize().x / 2 -(string.length * 16) / 2, game.getSize().y / 2)
		}

		game.currentScene = loadingScreen;
		game.currentCamera = new Camera(game,"Default Camera");
		
		game.loader.onFinish(function(){
			game.currentScene.changeScene(new Scene(game, "Default Scene"));
			game.graphics.setClearColor("#000");
			game.init();
			originalWidth = size.x;

			onResizeInternal(game);
		});

		start = new Date().getTime();
		lastLoop = new Date();
		
		loop(game);
	}
	/**
	* Game loop. Calls internal render and update.
	* @param {Game} game - Instance of game class.
	*/
	var loop = function(game){
		var now = new Date().getTime();
		var elapsed = now - start;
		
		var thisLoop = new Date();
    fps = 1000 / (thisLoop - lastLoop) | 0;
    lastLoop = thisLoop;

    //console.log(this.fps)

		dt += Math.min(1, (elapsed) / 1000);
		
		while(dt > step){
			dt -= step;
			updateInternal(game);
		}

		renderInternal(game);

		window.requestAnimationFrame(function(){loop(game)});
	}
	/**
	* Internal update function used by the engine. Do not use this function in your game. Use update instead.
	*/
	var updateInternal = function(game){
		if(!game.loader.loaded)game.loader.check();

		if(!showPauseWhenNotFocused || focused){
			game.timerManager.update();
			if(game.loader.loaded)game.update();
			game.currentScene.updateInternal();
			if(game.input.gamepad)game.input.gamepad = navigator.getGamepads && navigator.getGamepads()[0];
			game.input.mouseReset();
		}
	}
	/**
	* Internal render function used by the engine. Do not use this function in your game. Use render instead.
	*/
	var renderInternal = function (game){
		//todo change to a function
		
		if(pixelart){
			ctx.imageSmoothingEnabled = false;
			ctx.webkitImageSmoothingEnabled = false;
			ctx.mozImageSmoothingEnabled = false;
			ctx.msImageSmoothingEnabled = false;
		}else{
			ctx.imageSmoothingEnabled = true;
			ctx.webkitImageSmoothingEnabled = true;
			ctx.mozImageSmoothingEnabled = true;
			ctx.msImageSmoothingEnabled = true;
		}

		game.graphics.clear();
		game.graphics.renderCounter=0; 

		ctx.save()

		ctx.scale(gameScale,gameScale);
		
		ctx.translate(Math.floor(-game.currentCamera.position.x), Math.floor(-game.currentCamera.position.y));
		ctx.rotate(game.currentCamera.angle * Math.PI / 180);
		
		game.currentScene.renderInternal();

		if(game.loader.loaded)game.render();

		game.input.mouseRender();

		ctx.restore();
		
		if(showPauseWhenNotFocused && !focused){
			game.graphics.rect(0, 0, game.getSize().x, game.getSize().y, "rgba(0,0,0,0.4)");
			game.graphics.print("- PAUSED - ", game.getSize().x / 2 - 80, game.getSize().y / 2 - 10);
		}

		if(showFps)game.graphics.print("FPS: " + fps, 8, 8);

	}
	/**
	* Main init function.
	*/
	this.init = function(){
	}
	/**
	* Main render function.
	*/
	this.render = function (){
	}
	/**
	* Main update function.
	*/
	this.update = function (){
	}
	/**
	* Internal onFocus function. Do not use this function in your game. Use onFocus instead.
	*/
	var onFocusInternal = function(game){
		focused = true;
		game.onFocus();
	}
	/**
	* Internal onBlur function. Do not use this function in your game. Use onBlur instead.
	*/
	var onBlurInternal = function(game){
		focused = false;
		game.onBlur();
	}
	/**
	* Internal onResize function. Do not use this function in your game. Use onResize instead.
	*/
	var onResizeInternal = function(game){
		if(fillScreen)game.setSize(window.innerWidth, window.innerHeight); // Fill screen if fillScreen = true.
		else if(fillScreenWithRatio){
			ratio = size.x / size.y;
			var nWidth = window.innerWidth / ratio;
			var nHeight = nWidth / ratio;
			if(nHeight > window.innerHeight){
				nHeight = window.innerHeight;
				nWidth = nHeight * ratio;
			}
			if(nHeight < window.innerHeight){
				nHeight = window.innerHeight;
				nWidth = nHeight * ratio;
			}
			if(nWidth > window.innerWidth){
				nWidth = window.innerWidth;
				nHeight = nWidth / ratio;
			}
			scale = nWidth / originalWidth;
			scale *= gameScale;
			game.setSize(Math.floor(nWidth), Math.floor(nHeight));
			ctx.scale(scale,scale);
		}
		
	}
	/**
	* Function triggered when the game takes focus.
	*/
	this.onFocus = function(){
	},
	/**
	* Function triggered when the game loses focus.
	*/
	this.onBlur = function(){
	},
	/**
	* Function triggered when the game is resized.
	*/
	this.onResize = function(){
	}
	/**
	* Sets the size of the game.
	* @param {int} width - The width of the window.
	* @param {int} height - The height of the window.
	*/
	this.setSize = function(width, height){
		if(width == 0 || height == 0) Utils.logErr("Width and Height can't be 0.");

		size.x = width;
		size.y = height;

		cvs.width = width;
		cvs.height = height;
		cvs.style.width = width;
		cvs.style.height = height;
	}
	this.setScale = function(s){
		gameScale = s > 0 ? s : 0;
	}
	this.getScale = function(){
		return gameScale;
	}
	this.getSize = function(){
		var xx = ( size.x / scale / gameScale );
  	var yy = ( size.y / scale / gameScale );
		return new Math.Vector2(xx, yy);
	}
	this.getFps = function(){
		return fps;
	}
	this.fillScreenWithRatio = function(e){
		if(e != null)
			fillScreenWithRatio = e;
		else
			return fillScreenWithRatio;
	}
	this.fillScreen = function(e){
		if(e != null)
			fillScreen = e;
		else
			return fillScreen;
	}
	this.showPauseWhenNotFocused = function(e){
		if(e != null)
			showPauseWhenNotFocused = e;
		else
			return showPauseWhenNotFocused;
	}
	this.showFps = function(e){
		showFps = e;
	}
	/**
	* Adds a child to the current scene.
	* @param {Entity} child - The entity to add.
	*/
	this.add = function(child){
		this.currentScene.add(child);
	}
	/**
	* Removes a child from the current scene.
	* @param {Entity} child - The entity to remove.
	*/
	this.remove = function(child){
		this.currentScene.remove(child);	
	}
	/**
	* Removes all childs from the current scene.
	*/
	this.removeAll = function(){
		this.currentScene.removeAll();
	}
	/**
	* Changes to the selected scene.
	* @param {Scene} scene - The scene to change to.
	*/
	this.changeScene = function(scene){
		this.currentScene.changeScene(scene);
	}

	this.getCanvas = function(){
		return cvs;
	}
	this.getContext = function(){
		return ctx;
	}

	//--

	var useGL = false;

	var cvs = document.createElement("canvas");
	var ctx = null;
	cvs.tabIndex = 1; // Set canvas tabIndex to 1. Used for focus and blur.
	cvs.style.outline = "none";

	if(!useGL)ctx = cvs.getContext("2d");
	else {
		this.gl = this.cvs.getContext("experimental-webgl") || this.cvs.getContext("webgl");
		console.log(this.gl);

		this.gl.canvas.width = width * 2;
		this.gl.canvas.height = height * 2;
		this.gl.viewport(0, 0, width, height);
		this.gl.clearColor(1.0, 0.0, 0.0, 1.0);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	}

	if(element != undefined){
		element.appendChild(this.cvs);
	}else{
		document.body.appendChild(cvs);
	}

	// Focus

	var focused = true;
	var showPauseWhenNotFocused = false;
	if(focused) cvs.focus();


	// FPS

	var showFps = false;
	var desiredFps = 60;
	var fps = 0;
	var dt = 0;
	var start = 0;
	var step = 10 / desiredFps;
	var lastLoop = 0;

	// Scaling 
	var size = new Math.Vector2(width, height);
	var fillScreen = false;
	var gameScale = 1;
	var scale = 1;
	var fillScreenWithRatio = false;
	var ratio = 0;
	var pixelart = true;

	// Size

	this.setSize(width, height);

	// Events

	var self = this;

	cvs.onfocus = function(){onFocusInternal(self)} 
	cvs.onblur = function(){onBlurInternal(self)} 
	window.onresize = function(){onResizeInternal(self)}

	cvs.oncontextmenu = function(e){e.preventDefault()};

	initInternal(this); 
}
