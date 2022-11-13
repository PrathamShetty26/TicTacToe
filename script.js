const stautsDisplay = document.querySelector(".game--status");

let gameActive = true;
let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () =>`Congratulation Player ${currentPlayer == "X" ? "1" : "2"} wins!!`;
// console.log(winningMessage);

const drawMessage = "Draw!!";
const currentPlayerTurn = ()=>`It's player ${currentPlayer == "X" ? "1" : "2"}'s turn`;
stautsDisplay.innerHTML = currentPlayerTurn();


const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

document.querySelectorAll(".cell").forEach((cell) => cell.addEventListener("click", handleCellClick));

document.querySelector(".game--restart").addEventListener("click",handlereStartGame)

function handleCellClick(e) {
  const clickedCell = e.target;
  const clickedCellIndex = clickedCell.id - 1;
  // console.log(clickedCellIndex);
  if (!gameActive || gameState[clickedCellIndex])
    return;
  handleCellPlayed(clickedCell, clickedCellIndex);
  gameValidation();

}

function handlereStartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ['', '', '', '', '', '', '', '', '']
  stautsDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll(".cell").forEach((cell) => cell.innerHTML = "");

}

function handleCellPlayed(clickedCell, clickedCellIndex)
{
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

function gameValidation() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    let winState = winningConditions[i];
    let a = gameState[winState[0]];
    let b = gameState[winState[1]];
    let c = gameState[winState[2]];
   
    if (a == "" || b == "" || c == "")
      continue;
    if (a == b && b == c) {
      console.log(a, b, c)
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
   stautsDisplay.innerHTML= winningMessage();
    gameActive = false;
    return;
  }

  let roundDraw = !gameState.includes("");
    if (roundDraw)
    {
      stautsDisplay.innerHTML = drawMessage;
      gameActive = false;
      return;
    }
  handlePlayerChange();

}
function handlePlayerChange()
{
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  stautsDisplay.innerHTML = currentPlayerTurn();
}


