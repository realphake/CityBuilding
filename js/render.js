
var render = function () {
	clear();
	for ( var x = 0; x < world.width; x++ ) {
		for ( var y = 0; y < world.height; y++ ) {
			drawBox(x*view.scale,y*view.scale,view.scale,view.scale,
					getAppropriateColor(x,y));
		}
	}
	for ( var i = 0; i < world.numberOfObjects; i++ ) {
		obj = world.objectList[i];
		drawBox(obj.xCoord*view.scale+view.border,
				obj.yCoord*view.scale+view.border,
				obj.width*view.scale-2*view.border,
				obj.height*view.scale-2*view.border,
				"black");
	}
	
	if ( mouse.isDown ) {
		var selection = getSelection();
		drawBox(selection.left*view.scale,selection.top*view.scale,
				(selection.width)*view.scale,(selection.height)*view.scale,
				"yellow");
	}
	
};

var getAppropriateColor = function(x,y) {
	var color = "blue";
	if ( world.typeMap[x][y] == DIRT ) color = "brown";
	if ( world.typeMap[x][y] == GRASS ) color = "green";
	if ( world.typeMap[x][y] == ROCK ) color = "grey";
	return color;
}

var clear = function () {
	canvas.width = canvas.width;
	
};

var drawBox = function(x,y,w,h,color) {
	context.fillStyle=color;
	context.fillRect(x,y,w,h);
	
};
