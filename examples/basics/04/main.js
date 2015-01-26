var game = new Game(640,480); // create a new instance of the game

var pos = new Math.Vector2(0,0);

var v = 1;

game.render = function(){
	game.graphics.rect(pos.x,pos.y,50,50,"red"); // draw rect
	game.graphics.print("Use WASD or direction keys to move",10,440,20,"white"); // draw string 
}

game.update = function(){
	if(game.input.check(Keys.D) || game.input.check(Keys.RIGHT)) pos.x += v;
	if(game.input.check(Keys.A) || game.input.check(Keys.LEFT)) pos.x -= v;
	if(game.input.check(Keys.W) || game.input.check(Keys.UP)) pos.y -= v;
	if(game.input.check(Keys.S) || game.input.check(Keys.DOWN)) pos.y += v;
}