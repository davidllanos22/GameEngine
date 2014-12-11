var game = new Game(window.innerWidth,window.innerHeight);

var monk;
var s1,s2;
var items = new Array();
var scene;

game.init = function(){
	monk = this.loader.loadImage("monk.png");
	s1 = this.loader.loadSound("sound01.wav");
	s2 = this.loader.loadSound("sound02.wav");


	for(var i = 0; i<10; i++)this.currentScene.add(new Monkey(Utils.random(this.width/this.scale),Utils.random(this.height/this.scale)));
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
}

Monkey.prototype = Object.create(Entity.prototype);
Monkey.prototype.constructor = Monkey;

Monkey.prototype.render = function(){
	this.game.renderer.drawImageRot(monk,this.x,this.y,0,0,24,this.rot);
}

Monkey.prototype.update = function(){
	this.rot +=0.01;
}