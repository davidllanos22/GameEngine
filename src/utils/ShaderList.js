class ShaderList{
  constructor(){
    this.shaders = new Map();
  }

  getList(){
    return this.shaders;
  }

  add(name, program){
    this.shaders.set(name, program);
    return this.get(name);
  }

  get(name){
    return this.shaders.get(name);
  }

  delete(name){
    return this.shaders.delete(name);
  }
}