class Cell {
  constructor(value) {
    this.value = value;
    if (this.value == 0) {
      this.writable = true;
      this.color = "green";
    } else {
      this.writable = false;
      this.color = "black";
    }
    this.possible = [];
  }
}
