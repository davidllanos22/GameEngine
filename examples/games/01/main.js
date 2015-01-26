var game = new Game(640,480); // create a new instance of the game

// Basic match 2 game.
var titleImage;
var menuScene = new Scene(game,"Menu");
var gameScene = new Scene(game,"Game");

menuScene.render = function(){
	game.graphics.image(game.titleImage,60,0);
	game.graphics.print("CLICK TO PLAY",170,300,40,"#5775b9");
}
menuScene.update = function(){
	if(game.input.mouseClick[0]){
		game.currentScene.changeScene(new TransitionScene(game.currentScene,gameScene));
	}
}
gameScene.init = function(){
	
	game.moves = 0;
	game.cardCount = 0;

	game.colors2 = [];

	for (i = 0; i<game.colors.length;i++){
		game.colors2.push(game.colors[i]);
		game.colors2.push(game.colors[i]);
	}

	for (i = 0; i < 4; i++) {
		for (j = 0; j < 4; j++) {
			var n = Math.randomTo(game.colors2.length-1);
			var card = new Card(110+i*(game.cardSize+10), 25+j*(game.cardSize+10),game.colors2[n],game.cardSize);
			game.cardCount++;
			game.colors2.splice(n,1);
			this.add(card);	
		}		
	}
}
gameScene.render = function(){
	game.graphics.print("Moves: "+game.moves,8,4,20,"#5775b9");
}

game.init = function() {
	game.graphics.setClearColor("#b7ceed");
	this.cardSize = 100;

	this.currentScene = menuScene;
	this.titleImage = game.loader.loadImage("title.png");
	this.actionTimer = new Timer(100, false, null, null, actionCardFinish);
	this.restartTimer = new Timer(200, false, null, null, actionRestartFinish);

	// green purple magenta orange brown blue yellow red
	this.colors = ["#77DD77","#966FD6","#F49AC2","#FFB347","#836953","#779ECB","#FDFD96","#FF6961"]
	//this.reset();
}
game.reset = function() {
	this.moves = 0;
	this.cardCount = 0;

	this.colors2 = [];

	for (i = 0; i<this.colors.length;i++){
		this.colors2.push(this.colors[i]);
		this.colors2.push(this.colors[i]);
	}

	for (i = 0; i < 4; i++) {
		for (j = 0; j < 4; j++) {
			var n = Utils.random(this.colors2.length);
			var card = new Card(110+i*(this.cardSize+10), 25+j*(this.cardSize+10),this.colors2[n],this.cardSize);
			this.cardCount++;
			this.colors2.splice(n,1);
			this.currentScene.add(card);	
		}		
	}
}

game.setSelected = function(card){
	this.lastCard = this.actualCard;
	this.actualCard = card;

	this.moves ++;
	if(this.lastCard != null && this.actualCard != null){	
		this.actionTimer.start();
	}

}

var actionCardFinish = function(){
	if(game.lastCard.color == game.actualCard.color){
		game.lastCard.destroy();
		game.actualCard.destroy();
		game.cardCount-=2;
		if(game.cardCount<=0){
			game.restartTimer.start();
		}

	}else{
		game.actualCard.flip();
		game.lastCard.flip();
	}

	game.actualCard = null;
	game.lastCard = null;

}

var actionRestartFinish = function(){
	game.currentScene = menuScene;

}


/*
	Card Entity Class
*/

Card = function(x,y,color,cardSize) {
	Entity.call(this,x,y,"Card");
	this.rect = new Rectangle(x,y,cardSize,cardSize);
	this.size = new Math.Vector2(cardSize,cardSize);
	this.cardSize = cardSize;
	this.hover = false;
	this.flipping = false;
	this.flipped = false;
	this.alreadyFlipped = false;
	this.flipN = 0;
	this.color = color;
	this.oX=x;
	this.flipRate = 0.05;
}

Card.prototype = Object.create(Entity.prototype);
Card.prototype.constructor = Card;

Card.prototype.render = function() {
	if(this.hover)game.graphics.rect(this.position.x-2,this.position.y-2,this.size.x+4,this.size.y+4, "white");
	game.graphics.rect(this.position.x,this.position.y,this.size.x,this.size.y,this.flipped ? this.color : "#5775b9");
}

Card.prototype.update = function() {

	if(this.rect.collides(new Rectangle(game.input.mouse.x,game.input.mouse.y,1,1))){
		this.hover = true;
		if(game.input.mouseClick[0] && !this.flipped && !game.actionCard) this.flip();
	}else{
		this.hover = false;
	}

	if(this.flipping){
		this.flipN += this.flipRate;
		this.size.x -= this.flipN;
		this.position.x = this.oX + this.cardSize/2 - this.size.x/2;

		if(this.size.x< 0){
			if(!this.alreadyFlipped){
				if(!this.flipped )game.setSelected(this);
				this.flipped = !this.flipped;
				this.alreadyFlipped = true;
			}
			this.flipRate = -this.flipRate;
		}
		if(this.size.x < - this.cardSize ){
			this.flipRate = - this.flipRate;
			this.position.x = this.oX;
			this.size.x = this.cardSize;
			this.flipping = false;
		}
	}

}

Card.prototype.flip = function() {
	if(!this.flipping){
		this.flipping = true;
		this.alreadyFlipped = false;
		this.flipN = 0;
	}

}

