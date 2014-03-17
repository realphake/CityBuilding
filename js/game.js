
var start = new Date().getTime();
var framesThisSecond = 0;

var main = function () {
	
	if ( images.loaded < images.totalNumber ) {
		showLoading();
	}
	else {
		update();
		render();
		updateInput();
		
		framesThisSecond += 1;
		if (new Date().getTime() - start > 1000) {
			gamestate.increaseTurn();
			view.fps = framesThisSecond;
			framesThisSecond = 0;
			start = new Date().getTime();
		}
	}
};

world.initialize(new Date().getTime());

setInterval(main, 20);

