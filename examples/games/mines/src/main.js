var game = new Game(480,145*3);

var tiles = game.loader.loadImage("media/tiles.png");
var faces = game.loader.loadImage("media/faces.png");
var overlay = game.loader.loadImage("media/overlay.png");
var numbers = game.loader.loadImage("media/numbers.png");

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

var mainTimer = new Timer(380,true,null,null,function(){
  if(!gameOver && !gameWin)timerCount++;
});

var font = new Font(numbers,"0123456789",11,13,13);
var fontDefault = new Font();

game.init = function(){
  game.gameScale = 3;
  
  game.graphics.setClearColor("#9cb1a8");
  game.graphics.font = font;
  initGame();
}

game.update = function(){
  faceState = 0; 

  if(gameOver){
    faceState = 2; 
    game.cvs.style.webkitFilter = "blur("+Math.randomRange(0,2)+"px) hue-rotate("+Math.randomRange(0,180)+"deg)";
    game.cvs.style.filter = "blur("+Math.randomRange(0,2)+"px) hue-rotate("+Math.randomRange(0,180)+"deg)";
    game.currentCamera.shake(20,Math.randomTo(1));
  }else if(gameWin){
    faceState = 3; 
  }else{

    game.cvs.style.webkitFilter = "blur(0px) hue-rotate(0deg)";
    game.cvs.style.filter = "blur(0px) hue-rotate(0deg)";
  }
  if(faceRect.collides(new Rectangle(game.input.mouse.x,game.input.mouse.y,1,1))){
    if(game.input.mouseClick[0]){
      initGame();
    }
  }

}
game.render = function(){
  game.graphics.image(overlay,0,0);
  game.graphics.imageSection(faces, 71, 15, faceState, 0, 18, 18, 18, 18);

  game.graphics.print((timerCount<100?"0": "" )+(timerCount<10?"0": "" )+ timerCount,101,18); 
  game.graphics.print((minesCount<100?"0": "" )+(minesCount<10?"0": "" )+ (minesCount< 0? 0:minesCount),21,18);
}

var initGame = function(){
  if(gameWin) bombsMax += 2;
  gameOver = false;
  gameWin = false;
  faceState = 0;
  timerCount = 0;

  minesCount = bombsMax;
  freeCount = (mapWidth * mapHeight) - minesCount;
  blocks = [];
  
  var l = game.currentScene.childs.length;

  while(l > 0){
    game.currentScene.childs[0].destroy();
    l = game.currentScene.childs.length;
  }
  
  for(var xx = 0; xx < mapWidth; xx++){
      blocks[xx] = [];
    for(var yy = 0; yy < mapHeight; yy++){
        blocks[xx][yy] = new Block(xx, yy,false); 
        game.currentScene.add(blocks[xx][yy]);

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