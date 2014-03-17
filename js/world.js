
var WATER = 0, DIRT = 1, GRASS = 2, ROCK = 3;
var BUILDING = 0, TREE = 1;

var view = {
	offset: {x:0, y:0},
	scale: 10,
	fps: 0,
	screenSize: {x:canvas.width, y:canvas.height}
};

var world = {
	size: 512,
	featureSize: 32,
	heightMap: [],
	typeMap: [],
	shadowMap: [],
	objectList: [],
	numberOfObjects: 0,
	seed: 0
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

var getTypeAt = function(x,y) {
	if ( x < 0 || y < 0 ) return 0;
	if ( x >= world.size || y >= world.size ) return 0;
	return world.typeMap[x][y];
};

var getShadowAt = function(x,y) {
	if ( x < 0 || y < 0 ) return 0;
	if ( x >= world.size || y >= world.size ) return 0;
	return world.shadowMap[x][y];
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
			squareStep(x, y, stepsize, random(-scale,scale));
		}
	}
	for (var y = 0; y < world.size; y += stepsize) {
		for (var x = 0; x < world.size; x += stepsize) {
			diamondStep(x + halfstep, y, stepsize, random(-scale,scale));
			diamondStep(x, y + halfstep, stepsize, random(-scale,scale));
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
	var scale = featuresize;
	for ( var y = 0; y < world.size; y += featuresize ) {
		for ( var x = 0; x < world.size; x += featuresize ) {
			setHeightAt(x, y, random(-scale,scale));
		}
	}
}

var generateFullHeightMap = function (featuresize) {
	var samplesize = featuresize;
	var scale = featuresize/2;
	while (samplesize > 1) {
		diamondSquare(samplesize, scale);
		samplesize /= 2;
		scale /= 2;
	}
}

var thisTilesType = function (x,y) {
	if (getHeightAt(x,y) > 20) 
		return ROCK;
	else if (getHeightAt(x,y) > 10) 
		return DIRT;
	else if (getHeightAt(x,y) > 0) 
		return GRASS;
	else {
		return WATER;
	}
}

var setTypeMapValues = function () {
	for ( var x = 0; x < world.size; x++ ) {
		var typeColumn = [];
		for ( var y = 0; y < world.size; y++ ) {
			typeColumn.push(thisTilesType(x,y))

			if (getHeightAt(x,y) < 0) setHeightAt(x,y,0);

			if (typeColumn[y] == GRASS && random(0,20) < 1) 
				addObject(x,y,1,1,1,TREE);
		}
		world.typeMap.push(typeColumn);
	}
}

var makeShadowMap = function () {
	world.shadowMap = [];
	for ( var x = 0; x < world.size; x++ ) {
		var shadowColumn = [];
		var EBTPIIS = 0;
		for ( var y = 0; y < world.size; y++ ) {
			EBTPIIS -= 1;
			if ( getHeightAt(x,y) > EBTPIIS ) {
				EBTPIIS = getHeightAt(x,y);
			}
			shadowColumn.push(EBTPIIS);
		}
		world.shadowMap.push(shadowColumn);
	}
}

var initialize = function(s) {
	world.seed = s;
	seed(s);
	loadImages();
	
	makeNewHeightMap();
	seedHeightMap(world.featureSize);
	generateFullHeightMap(world.featureSize);
	setTypeMapValues();
	makeShadowMap();
	
};
