/**
* Main Game class.
* @constructor
* @param {int} width - The width of the window.
* @param {int} height - The height of the window.
* @param {element} element - HTML element to contain the game.
*/
class Game{
	constructor(width, height, element){
		var useGL = false;

		this.cvs = document.createElement("canvas");
		this.ctx = null;
		this.cvs.tabIndex = 1; // Set canvas tabIndex to 1. Used for focus and blur.
		this.cvs.style.outline = "none";

		if(!useGL)this.ctx = this.cvs.getContext("2d");
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
			document.body.appendChild(this.cvs);
		}

		// Focus

		this.focused = true;
		this.showPauseWhenNotFocused = false;
		if(this.focused) this.cvs.focus();


		// FPS

		this.showFps = false;
		this.desiredFps = 60;
		this.fps = 0;
		this.dt = 0;
		this.start = 0;
		this.step = 10 / this.desiredFps;
		this.lastLoop = 0;

		// Scaling 
		this.size = new Math.Vector2(width, height);
		this.fillScreen = false;
		this.gameScale = 1;
		this.scale = 1;
		this.fillScreenWithRatio = false;
		this.ratio = 0;
		this.pixelart = true;

		// Size

		this.setSize(width, height);

		// Events

		this.cvs.onfocus = ()=>{this.onFocusInternal()} 
		this.cvs.onblur = ()=>{this.onBlurInternal()} 
		window.onresize = ()=>{this.onResizeInternal()}

		this.cvs.oncontextmenu = (e)=>{e.preventDefault()};

