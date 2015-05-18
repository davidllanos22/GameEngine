/**
* Entity class.
* @constructor
* @param {int} x - X position of the new instance.
* @param {int} y - Y position of the new instance.
* @param {String} name - Name of the new instance.
*/

class Entity{
	constructor(x, y, name){
		this.position = new Math.Vector2(x, y);
		this.name = name;
		this.parent;
		this.sprite;
		this.rect;
		this.childs = new Array();
		this.game;
		this.init();
	}
	
	init(){

	}

	setPosition(x, y){
		this.position.x = x;
		this.position.y = y;
	}

	onScreen(){
		if(this.rect != null)return this.rect.collides(game.currentCamera.rect);
	}

	add(child){

	}

	remove(id){

	}

	destroy(){
		//change to remove from parent. make the reference
		this.game.currentScene.remove(this);
	}

	render(){

	}

	update(){

	}

}
