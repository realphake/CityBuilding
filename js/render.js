
var render = function () {
	clear();
	
	for ( var x = 0; x < world.width; x++ ) {
		for ( var y = 0; y < world.height; y++ ) {
			var color = "blue";
			if ( world.typeMap[x][y] == DIRT ) color = "brown";
			if ( world.typeMap[x][y] == GRASS ) color = "green";
			if ( world.typeMap[x][y] == ROCK ) color = "grey";
			drawBox(x*10,y*10,10,10,color);
		}
	}
	
};

var clear = function () {
	canvas.width = canvas.width;
	
};

var drawBox = function(x,y,w,h,color) {
	context.fillStyle=color;
	context.fillRect(x,y,w,h);
	
};
