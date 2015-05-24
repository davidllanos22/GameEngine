/**
* Graphics class.
* @constructor
* @param {Game} game - Instance of the Game class.
*/
class Graphics{
	constructor(game){
		this.game = game;
		this.ctx = this.game.getContext();

		this.renderCounter = 0;
		this.clearColor = "#000000";
		this.font = new Font();
		this.shaderList = new ShaderList();
		this.canvasTexture = this.createTexture();
    this.effect = "WAVE";
	}

	point(x, y, color){
		this.setColor(color);
		this.ctx.fillRect(x, y, 1, 1);
		this.renderCounter++;
	}

	line(x0, y0, x1, y1, color){
		this.setColor(color);
		this.ctx.beginPath();
    this.ctx.moveTo(x0, y0);
    this.ctx.lineTo(x1, y1);
    this.ctx.stroke();
	}

	rect(x, y, w, h, color){
		// x = Math.floor(x);
		// y = Math.floor(y);
		// w = Math.floor(w);
		// h = Math.floor(h);
		this.setColor(color);
		this.ctx.fillRect(x, y, w, h);
		this.renderCounter++;
	}

	circle(x, y, r, color){
		this.setColor(color);
		this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    this.ctx.fill();
	}

	setClearColor(color){
		this.clearColor = color;
	}

	clear(){
		this.rect(0, 0, this.game.getSize().x * this.game.getScale(), this.game.getSize().y * this.game.getScale(), this.clearColor);
		var gl = this.game.gl;
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	}

	print(text, x, y, scale){
		if(scale != null){
			this.ctx.save();
			this.ctx.scale(this.game.getScale() - (this.game.getScale() - scale), this.game.getScale() - (this.game.getScale() - scale));
		}
		for(var i = 0; i < text.length; i++){
			this.font.render(text.charAt(i), x + this.font.separation * i, y, this);	
		}
		if(scale != null)
			this.ctx.restore();
		//this.ctx.fillStyle=color;
		//this.ctx.font=size+"px pixel";
		//this.ctx.fillText(text,x,size+y);
		this.renderCounter++;
	}

	setColor(color){
		this.ctx.strokeStyle = color;
		this.ctx.fillStyle = color;
	}

	setFont(newFont){
		this.font = newFont;
	}

	image(src, x, y){
		x = Math.floor(x);
		y = Math.floor(y);
		this.ctx.drawImage(src, 0, 0, src.width, src.height, x, y, src.width, src.height);
		this.renderCounter++;
	}

	imageSection(src, x, y, xx, yy, sw, sh, w, h){
		x = Math.floor(x);
		y = Math.floor(y);
		xx = Math.floor(xx);
		yy = Math.floor(yy);
		w = Math.floor(w);
		h = Math.floor(h);

		if(w < 0 ) w = 0;
		if(h < 0 ) h = 0;

		this.ctx.drawImage(src, xx * sw, yy * sh, sw, sh, x, y, w, h);
		this.renderCounter++;
	}

	imageSectionRot(src, x, y, xx, yy, sw, sh, w, h, rot){
		x = Math.floor(x);
		y = Math.floor(y);
		xx = Math.floor(xx);
		yy = Math.floor(yy);
		w = Math.floor(w);
		h = Math.floor(h);

		if(w < 0 ) w = 0;
		if(h < 0 ) h = 0;

		this.ctx.save();
		this.ctx.translate(x + (w / 2), y + (h / 2));
		this.ctx.rotate(rot);
		//this.ctx.drawImage(src,xo*s,yo*s,s,s,-s/2,-s/2,s,s);
		this.ctx.drawImage(src, xx * sw, yy * sh, sw, sh, -w / 2, -h / 2, w, h);
		this.ctx.restore();
		this.renderCounter++;
	}	