		this.initInternal(); 
	}
	/**
	* Internal initialization.
 	*/
	initInternal(){

		this.loader = new Loader();
		this.graphics = new Graphics(this);
		this.input = new Input(this); 
		this.timerManager = new TimerManager(this);

		var loadingScreen = new Scene(this, "Loading");

		loadingScreen.render = ()=>{
			this.graphics.setClearColor("#0d4c57");
			var string = "Loading: " + this.loader.numResourcesLoaded + " of " + this.loader.numResources;
			this.graphics.print(string, this.getSize().x / 2 -(string.length * 16) / 2, this.getSize().y / 2)
		}

		this.currentScene = loadingScreen;
		this.currentCamera = new Camera(this, "Default Camera");
		
		this.loader.onFinish(()=>{
			this.currentScene.changeScene(new Scene(this, "Default Scene"));
			this.graphics.setClearColor("#000");
			this.init();
			this.originalWidth = this.size.x;

			this.onResizeInternal();
		});

		this.start = new Date().getTime();
		this.lastLoop = new Date();
		
		this.loop();
	}
	/**
	* Game loop. Calls internal render and update.
	* @param {Game} game - Instance of game class.
	*/
	loop(game){
		var now = new Date().getTime();
		var elapsed = now - this.start;
		
		var thisLoop = new Date();
    this.fps = 1000 / (thisLoop - this.lastLoop) | 0;
    this.lastLoop = thisLoop;

    //console.log(this.fps)

		this.dt += Math.min(1, (elapsed) / 1000);
		
		while(this.dt > this.step){
			this.dt -= this.step;
			this.updateInternal();
		}

		this.renderInternal();

		window.requestAnimationFrame(()=>{this.loop()});
	}
	/**
	* Internal update function used by the engine. Do not use this function in your game. Use update instead.
	*/
	updateInternal(){
		if(!this.loader.loaded)this.loader.check();

		if(!this.showPauseWhenNotFocused || this.focused){
			this.timerManager.update();
			if(this.loader.loaded)game.update();
			this.currentScene.updateInternal();
			if(this.input.gamepad)this.input.gamepad = navigator.getGamepads && navigator.getGamepads()[0];
			this.input.mouseReset();
		}
	}
	/**
	* Internal render function used by the engine. Do not use this function in your game. Use render instead.
	*/
	renderInternal(){
		//todo change to a function
		
		if(this.pixelart){
			this.ctx.imageSmoothingEnabled = false;
			this.ctx.mozImageSmoothingEnabled = false;
			this.ctx.msImageSmoothingEnabled = false;
		}else{
			this.ctx.imageSmoothingEnabled = true;
			this.ctx.mozImageSmoothingEnabled = true;
			this.ctx.msImageSmoothingEnabled = true;
		}

		this.graphics.clear();
		this.graphics.renderCounter=0; 

		this.ctx.save()

		this.ctx.scale(this.gameScale, this.gameScale);
		
		this.ctx.translate(Math.floor(-this.currentCamera.position.x), Math.floor(-this.currentCamera.position.y));
		this.ctx.rotate(this.currentCamera.angle * Math.PI / 180);
		
		this.currentScene.renderInternal();

		if(this.loader.loaded)this.render();

		//this.input.mouseRender();

		this.ctx.restore();
		
		if(this.showPauseWhenNotFocused && !this.focused){
			this.graphics.rect(0, 0, this.getSize().x, this.getSize().y, "rgba(0,0,0,0.4)");
			this.graphics.print("- PAUSED - ", this.getSize().x / 2 - 80, this.getSize().y / 2 - 10);
		}

		if(this.showFps)this.graphics.print("FPS: " + this.fps, 8, 8);

	}
	/**
	* Main init function.
	*/
	init(){
	}
	/**
	* Main render function.
	*/
	render(){
	}
	/**
	* Main update function.
	*/
	update(){
	}
	/**
	* Internal onFocus function. Do not use this function in your game. Use onFocus instead.
	*/
	onFocusInternal(){
		this.focused = true;
		this.onFocus();
	}
	/**
	* Internal onBlur function. Do not use this function in your game. Use onBlur instead.
	*/
	onBlurInternal(){
		this.focused = false;
		this.onBlur();
	}
	/**
	* Internal onResize function. Do not use this function in your game. Use onResize instead.
	*/
	onResizeInternal(){
		if(this.fillScreen)this.setSize(window.innerWidth, window.innerHeight); // Fill screen if fillScreen = true.
		else if(this.fillScreenWithRatio){
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
			this.scale = nWidth / this.originalWidth;
			this.scale *= gameScale;
			this.setSize(Math.floor(nWidth), Math.floor(nHeight));
			this.ctx.scale(scale,scale);
		}
	}
	/**
	* Function triggered when the game takes focus.
	*/
	onFocus(){
	}
	/**
	* Function triggered when the game loses focus.
	*/
	onBlur(){
	}
	/**
	* Function triggered when the game is resized.
	*/
	onResize(){
	}
	/**
	* Sets the size of the game.
	* @param {int} width - The width of the window.
	* @param {int} height - The height of the window.
	*/
	setSize(width, height){
		if(width == 0 || height == 0) Utils.logErr("Width and Height can't be 0.");

		this.size.x = width;
		this.size.y = height;

		this.cvs.width = width;
		this.cvs.height = height;
		this.cvs.style.width = width;
		this.cvs.style.height = height;
	}

	setScale(s){
		this.gameScale = s > 0 ? s : 0;
	}

	getScale(){
		return this.gameScale;
	}

	getSize(){
		var xx = ( this.size.x / this.scale / this.gameScale );
  	var yy = ( this.size.y / this.scale / this.gameScale );
		return new Math.Vector2(xx, yy);
	}
	
	getFps(){
		return this.fps;
	}

	fillScreenWithRatio(e){
		if(e != null)
			fillScreenWithRatio = e;
		else
			return fillScreenWithRatio;
	}

	fillScreen(e){
		if(e != null)
			fillScreen = e;
		else
			return fillScreen;
	}

	showPauseWhenNotFocused(e){
		if(e != null)
			showPauseWhenNotFocused = e;
		else
			return showPauseWhenNotFocused;
	}

	showFps(e){
		showFps = e;
	}
	/**
	* Adds a child to the current scene.
	* @param {Entity} child - The entity to add.
	*/
	add(child){
		this.currentScene.add(child);
	}
	/**
	* Removes a child from the current scene.
	* @param {Entity} child - The entity to remove.
	*/
	remove(child){
		this.currentScene.remove(child);	
	}
	/**
	* Removes all childs from the current scene.
	*/
	removeAll(){
		this.currentScene.removeAll();
	}
	/**
	* Changes to the selected scene.
	* @param {Scene} scene - The scene to change to.
	*/
	changeScene(scene){
		this.currentScene.changeScene(scene);
	}

	getCanvas(){
		return this.cvs;
	}
	getContext(){
		return this.ctx;
	}
}
