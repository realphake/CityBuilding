
var WATER = 0, DIRT = 1, GRASS = 2, ROCK = 3;

var world = {
	width: 64,
	height: 64,
	heightMap: [],
	typeMap: []
};

var initialize = function() {
	for ( var x = 0; x < world.width; x++ ) {
		var heightColumn = [], typeColumn = [];
		for ( var y = 0; y < world.height; y++ ) {
			heightColumnn.push(0);
			typeColumn.push(WATER);
		}
		world.heightMap.push(heightColumn);
		world.typeMap.push(typeColumn);
	}
	
	world.typeMap[4][4] = GRASS;
world.typeMap[20][4] = DIRT;
world.typeMap[4][20] = ROCK;
};







