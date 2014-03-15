
var canvas = document.createElement("canvas");
canvas.setAttribute('style', 'border: 1px solid');
var context = canvas.getContext("2d");
canvas.width = 640;
canvas.height = 480;
document.body.appendChild(canvas);

var images = {
	loaded: 0,
	totalNumber: 6
};

var imageDoneLoading = function() {
	images.loaded += 1;
};

var loadImages = function() {
	images.water = imageFrom("water.jpg");
	images.grass = imageFrom("grass.png");
	images.sand = imageFrom("sand.jpg");
	images.rock = imageFrom("rock.jpg");
	images.house = imageFrom("house.jpg");
	images.tree = imageFrom("tree.png");
};

var imageFrom = function (filename) {
	result = new Image();
	result.onload = imageDoneLoading;
	result.src = "images/" + filename;
	return result;
}
