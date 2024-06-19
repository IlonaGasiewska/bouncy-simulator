export const board = [
  ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
  ['X', '0', '0', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
  ['X', '0', '0', '0', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
  ['X', '0', '0', '0', '0', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
  ['X', '0', '0', '0', '0', '0', 'X', 'X', 'X', 'X', 'X', 'X'],
  ['X', '0', '0', '0', '0', '0', '0', 'X', 'X', 'X', 'X', 'X'],
  ['X', '0', '0', '0', '0', '0', '0', '0', 'X', 'X', 'X', 'X'],
  ['X', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'X'],
  ['X', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'X'],
  ['X', '0', '0', '0', 'X', '0', '0', '0', '0', 'Y', '0', 'X'],
  ['X', '0', '0', 'X', 'X', 'X', '0', '0', '0', '0', '0', 'X'],
  ['X', '0', '0', '0', 'X', '0', '0', '0', '0', '0', '0', 'X'],
  ['X', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'X'],
  ['X', '0', '0', 'Y', '0', '0', '0', '0', '0', '0', '0', 'X'],
  ['X', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'X'],
  ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
];

const gameBoard = document.querySelector(".gameBoard");

let ballPosition = { x: 1, y: 1 };
const directions = [
  { x: -1, y: -1 },
  { x: -1, y: 1 },
  { x: 1, y: -1 },
  { x: 1, y: 1 },
  { x: 0, y: -1 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 1, y: 0 }
];

let currentDirection = directions[Math.floor(Math.random() * directions.length)];

const generateGameBoard = () => {
  gameBoard.innerHTML = '';
  board.forEach((row, rowIndex) => {
    const boardRow = gameBoard.appendChild(document.createElement("div"));
    boardRow.classList.add("row");
    row.forEach((element, colIndex) => {
      generateBoardElement(boardRow, element, rowIndex, colIndex);
    });
  });
};

const generateBoardElement = (boardRow, element, rowIndex, colIndex) => {
  let newElement = document.createElement("div");

  if (element === "X") {
    newElement.classList.add("border");
  }

  if (element === "0") {
    newElement.classList.add("board");
  }

  if (element === "Y") {
    newElement.classList.add("randomBounce");
  }

  if (ballPosition.x === rowIndex && ballPosition.y === colIndex) {
    newElement.classList.add("ball");
  }

  boardRow.appendChild(newElement);
};

const moveBall = () => {
  let newX = ballPosition.x + currentDirection.x;
  let newY = ballPosition.y + currentDirection.y;

  if (board[newX][newY] === 'X') {
    if (board[ballPosition.x][newY] === 'X') {
      currentDirection.y *= -1;
    } else if (board[newX][ballPosition.y] === 'X') {
      currentDirection.x *= -1;
    }else {
      currentDirection.x *= -1;
      currentDirection.y *= -1;
    }
  } else if (board[newX][newY] === 'Y') {
    board[newX][newY] = '0';
    ballPosition.x = newX;
    ballPosition.y = newY;
    currentDirection = directions[Math.floor(Math.random() * directions.length)];
  } else {
    ballPosition.x = newX;
    ballPosition.y = newY;
  }

  generateGameBoard();
};

generateGameBoard();

setInterval(moveBall, 300);
