class Shader{
  constructor(gl, vertex, fragment){
    this.gl = gl;
    this.vertex = vertex;
    this.fragment = fragment;

    this.vertexShader = this.createShader(gl.VERTEX_SHADER, this.vertex);
    this.fragmentShader = this.createShader(gl.FRAGMENT_SHADER, this.fragment);
    this.program = this.createProgram(this.vertexShader, this.fragmentShader);
    this.buffers = new Map();
    this.locations = new Map();
  } 

  getProgram(){
    return this.program;
  }
  
  printDebug(){
    console.log(this.gl.getShaderInfoLog(this.vertexShader));
    console.log(this.gl.getShaderInfoLog(this.fragmentShader));
    console.log(this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS));
    console.log(this.gl.getProgramInfoLog(this.program));
  }

  enable(){
    this.gl.useProgram(this.program);
  }

  disable(){
    this.gl.useProgram(null);
  }

  createShader(type, source){
    var shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    return shader;
  }

  createProgram(vs, fs){
    var program = this.gl.createProgram();
    this.gl.attachShader(program, vs);
    this.gl.attachShader(program, fs);
    this.gl.linkProgram(program);
    return program;
  }

  getBuffer(name){
    if(this.buffers.has(name)){
      return this.buffers.get(name);
    }
    else{
      this.buffers.set(name, this.gl.createBuffer());
      return this.getBuffer(name);
    }
  }
  
  getUniform(name){
    if(this.locations.has(name)){
      return this.locations.get(name);
    }
    else{
      this.enable();
      var a = this.gl.getUniformLocation(this.program, name);
      this.locations.set(name, a);
      return this.locations.get(name);
    }
  }

  getAttribute(name){
    if(this.locations.has(name)){
      return this.locations.get(name);
    }
    else{
      this.enable();
      var a = this.gl.getAttribLocation(this.program, name);
      this.locations.set(name, a);
      return this.locations.get(name);
    }
  }

  setUniform1i(name, a){
    this.gl.uniform1i(this.getUniform(name), a);
  }

  setUniform1f(name, a){
    this.gl.uniform1f(this.getUniform(name), a);
  }

  setUniform2f(name, a, b){
    this.gl.uniform2f(this.getUniform(name), a, b);
  }

  setUniform3f(name, a, b, c){
    this.gl.uniform3f(this.getUniform(name), a, b, c);
  }

  setUniform4f(name, a, b, c, d){
    this.gl.uniform4f(this.getUniform(name), a, b, c, d);
  }

  setUniformMatrix4f(name, a){
    this.gl.uniformMatrix4fv(this.getUniform(name), false, a);
  }
}
