class Board{
  constructor(x, y, rows, cols, tileSize){
    this.x = x;
    this.y = y;
    this.rows = rows;
    this.cols = cols;
    this.tileSize = tileSize;
    this.reset();
  }

  setMatrix(rows, cols){
    let m = [];
    for (var i = 0; i < rows; i++) {
      let row = [];
      for (var j = 0; j < cols; j++) {
        row.push(1);
      }
      m.push(row);
    }
    return m;
  }

  reset(){
    this.mat = this.setMatrix(this.rows, this.cols);
    this.putTwos();
  }

  putTwos(){
    for (var i = 0; i < 2; i++) {
      let i = floor(random(0, this.rows));
      let j = floor(random(0, this.cols));
      this.mat[i][j] = 2;
    }
  }

  init(){
    let c = 2;
    this.mat[0][0] = 1;
    for (var i = 1; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.mat[i][j] = c;
        if (c < 2048){
          c *= 2;
        }
      }
    }
  }

  showTiles(){
    stroke(BLACK)
    strokeWeight(4);
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j <this.cols; j++) {
        let val = this.mat[i][j];
        fill(TILE_COLORS[val])
        rect(this.x + j * this.tileSize, this.y + i * this.tileSize, this.tileSize, this.tileSize);
      }
    }
  }

  show(){
    this.showTiles();
    noStroke();
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        let val = this.mat[i][j];
        if (TILE_COLORS[val][0] < 150){
          fill(color(WHITE));
        }
        else{
          fill(color(BLACK));
        }
        if (this.mat[i][j] > 1){
          textSize(this.tileSize / 3);
          textStyle(NORMAL);
          textAlign(CENTER);
          text(this.mat[i][j], this.x + j * this.tileSize + this.tileSize / 2, this.y + i * this.tileSize + this.tileSize * 0.6);
        }
      }
    }
  }

  generateTwo(){
    let freeTiles = [];
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        if (this.mat[i][j] == 1){
          freeTiles.push({'i': i, 'j': j});
        }
      }
    }
    let index = floor(random(0, freeTiles.length - 1));
    let pos = freeTiles[index]
    this.mat[pos['i']][pos['j']] = 2;
  }

  swap(i, j, x, y){
    let tmp = this.mat[i][j];
    this.mat[i][j] = this.mat[x][y];
    this.mat[x][y] = tmp;
  }

  isFull(){
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        if (this.mat[i][j] == 1){
          return false;
        }
      }
    }
    return true;
  }

  moveTile(i, j, dir){
    let x = i;
    let y = j;
    if (dir == 'r'){
      while (j < this.cols){
        if (j + 1 == this.cols){
          break;
        }
        else if (this.mat[i][j + 1] > 1 && this.mat[i][j] != this.mat[i][j + 1]){
           break;
        }
        else if (this.mat[i][j + 1]  == 1){
          this.swap(i, j, i, j + 1);
        }
        else if (this.mat[i][j] == this.mat[i][j + 1]){
          this.mat[i][j] = 1;
          this.mat[i][j + 1] *= 2;
        }
        j++;
      }

    }
    else if (dir == 'l'){
      while(j >= 0){
        if (j - 1 == -1){
          break;
        }
        else if (this.mat[i][j - 1] > 1 && this.mat[i][j] != this.mat[i][j - 1]){
           break;
        }
        else if (this.mat[i][j - 1]  == 1){
          this.swap(i, j, i, j - 1);
        }
        else if (this.mat[i][j] == this.mat[i][j - 1]){
          this.mat[i][j] = 1;
          this.mat[i][j - 1] *= 2;
        }
        j--;
      }
    }
    else if (dir == 'u'){
      while (i >= 0){
        if (i - 1 == -1){
          break;
        }
        else if (this.mat[i - 1][j] > 1 && this.mat[i][j] != this.mat[i - 1][j]){
           break;
        }
        else if (this.mat[i - 1][j]  == 1){
          this.swap(i, j, i - 1, j);
        }
        else if (this.mat[i][j] == this.mat[i - 1][j]){
          this.mat[i][j] = 1;
          this.mat[i - 1][j] *= 2;
        }
        i--;
      }
    }
    else if (dir == 'd'){
      while(i < this.rows - 1){
        if (i + 1 == this.rows){
          break;
        }
        else if (this.mat[i + 1][j] > 1 && this.mat[i][j] != this.mat[i + 1][j]){
           break;
        }
        else if (this.mat[i + 1][j]  == 1){
          this.swap(i, j, i + 1, j);
        }
        else if (this.mat[i][j] == this.mat[i + 1][j]){
          this.mat[i][j] = 1;
          this.mat[i + 1][j] *= 2;
        }
        i++;
      }
    }
  }

  go(dir){
    if (this.isFull()){
      console.log('game over');
      isGameOver = true;
      return;
    }
    switch (dir) {
      case 'r':
        this.goRight();
        break;
      case 'l':
        this.goLeft();
        break;
      case 'u':
        this.goUp();
        break;
      case 'd':
        this.goDown();
        break;
      default:
        break;
    }
  }

  goRight(){
    for (var j = this.cols - 1; j >= 0; j--) {
      for (var i = 0; i < this.rows; i++) {
        if (this.mat[i][j] > 1){
          this.moveTile(i, j, 'r');
        }
      }
    }
    this.generateTwo();
  }

  goLeft(){
    for (var j = 0; j < this.cols; j++) {
      for (var i = 0; i < this.rows; i++) {
        if (this.mat[i][j] > 1){
          this.moveTile(i, j, 'l');
        }
      }
    }
    this.generateTwo();
  }

  goUp(){
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        if (this.mat[i][j] > 1){
          this.moveTile(i, j, 'u');
        }
      }
    }
    this.generateTwo();
  }

  goDown(){
    for (var i = this.rows - 1; i >= 0; i--) {
      for (var j = 0; j < this.cols; j++) {
        if (this.mat[i][j] > 1){
          this.moveTile(i, j, 'd');
        }
      }
    }
    this.generateTwo();
  }
}
