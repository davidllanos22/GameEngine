var game = new Game(640,480); // create a new instance of the game


game.render = function(){
	this.graphics.rect(this.width/2-150,this.height/2-150,300,300,"#7f007f");
	this.graphics.rect(this.width/2-100,this.height/2-100,200,200,"#ff7f00");
	this.graphics.rect(this.width/2-50,this.height/2-50,100,100,"#996633");
	
}