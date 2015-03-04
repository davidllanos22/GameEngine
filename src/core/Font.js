/**
* Font class.
* @constructor
* @param {Image} img - Image containing the characters of the font.
* @param {String} chars - String with the characters ordered the same way as the image.
* @param {int} size - Size of the sub-image to be cutted.
* @param {int} separation - Separation between the characters.
*/
Font = function(img,chars,w,h,separation){

  this.chars = chars || "ABCDEFGHIJKLMNOP"+
                        "QRSTUVWXYZ      "+
                        "0123456789      "+
                        "!?.;:,          ";
                      
  this.w = w || 16;
  this.h = h || 20;

  this.separation = separation || 16;
  
  if(!img){
    this.img = new Image();
    this.img.src = "data:image/png;base64,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";
    //this.img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAAAgCAYAAADKbvy8AAACkklEQVRoQ+2Z227EMAhEu///0V3lwZXXAs7g4CTVui9VA+Y2ZiDp62f//OsKvLrof4dMetkhqpSPtqvtH/as+NuzI5cov9n4yL5lt5V9jCn6+082AqgG4BVADfDseatrLJu9Xi/3dMlGu2gewMfzWdutQZqN8RKa8W8AP6/CWQCtzvc6bLyEzff4uz/f7Lsd2BudoZizHdj8E4VRB3gUGuUXdZfXyePzCgCJUvtO/ZgDRDEZOVHcagol+zM053XGWPAZ29blWTID1Q6lDqAOoyXEuyAUH834CgbwOllZAr2RNto0KdQqyn728ApEM+vhoe/wrDWVKOgp8miJiSgss3X3dugdzaW4rmBEoVM3MpNQZomZWSLOrPBqATP5VgOobLJpEDMJfTOAEZj9Fhox1KhXMr6yABKFVm151hbqUWNfGPKv5BtdVIUlojjV83InKglZBbIc9O9JFgD0HqVQTFQAYgjqIuVLiPqpjEaIDBApjgCqHeYBqJ73EiQKIgDpvNrFtLTMxL98iSGws/JyusgG8A36JYP0Gwr11ByzFNrymP0UtpJiiaJWy2/BOLPEqMsMzRlPTksIUTLJaUnK+M/4Wgqs1YHRpqWAo+jQlkbyaAtWCkb2Z+SK33KdSgCJohqwHg3T+bNyhUGaj5kRUQ6OYrCSQjO0QrozcqJAAlA9rzCMUvsSndkl5nAe/cd+Rq7MKFqCIjkVnjqcLkAJIFkj+zUiW7GH6WcAVG/oyhSJWqnLVsZ2i22LBhVQlUJWJ5TxmdGtjvNSe3cASMX15HSOZuilhb3KWQbAuyl0A2jciiyACr2uunwbQAHAVcWvsLsBFACMiqQWkPRm5XRuz8CKNgEbGRAsU8p5ReeCVK9x8QYuBVMwQMGAVQAAAABJRU5ErkJggg==;"
  }else{
    this.img = img;  
  }

  this.render = function(char,x,y,graphics){
    for(var i = 0; i<this.chars.length;i++){
      if(this.chars.charAt(i) == char.toUpperCase()){
        var xx = i % 16;
        var yy = Math.floor(i/16);
        graphics.imageSection(this.img,x,y,xx,yy,this.w,this.h,this.w,this.h);
      }
    }
  }
}  