
var WATER = 0, DIRT = 1, GRASS = 2, ROCK = 3;
var BUILDING = 0, TREE = 1;

var view = {
	scale: 4,
	border: 1
};

var world = {
	width: 256,
	height: 256,
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

var setHeightAt = function(x,y, value) {
	if ( x < 0 || y < 0 ) return;
	if ( x >= world.width || y >= world.height ) return;
	world.heightMap[x][y] = value;
};

var sampleSquare = function (x, y, size, value) {
	var hs = size / 2;
    var a = getHeightAt(x - hs, y - hs);
    var b = getHeightAt(x + hs, y - hs);
    var c = getHeightAt(x - hs, y + hs);
    var d = getHeightAt(x + hs, y + hs);
    setHeightAt(x, y, ((a + b + c + d) / 4.0) + value);
};
 
var sampleDiamond = function (x, y, size, value) {
    var hs = size / 2;
    var a = getHeightAt(x - hs, y);
    var b = getHeightAt(x + hs, y);
    var c = getHeightAt(x, y - hs);
    var d = getHeightAt(x, y + hs);
    setHeightAt(x, y, ((a + b + c + d) / 4.0) + value);
};

var diamondSquare = function (stepsize, scale) {
    var halfstep = stepsize / 2;
 
    for (var y = halfstep; y < world.height + halfstep; y += stepsize) {
        for (var x = halfstep; x < world.width + halfstep; x += stepsize) {
            sampleSquare(x, y, stepsize, random(-1,1) * scale);
        }
    }
 
    for (var y = 0; y < world.height; y += stepsize) {
        for (var x = 0; x < world.width; x += stepsize) {
            sampleDiamond(x + halfstep, y, stepsize, random(-1,1) * scale);
            sampleDiamond(x, y + halfstep, stepsize, random(-1,1) * scale);
        }
    }
 
}

var initialize = function(s) {
	world.seed = s;
	seed(s);
	
	for ( var x = 0; x < world.width; x++ ) {
		var heightColumn = [];
		for ( var y = 0; y < world.height; y++ ) {
			heightColumn.push(0);
		}
		world.heightMap.push(heightColumn);
	}
	
	var featuresize = world.height/8;
	for ( var y = 0; y < world.height; y += featuresize ) {
		for ( var x = 0; x < world.width; x += featuresize ) {
			setHeightAt(x, y, random(-1,1));
		}
	}
	
	var samplesize = featuresize;
	var scale = 1.0;
	while (samplesize > 1) {
		diamondSquare(samplesize, scale);
		samplesize /= 2;
		scale /= 2.0;
	}

	for ( var x = 0; x < world.width; x++ ) {
		var typeColumn = [];
		for ( var y = 0; y < world.height; y++ ) {
			if (world.heightMap[x][y] < -0.5) typeColumn.push(WATER);
			else if (world.heightMap[x][y] < 0) typeColumn.push(DIRT);
			else if (world.heightMap[x][y] < 0.5) typeColumn.push(GRASS);
			else typeColumn.push(ROCK);
		}
		world.typeMap.push(typeColumn);
	}
	
};
