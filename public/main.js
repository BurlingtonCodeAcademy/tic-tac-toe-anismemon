let startButton2 = document.getElementById('start2')
let startButton1 = document.getElementById('start1')

startButton2.addEventListener('click', startGame2)
startButton1.addEventListener('click', startGame1)

// ------------------------------------------------------------------------------------
// player objects and global variables
// player class

class Player {
  constructor(name, symbol) {
    this.name = name
    this.symbol = symbol
  }
}

// player objects

let playerX = new Player("", "X")
let playerO = new Player("", "O")
let currentPlayer

// varibles for getting inputted player names from text input field

let xName = document.getElementById("playerX-name")
let oName = document.getElementById("playerO-name")

// variables to retrieve cell info

let c0 = document.getElementById('cell-0')
let c1 = document.getElementById('cell-1')
let c2 = document.getElementById('cell-2')
let c3 = document.getElementById('cell-3')
let c4 = document.getElementById('cell-4')
let c5 = document.getElementById('cell-5')
let c6 = document.getElementById('cell-6')
let c7 = document.getElementById('cell-7')
let c8 = document.getElementById('cell-8')

// other global variables

let cells = document.querySelectorAll("[id^='cell']")
let playerStatus = document.getElementById("status-bar")

// -----------------------------------------------------------------------------------------------
// functions
// function to check whether any winning combination has been achieved during play

function gameWin() {
  let index = 0

  // loop to iterate through winning array combinations

  while (index < 8) {

    // winning array combinations

    let winningArrays = [

      [c0.innerHTML, c1.innerHTML, c2.innerHTML],
      [c0.innerHTML, c3.innerHTML, c6.innerHTML],
      [c0.innerHTML, c4.innerHTML, c8.innerHTML],
      [c3.innerHTML, c4.innerHTML, c5.innerHTML],
      [c6.innerHTML, c7.innerHTML, c8.innerHTML],
      [c1.innerHTML, c4.innerHTML, c7.innerHTML],
      [c2.innerHTML, c5.innerHTML, c8.innerHTML],
      [c2.innerHTML, c4.innerHTML, c6.innerHTML]

    ]
    // function to filter arrays for X's and O's

    checkedMoves = winningArrays[index].filter(function (value) {
      return value === currentPlayer.symbol
    })
    index++

    // check that returns the first array to contain 3 X's or O's

    if (checkedMoves.length === 3) {
      console.log(index) // I'm not sure how to retrieve (return) this index, but I think I'll need it in order to know which combination was reached so that I can draw a line through the appropriate cells or change their background color.
      return checkedMoves
    }
  }
}

// function to delay game (i.e. page) reset

function delayEnding() {
  window.setTimeout(endGame, 4 * 1000)
}

// function to reset board (i.e. page)

function endGame() {
  document.location.reload();
  clearInterval(interval);
}

// draw function checks if board has been completely filled

function tieGame() {

  let grid =
    [c0.innerHTML, c1.innerHTML, c2.innerHTML, c3.innerHTML, c4.innerHTML, c5.innerHTML, c6.innerHTML, c7.innerHTML, c8.innerHTML]

  fullGrid = grid.filter(function (value) {
    return value !== ''
  })
  if (fullGrid.length === 9) {
    return fullGrid
  }
}

// function to accept player names, insert player into status area, disable start button and start timer

function startGame2() {
  playerX.name = xName.value
  playerO.name = oName.value
  currentPlayer = playerX
  playerStatus.innerHTML = currentPlayer.name + "'s Turn";
  event.target.disabled = true
  startButton1.disabled = true
  xName.value = ""
  oName.value = ""
  let time0 = performance.now()
  twoPlayerGame()
  time1 = performance.now()
  startButton2.innerHTML = "Time Elapsed: " + (Math.round(time1 - time0)) + " seconds" // this is meant to be my timer, but it measures how long it takes to click the start button. I think this setup will work, but I don't know where to put the start and end points for the timer.
}

// game proper (with switching players)

