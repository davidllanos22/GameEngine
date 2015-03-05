Block = function(x, y, isMine){
  Entity.call(this,x,y,"Block");
  this.isMine = isMine;
  this.rect = new Rectangle((x+1)*8,(y+6)*8,8,8);
  this.hovered = false;
  this.marked = false;
  this.markN = 0;
  this.revealed = false;
  this.count = 0;
  this.explode = false;
}

Block.prototype = Object.create(Entity.prototype);
Block.prototype.constructor = Block;

Block.prototype.render = function(){
  var xx = 8;
  var yy = 8;

  if(this.marked)
    game.graphics.imageSection(tiles, (this.position.x+1)*8, (this.position.y+6)*8, 6 + this.markN, 0, 8, 8, 8, 8);
  else if(!this.revealed)
      game.graphics.imageSection(tiles, (this.position.x+1)*8, (this.position.y+6)*8, 0, 0, 8, 8, 8, 8);
  else if(this.isMine)
    game.graphics.imageSection(tiles, (this.position.x+1)*8, (this.position.y+6)*8, 9+this.explode|0, 0, 8, 8, 8, 8);
  else if(!this.isMine)
    if(this.count == 0)
      game.graphics.imageSection(tiles, (this.position.x+1)*8, (this.position.y+6)*8, 1, 0, 8, 8, 8, 8);
    else 
      game.graphics.imageSection(tiles, (this.position.x+1)*8, (this.position.y+6)*8, 1+this.count, 0, 8, 8, 8, 8);

}
Block.prototype.update = function(){
  if(!gameOver && !gameWin){
    if(this.rect.collides(new Rectangle(game.input.mouse.x+game.currentCamera.position.x,game.input.mouse.y+game.currentCamera.position.y,1,1))){
      this.hovered = true;
      if(game.input.mouseClick[0] && !this.revealed){
        
        if(this.marked){
          faceState = 1;
        }else if(this.isMine){
          this.explode = true;
          gameOver = true;
          Utils.playSound(bomb);
          faceState = 2;
          this.revealBombs();
        }
        else{
          Utils.playSound(bip01);
          freeCount --;
          this.revealed = true;
          if(this.checkBlocks() == 0){
            this.revealNear();

          }
        }
      }
      if(game.input.mouseClick[2] && !this.revealed){
        Utils.playSound(bip02);
        if(this.marked){

          if(this.markN == 0){
            this.markN ++;  
            minesCount ++;
          }else{
            this.markN = 0;
            this.marked = false;
          }
        }else{
          minesCount --;
          this.marked = true;
        }
      }
      if(freeCount == 0){
        gameWin = true;
        faceState = 3;
      }
    }
    else 
      this.hovered = false;  
  }
  
}

Block.prototype.checkBlocks = function(){
  var count = 0;
  var i = 1;

  for(var xx = this.position.x-i; xx<= this.position.x+i; xx++){
    for(var yy = this.position.y-i; yy<= this.position.y+i; yy++){
      if(xx >= 0 && yy >= 0 && xx < mapWidth && yy < mapHeight){
        if(blocks[xx][yy].isMine && blocks[xx][yy] != this)count++;
      }
    }
  } 
  this.count = count;
  return count;
}
Block.prototype.revealNear = function(){
  var i = 1;

  for(var xx = this.position.x-i; xx<= this.position.x+i; xx++){
    for(var yy = this.position.y-i; yy<= this.position.y+i; yy++){

      if(  (xx != this.position.x-i && yy == this.position.y ) ||
           (xx != this.position.x+i && yy == this.position.y ) || 
           (xx == this.position.x && yy != this.position.y-i ) || 
           (xx == this.position.x && yy != this.position.y+i ) ){

          if( xx >= 0 && yy >= 0 && xx < mapWidth && yy < mapHeight){
           
            if(!blocks[xx][yy].isMine && !blocks[xx][yy].revealed && blocks[xx][yy] != this){
                freeCount --;
                blocks[xx][yy].revealed = true;
                blocks[xx][yy].checkBlocks();
                if(blocks[xx][yy].count==0)
                  blocks[xx][yy].revealNear();
            }
          }
      }
    }
  } 
}
Block.prototype.revealBombs = function(){
  for(var xx = 0; xx< mapWidth; xx++){
    for(var yy = 0; yy< mapHeight; yy++){
      if(blocks[xx][yy].isMine){
          blocks[xx][yy].revealed = true;
         
      }
    }
  } 
}