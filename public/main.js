let startButton2 = document.getElementById('start2')
let startButton1 = document.getElementById('start1')

startButton2.addEventListener('click', startGame2)
startButton1.addEventListener('click', startGame1)

// ------------------- player objects and global variables ----------------------------- //

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

let nodeList = document.querySelectorAll("[id^='cell']")
let cells = Array.from(nodeList) // turns the nodeList into a javascript array
let endVariable // a single-use variable to allow me to stop the timer

console.log(cells)

let playerStatus = document.getElementById("status-bar")
let checkedMoves

// -------------------------- main game functions ------------------------------------------------ //

// function to check whether any winning combination has been achieved during play

function gameWin() {
  let index = 0

  // loop to iterate through winning array combinations

  while (index < 8) {

    // winning array combinations

    let winningArrays = [

      [c0, c1, c2],
      [c0, c3, c6],
      [c0, c4, c8],
      [c3, c4, c5],
      [c6, c7, c8],
      [c1, c4, c7],
      [c2, c5, c8],
      [c2, c4, c6]

    ]

    // function to filter arrays for X's and O's

    checkedMoves = winningArrays[index].filter(function (value) {

      return value.innerHTML === currentPlayer.symbol

    })

    index++

    // checks if a winning combination has been reached

    if (checkedMoves.length === 3) {
      endVariable = "end" // sets a unique condition to stop the timer
      return checkedMoves
    }
  }
}

// function to delay game (i.e. page) reset

function delayEnding() {
  window.setTimeout(endGame, 4000)
}

// function to reset board (i.e. page)

function endGame() {
  document.location.reload();

}

// function to check if board has been completely filled without a winner

