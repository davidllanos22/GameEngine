/**
* Animation class.
* @constructor
* @param {int} time - Time of the animation.
* @param {Array} frames - Array of frames represented as [[0,0],[0,1]].
*/
Animation = function(time, w, h, frames){
  this.frames = frames;
  this.w = w;
  this.h = h;
  var self = this;
  this.actualFrame = 0;
  this.timer = new Timer(time, true, null, null, function(){
    if(self.actualFrame == self.frames.length - 1)self.actualFrame = 0;
    else self.actualFrame ++;
  });
  this.timer.start();
}

Animation.prototype = {
  render: function(src,x,y,w,h,a){
    game.graphics.imageSectionRot(src, x, y, this.frames[this.actualFrame][0], this.frames[this.actualFrame][1], this.w, this.h, w, h,a);
  }
}