
var WATER = 0, DIRT = 1, GRASS = 2, ROCK = 3;

var world = {
	width: 10,
	height: 10,
	heightMap: [],
	typeMap: [],
	objectList: []
};

var initialize = function() {
	for ( var x = 0; x < world.width; x++ ) {
		var heightColumn = [], typeColumn = [];
		for ( var y = 0; y < world.height; y++ ) {
			heightColumn.push(0);
			typeColumn.push(WATER);
		}
		world.heightMap.push(heightColumn);
		world.typeMap.push(typeColumn);
	}
	
	// Also do the object list!
	
	world.typeMap[4][4] = GRASS;
	world.typeMap[5][4] = DIRT;
	world.typeMap[4][5] = GRASS;
	world.typeMap[5][5] = GRASS;
	world.typeMap[3][4] = DIRT;
	world.typeMap[3][5] = ROCK;
	
	world.heightMap[4][4] = 0.5;
	world.heightMap[5][4] = 0.6;
	world.heightMap[4][5] = 0.3;
	world.heightMap[5][5] = 0.2;
	world.heightMap[3][4] = 0.4;
	world.heightMap[3][5] = 0.1;
	world.heightMap[5][3] = 0.2;
	world.heightMap[4][3] = 0.4;
	world.heightMap[3][3] = 0.1;
	
	console.log(world.heightMap);
	
};


