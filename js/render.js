
var render = function () {
	clear();
	
	drawLandTiles();
	drawWorldObjects();
	drawSelection();
	
	showDebugInfo();
	
};

var showDebugInfo = function() {
	context.fillStyle="white";
	context.fillText("FPS: " + Math.round(view.fps) + "/50",0,10);
	context.fillText("SEED: " + Math.round(world.seed),0,20);
}

var showLoading = function() {
	context.fillStyle="black";
	context.fillText("LOADING " + images.loaded/0.06 + "%",0,10);
}

var drawSelection = function () {
	if ( mouse.isDown ) {
		var selection = getSelection();
		drawBox(selection.left*view.scale,selection.top*view.scale,
				(selection.width)*view.scale,(selection.height)*view.scale,
				"yellow");
	}
};

var drawLandTiles = function () {
	for ( var x = 0; x < world.size; x++ ) {
		for ( var y = 0; y < world.size; y++ ) {
			
			context.drawImage(getTileImage(x,y),
					x*view.scale,y*view.scale,view.scale,view.scale);
		}
	}
};

var drawWorldObjects = function () {
	for ( var i = 0; i < world.numberOfObjects; i++ ) {
		obj = world.objectList[i];
		context.drawImage( getObjectImage(obj.objectType),
				obj.xCoord*view.scale, obj.yCoord*view.scale,
				obj.width*view.scale, obj.height*view.scale);
	}
};

var getObjectImage = function(type) {
	var image = images.house;
	if ( type == TREE ) image = images.tree;
	return image;
}

var getTileImage = function(x,y) {
	var image = images.water;
	if ( world.typeMap[x][y] == DIRT ) image = images.sand;
	if ( world.typeMap[x][y] == GRASS ) image = images.grass;
	if ( world.typeMap[x][y] == ROCK ) image = images.rock;
	return image;
}

var clear = function () {
	canvas.width = canvas.width;
	
};

var drawBox = function(x,y,w,h,color) {
	context.fillStyle=color;
	context.fillRect(x,y,w,h);
	
};