function tieGame() {

  fullGrid = cells.filter(function (value) {
    return value.innerHTML !== ''
  })
  if (fullGrid.length === 9) {
    endVariable = "end"
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
  xName.style.display = 'none'
  oName.style.display = 'none'
  twoPlayerGame()

  // timer function

  let n = 1
  let timeElapsed = setInterval((timer), 1000)

  function timer() {

    // displays time in start button

    startButton2.innerHTML = "Time Elapsed: " + n + " seconds"

    if (endVariable === 'end') {
      stopTimer()

    } else {

      n = n + 1
    }

    return timeElapsed
  }

  // stop timer function

  function stopTimer() {
    clearInterval(timeElapsed)
  }
}

// game proper (with switching players)

let twoPlayerGame = function () {

  // adds click event to each cell on the grid

  for (let square of cells) {
    square.addEventListener('click', gaming)
  }
  function gaming() {

    // prevents clicking on a filled square by throwing alert 

    if (event.target.innerHTML !== "") {
      window.alert("Please choose an empty square!")
    } else {
      event.target.innerHTML = currentPlayer.symbol;
    }

    // checks for tie     

    tieGame()

    // alternating X / O turns, checking for winning combinations
    // after X's move

    if (event.target.innerHTML === "X") {

      // checks for win

      gameWin()

      if (checkedMoves.length === 3) {
        playerStatus.innerHTML = currentPlayer.name + " wins!"
        for (let square of cells) {
          square.removeEventListener('click', gaming)
        }
        delayEnding()

        // checks for tie

      } else if (fullGrid.length === 9) {
        playerStatus.innerHTML = "It's a draw!"
        delayEnding()
      }

      // sends the game over to player O

      else {
        currentPlayer = playerO
        playerStatus.innerHTML = currentPlayer.name + "'s Turn";
      }

      // player O's turn 
    } else {

      // checks for win

      gameWin()

      if (checkedMoves.length === 3) {
        playerStatus.innerHTML = currentPlayer.name + ' wins!'
        for (let square of cells) {
          square.removeEventListener('click', gaming)
        }
        delayEnding()

        // checks for tie

      } else if (fullGrid.length === 9) {
        playerStatus.innerHTML = "It's a draw!"
        delayEnding()
      }

      // sends the game over to player X

      else {
        currentPlayer = playerX
        playerStatus.innerHTML = currentPlayer.name + "'s Turn";
      }

    }
  }
}

// ---------------------------- one-player game between human and computer ---------------------------------- //

// starts game, disabling both player option buttons and hiding the name entry options

function startGame1() {
  playerX.name = "Player X"
  playerO.name = "Player O"
  currentPlayer = playerX
  xName.style.display = 'none'
  oName.style.display = 'none'
  playerStatus.innerHTML = currentPlayer.name + "'s Turn";
  event.target.disabled = true
  startButton2.disabled = true
  onePlayerGame()
}

// main game function 

function onePlayerGame() {

  // adds click event to all cells

  for (let square of cells) {
    square.addEventListener('click', playGame)
  }


  function playGame() {

    // -------------------------- human's part of the game ------------------ //

    // prevents clicking on a filled square by throwing alert

    if (event.target.innerHTML !== "") {
      window.alert("Please choose an empty square!")
    } else {
      event.target.innerHTML = currentPlayer.symbol
      
    }

    // checks for tie       

    tieGame()

    // after human has selected a cell

    if (event.target.innerHTML === "X") {

      // checks for win 

      gameWin()

      if (checkedMoves.length === 3) {
        playerStatus.innerHTML = currentPlayer.name + " wins!"

        // checks for tie

      } else if (fullGrid.length === 9) {
        playerStatus.innerHTML = "It's a draw!"

        // sends the game over to computer

      } else {
        currentPlayer = playerO
        playerStatus.innerHTML = currentPlayer.name + "'s Turn";

        // fires computer's game logic moves with a 1 second delay

        window.setTimeout(computerLogic, 1000)
      }
    } else {

      // after computer has made a move

      // checks for win

      gameWin()

      if (checkedMoves.length === 3) {
        playerStatus.innerHTML = currentPlayer.name + ' wins!'

        // checks for tie

      } else if (fullGrid.length === 9) {
        playerStatus.innerHTML = "It's a draw!"

      }

      // sends the game back to human player

      else {
        currentPlayer = playerX
        playerStatus.innerHTML = currentPlayer.name + "'s Turn";
      }
    }
  }
}

// ------------------- computer's game logic ------------------------------ //

// global variables needed to access arrays of moves

let checkArray
let targetArray
let oArray

// logic of computer's moves

function computerLogic() {

  // determines whether there are any available winning arrays for X or O

  computerMove()

  // checks for immediate winning array for O

  if (oArray.length === 3) {
    indexArray = oArray.findIndex(function (value) {
      return value.innerHTML === ''
    })

    // and selects the appropriate square 

    oArray[indexArray].click()
  }

  // if not, checks if X needs to be blocked from winning

  else if (targetArray.length === 3) {

    cellIndex = targetArray.findIndex(function (value) {
      return value.innerHTML === ''
    })

    // and selects the apporpriate square

    targetArray[cellIndex].click()

  }

  // if not, checks for optimal placement (although the computer doesn't always play very intelligently if the human does counterintuitive things)

  else if (c4.innerHTML === '') {
    c4.click()
  }

  else if (c0.innerHTML === '' && c4.innerHTML !== '' && c5.innerHTML !== 'X') {
    c0.click()
  }
  else if (c2.innerHTML === '' && c0.innerHTML === 'O') {
    c2.click()
  }
  else if (c1.innerHTML === '') {
    c1.click()
  }

  else if (c6.innerHTML === '') {
    c6.click()
  }
  else if (c8.innerHTML === '') {
    c8.click()
  }

  else if (c3.innerHTML === '') {
    c3.click()
  }
}

// function to check whether O needs to play defense or offense 

function computerMove() {

  // loop to iterate through winning array combinations

  let index = 0
  let checkedSquares

  while (index < 8) {

    // winning array combinations

    checkArray = [

      [c0, c1, c2],
      [c0, c3, c6],
      [c0, c4, c8],
      [c3, c4, c5],
      [c6, c7, c8],
      [c1, c4, c7],
      [c2, c5, c8],
      [c2, c4, c6]

    ]
    // function to filter arrays for Xs (for defensive moves)

    checkedSquares = checkArray[index].filter(function (value) {
      return value.innerHTML === "X"
    })

    // array of X-moves that turns checkArray into a useable array of values

    let holdingArray = [checkArray[index][0].innerHTML, checkArray[index][1].innerHTML, checkArray[index][2].innerHTML]

    // function to filter arrays for Os (for offensive moves)

    checkOs = checkArray[index].filter(function (value) {
      return value.innerHTML === 'O'
    })

    // array of O-moves that turns checkArray into a useable array of values

    let holdingOsArray = [checkArray[index][0].innerHTML, checkArray[index][1].innerHTML, checkArray[index][2].innerHTML]

    // checks if O has 2 squares in a winning array (for offense)

    if ((checkOs.length === 2) && (!holdingOsArray.includes('X'))) {
      oArray = checkArray[index]
      return oArray
    }
    else {

      // if not, empties the array so that it does not pass the first if-check of the computer's moves

      oArray = []
    }

    // checks if X has 2 squares in a winning array (for defense)

    if ((checkedSquares.length === 2) && (!holdingArray.includes('O'))) {
      
      targetArray = checkArray[index]      
      return targetArray

    } else {
      
      // if not, empties the array so that it does not pass the second if-check of the computer's moves

      targetArray = []
    }

    index++

  }
}
