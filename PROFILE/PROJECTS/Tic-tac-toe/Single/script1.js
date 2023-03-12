const newGameBtn = document.getElementById("reset-game");
const gametiles = document.querySelectorAll(".tile");
var gameMessages = document.getElementById('game-messages');
var gameTurns= document.getElementById('game-turn');
var playerOneScoreCard = document.getElementById('player-one-score');
var playerTwoScoreCard = document.getElementById('player-two-score');


const aiMark = "O";
const humanMark = "X";
var playerOneScore = 0;
var playerTwoScore = 0;
let gameOver = true;


gametiles.forEach((c) => c.addEventListener("click", XorO));
newGameBtn.addEventListener("click", startNewGame);

function XorO() {
  if (!this.innerText && !gameOver) {
    this.innerText = humanMark;
   // gameTurns.className='player-x-turn';
    this.style.color = "#ed4e6e";
    resultValidate();
  }
  if (!gameOver) {
    aiPlays();
    resultValidate();
  }
}

function startNewGame() {
  gameOver = false;
  gameTurns.className = '';
  gameMessages.className = '';
  gametiles.forEach((i) => {
    i.innerText = "";
    i.style.color = " #00d9ff";
  });
}

function aiPlays() {
  const currentBoardState = [];

  gametiles.forEach((c, i) => {
    c.innerText ? currentBoardState.push(c.innerText): currentBoardState.push(i);
  });

  function emptyTiles(currBdSt) {
    return currBdSt.filter((i) => i != "X" && i != "O");
  }

  // Step 5 - Create a winner determiner function:
  function checkWinStatus(currBdSt, currMark)
   {
    if (
      (currBdSt[0] === currMark && currBdSt[1] === currMark && currBdSt[2] === currMark) ||
      (currBdSt[3] === currMark && currBdSt[4] === currMark &&currBdSt[5] === currMark) ||
      (currBdSt[6] === currMark && currBdSt[7] === currMark && currBdSt[8] === currMark) ||
      (currBdSt[0] === currMark && currBdSt[3] === currMark && currBdSt[6] === currMark) ||
      (currBdSt[1] === currMark && currBdSt[4] === currMark && currBdSt[7] === currMark) ||
      (currBdSt[2] === currMark && currBdSt[5] === currMark && currBdSt[8] === currMark) ||
      (currBdSt[0] === currMark && currBdSt[4] === currMark && currBdSt[8] === currMark) ||
      (currBdSt[2] === currMark && currBdSt[4] === currMark &&currBdSt[6] === currMark)
    ) 
    {
      return true;
    } 
    else 
    {
      return false;
    }
  }

  
  function minimax(currBdSt, currMark)
  {
    const availableTiles = emptyTiles(currBdSt);
    if (checkWinStatus(currBdSt, humanMark)) 
    {
      return { score: -1 };
    } 
    else 
    if (checkWinStatus(currBdSt, aiMark)) 
    {
      return { score: 1 };
    } 
    else
    if (availableTiles.length === 0) 
    {
      return { score: 0 };
    }

    const board = ['', '', '', '', '', '', '', '', ''];

    for (let i = 0; i < availableTiles.length; i++) 
    {
      const currInfo = {};

      currInfo.index = currBdSt[availableTiles[i]];
      currBdSt[availableTiles[i]] = currMark;
      if (currMark === aiMark) {
        const result = minimax(currBdSt, humanMark);

        currInfo.score = result.score;
      } 
      else 
      {
        const result = minimax(currBdSt, aiMark);
        currInfo.score = result.score;
      }
      currBdSt[availableTiles[i]] = currInfo.index;
      board.push(currInfo);
    }

    let bestPlay = null;

    if (currMark === aiMark)
    {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) 
      {
        if (board[i].score > bestScore) 
        {
          bestScore = board[i].score;
          bestPlay = i;
        }
      }
    } 
    else 
    {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) 
      {
        if (board[i].score < bestScore) 
        {
          bestScore = board[i].score;
          bestPlay = i;
        }
      }
    }

    return board[bestPlay];
  }

  const bestPlayInfo = minimax(currentBoardState, aiMark);

  gametiles[bestPlayInfo.index].innerText = aiMark;
}


function resultValidate() {
  const rowsColsAndDiagsKeys = ["rowOne","rowTwo","rowThree","columnOne","columnTwo","columnThree","diagonalOne","diagonalTwo"];

  const rowsColsAndDiags = {
    rowOne: document.querySelectorAll(".r1"),
    rowTwo: document.querySelectorAll(".r2"),
    rowThree: document.querySelectorAll(".r3"),
    columnOne: document.querySelectorAll(".c1"),
    columnTwo: document.querySelectorAll(".c2"),
    columnThree: document.querySelectorAll(".c3"),
    diagonalOne: document.querySelectorAll(".d1"),
    diagonalTwo: document.querySelectorAll(".d2"),
  };

  const tileValuesKeys = [
    "rowOnetilesValues",
    "rowTwotilesValues",
    "rowThreetilesValues",
    "columnOnetilesValues",
    "columnTwotilesValues",
    "columnThreetilesValues",
    "diagonalOnetilesValues",
    "diagonalTwotilesValues",
  ];

  const tileValues = {
    rowOnetilesValues: [],
    rowTwotilesValues: [],
    rowThreetilesValues: [],
    columnOnetilesValues: [],
    columnTwotilesValues: [],
    columnThreetilesValues: [],
    diagonalOnetilesValues: [],
    diagonalTwotilesValues: [],
  };

  for (let i = 0; i < rowsColsAndDiagsKeys.length; i++) {
    rowsColsAndDiags[rowsColsAndDiagsKeys[i]].forEach((c) =>
      tileValues[tileValuesKeys[i]].push(c.innerText)
    );
  }


  for (let i = 0; i < tileValuesKeys.length; i++) 
  {
    if (tileValues[tileValuesKeys[i]].every((v) => v === tileValues[tileValuesKeys[i]][0] && v !== "")) 
    {
      gameOver = true;
      if(rowsColsAndDiags[rowsColsAndDiagsKeys[i]]=='X')
      {
        gameMessages.className = 'player-x-win';
        playerOneScoreCard.innerHTML = ++playerOneScore;
        gameTurns.className="game-over";
      }
      else
      {
        gameMessages.className = 'player-o-win';
        playerTwoScoreCard.innerHTML = ++playerTwoScore;
        gameTurns.className="game-over";
      }
      rowsColsAndDiags[rowsColsAndDiagsKeys[i]].forEach((c) => (c.style.color = "rgb(2, 239, 89)"));
    }
 }
 
 if (Array.from(gametiles).every((i) => i.innerText) && !gameOver) 
  {
    gameOver = true;
    gametiles.forEach((i) => (i.style.color = "grey"));
    gameMessages.className="draw"
    gameTurns.className="game-over";
  }
}