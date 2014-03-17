
var render = function () {
	clear();
	
	drawLandTiles();
	drawWorldObjects();
	drawShadows();
	drawSelection();
	
	showDebugInfo();
	
};

var showDebugInfo = function() {
	context.fillStyle="white";
	context.fillText("FPS: " + Math.round(view.fps) + "/50",0,10);
	context.fillText("SEED: " + Math.round(world.seed),0,20);
};

var showLoading = function() {
	clear();
	context.fillStyle="black";
	context.fillText("LOADING " + 
			Math.round(100*images.loaded/images.totalNumber) + "%",0,10);
};

var drawSelection = function () {
	if ( mouse.isDown ) {
		var selection = getSelection();
		drawBox(selection.left*view.scale-view.offset.x,
				selection.top*view.scale-view.offset.y,
				(selection.width)*view.scale,(selection.height)*view.scale,
				"yellow");
	}
};

var drawLandTiles = function () {
	var topleft = screenCtoWorldC(0,0);
	var bottomright = screenCtoWorldC(view.screenSize.x,view.screenSize.y);
	for ( var x = topleft.x; x < bottomright.x+1; x++ ) {
		for ( var y = topleft.y; y < bottomright.y+1; y++ ) {
			context.drawImage(getTileImage(x,y),
					x*view.scale-view.offset.x,
					y*view.scale-view.offset.y,
					view.scale,view.scale);
		}
	}
};

var drawShadows = function () {
	var topleft = screenCtoWorldC(0,0);
	var bottomright = screenCtoWorldC(view.screenSize.x,view.screenSize.y);
	for ( var x = topleft.x; x < bottomright.x+1; x++ ) {
		for ( var y = topleft.y; y < bottomright.y+1; y++ ) {
			if (world.getShadowAt(x,y) > world.getHeightAt(x,y)) {
				drawBox(x*view.scale-view.offset.x,
						y*view.scale-view.offset.y,
						view.scale,view.scale,
						"black");
			}
		}
	}
};

var drawWorldObjects = function () {
	for ( var i = 0; i < world.numberOfObjects; i++ ) {
		obj = world.objectList[i];
		context.drawImage(getObjectImage(obj.objectType),
				obj.xCoord*view.scale-view.offset.x, 
				obj.yCoord*view.scale-view.offset.y,
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
	if ( world.getTypeAt(x,y) == DIRT ) image = images.sand;
	if ( world.getTypeAt(x,y) == GRASS ) image = images.grass;
	if ( world.getTypeAt(x,y) == ROCK ) image = images.rock;
	return image;
}

var clear = function () {
	canvas.width = canvas.width;
	
};

var drawBox = function(x,y,w,h,color) {
	context.globalAlpha = 0.5;
	context.fillStyle=color;
	context.fillRect(x,y,w,h);
	context.globalAlpha = 1;
	
};
