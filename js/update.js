
var update = function () {
	if ( mouse.justChanged && !mouse.isDown ) {
		selection = getSelection();
		placeBuilding(selection.left, selection.top,
				selection.width, selection.height);
	}
	if ( mouse.isNowAt.x > view.screenSize.x-50 ) scroll(5,0);
	else if ( mouse.isNowAt.x < 50 ) scroll(-5,0);
	if ( mouse.isNowAt.y > view.screenSize.y-50 ) scroll(0,5);
	else if ( mouse.isNowAt.y < 50 ) scroll(0,-5);
	
};

var screenCtoWorldC = function (x,y) {
	var worldC = {};
	worldC.x = Math.floor((x+view.offset.x)/view.scale);
	worldC.y = Math.floor((y+view.offset.y)/view.scale);
	return worldC;
}


var getSelection = function() {
	var sel = {};
	if ( mouse.wentDownAt.x < mouse.isNowAt.x ) {
		sel.left = screenCtoWorldC(mouse.wentDownAt.x,mouse.wentDownAt.y).x;
		sel.right = screenCtoWorldC(mouse.isNowAt.x,mouse.isNowAt.y).x+1;
	} else { 
		sel.left = screenCtoWorldC(mouse.isNowAt.x,mouse.isNowAt.y).x;
		sel.right = screenCtoWorldC(mouse.wentDownAt.x,mouse.wentDownAt.y).x+1;
	}
	if ( mouse.wentDownAt.y < mouse.isNowAt.y ) {
		sel.top = screenCtoWorldC(mouse.wentDownAt.x,mouse.wentDownAt.y).y;
		sel.bottom = screenCtoWorldC(mouse.isNowAt.x,mouse.isNowAt.y).y+1;
	} else {
		sel.top = screenCtoWorldC(mouse.isNowAt.x,mouse.isNowAt.y).y;
		sel.bottom = screenCtoWorldC(mouse.wentDownAt.x,mouse.wentDownAt.y).y+1;
	}
	sel.width = sel.right - sel.left;
	sel.height = sel.bottom - sel.top;
	return sel;
};

var scroll = function (x,y) {
	view.offset.x += x;
	view.offset.y += y;
	if ( view.offset.x < 0 ) view.offset.x = 0;
	if ( view.offset.y < 0 ) view.offset.y = 0;
	var horScrollMax = world.size*view.scale-view.screenSize.x;
	if ( view.offset.x > horScrollMax ) view.offset.x = horScrollMax;
	var vertScrollMax = world.size*view.scale-view.screenSize.y;
	if ( view.offset.y > vertScrollMax ) view.offset.y = vertScrollMax;
}

var placeBuilding = function(x,y,w,h) {
	if ( areaFree(x,y,w,h) && w > 0 && h > 0 ) {
		var medianHeight = findMedianHeight(x,y,w,h);
		flattenTerrain(x,y,w,h,medianHeight);
		world.addObject(x,y,w,h,medianHeight,BUILDING);
	}
	
};

var flattenTerrain = function (x,y,w,h,elevation) {
	for ( var xBuild = x; xBuild < x+w; xBuild++ ) {
		for ( var yBuild = y; yBuild < y+h; yBuild++ ) {
			world.heightMap[xBuild][yBuild] = elevation;
		}
	}
	world.makeShadowMap();
}

var findMedianHeight = function(x,y,w,h) {
	var heights = [];
	for ( var xBuild = x; xBuild < x+w; xBuild++ ) {
		for ( var yBuild = y; yBuild < y+h; yBuild++ ) {
			heights.push( world.heightMap[xBuild][yBuild] );
		}
	}
	heights.sort();
	return heights[Math.floor(heights.length/2)];
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
	var isWater = world.getTypeAt(x,y) == WATER;
	var isRock = world.getTypeAt(x,y) == ROCK;
	var occupied = squareIsOccupied(x,y);
	return !isWater && !isRock && !occupied;
};
