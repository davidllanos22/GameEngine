Animation = function(time, frames){
  this.frames = frames;
  var self = this;
  this.actualFrame = 0;
  this.timer = new Timer(time,true,null,null,function(){
    if(self.actualFrame==self.frames.length-1)self.actualFrame = 0;
    else self.actualFrame ++;
  });
  this.timer.start();
}

Animation.prototype = {
  render: function(src,x,y,w,h){
    game.renderer.drawImageSection(src,x,y,this.frames[this.actualFrame][0],this.frames[this.actualFrame][1],w,h);
  }

}