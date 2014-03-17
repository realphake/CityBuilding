
var WATER = 0, DIRT = 1, GRASS = 2, ROCK = 3;
var TREE = 0, HOUSE = 1, BAKERY = 2;

var view = {
	scale: 30,
	offset: {x:0, y:0},
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
	seed: 0,
	
	addObject: function(x,y,w,h,e,type) {
		var theObject = {
			xCoord: x, yCoord: y, width: w, height: h,
			elevation: e, objectType: type
		}
		world.objectList.push(theObject);
		world.numberOfObjects += 1;
	},
	
	getHeightAt: function(x,y) {
		if ( x < 0 || y < 0 ) return 0;
		if ( x >= world.size || y >= world.size ) return 0;
		return world.heightMap[x][y];
	},
	
	getTypeAt: function(x,y) {
		if ( x < 0 || y < 0 ) return 0;
		if ( x >= world.size || y >= world.size ) return 0;
		return world.typeMap[x][y];
	},
	
	howManyInWorld: function( type ) {
		var count = 0;
		for ( var i = 0; i < world.numberOfObjects; i++ ) {
			if ( world.objectList[i].objectType == type ) count += 1;
		}
		return count;
	},
	
	getShadowAt: function(x,y) {
		if ( x < 0 || y < 0 ) return 0;
		if ( x >= world.size || y >= world.size ) return 0;
		return world.shadowMap[x][y];
	},
	
	setHeightAt: function(x,y, value) {
		if ( x < 0 || y < 0 ) return;
		if ( x >= world.size || y >= world.size ) return;
		world.heightMap[x][y] = value;
	},
	
	squareStep: function (x, y, size, value) {
		var hs = size / 2;
		var a = world.getHeightAt(x - hs, y - hs);
		var b = world.getHeightAt(x + hs, y - hs);
		var c = world.getHeightAt(x - hs, y + hs);
		var d = world.getHeightAt(x + hs, y + hs);
		world.setHeightAt(x, y, ((a + b + c + d) / 4.0) + value);
	},
	
	diamondStep: function (x, y, size, value) {
		var hs = size / 2;
		var a = world.getHeightAt(x - hs, y);
		var b = world.getHeightAt(x + hs, y);
		var c = world.getHeightAt(x, y - hs);
		var d = world.getHeightAt(x, y + hs);
		world.setHeightAt(x, y, ((a + b + c + d) / 4.0) + value);
	},
	
	diamondSquare: function (stepsize, scale) {
		var halfstep = stepsize / 2;
		for (var y = halfstep; y < world.size + halfstep; y += stepsize) {
			for (var x = halfstep; x < world.size + halfstep; x += stepsize) {
				world.squareStep(x, y, stepsize, random(-scale,scale));
			}
		}
		for (var y = 0; y < world.size; y += stepsize) {
			for (var x = 0; x < world.size; x += stepsize) {
				world.diamondStep(x + halfstep, y, stepsize, random(-scale,scale));
				world.diamondStep(x, y + halfstep, stepsize, random(-scale,scale));
			}
		}
	 
	},
	
	makeNewHeightMap: function () {
		for ( var x = 0; x < world.size; x++ ) {
			var heightColumn = [];
			for ( var y = 0; y < world.size; y++ ) {
				heightColumn.push(0);
			}
			world.heightMap.push(heightColumn);
		}
	},
	
	seedHeightMap: function (featuresize) {
		var scale = featuresize;
		for ( var y = 0; y < world.size; y += featuresize ) {
			for ( var x = 0; x < world.size; x += featuresize ) {
				world.setHeightAt(x, y, random(-scale,scale));
			}
		}
	},
	
	generateFullHeightMap: function (featuresize) {
		var samplesize = featuresize;
		var scale = featuresize/2;
		while (samplesize > 1) {
			world.diamondSquare(samplesize, scale);
			samplesize /= 2;
			scale /= 2;
		}
	},
	
	thisTilesType: function (x,y) {
		if (world.getHeightAt(x,y) > 20) 
			return ROCK;
		else if (world.getHeightAt(x,y) > 10) 
			return DIRT;
		else if (world.getHeightAt(x,y) > 0) 
			return GRASS;
		else
			return WATER;
	},
	
	setTypeMapValues: function () {
		for ( var x = 0; x < world.size; x++ ) {
			var typeColumn = [];
			for ( var y = 0; y < world.size; y++ ) {
				typeColumn.push(world.thisTilesType(x,y))
				
				if (world.getHeightAt(x,y) < 0) world.setHeightAt(x,y,0);
				if (typeColumn[y] == GRASS && random(0,20) < 1) 
					world.addObject(x,y,1,1,1,TREE);
			}
			world.typeMap.push(typeColumn);
		}
	},
	
	makeShadowMap: function () {
		world.shadowMap = [];
		for ( var x = 0; x < world.size; x++ ) {
			var shadowColumn = [];
			var EBTPIIS = 0;
			for ( var y = 0; y < world.size; y++ ) {
				EBTPIIS -= 1;
				if ( world.getHeightAt(x,y) > EBTPIIS ) {
					EBTPIIS = world.getHeightAt(x,y);
				}
				shadowColumn.push(EBTPIIS);
			}
			world.shadowMap.push(shadowColumn);
		}
	},
	
	initialize: function(s) {
		world.seed = s;
		seed(s);
		loadImages();
		
		world.makeNewHeightMap();
		world.seedHeightMap(world.featureSize);
		world.generateFullHeightMap(world.featureSize);
		world.setTypeMapValues();
		world.makeShadowMap();
	
	}

};
