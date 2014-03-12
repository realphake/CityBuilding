
var WATER = 0, DIRT = 1, GRASS = 2, ROCK = 3;
var BUILDING = 0, TREE = 1;

var view = {
	scale: 3,
	border: 1
};

var world = {
	width: 129,
	height: 129,
	heightMap: [],
	typeMap: [],
	objectList: [],
	numberOfObjects: 0,
	seed: 0
};

var getSelection = function() {
	var sel = {};
	if ( mouse.wentDownAt.x < mouse.isNowAt.x ) {
		sel.left = Math.floor(mouse.wentDownAt.x/view.scale);
		sel.right = Math.ceil(mouse.isNowAt.x/view.scale);
	} else { 
		sel.left = Math.floor(mouse.isNowAt.x/view.scale);
		sel.right = Math.ceil(mouse.wentDownAt.x/view.scale);
	}
	if ( mouse.wentDownAt.y < mouse.isNowAt.y ) {
		sel.top = Math.floor(mouse.wentDownAt.y/view.scale);
		sel.bottom = Math.ceil(mouse.isNowAt.y/view.scale);
	} else {
		sel.top = Math.floor(mouse.isNowAt.y/view.scale);
		sel.bottom = Math.ceil(mouse.wentDownAt.y/view.scale);
	}
	sel.width = Math.ceil(Math.abs(sel.right - sel.left));
	sel.height = Math.ceil(Math.abs(sel.bottom - sel.top));
	return sel;
};

var addObject = function(x,y,w,h,e,type) {
	var theObject = {
		xCoord: x, yCoord: y, width: w, height: h,
		elevation: e, objectType: type
	}
	world.objectList.push(theObject);
	world.numberOfObjects += 1;
	console.log( "Number of objects now in the world: ", 
			world.numberOfObjects);
};

var getHeightAt = function(x,y) {
	if ( x < 0 || y < 0 ) return 0;
	if ( x >= world.width || y >= world.height ) return 0;
	return world.heightMap[x][y];
};

var diamondSquare = function (left,top,right,bottom) {
	if ((right-left) <= 1 || (bottom-top) <= 1 ) return;
	var midX = (right+left)/2, midY = (bottom+top)/2;
	var lt = getHeightAt(left,top);
	var rt = getHeightAt(right,top);
	var lb = getHeightAt(left,bottom);
	var rb = getHeightAt(right,bottom);
	var avg = (lt+rt+lb+rb)/4;
	// Diamond
	world.heightMap[midX][midY] = avg;
	// Square
	world.heightMap[left][midY] = (lt+lb+avg)/3;
	world.heightMap[midX][top] = (lt+rt+avg)/3;
	world.heightMap[right][midY] = (rt+rb+avg)/3;
	world.heightMap[midX][bottom] = (lb+rb+avg)/3;
	//Recursion
	diamondSquare(left,top,midX,midY);
	diamondSquare(midX,top,right,midY);
	diamondSquare(left,midY,midX,bottom);
	diamondSquare(midX,midY,right,bottom);
}

var initialize = function(s) {
	world.seed = s;
	seed(s);
	
	for ( var x = 0; x < world.width; x++ ) {
		var heightColumn = [];
		for ( var y = 0; y < world.height; y++ ) {
			heightColumn.push(-100);
		}
		world.heightMap.push(heightColumn);
	}
	
	world.heightMap[0][0] = 0;
	world.heightMap[world.width-1][0] = 0.5;
	world.heightMap[0][world.height-1] = 0.5;
	world.heightMap[world.width-1][world.height-1] = 1;
	
	diamondSquare(0,0,world.width-1,world.height-1);
	
	for ( var x = 0; x < world.width; x++ ) {
		var typeColumn = [];
		for ( var y = 0; y < world.height; y++ ) {
			if (world.heightMap[x][y] < 0.3) typeColumn.push(WATER);
			else if (world.heightMap[x][y] < 0.6) typeColumn.push(DIRT);
			else if (world.heightMap[x][y] < 0.9) typeColumn.push(GRASS);
			else typeColumn.push(ROCK);
		}
		world.typeMap.push(typeColumn);
	}
	
};
