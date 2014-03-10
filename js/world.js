
var WATER = 0, DIRT = 1, GRASS = 2, ROCK = 3;
var BUILDING = 0, TREE = 1;
var view = {
	scale: 60,
	border: 6
};

var world = {
	width: 100,
	height: 100,
	heightMap: [],
	typeMap: [],
	objectList: [],
	numberOfObjects: 0
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
}

var addObject = function(x,y,w,h,e,type) {
	var theObject = {
		xCoord: x, yCoord: y, width: w, height: h,
		elevation: e, objectType: type
	}
	world.objectList.push(theObject);
	world.numberOfObjects += 1;
	console.log( "Number of objects now in the world: ", 
			world.numberOfObjects);
}


var randomGrid = function (xSize,ySize) {
	var grid = [];
	for ( var x = 0; x < world.width; x++ ) {
		var column = [];
		for ( var y = 0; y < world.height; y++ ) {
			column.push(random());
		}
		grid.push(column);
	}
	return grid;
	
};

var initialize = function(s) {
	seed(s);
	
	gridLand = randomGrid(world.width/4, world.height/4);
	gridGrass = randomGrid(world.width/2, world.height/2);
	gridRock = randomGrid(world.width, world.height);
	
	for ( var x = 0; x < world.width; x++ ) {
		var heightColumn = [], typeColumn = [];
		for ( var y = 0; y < world.height; y++ ) {
			heightColumn.push(0);
			typeColumn.push(WATER);
		}
		world.heightMap.push(heightColumn);
		world.typeMap.push(typeColumn);
	}
	
};