let twoPlayerGame = function () {

  // add click event to each cell on the grid

  for (let square of cells) {
    square.addEventListener('click', gaming)

    function gaming() {

      // prevents clicking on a filled square by throwing alert 
      if (square.innerHTML !== "") {
        window.alert("Please choose an empty square!")
      } else {
        square.innerHTML = currentPlayer.symbol;
      }

      // checks for tie       
      tieGame()

      // alternating X / O turns, checking for winning combinations

      if (square.innerHTML === "X") {
        gameWin()

        if (checkedMoves.length === 3) {
          playerStatus.innerHTML = currentPlayer.name + " wins!"
          delayEnding()
        } else if (fullGrid.length === 9) {
          playerStatus.innerHTML = "It's a draw!"
          delayEnding()
        }
        else {
          currentPlayer = playerO
          playerStatus.innerHTML = currentPlayer.name + "'s Turn";
        }

      } else {
        gameWin()

        if (checkedMoves.length === 3) {
          playerStatus.innerHTML = currentPlayer.name + ' wins!'
          delayEnding()
        } else if (fullGrid.length === 9) {
          playerStatus.innerHTML = "It's a draw!"
          delayEnding()
        }
        else {
          currentPlayer = playerX
          playerStatus.innerHTML = currentPlayer.name + "'s Turn";
        }

      }
    }
  }
}

// ------------------------------------------------------------------------------------------------------------
// one-player game between human and computer

// starts game, disabling both player option buttons 

function startGame1() {
  playerX.name = "Player X"
  playerO.name = "Player O"
  currentPlayer = playerX
  playerStatus.innerHTML = currentPlayer.name + "'s Turn";
  event.target.disabled = true
  startButton2.disabled = true
  onePlayerGame()
}

// random number generator to choose among the available spaces in the board array (by index)

function randomInt(max, min) {
  max = board.length - 1
  min = 0
  arrayIndex = Math.floor(min + (Math.random() * (max - min + 1)))
  return arrayIndex
}

// main game function 

board = [c0, c1, c2, c3, c4, c5, c6, c7, c8]

function onePlayerGame() {

  for (let square of cells) {
    square.addEventListener('click', playGame)

    // functions that use the "square" variable which (due to scope) cannot be defined outside of the onePlayerGame
    
    // function to eliminate unplayable spaces from the board 
    
    function eliminateCells() {
      if (board.includes(square)) {
        let indexOfItem = board.indexOf(square)
        board.splice(indexOfItem, 1)
        return board
      }
    }

    // computer's move that puts an O in the HTML and removes the computer's move from the board array

    function computerMove() {
      square = board[arrayIndex]
      square.innerHTML = currentPlayer.symbol
      board.splice(arrayIndex, 1)
      return board
    }

    function playGame() {
      // human's part of the game -----------------

      // prevents clicking on a filled square by throwing alert

      if (square.innerHTML !== "") {
        window.alert("Please choose an empty square!")
      } else {
        square.innerHTML = currentPlayer.symbol
        console.log(currentPlayer.symbol)
      }

      // checks for tie       

      tieGame()

      // after human has selected a cell

      if (square.innerHTML === "X") {

        gameWin()
        eliminateCells()

        if (checkedMoves.length === 3) {
          playerStatus.innerHTML = currentPlayer.name + " wins!"
          delayEnding()
        } else if (fullGrid.length === 9) {
          playerStatus.innerHTML = "It's a draw!"
          delayEnding()
        } else {
          currentPlayer = playerO
          playerStatus.innerHTML = currentPlayer.name + "'s Turn";

          // computer's part of the game -----------------------
          randomInt()          
          computerMove()
          gameWin()

          if (checkedMoves.length === 3) {
            playerStatus.innerHTML = currentPlayer.name + ' wins!'
            delayEnding()
          } else if (fullGrid.length === 9) {
            playerStatus.innerHTML = "It's a draw!"
            delayEnding()
          }
          else {
            currentPlayer = playerX
            playerStatus.innerHTML = currentPlayer.name + "'s Turn";
          }
        }
      }
    }
  }
}

