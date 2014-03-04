
// Update game objects
var update = function () {
	
};

var placeBuilding = function(x,y,w,h) {
	if ( areaFree(x,y,w,h) ) {
		var medianHeight = findMedianHeight(x,y,w,h);
		for ( var xBuild = x; xBuild < x+w; xBuild++ ) {
			for ( var yBuild = y; yBuild < y+h; yBuild++ ) {
				world.heightMap[xBuild][yBuild] = medianHeight;
			}
		}
	}
	
};

var findMedianHeight = function(x,y,w,h) {
	var heights = []
	for ( var xBuild = x; xBuild < x+w; xBuild++ ) {
		for ( var yBuild = y; yBuild < y+h; yBuild++ ) {
			heights.push( world.heightMap[xBuild][yBuild] );
		}
	}
	heights.sort();
	return heights[heights.length/2];
}

var areaFree = function(x,y,w,h) {
	var areaIsFree = true;
	for ( var xCheck = x; xCheck < x+w; xCheck++ ) {
		for ( var yCheck = y; yCheck < y+h; yCheck++ ) {
			if ( !squareIsFree(xCheck, yCheck) )
				areaIsFree  = false;
		}
	}
	return areaIsFree;
}

var squareIsFree = function (x,y) {
	var isWater = world.typeMap[x][y] == WATER;
	var isRock = world.typeMap[x][y] == ROCK;
	return !isWater && !isRock;
};