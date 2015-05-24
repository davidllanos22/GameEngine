/**
* Scene class.
* @constructor
* @param {Game} game - instance of the Game class.
* @param {String} name - Name of the Scene.
*/
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var Scene = (function (_Entity) {
	function Scene(game, name) {
		_classCallCheck(this, Scene);

		_get(Object.getPrototypeOf(Scene.prototype), "constructor", this).call(this, 0, 0, "Scene");
		this.name = name;
		this.game = game;
		this.ySorting = true;
		this.init();
	}

	_inherits(Scene, _Entity);

	_createClass(Scene, [{
		key: "add",
		value: function add(child) {
			child.game = this.game;
			this.childs.push(child);
		}
	}, {
		key: "remove",
		value: function remove(child) {
			this.childs.splice(this.childs.indexOf(child), 1);
		}
	}, {
		key: "removeAll",
		value: function removeAll() {
			var l = this.childs.length;

			while (l > 0) {
				this.remove(this.childs[0]);
				l = this.childs.length;
			}
		}
	}, {
		key: "changeScene",
		value: function changeScene(scene) {
			this.game.currentScene = scene;
			//this.game.currentScene.init();
		}
	}, {
		key: "renderInternal",
		value: function renderInternal() {
			this.render();
			for (var i = 0; i < this.childs.length; i++) {
				//if(this.childs[i].onScreen())
				this.childs[i].render();
			}
		}
	}, {
		key: "updateInternal",
		value: function updateInternal() {
			if (this.ySorting) {
				this.childs.sort(function (a, b) {
					var aa = Math.floor(a.position.y);
					var bb = Math.floor(b.position.y);
					if (aa == bb) {
						aa = Math.floor(a.position.x);
						bb = Math.floor(b.position.x);
					}
					return aa - bb;
				});
			}

			for (var i = 0; i < this.childs.length; i++) {
				this.childs[i].update();
			}

			this.update();
		}
	}]);

	return Scene;
})(Entity);

/**
* TransitionScene class.
*
* @constructor
* @param {Scene} from - Origen Scene.
* @param {Scene} to - End Scene.
*/

var TransitionScene = (function (_Scene) {
	function TransitionScene(game, from, to) {
		var _this = this;

		_classCallCheck(this, TransitionScene);

		_get(Object.getPrototypeOf(TransitionScene.prototype), "constructor", this).call(this, game, "Transition");
		this.from = from;
		this.to = to;
		this.visible = this.from;
		this.time = 300;

		this.fadeOut = new Timer(game, this.time, false, null, null, function () {
			_this.game.currentScene.changeScene(_this.to);
		});

		this.fadeIn = new Timer(game, this.time, false, null, null, function () {
			_this.visible = to;
			_this.to.init();
			_this.fadeOut.start();
		});

		this.fadeIn.start();
	}

	_inherits(TransitionScene, _Scene);

	_createClass(TransitionScene, [{
		key: "render",
		value: function render() {
			this.visible.renderInternal();
			if (this.fadeIn.isRunning) this.game.graphics.rect(0, 0, this.game.getSize().x, this.game.getSize().y, "rgba(255,255,255," + this.fadeIn.time / this.time + ")");else this.game.graphics.rect(0, 0, this.game.getSize().x, this.game.getSize().y, "rgba(255,255,255," + (this.time - this.fadeOut.time) / this.time + ")");
		}
	}]);

	return TransitionScene;
})(Scene);