var game = new Game(640,480); // create a new instance of the game

var image;

game.init = function(){
	image = this.loader.loadImage("image.png"); // load image

}

game.render = function(){
	this.graphics.image(image,this.width/2-image.width/2,this.height/2-image.height/2); // draw image
}