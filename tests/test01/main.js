var game = new Game(window.innerWidth,window.innerHeight);

var monk;
var s1,s2;
var items = new Array();
var enti;

game.init = function(){
	monk = this.loader.loadImage("monk.png");
	s1 = this.loader.loadSound("sound01.wav");
	s2 = this.loader.loadSound("sound02.wav");

	enti = new Monkey(60,60);

	Utils.logObj(enti);

}

game.render = function(){
	this.renderer.clearScreen("black");
	enti.render(this);
	
}

game.update = function(){
	if(this.input.keyDown[Keys.space])Utils.log("pressing space");

	if(this.input.mouseClick[2]){
		Utils.playSound(s1);
	}
	if(this.input.mouseClick[0]){
		Utils.playSound(s2);
	}

	enti.update();
}

Monkey = function(x,y){
	Entity.call(this,x,y);
	this.rot = 0;
}

Monkey.prototype = Object.create(Entity.prototype);
Monkey.prototype.constructor = Monkey;

Monkey.prototype.render = function(game){
	game.renderer.drawImageRot(monk,this.x,this.y,0,0,24,this.rot);
}

Monkey.prototype.update = function(){
	this.rot +=0.01;
}