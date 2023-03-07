const tiles = Array.from(document.querySelectorAll('.tile'));
var resetGameButton = document.querySelector('#reset-game');
var undoMove= document.querySelector('#undo-move');
var gameMessages = document.getElementById('game-messages');
var gameTurns= document.getElementById('game-turn');
var playerOneScoreCard = document.getElementById('player-one-score');
var playerTwoScoreCard = document.getElementById('player-two-score');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

var playerOneScore = 0;
var playerTwoScore = 0;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const moves=[];
var count=0;

const isValidAction = (tile) => {
  if (tile.innerText === 'X' || tile.innerText === 'O'){
      return false;
  }

  return true;
};

const updateBoard =  (index) => {
  board[index] = currentPlayer;
  count=0;
}

const changePlayer = () => {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  if (currentPlayer === "X") 
    {
      gameTurns.className = 'player-x-turn';
    }
    else
    {
      gameTurns.className = 'player-o-turn';
    }
}

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    const a = board[winCondition[0]];
    const b = board[winCondition[1]];
    const c = board[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      
      roundWon = true;
      count=2;
      break;
    }
  }

  if (roundWon) {
    
    if (currentPlayer === "X") 
    {
      gameMessages.className = 'player-x-win';
      playerOneScoreCard.innerHTML = ++playerOneScore;
    }
    else
    {
      gameMessages.className = 'player-o-win';
      playerTwoScoreCard.innerHTML = ++playerTwoScore;
    }
    
    isGameActive = false;
    return;
  }

  if (isGameActive===false) {
    gameTurns.className = 'game-over';
  } 

  if (!board.includes("")) {
    gameMessages.className = 'draw';
    isGameActive = false;
    return;
  };
}

const userAction = (tile, index) => {
  if (isValidAction(tile) && isGameActive) {
    tile.innerText = currentPlayer;
    tile.classList.add(`player${currentPlayer}`);
    updateBoard(index);
    moves.push(index);
    handleResultValidation();
    changePlayer();
  }
};


const resetBoard = () => {
  board = ['', '', '', '', '', '', '', '', ''];
  isGameActive = true;

  if (currentPlayer === 'O') 
  {
      changePlayer();
  }

  tiles.forEach(tile => {
      tile.innerText = '';
      tile.classList.remove('playerX');
      tile.classList.remove('playerO');
  });
}

const Undo_Move = () => {
  if (moves.length > 0 && count===0) 
  {
    var lastMove = moves.pop();
    board[lastMove] = '';
    tiles[lastMove].innerText = '';
    tiles[lastMove].classList.remove('playerX');
    tiles[lastMove].classList.remove('playerO');
    count++;

    changePlayer();
  }
};


resetGameButton.addEventListener('click', resetBoard);
undoMove.addEventListener('click', Undo_Move);
tiles.forEach( (tile, index) => {
  tile.addEventListener('click', () => userAction(tile, index));
});