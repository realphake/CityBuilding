// Handle keyboard controls
var mouse = {
	isDown: false,
	justChanged: false,
	wentDownAt: {x: 0, y: 0},
	isNowAt: {x: 0, y: 0}
};

var handleMouseDown = function (e) {
	mouse.isDown = true;
	mouse.justChanged = true;
	mouse.wentDownAt.x = e.pageX - canvas.offsetLeft;
	mouse.wentDownAt.y = e.pageY - canvas.offsetTop;
};

var handleMouseUp = function (e) { 
	mouse.isDown = false;
	mouse.justChanged = true;
};

var handleMouseMove = function (e) { 
	mouse.isNowAt.x = e.pageX - canvas.offsetLeft;
	mouse.isNowAt.y = e.pageY - canvas.offsetTop;
};

var updateInput = function () {
	mouse.justChanged = false;
};

canvas.addEventListener("mousedown", handleMouseDown, false);
canvas.addEventListener("mouseup", handleMouseUp, false);
canvas.addEventListener("mousemove", handleMouseMove, false);
