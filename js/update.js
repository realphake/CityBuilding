
var update = function () {
	if ( mouse.justChanged && !mouse.isDown ) {
		selection = getSelection();
		placeBuilding(selection.left,selection.top,
				selection.width,selection.height);
	}
};

var placeBuilding = function(x,y,w,h) {
	if ( areaFree(x,y,w,h) ) {
		var medianHeight = findMedianHeight(x,y,w,h);
		for ( var xBuild = x; xBuild < x+w; xBuild++ ) {
			for ( var yBuild = y; yBuild < y+h; yBuild++ ) {
				world.heightMap[xBuild][yBuild] = medianHeight;
			}
		}
		addObject(x,y,w,h,medianHeight,BUILDING);
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
};

var areaFree = function(x,y,w,h) {
	for ( var xCheck = x; xCheck < x+w; xCheck++ ) {
		for ( var yCheck = y; yCheck < y+h; yCheck++ ) {
			if ( !squareIsFree(xCheck, yCheck) )
				return false;
		}
	}
	return true;
};

var squareIsOccupied = function (x,y) {
	for ( var i = 0; i < world.numberOfObjects; i++ ) {
		var object = world.objectList[i];
		if ( object.xCoord <= x && object.xCoord+object.width > x &&
				object.yCoord <= y && object.yCoord+object.height > y ) {
			return true;
		}
	}
	return false;
};

var squareIsFree = function (x,y) {
	var isWater = world.typeMap[x][y] == WATER;
	var isRock = world.typeMap[x][y] == ROCK;
	var occupied = squareIsOccupied(x,y);
	return !isWater && !isRock && !occupied;
};
