var game = new Game(640,480); // create a new instance of the game

// Basic match 2 game.

var cardSize = 100;



game.init = function() {
	this.cardSize = 100;
	this.actionCard = false;
	this.finishedGame = false;
	this.actionCardTimerMax = 100;
	this.restartTimerMax = 300;

	// green purple magenta orange brown blue yellow red
	this.colors = ["#77DD77","#966FD6","#F49AC2","#FFB347","#836953","#779ECB","#FDFD96","#FF6961"]
	this.reset();
}

game.reset = function() {
	this.currentScene = new Scene(this,"game");

	// Set colors
	this.moves = 0;
	this.cardCount = 0;
	this.actionCardTimer = 0;
	this.restartTimer = 0;


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

}
game.render = function() {
	this.renderer.clearScreen("black");
	this.renderer.drawString("Moves: "+this.moves,8,4,20,"white");
}
game.update = function(){
	if(this.input.keyDown[Keys.Space])this.reset();


	if(this.lastCard != null && this.actualCard != null){
		this.actionCard = true;
	}

	if(this.actionCard){
		if(this.actionCardTimer < this.actionCardTimerMax)this.actionCardTimer++;
		else{
			if(this.lastCard.color == this.actualCard.color){
				this.lastCard.destroy();
				this.actualCard.destroy();
				this.cardCount-=2;
				Utils.log(this.cardCount)
				if(this.cardCount<=0){
					this.finishedGame = true;
				}
			}else{
				this.actualCard.flip();
				this.lastCard.flip();
			}

			this.actualCard = null;
			this.lastCard = null;

			this.actionCard = false;
			this.actionCardTimer = 0;
		}
		
	}

	if(this.finishedGame){
		if(this.restartTimer < this.restartTimerMax)this.restartTimer++;
		else{
			this.finishedGame = false;
			this.reset();
		}
	}
}


/*
	Card Entity Class
*/

Card = function(x,y,color,cardSize) {
	Entity.call(this,x,y);
	this.rect = new Rectangle(x,y,cardSize,cardSize);
	this.hover = false;
	this.flipping = false;
	this.flipped = false;
	this.alreadyFlipped = false;
	this.flipN = 0;
	this.color = "grey";
	this.generatedColor = color;
	this.cardSize = cardSize
	this.width = cardSize;
	this.height = cardSize;
	this.oX=x;
	this.flipRate = 0.05;
}

Card.prototype = Object.create(Entity.prototype);
Card.prototype.constructor = Card;

Card.prototype.render = function() {
	if(this.hover)this.game.renderer.drawRect(this.x-2,this.y-2,this.width+4,this.height+4, "white");
	this.game.renderer.drawRect(this.x,this.y,this.width,this.height,this.color);
}

Card.prototype.update = function() {

	this.color = this.flipped ? this.generatedColor : "grey" ;

	if(this.rect.collides(new Rectangle(this.game.input.mouseX,this.game.input.mouseY,1,1))){
		this.hover = true;
		if(this.game.input.mouseClick[0] && !this.flipped) this.flip();
	}else{
		this.hover = false;
	}

	if(this.flipping){
		this.flipN += this.flipRate;
		this.width -= this.flipN;
		this.x = this.oX + this.game.cardSize/2 - this.width/2;

		if(this.width < 0){
			if(!this.alreadyFlipped){
				if(!this.flipped)this.game.setSelected(this);
				this.flipped = !this.flipped;

				this.alreadyFlipped = true;
				
			}
			this.flipRate = -this.flipRate;
		}
		if(this.width < -cardSize ){
			this.flipRate = -this.flipRate;
			this.x = this.oX;
			this.width = cardSize;
			this.flipping = false;
		}
	}

}

Card.prototype.flip = function() {
	if(!this.flipping){

		console.log(this.generatedColor)
		this.flipping = true;
		this.alreadyFlipped = false;
		this.flipN = 0;
	}

}

