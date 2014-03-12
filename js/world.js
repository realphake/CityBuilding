
var WATER = 0, DIRT = 1, GRASS = 2, ROCK = 3;
var BUILDING = 0, TREE = 1;

var view = {
	scale: 20,
	border: 1
};

var world = {
	width: 9,
	height: 9,
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

var diamondSquare = function (left,top,right,bottom) {
	if ((right-left) <= 1 || (bottom-top) <= 1 ) return;
	var midX = (right+left)/2, midY = (bottom+top)/2;
	// Diamond
	world.heightMap[midX][midY] = 0;
	// Square
	world.heightMap[left][midY] = 0;
	world.heightMap[midX][top] = 0;
	world.heightMap[right][midY] = 0;
	world.heightMap[midX][bottom] = 0;
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
			heightColumn.push(-1);
		}
		world.heightMap.push(heightColumn);
	}
	
	world.heightMap[0][0] = 0;
	world.heightMap[world.width-1][0] = 0;
	world.heightMap[0][world.height-1] = 0;
	world.heightMap[world.width-1][world.height-1] = 0;
	
	diamondSquare(0,0,world.width-1,world.height-1);
	
	for ( var x = 0; x < world.width; x++ ) {
		var typeColumn = [];
		for ( var y = 0; y < world.height; y++ ) {
			if (world.heightMap[x][y] == -1) typeColumn.push(WATER);
			else typeColumn.push(GRASS);
		}
		world.typeMap.push(typeColumn);
	}
	
};
