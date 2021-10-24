class Button {
  constructor() {
    this.radius = 25;
    this.pos = {};
    this.color = "white";
    this.mousedOver = false;
    this.selected = false;
  }

  checkIfMousedOver() {
    let d = dist(this.pos.x, this.pos.y, mouseX, mouseY);
    if (d < this.radius) {
      this.mousedOver = true;
    } else {
      this.mousedOver = false;
    }
  }

  changeColor() {
    if (this.mousedOver) {
      this.color = "blue";
    } else if (this.selected) {
      this.color = "green";
    } else {
      this.color = "white";
    }
  }
}

class NumButton extends Button {
  constructor(number, board) {
    super();
    this.number = number;
    this.pos = {
      x:
        board.xOffset +
        (((number - 1) % 5) * board.size) / 5 +
        board.size / 10 +
        (floor(number / 6) * board.size) / 10,
      y:
        board.yOffset +
        board.size * 1.15 +
        floor(number / 6) * board.size * 0.2,
    };
  }

  drawNumButton(index, board) {
    strokeWeight(2);
    fill(this.color);
    circle(this.pos.x, this.pos.y, this.radius * 2);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(32);
    text(this.number, this.pos.x, this.pos.y);
    fill(0);
    textSize(20);
    if (board.numbersTally[index] > 0) {
      text(board.numbersTally[index], this.pos.x, this.pos.y + 1.6 * this.radius);
    }
  }

  checkIfSelected() {
    if (buttonSelected == this.number) {
      this.selected = true;
    } else {
      this.selected = false;
    }
  }

  toggleNumButton() {
    let d = dist(this.pos.x, this.pos.y, mouseX, mouseY);
    if (d < this.radius) {
      if (buttonSelected != this.number) {
        buttonSelected = this.number;
      } else {
        buttonSelected = 0;
      }
    }
  }
}

class UtilButton extends Button {
  constructor(type, board) {
    super();
    this.type = type;
    if (this.type == "undo") {
      this.index = 0;
    } else if (this.type == "reset") {
      this.index = 1;
    } else if(this.type == "new") {
      this.index = 2;
    }
    let x = board.xOffset + 3 * board.size / 10 + this.index * board.size / 5;
    let y = board.yOffset +
        board.size * 1.55;
    this.pos = {x: x, y: y};
  }

  drawUtilButton() {
    strokeWeight(2);
    fill(this.color);
    circle(this.pos.x, this.pos.y, this.radius * 2);
    textAlign(CENTER, CENTER);
    fill(0);
    textSize(16);
    text(this.type, this.pos.x, this.pos.y);
  }

  utilButtonClicked() {
    let d = dist(this.pos.x, this.pos.y, mouseX, mouseY);
    if (d < this.radius) {
      return this.type;
    }
  }
}
