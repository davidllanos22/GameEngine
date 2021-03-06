/**
* Font class.
* @constructor
* @param {Image} img - Image containing the characters of the font.
* @param {String} chars - String with the characters ordered the same way as the image.
* @param {int} size - Size of the sub-image to be cutted.
* @param {int} separation - Separation between the characters.
*/
class Font{
  constructor(img, chars, w, h, separation){
    this.chars = chars || "ABCDEFGHIJKLMNOP"+
                          "QRSTUVWXYZ      "+
                          "0123456789      "+
                          "!?.;:,-         ";
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
  }

  render(char, x, y, g){
    for(var i = 0; i < this.chars.length; i++){
      if(this.chars.charAt(i) == char.toUpperCase()){
        var xx = i % 16;
        var yy = Math.floor(i/16);
        g.imageSection(this.img, x, y, xx, yy, this.w, this.h, this.w, this.h);
      }
    }
  }
}
