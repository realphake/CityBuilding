
var WATER = 0, DIRT = 1, GRASS = 2, ROCK = 3;
var BUILDING = 0, TREE = 1;

var view = {
	offsetX: 0,
	offsetY: 0,
	scale: 10,
	fps: 0,
	screenSize: {x:canvas.width, y:canvas.height}
};

var world = {
	size: 128,
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
};

var getHeightAt = function(x,y) {
	if ( x < 0 || y < 0 ) return 0;
	if ( x >= world.size || y >= world.size ) return 0;
	return world.heightMap[x][y];
};

var setHeightAt = function(x,y, value) {
	if ( x < 0 || y < 0 ) return;
	if ( x >= world.size || y >= world.size ) return;
	world.heightMap[x][y] = value;
};

var squareStep = function (x, y, size, value) {
	var hs = size / 2;
    var a = getHeightAt(x - hs, y - hs);
    var b = getHeightAt(x + hs, y - hs);
    var c = getHeightAt(x - hs, y + hs);
    var d = getHeightAt(x + hs, y + hs);
    setHeightAt(x, y, ((a + b + c + d) / 4.0) + value);
};
 
var diamondStep = function (x, y, size, value) {
    var hs = size / 2;
    var a = getHeightAt(x - hs, y);
    var b = getHeightAt(x + hs, y);
    var c = getHeightAt(x, y - hs);
    var d = getHeightAt(x, y + hs);
    setHeightAt(x, y, ((a + b + c + d) / 4.0) + value);
};

var diamondSquare = function (stepsize, scale) {
	var halfstep = stepsize / 2;
	for (var y = halfstep; y < world.size + halfstep; y += stepsize) {
		for (var x = halfstep; x < world.size + halfstep; x += stepsize) {
			squareStep(x, y, stepsize, random(-1,1) * scale);
		}
	}
	for (var y = 0; y < world.size; y += stepsize) {
		for (var x = 0; x < world.size; x += stepsize) {
			diamondStep(x + halfstep, y, stepsize, random(-1,1) * scale);
			diamondStep(x, y + halfstep, stepsize, random(-1,1) * scale);
		}
	}
 
}

var makeNewHeightMap = function () {
	for ( var x = 0; x < world.size; x++ ) {
		var heightColumn = [];
		for ( var y = 0; y < world.size; y++ ) {
			heightColumn.push(0);
		}
		world.heightMap.push(heightColumn);
	}
} 

var seedHeightMap = function (featuresize) {
	for ( var y = 0; y < world.size; y += featuresize ) {
		for ( var x = 0; x < world.size; x += featuresize ) {
			var heightX = ((-(Math.cos((2*Math.PI*x)/(world.size)))+1)/2);
			var heightY = ((-(Math.cos((2*Math.PI*y)/(world.size)))+1)/2);
			setHeightAt(x, y, heightX*heightY);
		}
	}
}

var generateFullHeightMap = function (featuresize) {
	var samplesize = featuresize;
	var scale = 1;
	while (samplesize > 1) {
		diamondSquare(samplesize, scale);
		samplesize /= 2;
		scale /= 2;
	}
}

var setTypeMapValues = function (featuresize) {
	for ( var x = 0; x < world.size; x++ ) {
		var typeColumn = [];
		for ( var y = 0; y < world.size; y++ ) {
			if (world.heightMap[x][y] < 0) typeColumn.push(WATER);
			else if (world.heightMap[x][y] < 0.5) typeColumn.push(GRASS);
			else if (world.heightMap[x][y] < 1) typeColumn.push(DIRT);
			else typeColumn.push(ROCK);
			if (typeColumn[y] == GRASS && random(0,20) < 1) addObject(x,y,1,1,1,TREE);
		}
		world.typeMap.push(typeColumn);
	}
}

var initialize = function(s) {
	world.seed = s;
	seed(s);
	loadImages();
	
	makeNewHeightMap();
	var featuresize = world.size/4;
	seedHeightMap(featuresize);
	generateFullHeightMap(featuresize);
	setTypeMapValues();
	
};
