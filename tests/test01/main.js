var game = new Game(window.innerWidth,window.innerHeight);

var monk;
var s1,s2;
var items = new Array();
var scene;

var player;

game.init = function(){
	monk = this.loader.loadImage("monk.png");
	s1 = this.loader.loadSound("sound01.wav");
	s2 = this.loader.loadSound("sound02.wav");

	player = new Player(10,10);
	for(var i = 0; i<2; i++)this.currentScene.add(new Monkey(Utils.random(this.width/this.scale),Utils.random(this.height/this.scale)));
	this.currentScene.add(player);
	scene = this.currentScene;
}

game.render = function(){
	this.renderer.clearScreen("black");
	this.renderer.drawString(this.currentScene.name,4,12,10,"white");
	
}

game.update = function(){
	if(this.input.keyDown[Keys.space])Utils.log("pressing space");

	if(this.input.mouseClick[2]){
		this.currentScene.changeScene(new Scene(this,"Scene 02"));
		Utils.playSound(s1);
	}
	if(this.input.mouseClick[0]){
		this.currentScene.changeScene(scene);
		Utils.playSound(s2);
	}

}

Monkey = function(x,y){
	Entity.call(this,x,y);
	this.rot = 0;
	this.rect = new Rectangle(24,24);
	this.collides = false;
}

Monkey.prototype = Object.create(Entity.prototype);
Monkey.prototype.constructor = Monkey;

Monkey.prototype.render = function(){
	this.game.renderer.drawImageRot(monk,this.x,this.y,0,0,24,this.rot);
	this.game.renderer.drawRect(this.rect.x,this.rect.y,this.rect.w,this.rect.h,this.collides ? "rgba(255,55,55,0.5)": "rgba(55,255,55,0.5)" );
}

Monkey.prototype.update = function(){
	this.collides = false;
	this.rot +=0.01;

	this.rect.setPosition(this.x,this.y);
	for(var i = 0; i<this.game.currentScene.childs.length;i++){
		var e = this.game.currentScene.childs[i];
		if(e != this){
			if(this.rect.collides(e.rect)){
				this.collides = true;
				e.collides = true; 
			}

		}
	}
	
}

Player = function(x,y){
	Monkey.call(this,x,y);
	Utils.logObj(this);
}

Player.prototype = Object.create(Monkey.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(){
	this.collides = false;
	
	this.rect.setPosition(this.x,this.y);
	for(var i = 0; i<this.game.currentScene.childs.length;i++){
		var e = this.game.currentScene.childs[i];
		if(e!= this){
			//this.collides = this.rect.collides(e.rect);
			if(this.rect.collides(e.rect)){
				this.collides = true;
				e.collides = true; 
			}
		}
	}
	var v = 0.8;
	if(this.game.input.keyDown[Keys.d])this.x+=v;
	if(this.game.input.keyDown[Keys.a])this.x-=v;
	if(this.game.input.keyDown[Keys.w])this.y-=v;
	if(this.game.input.keyDown[Keys.s])this.y+=v;

	
	
	
}