//Utils is a collection of static helper functions.

Utils = {};

Utils.getScreenShoot = function(game){
  var data = game.cvs.toDataURL();
  window.open(data,'_blank');
  return data;
}

Utils.getBase64Image = function(img) {
    var cvs = document.createElement("canvas");
    cvs.width = img.width;
    cvs.height = img.height;
 
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    return cvs.toDataURL("image/png");
}

/*
function extendEntity(ChildClass) {
  ChildClass.prototype = new Entity();
  ChildClass.prototype.constructor = ChildClass;
  Entity.call(ChildClass.prototype,ChildClass.x,ChildClass.y,"Scene");

}

C = function(x,y){
  this.position.x = x;
  this.position.y = y;
}

extendEntity(C);

*/


//this log functions sucks.
Utils.log = function (x){
   console.log({
        'message': x,
        'caller': this, 
        'stack':arguments.callee.caller.toString()
    });
	//console.log("%c [GAME ENGINE - LOG]: " + x ,'color: #1010DD');
}
Utils.logLoad = function (x){
	console.log("%c [GAME ENGINE - LOADER]: " + x ,'color: #10DD10');
}
Utils.logErr = function (x){
	//console.log("%c [GAME ENGINE - ERROR]: "+x,'color: #DD1010');
	throw new Error("[GAME ENGINE - ERROR]: "+x);
}

Utils.logObj = function (x){
	console.log(x);
}

//this shouldnt be here..
Utils.loopSound = function(sound){
  sound.loop = true;
	sound = sound.cloneNode()
	sound.play();
}
Utils.playSound = function(sound){
  sound = sound.cloneNode()
  sound.play();
}

