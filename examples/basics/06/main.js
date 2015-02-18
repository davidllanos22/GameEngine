var game = new Game(640, 480); // Create a new instance of the game.

var timer = new Timer(10, true, start, null, null); // Create a new looped timer with a callbacks.

var rectCount = 0;
var col = row = 0;
var max = 33;

game.init = function(){
  game.graphics.setClearColor("#0d4c57");
}

game.init = function(){
  timer.start(); // Start the timer.
}

game.render = function(){
  row = 0;

  for(var i = 0; i < rectCount; i++){

    var color = i % 2 == 0 ? 0 : -100;
    
    col = i % max;

    var r = col * 10 + color;
    var g = row * 10 + color;
    var b = 200 + color;

    game.graphics.rect(col * 20,(row * 20), 20, 20, "rgb("+r+","+g+","+b+")");

    if (col == (max - 1)) {
      row++;
    }
  }

  game.graphics.print("Number of times looped: " + timer.count, 4, 4); // Draw a string.
}

function start(){
  rectCount ++;
}
