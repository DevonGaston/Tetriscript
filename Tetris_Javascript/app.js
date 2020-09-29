document.addEventListener('DOMContentLoaded', () => {

  // Create container for grids
  var containDiv = document.createElement('div')
  containDiv.id = 'container'
  containDiv.className = 'container'
  document.body.appendChild(containDiv)
  // Create grid
  var iDiv = document.createElement('div')
  iDiv.id = 'grid'
  iDiv.className = 'grid'
  containDiv.appendChild(iDiv)

  // Create blocks in grid
  var innerDiv
  for (let i = 0; i < 200; i++) {
    innerDiv = document.createElement('div')
    iDiv.appendChild(innerDiv)
  }

  // Create floor for tetronimos to stand on
  for (let i = 0; i < 10; i++) {
    innerDiv = document.createElement('div')
    innerDiv.setAttribute('class', 'taken')
    iDiv.appendChild(innerDiv)
  }

  // Create minigrid to display upcoming tetronimo
  iDiv = document.createElement('div')
  iDiv.id = 'mini-grid'
  iDiv.className = 'mini-grid'
  containDiv.appendChild(iDiv)

  // Create blocks in minigrid
  for (let i = 0; i < 16; i++) {
    innerDiv = document.createElement('div')
    iDiv.appendChild(innerDiv)
  }

  // Define and HTML elements (grid, squares, etc)
  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const scoreDisplay = document.querySelector('#score')
  const startBtn = document.querySelector('#start-button')
  const width = 10
  let timerId
  let score = 0

  // Determines if movement commands can function
  let canMove = 0

  // Tetriminos
  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
  ]
  const jTetronimo = [
    [width * 2 + 1, width + 1, 1, width * 2 + 2],
    [width, width + 1, width + 2, 1],
    [width * 2, width, 1, 2],
    [width, 0, 1, 2]
  ]
  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1]
  ]
  const sTetronimo = [
    [1, width + 1, width, width * 2],
    [width, width + 1, width * 2 + 1, width * 2 + 2],
    [1, width + 1, width, width * 2],
    [width, width + 1, width * 2 + 1, width * 2 + 2]
  ]
  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
  ]
  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
  ]
  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
  ]
  const theTetronimoes = [lTetromino, zTetromino, sTetronimo,
    tTetromino, oTetromino, iTetromino]

  let currentPosition = 4
  let currentRotation = 0

  // Randomly select first tetronimo and rotation
  let random = Math.floor(Math.random() * theTetronimoes.length)
  let nextRandom = Math.floor(Math.random() * theTetronimoes.length)
  let current = theTetronimoes[random][currentRotation]


  // Draw tetronimo
  function draw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('tetronimo')
    })
  }

  // Undraw tetronimo
  function undraw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetronimo')
    })
  }

  // Allow player to move Tetronimo with keyboard controls
  function control(e) {
    if (canMove == 1) {
      if (e.keyCode == 37 || e.keyCode == 65) {
        moveLeft()
      }
      if (e.keyCode == 39 || e.keyCode == 68) {
        moveRight()
      }
      if (e.keyCode == 38 || e.keyCode == 87) {
        rotate()
      }
      if (e.keyCode == 40 || e.keyCode == 83) {
        moveDown()
      }
    }
  }
  document.addEventListener('keyup', control)

  // Determines if tetronimo is about to cross right edge
  function isAtRight() {
    return current.some(index=> (currentPosition + index + 1) % width === 0)
  }

  // Determines if tetronimos is about to cross the left edge
  function isAtLeft() {
    return current.some(index=> (currentPosition + index) % width === 0)
  }

  // Determines if tetronimo is about to cross a taken space
  function isTaken() {
    return current.some(index => squares[currentPosition + index].classList.contains('taken'))
  }

  // Movement functions
  function moveLeft() {
    undraw()
    if (!isAtLeft()) currentPosition--
    if (isTaken()) {
      currentPosition++
    }
    draw()
  }

  function moveRight() {
    undraw()
    if (!isAtRight()) currentPosition++
    if (isTaken()) {
      currentPosition--
    }
    draw()
  }

  // Move down fucntion
  function moveDown() {
    undraw()
    currentPosition += width
    draw()
    freeze()
  }

  // Checks the rotated position to avoid collisions
  function checkRotatedPosition (P) {
    P = P || currentPosition
    if ((P+1) % width < 4) {
      if (isAtRight() || isTaken()) {
        currentPosition += 1
        checkRotatedPosition(P)
      }
    }
    else if (P % width > 5) {
      if (isAtLeft() || isTaken()) {
        currentPosition -= 1
        checkRotatedPosition(P)
      }
    }
  }

  // Rotate tetronimo
  function rotate() {
    undraw()
    currentRotation++
    if (currentRotation === current.length) {
      currentRotation = 0
    }
    current = theTetronimoes[random][currentRotation]
    checkRotatedPosition()
    draw()
  }

  // Freeze function; tetronimo stands on taken space
  function freeze() {
    if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
      current.forEach(index => squares[currentPosition + index].classList.add('taken'))
      // New tetronimo begins to fall
      random = nextRandom
      nextRandom = Math.floor(Math.random() * theTetronimoes.length)
      current = theTetronimoes[random][0]
      currentPosition = 4
      draw()
      displayShape()
      addScore()
      gameOver()
    }
  }

  // Show upcoming tetonimo in mini-grid
  const displaySquares = document.querySelectorAll('.mini-grid div')
  const displayWidth = 4
  let displayIndex = 0

  // theTetronimoes sans rotations
  const upNextTetronimo = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2], // lTetromino
  //  [displayWidth * 2 + 1, displayWidth + 1, 1, displayWidth * 2 + 2], // sTetromino
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], // zTetromino
    [1, displayWidth + 1, displayWidth, displayWidth * 2], // sTetronimo
    [1, displayWidth, displayWidth + 1, displayWidth + 2], // tTetromino
    [0, 1, displayWidth, displayWidth + 1], // oTetromino
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] // iTetromino
  ]

  // Display shape in mini-grid display
  function displayShape() {
    // Remove tetronimo from grid
    displaySquares.forEach(square => {
      square.classList.remove('tetronimo')
    })
    upNextTetronimo[nextRandom].forEach(index => {
      displaySquares[displayIndex + index].classList.add('tetronimo')
    })
  }

  // Add score
  function addScore() {
    for (let i = 0; i < 199; i += width) {
      const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9]

      if (row.every(index => squares[index].classList.contains('taken'))) {
        score += 10
        scoreDisplay.innerHTML = score
        row.forEach(index => {
          squares[index].classList.remove('taken')
          squares[index].classList.remove('tetronimo')
        })
        const squaresRemoved = squares.splice(i, width)
        squares = squaresRemoved.concat(squares)
        squares.forEach(cell => grid.appendChild(cell))
      }
    }
  }

  // Game over
  function gameOver() {
    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      scoreDisplay.innerHTML = 'Game Over'
      clearInterval(timerId)
      canMove = 0
    }
  }
  // Button functionality
  startBtn.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId)
      timerId = null
      canMove = 0
    }
    else {
      draw()
      timerId = setInterval(moveDown, 1000)
      canMove = 1
      displayShape()
    }
  })
})
