
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.width = 640;
canvas.height = 480;
document.body.appendChild(canvas);

var images = {};

images.water = new Image();
images.water.src = "images/water.jpg";
images.grass = new Image();
images.grass.src = "images/grass.png";
images.sand = new Image();
images.sand.src = "images/sand.jpg";
images.rock = new Image();
images.rock.src = "images/rock.jpg";
images.house = new Image();
images.house.src = "images/house.jpg";
