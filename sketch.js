var board;
var isGameOver;

function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(FPS);

	

	background(color(WHITE));
	board = new Board(BOARD_POS_X, BOARD_POS_Y, ROWS, COLS, TILE_SIZE);
	board.show();
	isGameOver = false;
}

function draw() {
	board.show();
}

function showGameOver(){
	noStroke();
	fill(255, 10, 180);
	textSize(this.tileSize / 2);
	textStyle(BOLD);
	text('GAME OVER', width / 2, 50);
}

function keyPressed(){
	if (isGameOver && key == 'R'){
		console.log('Restart game.');
		board.reset();
		background(color(WHITE));
		isGameOver = false;
	}
	if (keyCode === RIGHT_ARROW){
		board.go('r');
	}
	if (keyCode === LEFT_ARROW){
		board.go('l');
	}
	if (keyCode === UP_ARROW){
		board.go('u');
	}
	if (keyCode === DOWN_ARROW){
		board.go('d');
	}
	if (isGameOver){
		showGameOver();
	}
}
