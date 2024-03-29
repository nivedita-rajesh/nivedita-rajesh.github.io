import { WORDS } from "./words.js";

const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)]
console.log(rightGuessString)
var gameMessages = document.getElementById('game-messages');
var gameOverMessage = document.getElementById('game-over');
var newGame = document.querySelector('#new-game');


//creating the game board
function initBoard() {
    let board = document.getElementById("game-tiles");

    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = document.createElement("div")
        row.className = "letter-row"
        
        for (let j = 0; j < 5; j++) {
            let box = document.createElement("div")
            box.className = "letter-box"
            row.appendChild(box)
        }

        board.appendChild(row)
    }
}

initBoard()


document.addEventListener("keyup", (e) => {

    if (guessesRemaining === 0) {
        return
    }

    let pressedKey = String(e.key)
    if (pressedKey === "Backspace" && nextLetter !== 0) {
        deleteLetter()
        return
    }

    if (pressedKey === "Enter") {
        checkGuess()
        return
    }

    let found = pressedKey.match(/[a-z]/gi)
    if (!found || found.length > 1) {
        return
    } else {
        insertLetter(pressedKey)
    }
})

function insertLetter (pressedKey) {
    if (nextLetter === 5) {
        return
    }
    pressedKey = pressedKey.toLowerCase()

    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let box = row.children[nextLetter]
    box.textContent = pressedKey
    box.classList.add("filled-box")
    currentGuess.push(pressedKey)
    nextLetter += 1
}

function deleteLetter () {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let box = row.children[nextLetter - 1]
    box.textContent = ""
    box.classList.remove("filled-box")
    currentGuess.pop()
    nextLetter -= 1
}

function checkGuess ()
{
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let guessString = ''
    let rightGuess = Array.from(rightGuessString)

    for (const val of currentGuess) 
    {
        guessString += val
    }

    if (guessString.length != 5) 
    {
        alert("Not enough letters!")
        return
    }

    if (!WORDS.includes(guessString)) 
    {
        alert("Not a word!")
        guessString = ''
        return
    }

    
    for (let i = 0; i < 5; i++) 
    {
        let letterColor = ''
        let box = row.children[i]
        let letter = currentGuess[i]
        
        let letterPosition = rightGuess.indexOf(currentGuess[i])
        // is letter in the correct guess
        if (letterPosition === -1)
        {
            letterColor = 'grey'
        } else {
            // now, letter is definitely in word
            // if letter index and right guess index are the same
            // letter is in the right position 
            if (currentGuess[i] === rightGuess[i]) 
            {
                // shade green 
                letterColor = 'green'
            } 
            else 
            {
                // shade box yellow
                letterColor = 'yellow'
            }

            rightGuess[letterPosition] = "#"
        }

            box.style.backgroundColor = letterColor
    }

    if (guessString === rightGuessString) 
    {
        gameMessages.className = "good-move"
        guessesRemaining = 0
        return
    } 
    else 
    {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;

        if (guessesRemaining === 0)
        {
            gameMessages.className = "bad-move";
           // gameOverMessage.className = "sorry"+rightGuessString;
            gameOverMessage.textContent = "The word was " + rightGuessString + ".";
            document.getElementById("game-over").style.textAlign='center';
            document.getElementById("game-over").style.fontFamily='Ink Free';
            document.getElementById("game-over").style.fontSize='2rem';
            document.getElementById("game-over").style.color='rgb(217, 0, 255)';
            
        }
    }
}

const newBoard = () => {
    location.reload();
}

newGame.addEventListener('click', newBoard);
