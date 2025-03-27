/*-------------------------------- Constants --------------------------------*/
let board = ["", "", "", "", "", "", "", "", ""]; //represent the state of the squares on the board.
let turn = ""; //track whose turn it is.
let winner = false; //represent if anyone has won yet.
let tie = false; //represent if the game has ended in a tie.

const turnArr = ["X", "O"];
const outcomeArr = ["X", "O", "tie"];
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/*------------------------ Cached Element References ------------------------*/
//const board = document.querySelector(".board");
const squareEls = document.querySelectorAll(".sqr"); //store the nine elements representing the squares on the page
const messageEl = document.getElementById("message");
const resetEl = document.getElementById("reset");

/*-------------------------------- Functions --------------------------------*/

function updateMessage() {
  if (!winner && !tie) {
    messageEl.innerText = `It is ${turn}'s turn`;
  } else if (!winner && tie) {
    messageEl.innerText = "It is a tie!";
  } else {
    messageEl.innerText = `${turn} wins!`;
  }
}

function updateBoard() {
  board.forEach((cell, index) => {
    squareEls[index].innerText = cell;
  });
}

function init() {
  turn = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  winner = false;
  tie = false;
  render();
}

function render() {
  updateBoard();
  updateMessage();
}

function handleClick(event) {
  if (winner || tie) return; // Prevents moves after game ends
  const clickedCell = event.target;
  const squareIndex = parseInt(clickedCell.id);
  if (board[squareIndex]) return;
  placePiece(squareIndex);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
  render();
}

function placePiece(index) {
  board[index] = turn;
}

function checkForWinner() {
  for (let winningCombo of winningCombos) {
    if (board[winningCombo[0]] !== "") {
      if (
        board[winningCombo[0]] === board[winningCombo[1]] &&
        board[winningCombo[0]] === board[winningCombo[2]]
      ) {
        winner = true;
        break;
      }
    }
  }
}

function checkForTie() {
  if (winner) {
    return;
  }
  if (board.some((val) => val === "")) {
    return;
  } else {
    tie = true;
  }
}

function switchPlayerTurn() {
  if (winner) {
    return;
  } else {
    if (turn === "X") {
      turn = "O";
    } else turn = "X";
  }
}
/*----------------------------- Event Listeners -----------------------------*/

for (const cell of squareEls) {
  cell.addEventListener("click", handleClick);
}

reset.addEventListener("click", init);

init();
