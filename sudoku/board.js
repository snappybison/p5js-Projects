class Board {
  constructor(xOffset, yOffset, size) {
    this.xOffset = xOffset;
    this.yOffset = yOffset;
    this.size = size;
    this.spacing = size / 9;
    this.array = [];
    this.numbersTally = [];
    this.history = [];
  }

  drawBackground() {
    strokeWeight(0);
    fill(255);
    rect(this.xOffset, this.yOffset, this.size);
  }

  drawLines() {
    for (let i = 0; i < 10; i++) {
      let linePosX = this.xOffset + i * this.spacing;
      let linePosY = this.yOffset + i * this.spacing;
      if (i % 3 == 0) {
        strokeWeight(3);
      } else {
        strokeWeight(1);
      }
      line(linePosX, this.yOffset, linePosX, this.yOffset + this.size);
      line(this.xOffset, linePosY, this.xOffset + this.size, linePosY);
    }
  }

  createNumbersFromSeed(seed) {
    this.array = [];
    for (let row = 0; row < 9; row++) {
      let tempRowArray = [];
      for (let col = 0; col < 9; col++) {
        let cell = new Cell(seed[row][col]);
        tempRowArray.push(cell);
      }
      this.array.push(tempRowArray);
    }
  }

  selectCell() {
    let row = floor(((mouseY - board.yOffset) / board.size) * 9);
    let col = floor(((mouseX - board.xOffset) / board.size) * 9);
    let cellSelected = { row: row, col: col };
    return cellSelected;
  }

  showNumbers(row, col) {
    let cell = this.array[row][col];
    if (cell.value > 0) {
      textSize(32);
      fill(cell.color);
      text(cell.value, 0, 0);
    }
  }

  showPossible(row, col) {
    let cell = this.array[row][col];
    if (cell.value == 0) {
      textSize(10);
      fill(cell.color);
      text(cell.possible, 0, 0);
    }
  }

  highlightSelected(row, col) {
    let cell = this.array[row][col];
    let selected = cell.value == buttonSelected && buttonSelected != 0;
    if (selected || cell.possible.includes(buttonSelected)) {
      strokeWeight(0);
      fill(200);
      circle(0, 0, this.spacing * 0.9);
    }
  }

  displayCells() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        push();
        let x = this.xOffset + this.spacing * (col + 1 / 2);
        let y = this.yOffset + this.spacing * (row + 1 / 2);
        translate(x, y);
        textAlign(CENTER, CENTER);
        this.highlightSelected(row, col);
        this.showNumbers(row, col);
        this.showPossible(row, col);
        pop();
      }
    }
  }

  toggleCell(row, col) {
    let cell = this.array[row][col];
    if (cell.writable && buttonSelected > 0) {
      cell.possible = [];
      if (cell.value != buttonSelected) {
        cell.value = buttonSelected;
      } else {
        cell.value = 0;
      }
    }
  }

  removeInvalidPossibleFromRow(row) {
    for (let i = 0; i < 9; i++) {
      if (this.array[row][i].possible.includes(buttonSelected)) {
        for (let j = 0; j < this.array[row][i].possible.length; j++) {
          if (this.array[row][i].possible[j] == buttonSelected) {
            this.array[row][i].possible.splice(j, 1);
          }
        }
      }
    }
  }

  removeInvalidPossibleFromColumn(col) {
    for (let i = 0; i < 9; i++) {
      if (this.array[i][col].possible.includes(buttonSelected)) {
        for (let j = 0; j < this.array[i][col].possible.length; j++) {
          if (this.array[i][col].possible[j] == buttonSelected) {
            this.array[i][col].possible.splice(j, 1);
          }
        }
      }
    }
  }

  removeInvalidPossibleFromBox(row, col) {
    let tlr = row - (row % 3);
    let tlc = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let cell = this.array[tlr + i][tlc + j];
        if (cell.possible.includes(buttonSelected)) {
          for (let k = 0; k < cell.possible.length; k++) {
            if (cell.possible[k] == buttonSelected) {
              cell.possible.splice(k, 1);
            }
          }
        }
      }
    }
  }

  removeInvalidPossible(row, col) {
    if (this.array[row][col].writable) {
      this.removeInvalidPossibleFromRow(row);
      this.removeInvalidPossibleFromColumn(col);
      this.removeInvalidPossibleFromBox(row, col);
    }
  }

  togglePossible(row, col) {
    let cell = this.array[row][col];
    if (cell.writable && cell.value == 0 && buttonSelected != 0) {
      if (!cell.possible.includes(buttonSelected)) {
        cell.possible.push(buttonSelected);
        cell.possible.sort();
      } else {
        for (let i = 0; i < cell.possible.length; i++) {
          if (cell.possible[i] == buttonSelected) {
            cell.possible.splice(i, 1);
          }
        }
      }
    }
  }

  undo() {
    if (this.history.length > 1) {
      this.history.pop();
      let previousState = JSON.parse(
        JSON.stringify(this.history[this.history.length - 1])
      );
      this.array = previousState;
    }
  }

  reset() {
    this.array = JSON.parse(JSON.stringify(this.history[0]));
    this.history = [JSON.parse(JSON.stringify(this.array))];
    buttonSelected = 0;
  }

  new() {
    let seed = generateRandomSeed();
    this.createNumbersFromSeed(seed);
    this.history = [JSON.parse(JSON.stringify(this.array))];
    buttonSelected = 0;
  }

  saveStatetoHistory(newState) {
    let state = JSON.parse(newState);
    this.history.push(JSON.parse(newState));
  }

  tallyNumbers() {
    this.numbersTally = [9, 9, 9, 9, 9, 9, 9, 9, 9];
    for (let row = 0; row < 9; row++) {
      for (let column = 0; column < 9; column++) {
        for (let i = 1; i <= 9; i++) {
          if (this.array[row][column].value == i) {
            this.numbersTally[i - 1] -= 1;
          }
        }
      }
    }
  }
}
