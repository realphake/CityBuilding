
var WATER = 0, DIRT = 1, GRASS = 2, ROCK = 3;
var BUILDING = 0, TREE = 1;

var view = {
	scale: 10,
	border: 1
};

var world = {
	width: 100,
	height: 100,
	heightMap: [],
	typeMap: [],
	objectList: [],
	numberOfObjects: 0,
	seed: 0,
	amplitudes: [],
	frequencies: [],
	phases: [],
	octaves: 0
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

var generateSineFunctions = function() {
	world.octaves = 6;
	for ( var i = 0; i < world.octaves; i++ ) {
		var ampl = [], freq = [], phase = [];
		for ( var j = 0; j < 2; j++ ) {
			var f = random(1,10);
			freq.push(f);
			ampl.push(random(-f,f));
			phase.push(random(0, 2*Math.PI));
		}
		world.amplitudes.push(ampl);
		world.frequencies.push(freq);
		world.phases.push(phase);
	}
};

var findTotalHeight = function (x,y) {
	var totalHeight = 0;
	var coords = [x,y];
	var worldSize = [world.width, world.height];
	for ( var i = 0; i < world.octaves; i++ ) {
		for ( var j = 0; j < 2; j++ ) {
			totalHeight += world.amplitudes[i][j] * 
					Math.sin( world.frequencies[i][j] * 
					( coords[j]/worldSize[j] + world.phases[i][j]));
		}
	}
	return totalHeight;
};

var initialize = function(s) {
	world.seed = s;
	seed(s);
	generateSineFunctions();
	
	for ( var x = 0; x < world.width; x++ ) {
		var heightColumn = [], typeColumn = [];
		for ( var y = 0; y < world.height; y++ ) {
			
			var totalHeight = findTotalHeight(x,y)/world.octaves;
			heightColumn.push(totalHeight);
			
			var finalType = WATER;
			if (totalHeight >= 0) finalType = DIRT;
			if (totalHeight >= 0.5) finalType = GRASS;
			if (totalHeight >= 1) finalType = ROCK;
			typeColumn.push(finalType);
			
		}
		world.heightMap.push(heightColumn);
		world.typeMap.push(typeColumn);
	
	}
	console.log(findTotalHeight(1,1));
	
};




