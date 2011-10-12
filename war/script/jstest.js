function Object(){
	this.name = "1";
}

function start(){
	var obj = new Object();
	updateName(obj);
	
	setInterval(function(){
		updateName(obj);
	},1000);
}

function updateName(o){
	var obj = o;
	obj.name = obj.name+"a";
	console.log(obj.name);
}