	wave(dX, dY){
    var gl = this.game.gl;

    var shader = this.shaderList.get("wave");
    var program = shader.getProgram();
    shader.enable();

    shader.setUniform2f("u_resolution", this.game.getSize().x, this.game.getSize().y);
    shader.setUniform1f("dX", dX || 10000);
    shader.setUniform1f("dY", dY || 10000);
    shader.setUniform1f("offset", this.c);

    gl.bindBuffer(gl.ARRAY_BUFFER, shader.getBuffer("pos"));
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      0.0,  0.0,
      1.0,  0.0,
      0.0,  1.0,
      0.0,  1.0,
      1.0,  0.0,
      1.0,  1.0]), gl.STATIC_DRAW);

    gl.enableVertexAttribArray(shader.getAttribute("a_position"));
    gl.vertexAttribPointer(shader.getAttribute("a_position"), 2, gl.FLOAT, false, 0, 0);

    if(this.c < Math.PI * 2) this.c += 0.1;
    else this.c = 0;

    this.updateTexture(this.canvasTexture, this.game.cvs)

    shader.setUniform1i("u_image", this.canvasTexture);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.bindTexture(gl.TEXTURE_2D, null);
  }

  normal(){
    var gl = this.game.gl;

    var shader = this.shaderList.get("normal");
    var program = shader.getProgram();
    shader.enable();

    shader.setUniform2f("u_resolution", this.game.getSize().x, this.game.getSize().y);

    gl.bindBuffer(gl.ARRAY_BUFFER, shader.getBuffer("pos"));
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      0.0,  0.0,
      1.0,  0.0,
      0.0,  1.0,
      0.0,  1.0,
      1.0,  0.0,
      1.0,  1.0]), gl.STATIC_DRAW);

    gl.enableVertexAttribArray(shader.getAttribute("a_position"));
    gl.vertexAttribPointer(shader.getAttribute("a_position"), 2, gl.FLOAT, false, 0, 0);

    if(this.c < Math.PI * 2) this.c += 0.1;
    else this.c = 0;

    this.updateTexture(this.canvasTexture, this.game.cvs)

    shader.setUniform1i("u_image", this.canvasTexture);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.bindTexture(gl.TEXTURE_2D, null);
  }

  blackAndWhite(amount){
    var gl = this.game.gl;

    var shader = this.shaderList.get("blackAndWhite");
    var program = shader.getProgram();
    shader.enable();

    shader.setUniform2f("u_resolution", this.game.getSize().x, this.game.getSize().y);
    shader.setUniform1f("amount", amount || 1.0);

    gl.bindBuffer(gl.ARRAY_BUFFER, shader.getBuffer("pos"));
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      0.0,  0.0,
      1.0,  0.0,
      0.0,  1.0,
      0.0,  1.0,
      1.0,  0.0,
      1.0,  1.0]), gl.STATIC_DRAW);

    gl.enableVertexAttribArray(shader.getAttribute("a_position"));
    gl.vertexAttribPointer(shader.getAttribute("a_position"), 2, gl.FLOAT, false, 0, 0);

    if(this.c < Math.PI * 2) this.c += 0.1;
    else this.c = 0;

    this.updateTexture(this.canvasTexture, this.game.cvs)

    shader.setUniform1i("u_image", this.canvasTexture);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.bindTexture(gl.TEXTURE_2D, null);
  }

  sepia(amount){
    var gl = this.game.gl;

    var shader = this.shaderList.get("sepia");
    var program = shader.getProgram();
    shader.enable();

    shader.setUniform2f("u_resolution", this.game.getSize().x, this.game.getSize().y);
    shader.setUniform1f("amount", amount || 1.0);

    gl.bindBuffer(gl.ARRAY_BUFFER, shader.getBuffer("pos"));
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      0.0,  0.0,
      1.0,  0.0,
      0.0,  1.0,
      0.0,  1.0,
      1.0,  0.0,
      1.0,  1.0]), gl.STATIC_DRAW);

    gl.enableVertexAttribArray(shader.getAttribute("a_position"));
    gl.vertexAttribPointer(shader.getAttribute("a_position"), 2, gl.FLOAT, false, 0, 0);

    if(this.c < Math.PI * 2) this.c += 0.1;
    else this.c = 0;

    this.updateTexture(this.canvasTexture, this.game.cvs)

    shader.setUniform1i("u_image", this.canvasTexture);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.bindTexture(gl.TEXTURE_2D, null);
  }

  crt(tint, speed, lineWidth){
    var gl = this.game.gl;

    var shader = this.shaderList.get("crt");
    var program = shader.getProgram();
    shader.enable();

    shader.setUniform2f("u_resolution", this.game.getSize().x + 1000 , this.game.getSize().y + 1000);
    shader.setUniform1f("speed", speed == 0 ? 0 : speed || 10);
    shader.setUniform3f("tint", Graphics.hexToRgb(tint).r / 255 || 1.8, Graphics.hexToRgb(tint).g / 255 || 1.8, Graphics.hexToRgb(tint).b / 255 || 1.8);
    shader.setUniform1f("lineWidth", lineWidth == 0 ? 0 : lineWidth || 1024);
    shader.setUniform1f("time", this.c);

    gl.bindBuffer(gl.ARRAY_BUFFER, shader.getBuffer("pos"));
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1.0,  -1.0,
      -1.0,  1.0,
      1.0,  -1.0,
      1.0,  -1.0,
      1.0,  1.0,
      -1.0,  1.0]), gl.STATIC_DRAW);

    gl.enableVertexAttribArray(shader.getAttribute("a_position"));
    gl.vertexAttribPointer(shader.getAttribute("a_position"), 2, gl.FLOAT, false, 0, 0);

    if(this.c < Math.PI * 2)
      this.c += 0.02;
    else this.c = 0;

    this.updateTexture(this.canvasTexture, this.game.cvs)

    shader.setUniform1i("u_image", this.canvasTexture);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.bindTexture(gl.TEXTURE_2D, null);
  }

	createTexture(){
    var gl = this.game.gl;

    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    return texture;
  }

  updateTexture(texture, src){
    var gl = this.game.gl;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src || null);
  }

  static hexToRgb(hex){
    var r = (hex & 0xFF0000) >> 16;
    var g = (hex & 0x00FF00) >> 8;
    var b = hex & 0x0000FF;
    var a = 1;
    return {r: r, g: g, b: b, a: a};
  }
}
