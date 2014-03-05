
var render = function () {
	clear();
	for ( var x = 0; x < world.width; x++ ) {
		for ( var y = 0; y < world.height; y++ ) {
			drawBox(x*10,y*10,10,10,getAppropriateColor(x,y));
		}
	}
	for ( var i = 0; i < world.numberOfObjects; i++ ) {
		obj = world.objectList[i];
		var offset = 1;
		drawBox(obj.xCoord*10+offset,obj.yCoord*10+offset,
				obj.width*10-2*offset,obj.height*10-2*offset,"black");
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
