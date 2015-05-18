/**
* Graphics class.
* @constructor
* @param {Game} game - Instance of the Game class.
*/
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Graphics = (function () {
	function Graphics(game) {
		_classCallCheck(this, Graphics);

		this.game = game;
		this.ctx = this.game.getContext();

		this.renderCounter = 0;
		this.clearColor = "#000000";
		this.font = new Font();
	}

	_createClass(Graphics, [{
		key: "point",
		value: function point(x, y, color) {
			this.setColor(color);
			this.ctx.fillRect(x, y, 1, 1);
			this.renderCounter++;
		}
	}, {
		key: "line",
		value: function line(x0, y0, x1, y1, color) {
			this.setColor(color);
			this.ctx.beginPath();
			this.ctx.moveTo(x0, y0);
			this.ctx.lineTo(x1, y1);
			this.ctx.stroke();
		}
	}, {
		key: "rect",
		value: function rect(x, y, w, h, color) {
			// x = Math.floor(x);
			// y = Math.floor(y);
			// w = Math.floor(w);
			// h = Math.floor(h);
			this.setColor(color);
			this.ctx.fillRect(x, y, w, h);
			this.renderCounter++;
		}
	}, {
		key: "circle",
		value: function circle(x, y, r, color) {
			this.setColor(color);
			this.ctx.beginPath();
			this.ctx.arc(x, y, r, 0, 2 * Math.PI, false);
			this.ctx.fill();
		}
	}, {
		key: "setClearColor",
		value: function setClearColor(color) {
			this.clearColor = color;
		}
	}, {
		key: "clear",
		value: function clear() {
			this.rect(0, 0, this.game.getSize().x * this.game.getScale(), this.game.getSize().y * this.game.getScale(), this.clearColor);
		}
	}, {
		key: "print",
		value: function print(text, x, y, scale) {
			if (scale != null) {
				this.ctx.save();
				this.ctx.scale(this.game.getScale() - (this.game.getScale() - scale), this.game.getScale() - (this.game.getScale() - scale));
			}
			for (var i = 0; i < text.length; i++) {
				this.font.render(text.charAt(i), x + this.font.separation * i, y, this);
			}
			if (scale != null) this.ctx.restore();
			//this.ctx.fillStyle=color;
			//this.ctx.font=size+"px pixel";
			//this.ctx.fillText(text,x,size+y);
			this.renderCounter++;
		}
	}, {
		key: "setColor",
		value: function setColor(color) {
			this.ctx.strokeStyle = color;
			this.ctx.fillStyle = color;
		}
	}, {
		key: "setFont",
		value: function setFont(newFont) {
			this.font = newFont;
		}
	}, {
		key: "image",
		value: function image(src, x, y) {
			x = Math.floor(x);
			y = Math.floor(y);
			this.ctx.drawImage(src, 0, 0, src.width, src.height, x, y, src.width, src.height);
			this.renderCounter++;
		}
	}, {
		key: "imageSection",
		value: function imageSection(src, x, y, xx, yy, sw, sh, w, h) {
			x = Math.floor(x);
			y = Math.floor(y);
			xx = Math.floor(xx);
			yy = Math.floor(yy);
			w = Math.floor(w);
			h = Math.floor(h);

			if (w < 0) w = 0;
			if (h < 0) h = 0;

			this.ctx.drawImage(src, xx * sw, yy * sh, sw, sh, x, y, w, h);
			this.renderCounter++;
		}
	}, {
		key: "imageSectionRot",
		value: function imageSectionRot(src, x, y, xx, yy, sw, sh, w, h, rot) {
			x = Math.floor(x);
			y = Math.floor(y);
			xx = Math.floor(xx);
			yy = Math.floor(yy);
			w = Math.floor(w);
			h = Math.floor(h);

			if (w < 0) w = 0;
			if (h < 0) h = 0;

			this.ctx.save();
			this.ctx.translate(x + w / 2, y + h / 2);
			this.ctx.rotate(rot);
			//this.ctx.drawImage(src,xo*s,yo*s,s,s,-s/2,-s/2,s,s);
			this.ctx.drawImage(src, xx * sw, yy * sh, sw, sh, -w / 2, -h / 2, w, h);
			this.ctx.restore();
			this.renderCounter++;
		}
	}]);

	return Graphics;
})();