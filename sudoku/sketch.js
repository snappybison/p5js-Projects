let board;
let numButtons = [];
let utilButtons = [];
let buttonSelected = 0;

function setup() {
  createCanvas(500, 800);
  textFont("Trebuchet MS");
  board = new Board(50, 50, 400);
  let seed = generateRandomSeed();
  board.createNumbersFromSeed(seed);
  board.tallyNumbers();
  let initialState = JSON.parse(JSON.stringify(board.array));
  board.history.push(initialState);
  for (let i = 1; i < 10; i++) {
    let button = new NumButton(i, board);
    numButtons.push(button);
  }
  utilButtons.push(new UtilButton("undo", board));
  utilButtons.push(new UtilButton("reset", board));
  utilButtons.push(new UtilButton("new", board));
}

function draw() {
  background(220);
  board.drawBackground();
  board.drawLines();
  board.displayCells();
  for (let i = 0; i < 9; i++) {
    numButtons[i].checkIfMousedOver();
    numButtons[i].checkIfSelected();
    numButtons[i].changeColor();
    numButtons[i].drawNumButton(i, board);
  }
  for (let i = 0; i < utilButtons.length; i++) {
    utilButtons[i].checkIfMousedOver();
    utilButtons[i].changeColor();
    utilButtons[i].drawUtilButton();
  }
}

function mousePressed() {
  for (let i = 0; i < 9; i++) {
    numButtons[i].toggleNumButton();
  }
  for (let i = 0; i < utilButtons.length; i++) {
    let buttonClicked = utilButtons[i].utilButtonClicked();
    if (buttonClicked == "undo") {
      board.undo();
    } else if (buttonClicked == "reset") {
      board.reset();
    } else if (buttonClicked == "new") {
      board.new();
    }
  }
  if (mouseInBoundsOf(board)) {
    let cellSelected = board.selectCell();
    let previousState = JSON.stringify(board.array);
    if (mouseButton == LEFT) {
      board.toggleCell(cellSelected.row, cellSelected.col);
      board.removeInvalidPossible(cellSelected.row, cellSelected.col);
    } else if (mouseButton == RIGHT) {
      board.togglePossible(cellSelected.row, cellSelected.col);
    }
    let newState = JSON.stringify(board.array);
    if (previousState != newState) {
      board.history.push(JSON.parse(newState));
    }
  }
  board.tallyNumbers();
}

function mouseInBoundsOf(board) {
  let mibX = mouseX >= board.xOffset && mouseX <= board.xOffset + board.size;
  let mibY = mouseY >= board.yOffset && mouseY <= board.yOffset + board.size;
  let mib = mibX && mibY;
  return mib;
}

document.oncontextmenu = function () {
  if (mouseX < width && mouseY < height) {
    return false;
  }
}
