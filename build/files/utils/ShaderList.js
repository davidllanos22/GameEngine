"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ShaderList = (function () {
  function ShaderList() {
    _classCallCheck(this, ShaderList);

    this.shaders = new Map();
  }

  _createClass(ShaderList, [{
    key: "getList",
    value: function getList() {
      return this.shaders;
    }
  }, {
    key: "add",
    value: function add(name, program) {
      this.shaders.set(name, program);
      return this.get(name);
    }
  }, {
    key: "get",
    value: function get(name) {
      return this.shaders.get(name);
    }
  }, {
    key: "delete",
    value: function _delete(name) {
      return this.shaders["delete"](name);
    }
  }]);

  return ShaderList;
})();