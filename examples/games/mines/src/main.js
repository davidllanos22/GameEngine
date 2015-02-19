var game = new Game(640,480); // Create a new instance of the game.

// Load assets.

var tiles = game.loader.loadImage("media/tiles.png");
var faces = game.loader.loadImage("media/faces.png");
var overlay = game.loader.loadImage("media/overlay.png");
var numbers = game.loader.loadImage("media/numbers.png");

// Game Variables.

var blocks = [];
var bombsMax = 10;
var mapWidth = 18;
var mapHeight = 11;
var gameOver = false;
var gameWin = false;

var faceState = 0;
var faceRect = new Rectangle(71,15,18,18);

var timerCount = 0;
var minesCount = 0;
var freeCount = 0;

// This timer counts the time we have been playing.

var mainTimer = new Timer(380,true,null,null,function(){
  if(!gameOver && !gameWin)timerCount++;
});


var font = new Font(numbers,"0123456789",11,13,13); // Font to display numbers.


// Init function.

game.init = function(){
  game.setScale(2); // Set the scale.
  game.graphics.setClearColor("#9cb1a8"); // Change the clear/background color.
  game.graphics.font = font; // Set the font.
  game.currentCamera.setPosition(-game.getSize().x / 2 + 80,-game.getSize().y / 2 + 73,false);
  reset(); // Start the game.
}

// Update function.

game.update = function(){
  

  faceState = 0; 

  // Make some fancy effects when we loose.

  if(gameOver){
    faceState = 2; 
    game.getCanvas().style.webkitFilter = "blur("+Math.randomRange(0,2)+"px) hue-rotate("+Math.randomRange(0,180)+"deg)";
    game.getCanvas().style.filter = "blur("+Math.randomRange(0,2)+"px) hue-rotate("+Math.randomRange(0,180)+"deg)";
    game.currentCamera.shake(20,Math.randomTo(1));
  }else if(gameWin){
    faceState = 3; 
  }else{
    game.getCanvas().style.webkitFilter = "blur(0px) hue-rotate(0deg)";
    game.getCanvas().style.filter = "blur(0px) hue-rotate(0deg)";
  }

  // Reset the game if we click the face icon.

  if(faceRect.collides(new Rectangle(game.input.mouse.x+game.currentCamera.position.x,game.input.mouse.y+game.currentCamera.position.y,1,1))){
    if(game.input.mouseClick[0]){
      reset();
    }
  }

}

// Render function.

game.render = function(){
  game.graphics.image(overlay,0,0); // Draw the overlay.
  game.graphics.imageSection(faces, 71, 15, faceState, 0, 18, 18, 18, 18); // Draw the faces.

  game.graphics.print((timerCount<100?"0": "" )+(timerCount<10?"0": "" )+ timerCount,101,18); // Draw the time.
  game.graphics.print((minesCount<100?"0": "" )+(minesCount<10?"0": "" )+ (minesCount< 0 ? 0 : minesCount),21,18); // Draw the number of mines not marked.
}

// Reset function.

var reset = function(){
  if(gameWin) bombsMax += 2;
  gameOver = false;
  gameWin = false;
  faceState = 0;
  timerCount = 0;

  minesCount = bombsMax;
  freeCount = (mapWidth * mapHeight) - minesCount;
  blocks = [];
  
  game.removeAll();
  
  for(var xx = 0; xx < mapWidth; xx++){
      blocks[xx] = [];
    for(var yy = 0; yy < mapHeight; yy++){
        blocks[xx][yy] = new Block(xx, yy,false); 
        game.add(blocks[xx][yy]);

    }
  }

  for(var bomb = 0; bomb < bombsMax; bomb++){
    var xx = Math.randomTo(mapWidth-1);
    var yy = Math.randomTo(mapHeight-1);
    while(blocks[xx][yy].isMine == true){
      xx = Math.randomTo(mapWidth-1);
      yy = Math.randomTo(mapHeight-1);
    }
    blocks[xx][yy].isMine = true;
  }
  mainTimer.start();
}