
var main = function () {
	update();
	render();
	updateInput();
	
};

initialize(Date.now());

setInterval(main, 20);

