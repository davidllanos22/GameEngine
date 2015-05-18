/**
* Animation class.
* @constructor
* @param {int} time - Time of the animation.
* @param {Array} frames - Array of frames represented as [[0,0],[0,1]].
*/
class Animation{
  constructor(game, time, w, h, frames){
    this.game = game;
    this.frames = frames;
    this.w = w;
    this.h = h;
    this.actualFrame = 0;
    this.timer = new Timer(time, true, null, null, ()=>{
      if(this.actualFrame == this.frames.length - 1)this.actualFrame = 0;
      else this.actualFrame ++;
    });
    this.timer.start();
  }
  
  render(src,x,y,w,h,a){
    this.game.graphics.imageSectionRot(src, x, y, this.frames[this.actualFrame][0], this.frames[this.actualFrame][1], this.w, this.h, w, h,a);
  }
}