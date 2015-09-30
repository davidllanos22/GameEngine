/**
* Main Game class.
* @constructor
* @param {int} width - The width of the window.
* @param {int} height - The height of the window.
* @param {element} element - HTML element to contain the game.
*/
class Game{
	constructor(width, height, element){
		this.cvs = document.createElement("canvas");
		this.ctx = this.cvs.getContext("2d");
	    this.glcvs = document.createElement("canvas");
	    this.gl = this.glcvs.getContext("webgl");

		this.cvs.tabIndex = 1; // Set canvas tabIndex to 1. Used for focus and blur.
		this.cvs.style.outline = "none";
	    this.glcvs.tabIndex = 1; // Set canvas tabIndex to 1. Used for focus and blur.
	    this.glcvs.style.outline = "none";
		
		this.gl.viewport(0, 0, width, height);
		this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	    this.gl.enable(this.gl.DEPTH_TEST);
	    this.gl.depthFunc(this.gl.LEQUAL);

		if(element != undefined){
			//element.appendChild(this.cvs);
			element.appendChild(this.glcvs);
		}else{
			//document.body.appendChild(this.cvs);
			document.body.appendChild(this.glcvs);
		}

		// Audio
		this.actx = new AudioContext();

		// Focus
		this.focused = true;
		this.showPauseWhenNotFocused = false;
		if(this.focused){
	      this.cvs.focus();
	      this.glcvs.focus();
    	} 

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
		this.glcvs.onfocus = ()=>{this.onFocusInternal()} 
		this.glcvs.onblur = ()=>{this.onBlurInternal()} 
		window.onresize = ()=>{this.onResizeInternal()}

		this.glcvs.oncontextmenu = (e)=>{e.preventDefault()};

		this.initInternal(); 
	}
	/**
	* Internal initialization.
 	*/
	initInternal(){

		this.loader = new Loader(this);
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
      this.originalHeight = this.size.y;

			this.onResizeInternal();
		});

    var normal_v = ` 
                    attribute vec2 a_position;
                    uniform sampler2D u_image;
                    varying vec2 f_texcoord;

                    uniform vec2 u_resolution;
                     
                    void main(void){
                      vec2 zeroToOne = a_position;
                      vec2 zeroToTwo = zeroToOne * 2.0;
                      vec2 clipSpace = zeroToTwo - 1.0;

                      gl_Position = vec4(clipSpace * vec2(1, -1), 0.0, 1.0);
                      f_texcoord = (clipSpace + 1.0) / 2.0;
                    }
                  `;

    var normal_f = ` 
                    precision mediump float;
                    uniform sampler2D u_image;
                    varying vec2 f_texcoord;

                    void main(void){
                      vec2 texcoord = f_texcoord;
                      gl_FragColor = texture2D(u_image, texcoord);
                    }
                  `;

		var wave_v = ` 
                  attribute vec2 a_position;
                  uniform sampler2D u_image;
                  varying vec2 f_texcoord;

                  uniform vec2 u_resolution;
                   
                  void main(void){
                    vec2 zeroToOne = a_position;
                    vec2 zeroToTwo = zeroToOne * 2.0;
                    vec2 clipSpace = zeroToTwo - 1.0;

                    gl_Position = vec4(clipSpace * vec2(1, -1), 0.0, 1.0);
                    f_texcoord = (clipSpace + 1.0) / 2.0;
                  }
                `;

    var wave_f = ` 
                  precision mediump float;
                  uniform sampler2D u_image;
                  uniform float offset;
                  uniform float dX;
                  uniform float dY;
                  varying vec2 f_texcoord;


                  void main(void){
                    vec2 texcoord = f_texcoord;
                    texcoord.x += sin(texcoord.y * (4.0 * 2.0 * 3.14159) + offset) / dX;
                    texcoord.y += sin(texcoord.y * (4.0 * 2.0 * 3.14159) + offset) / dY;
                    gl_FragColor = texture2D(u_image, texcoord);
                  }
                `;

		var crt_v = ` 
                  attribute vec2 a_position;
                  varying vec2 f_texcoord;
                   
                  void main(void){

                    gl_Position = vec4(a_position * vec2(1, -1), 0.0, 1.0);
                    f_texcoord = (a_position + 1.0) / 2.0;
                  }
                `;

    var crt_f = ` 
                  
                precision highp float;
                uniform vec2 u_resolution;
                uniform float time;

                uniform sampler2D u_image;

                varying vec2 f_texcoord;

                uniform float speed;
                uniform vec3 tint;
                uniform float lineWidth;
                
                float rand(vec2 co){
                    return fract(sin(dot(co.xy , vec2(12.9898, 78.233))) * 43758.5453);
                }

                void main(void){
                    vec2 pixel = gl_FragCoord.xy / u_resolution;
                    
                    vec3 col = texture2D(u_image, f_texcoord).xyz;
                    
                    // start with the source texture and misalign the rays it a bit
                     // col.r = texture2D(u_image, vec2(pixel.x + 0.002, - pixel.y)).r;
                     // col.g = texture2D(u_image, vec2(pixel.x + 0.001, - pixel.y)).g;
                     // col.b = texture2D(u_image, vec2(pixel.x - 0.002, - pixel.y)).b;

                    // contrast curve
                    col = clamp(col * 0.5 + 0.5 * col * col * 1.2, 0.0, 1.0);

                    //vignette
                    col *= 0.6 + 0.4 * 16.0 * pixel.x * pixel.y * (1.0 - pixel.x) * (1.0 - pixel.y);

                    //color tint
                    //col *= vec3(0.9, 1.0, 0.8);

                    col *= tint;

                    //scanline (last 2 constants are crawl speed and size)
                    col *= 0.8 + 0.2 * sin(speed * time + pixel.y * lineWidth);

                    //flickering (semi-randomized)
                    col *= 1.0 - 0.07 * rand(vec2(time, tan(time)));

                    gl_FragColor = vec4(col, 1.0);
                }
                `;

    var baw_v = ` 
                  attribute vec2 a_position;
                  uniform sampler2D u_image;
                  varying vec2 f_texcoord;

                  uniform vec2 u_resolution;
                   
                  void main(void){
                    vec2 zeroToOne = a_position;
                    vec2 zeroToTwo = zeroToOne * 2.0;
                    vec2 clipSpace = zeroToTwo - 1.0;

                    gl_Position = vec4(clipSpace * vec2(1, -1), 0.0, 1.0);
                    f_texcoord = (clipSpace + 1.0) / 2.0;
                  }
                `;

    var baw_f = ` 
                  precision mediump float;
                  uniform sampler2D u_image;
                  varying vec2 f_texcoord;
                  uniform float amount;

                  void main(void){
                    vec2 texcoord = f_texcoord;
                    vec3 col = texture2D(u_image, f_texcoord).rgb;
                    float r = col.r;
                    float g = col.g;
                    float b = col.b;

                    float avg = (r + g + b) / 3.0;

                    float rr = r * (1.0 - amount) + avg * amount;
                    float gg = g * (1.0 - amount) + avg * amount;
                    float bb = b * (1.0 - amount) + avg * amount;

                    col = vec3(rr, gg, bb);

                    gl_FragColor = vec4(col, 1.0);
                  }
                `;

    var sepia_v = ` 
                  attribute vec2 a_position;
                  uniform sampler2D u_image;
                  varying vec2 f_texcoord;

                  uniform vec2 u_resolution;

                   
                  void main(void){
                    vec2 zeroToOne = a_position;
                    vec2 zeroToTwo = zeroToOne * 2.0;
                    vec2 clipSpace = zeroToTwo - 1.0;

                    gl_Position = vec4(clipSpace * vec2(1, -1), 0.0, 1.0);
                    f_texcoord = (clipSpace + 1.0) / 2.0;
                  }
                `;

    var sepia_f = ` 
                  precision mediump float;
                  uniform sampler2D u_image;
                  varying vec2 f_texcoord;
                  uniform float amount;

                  void main(void){
                    vec2 texcoord = f_texcoord;
                    vec3 col = texture2D(u_image, f_texcoord).rgb;
                    float r = col.r;
                    float g = col.g;
                    float b = col.b;

                    float red = (r * 0.393) + (g * 0.769) + (b * 0.189);
                    float green = (r * 0.349) + (g * 0.686) + (b * 0.168);
                    float blue = (r * 0.272) + (g * 0.534) + (b * 0.131);

                    float rr = r * (1.0 - amount) + red * amount;
                    float gg = g * (1.0 - amount) + green * amount;
                    float bb = b * (1.0 - amount) + blue * amount;

                    col = vec3(rr, gg, bb);

                    gl_FragColor = vec4(col, 1.0);
                  }
                `;

    this.graphics.shaderList.add("normal", new Shader(this.gl, normal_v, normal_f));            
    this.graphics.shaderList.add("wave", new Shader(this.gl, wave_v, wave_f));
    this.graphics.shaderList.add("crt", new Shader(this.gl, crt_v, crt_f));
    this.graphics.shaderList.add("blackAndWhite", new Shader(this.gl, baw_v, baw_f));
    this.graphics.shaderList.add("sepia", new Shader(this.gl, sepia_v, sepia_f));

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

		this.graphics.normal();
    	//this.graphics.wave(400,400);
    	//this.graphics.blackAndWhite(0.8);
    	this.graphics.usingEffect = false;
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
			var ratio = this.size.x / this.size.y;
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
			this.scale *= this.gameScale;
			this.setSize(Math.floor(nWidth), Math.floor(nHeight));
			this.ctx.scale(this.scale, this.scale);
      this.gl.viewport(0, 0, nWidth, nHeight);
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
		if(width == 0 || height == 0) console.error("Width and Height can't be 0.");

		this.size.x = width;
		this.size.y = height;

		this.cvs.width = width;
		this.cvs.height = height;
		this.cvs.style.width = width;
		this.cvs.style.height = height;

		this.glcvs.width = width;
		this.glcvs.height = height;
		this.glcvs.style.width = width;
		this.glcvs.style.height = height;

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

  saveData(key, value){
    if(key == null || value == null){
      console.error("Key or value can't be null.")
      return;
    } 
    localStorage.setItem(key, value);
    return this.getData(key);
  }

  clearData(){
    localStorage.clear();
  }

  getData(key){
    if(key == null){
      console.error("Key can't be null.")
      return;
    } 
    return localStorage.getItem(key);
  }
}
