Utils = {};

Utils.random = function(x){
	return Math.floor((Math.random()*x));
}

Utils.log = function (x){
	console.log("%c [GAME ENGINE - LOG]: " + x ,'color: #1010DD');
}
Utils.logLoad = function (x){
	console.log("%c [GAME ENGINE - LOADER]: " + x ,'color: #10DD10');
}
Utils.logErr = function (x){
	//console.log("%c [GAME ENGINE - ERROR]: "+x,'color: #DD1010');
	throw new Error("[GAME ENGINE - ERROR]: "+x);
}

Utils.logObj = function (x){
	console.log(x);
}