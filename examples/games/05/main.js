var game = new Game(640,480); // create a new instance of the game

// Scenes

var menuScene = new Scene(game,"Menu");
var gameScene = new Scene(game,"Game");

// Images

var title;
var play;
var cards;
var cardSize;
var playmat;

// Sounds

var cardFlip;
var cardFlip2;
var yay;
var loop;

game.init = function() {
  game.graphics.setClearColor("#c9003d");
  game.cardSize = 70;
  game.gameScale =1;
  game.fillScreen = false;
  game.fillScreenWithRatio = true;
  game.currentScene.changeScene(menuScene);
  game.showPlay = true;
  game.wave = 0;
  game.waveSpeed = 1;
  game.waveMax  = 0.10;

  title = game.loader.loadImage("title.png");
  cards = game.loader.loadImage("cards.png");
  playmat = game.loader.loadImage("playmat.png");
  play = game.loader.loadImage("play.png");


  cardFlip = game.loader.loadSound("card-flip.wav");
  cardFlip2 = game.loader.loadSound("card-flip2.wav");
  yay = game.loader.loadSound("yay.wav");
  loop = game.loader.loadSound("loop.mp3");

  game.actionTimer = new Timer(100, false, null, null, actionCardFinish);
  game.restartTimer = new Timer(200, false, null, null, actionRestartFinish);
  game.playTimer = new Timer(200, true, null, null, function(){ game.showPlay = !game.showPlay;});
  game.waveTimer = new Timer(200, true, null, function(){
    if(Math.abs(game.wave) >= game.waveMax){
      game.waveSpeed *= -1;

    }
    game.wave += Math.lerp(game.wave,(game.waveMax+0.1)*game.waveSpeed,0.003)*0.2;
  }, null);
  game.playTimer.start();
  game.waveTimer.start();
  this.colors = [0,1,2,3,4,5];

  Utils.loopSound(loop);

}

game.reset = function() {
  game.showPlay = true;
  game.playTimer.start();
  game.moves = 0;
  game.cardCount = 0;
  game.wave = 0;

  game.colors2 = [];

  for (i = 0; i<game.colors.length;i++){
    game.colors2.push(game.colors[i]);
    game.colors2.push(game.colors[i]);
  }

  for (i = 0; i < 4; i++) {
    for (j = 0; j < 3; j++) {
      var n = Math.randomTo(game.colors2.length-1);
      var card = new Card(105+i*(game.cardSize+50), 40+j*(100+50),game.colors2[n],game.cardSize);
      game.cardCount++;
      game.colors2.splice(n,1);
      gameScene.add(card); 
    }   
  }
}

game.setSelected = function(card){
  Utils.playSound(cardFlip2);
  game.lastCard = this.actualCard;
  game.actualCard = card;

  game.moves ++;
  if(game.lastCard != null && game.actualCard != null){ 
    game.actionTimer.start();
  }

}


menuScene.render = function(){
  for(var i = 0; i<8; i++){
    game.graphics.imageSection(playmat,0,i*60,0,0,60,60,60,60);
    game.graphics.imageSection(playmat,game.width/game.scale-60,i*60,1,0,60,60,60,60);
  }
  game.graphics.imageSectionRot(title,-123,-40,0,0,title.width,title.height,title.width*2,title.height*2,game.wave);
  if(game.showPlay)game.graphics.imageSection(play,130,350,0,0,play.width,play.height,play.width*2,play.height*2);
}
menuScene.update = function(){
  if(game.input.mouseClick[0]){
    game.currentScene.changeScene(new TransitionScene(game.currentScene,gameScene));
  }
}
gameScene.init = function(){
  game.reset();
  game.waveTimer.pause();
  
}
gameScene.render = function(){
  
  for(var i = 0; i<9; i++){
    game.graphics.imageSection(playmat,0,i*60,0,0,60,60,60,60);
    game.graphics.imageSection(playmat,game.width/game.scale-60,i*60,1,0,60,60,60,60);
  }
  game.graphics.print("Moves: "+game.moves,8,4,20,"#5775b9");
}

var actionCardFinish = function(){
  if(game.lastCard.color == game.actualCard.color){
    game.lastCard.destroy();
    game.actualCard.destroy();
    game.cardCount-=2;
    if(game.cardCount<=0){
      Utils.playSound(yay);
      game.waveTimer.reset();
      game.restartTimer.start();
    }

  }else{
    Utils.playSound(cardFlip);
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
  this.rect = new Rectangle(x,y,cardSize,100);
  this.size = new Math.Vector2(cardSize,100);
  this.cardSize = cardSize;
  this.hover = false;
  this.flipping = false;
  this.flipped = false;
  this.alreadyFlipped = false;
  this.flipN = 0;
  this.color = color;
  this.oX=x;
  this.flipRate = 0.07;
}

Card.prototype = Object.create(Entity.prototype);
Card.prototype.constructor = Card;

Card.prototype.render = function() {
  if(this.hover)game.graphics.rect(this.position.x-2,this.position.y-2,this.size.x+4,this.size.y+4, "white");
  //game.graphics.rect(this.position.x,this.position.y,this.size.x,this.size.y,this.flipped ? this.color : "#5775b9");
  game.graphics.imageSection(cards,this.position.x,this.position.y,this.flipped ? 1 : 0,0,60,100,this.size.x,100);
  if(this.flipped) game.graphics.imageSection(cards,this.position.x,this.position.y,this.color + 1 ,0,60,100,this.size.x,100);
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

    if(this.size.x<= 0){
      if(!this.alreadyFlipped){
        if(!this.flipped )game.setSelected(this);
        this.flipped = !this.flipped;
        this.alreadyFlipped = true;
      }
      this.flipRate = - this.flipRate;
    }
    if(this.size.x <= - this.cardSize ){
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

