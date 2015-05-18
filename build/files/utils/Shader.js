"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Shader = (function () {
  function Shader(gl, vertex, fragment) {
    _classCallCheck(this, Shader);

    this.gl = gl;
    this.vertex = vertex;
    this.fragment = fragment;

    this.vertexShader = this.createShader(gl.VERTEX_SHADER, this.vertex);
    this.fragmentShader = this.createShader(gl.FRAGMENT_SHADER, this.fragment);
    this.program = this.createProgram(this.vertexShader, this.fragmentShader);
    this.buffers = new Map();
    this.locations = new Map();
  }

  _createClass(Shader, [{
    key: "getProgram",
    value: function getProgram() {
      return this.program;
    }
  }, {
    key: "printDebug",
    value: function printDebug() {
      console.log(this.gl.getShaderInfoLog(this.vertexShader));
      console.log(this.gl.getShaderInfoLog(this.fragmentShader));
      console.log(this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS));
      console.log(this.gl.getProgramInfoLog(this.program));
    }
  }, {
    key: "enable",
    value: function enable() {
      this.gl.useProgram(this.program);
    }
  }, {
    key: "disable",
    value: function disable() {
      this.gl.useProgram(null);
    }
  }, {
    key: "createShader",
    value: function createShader(type, source) {
      var shader = this.gl.createShader(type);
      this.gl.shaderSource(shader, source);
      this.gl.compileShader(shader);
      return shader;
    }
  }, {
    key: "createProgram",
    value: function createProgram(vs, fs) {
      var program = this.gl.createProgram();
      this.gl.attachShader(program, vs);
      this.gl.attachShader(program, fs);
      this.gl.linkProgram(program);
      return program;
    }
  }, {
    key: "getBuffer",
    value: function getBuffer(name) {
      if (this.buffers.has(name)) {
        return this.buffers.get(name);
      } else {
        this.buffers.set(name, this.gl.createBuffer());
        return this.getBuffer(name);
      }
    }
  }, {
    key: "getUniform",
    value: function getUniform(name) {
      if (this.locations.has(name)) {
        return this.locations.get(name);
      } else {
        this.enable();
        var a = this.gl.getUniformLocation(this.program, name);
        this.locations.set(name, a);
        return this.locations.get(name);
      }
    }
  }, {
    key: "getAttribute",
    value: function getAttribute(name) {
      if (this.locations.has(name)) {
        return this.locations.get(name);
      } else {
        this.enable();
        var a = this.gl.getAttribLocation(this.program, name);
        this.locations.set(name, a);
        return this.locations.get(name);
      }
    }
  }, {
    key: "setUniform1i",
    value: function setUniform1i(name, a) {
      this.gl.uniform1i(this.getUniform(name), a);
    }
  }, {
    key: "setUniform1f",
    value: function setUniform1f(name, a) {
      this.gl.uniform1f(this.getUniform(name), a);
    }
  }, {
    key: "setUniform2f",
    value: function setUniform2f(name, a, b) {
      this.gl.uniform2f(this.getUniform(name), a, b);
    }
  }, {
    key: "setUniform3f",
    value: function setUniform3f(name, a, b, c) {
      this.gl.uniform3f(this.getUniform(name), a, b, c);
    }
  }, {
    key: "setUniform4f",
    value: function setUniform4f(name, a, b, c, d) {
      this.gl.uniform4f(this.getUniform(name), a, b, c, d);
    }
  }, {
    key: "setUniformMatrix4f",
    value: function setUniformMatrix4f(name, a) {
      this.gl.uniformMatrix4fv(this.getUniform(name), false, a);
    }
  }]);

  return Shader;
})();