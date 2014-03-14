
var update = function () {
	if ( mouse.justChanged && !mouse.isDown ) {
		selection = getSelection();
		placeBuilding(selection.left,
				selection.top,
				selection.width,selection.height);
	}
	if ( mouse.isNowAt.x > 600 ) view.offsetX += 5;
	else if ( mouse.isNowAt.x < 50 ) view.offsetX -= 5;
	if ( mouse.isNowAt.y > 400 ) view.offsetY += 5;
	else if ( mouse.isNowAt.y < 50 ) view.offsetY -= 5;
	
};

var placeBuilding = function(x,y,w,h) {
	if ( areaFree(x,y,w,h) && w > 0 && h > 0 ) {
		var medianHeight = findMedianHeight(x,y,w,h);
		flattenTerrain(x,y,w,h,medianHeight);
		addObject(x,y,w,h,medianHeight,BUILDING);
	}
	
};

var flattenTerrain = function (x,y,w,h,elevation) {
	for ( var xBuild = x; xBuild < x+w; xBuild++ ) {
		for ( var yBuild = y; yBuild < y+h; yBuild++ ) {
			world.heightMap[xBuild][yBuild] = elevation;
		}
	}
}

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
