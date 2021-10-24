function pickSeed() {
  let pick = floor(random(1, 5));

  if (pick == 1) {
    seed = easySeed1;
  } else if (pick == 2) {
    seed = easySeed2;
  } else if (pick == 3) {
    seed = easySeed3;
  } else if (pick == 4) {
    seed = easySeed4;
  }

  return seed;
}

function rotateSeed(seed) {
  let rotateTimes = floor(random(0, 4));

  for (let i = 0; i < rotateTimes; i++) {
    let tempArray = [];

    for (let row = 0; row < 9; row++) {
      let tempColumnArray = [];

      for (let column = 0; column < 9; column++) {
        tempColumnArray.push(0);
      }
      tempArray.push(tempColumnArray);
    }

    for (let row = 0; row < 9; row++) {
      for (let column = 0; column < 9; column++) {
        let newRow = column;
        let newColumn = 8 - row;
        let element = seed[newRow][newColumn];
        tempArray[row][column] = element;
      }
    }

    seed = tempArray;
  }

  return seed;
}

function remapSeed(seed) {

  let remappingArray = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  for (let row = 0; row < 9; row++) {
    for (let column = 0; column < 9; column++) {
      for (let i = 0; i < 9; i++) {
        if (seed[row][column] == i + 1) {
          seed[row][column] = remappingArray[i];
          break;
        }
      }
    }
  }

  return seed;

}

function shuffleRows(seed) {
  let tempArray = seed.slice();

  let a = tempArray.splice(0, 3);
  let b = tempArray.splice(0, 3);
  let c = tempArray;

  a = shuffle(a);
  b = shuffle(b);
  c = shuffle(c);

  seed = a.concat(b.concat(c));

  return seed;
}

function shuffleColumns(seed) {
  seed = transposeArray(seed);

  seed = shuffleRows(seed);

  seed = transposeArray(seed);

  return seed;
}

function generateRandomSeed() {
  let seed = pickSeed();
  seed = rotateSeed(seed);
  seed = remapSeed(seed);
  seed = shuffleRows(seed);
  seed = shuffleColumns(seed);
  return seed;
}

function transposeArray(array) {
  var newArray = [];

  for (let i = 0; i < array.length; i++) {
    newArray.push([]);
  }

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      newArray[j].push(array[i][j]);
    }
  }

  return newArray;
}

let blankSeed = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let easySeed1 = [
  [7, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 5, 2, 0, 0, 1, 0, 0, 9],
  [1, 0, 8, 0, 3, 9, 2, 0, 7],
  [9, 2, 0, 0, 4, 0, 7, 8, 0],
  [6, 0, 0, 0, 0, 0, 0, 0, 3],
  [0, 4, 7, 0, 8, 0, 0, 5, 6],
  [2, 0, 9, 3, 5, 0, 6, 0, 8],
  [5, 0, 0, 9, 0, 0, 1, 3, 0],
  [0, 3, 0, 0, 0, 0, 0, 0, 4],
];

let easySeed2 = [
  [0, 0, 3, 0, 0, 0, 9, 0, 0],
  [1, 2, 0, 0, 5, 0, 0, 0, 7],
  [5, 0, 0, 2, 3, 6, 4, 1, 8],
  [0, 0, 5, 0, 0, 2, 3, 8, 0],
  [6, 0, 0, 0, 0, 0, 0, 0, 4],
  [0, 9, 8, 7, 0, 0, 1, 0, 0],
  [9, 1, 6, 3, 8, 5, 0, 0, 2],
  [4, 0, 0, 0, 2, 0, 0, 9, 3],
  [0, 0, 2, 0, 0, 0, 5, 0, 0],
];

let easySeed3 = [
  [0, 4, 3, 6, 8, 0, 0, 0, 1],
  [2, 7, 0, 0, 3, 9, 6, 0, 0],
  [0, 6, 0, 1, 0, 0, 0, 0, 9],
  [0, 0, 0, 7, 1, 6, 8, 0, 0],
  [0, 0, 0, 4, 0, 3, 0, 0, 0],
  [0, 0, 6, 2, 9, 8, 0, 0, 0],
  [3, 0, 0, 0, 0, 2, 0, 9, 0],
  [0, 0, 8, 9, 6, 0, 0, 2, 3],
  [6, 0, 0, 0, 7, 5, 1, 8, 0],
];

let easySeed4 = [
  [9, 0, 0, 0, 4, 3, 0, 1, 0],
  [8, 0, 4, 0, 0, 5, 9, 0, 2],
  [0, 6, 0, 7, 9, 0, 0, 4, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 3],
  [0, 0, 2, 0, 0, 0, 5, 0, 0],
  [3, 0, 6, 0, 0, 0, 0, 0, 0],
  [0, 9, 0, 0, 3, 4, 0, 5, 0],
  [1, 0, 8, 9, 0, 0, 7, 0, 4],
  [0, 5, 0, 8, 2, 0, 0, 0, 1],
];
