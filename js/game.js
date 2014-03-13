
var start = new Date().getTime();
var framesThisSecond = 0;

var main = function () {
	
	update();
	render();
	updateInput();
	
	framesThisSecond += 1;
	if (new Date().getTime() - start > 1000) {
		view.fps = framesThisSecond;
		framesThisSecond = 0;
		start = new Date().getTime();
	}
	
};

showLoading();
initialize(new Date().getTime());

setInterval(main, 20);

