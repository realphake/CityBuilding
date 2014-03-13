
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.width = 640;
canvas.height = 480;
document.body.appendChild(canvas);

var images = {
	loaded: 0
};

var imageDoneLoading = function() {
	images.loaded += 1;
	console.log(images.loaded);
};

var loadImages = function() {
	images.water = new Image();
	images.water.onload = imageDoneLoading;
	images.water.src = "images/water.jpg";
	images.grass = new Image();
	images.grass.onload = imageDoneLoading;
	images.grass.src = "images/grass.png";
	images.sand = new Image();
	images.sand.onload = imageDoneLoading;
	images.sand.src = "images/sand.jpg";
	images.rock = new Image();
	images.rock.onload = imageDoneLoading;
	images.rock.src = "images/rock.jpg";
	images.house = new Image();
	images.house.onload = imageDoneLoading;
	images.house.src = "images/house.jpg";
	images.tree = new Image();
	images.tree.onload = imageDoneLoading;
	images.tree.src = "images/tree.png";
};
