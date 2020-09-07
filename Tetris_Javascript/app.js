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

  // Tetriminos
  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
  ]
  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1]
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
  const theTetronimoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

  let currentPosition = 4
  let currentRotation = 0

  // Randomly select first tetronimo and rotation
  let random = Math.floor(Math.random() * theTetronimoes.length)
  let nextRandom = 0
  let current = theTetronimoes[random][currentRotation]

  // Initial draw; looks cleaner
  draw()

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
  document.addEventListener('keyup', control)

  // Movement functions
  function moveLeft() {
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width == 0)

    if (!isAtLeftEdge) currentPosition--

    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition++
    }
    draw()
  }

  function moveRight() {
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width == width - 1)

    if (!isAtRightEdge) currentPosition++

    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
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

  // Rotate tetronimo
  function rotate() {
    undraw()
    currentRotation++
    if (currentRotation === current.length) {
      currentRotation = 0
    }
    current = theTetronimoes[random][currentRotation]
    draw()
  }

  // Freeze function; tetronimo stands on taken space
  function freeze() {
    if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
      current.forEach(index => squares[currentPosition + index].classList.add('taken'))
      // New tetronimo begins to fall
      random = nextRandom
      nextRandom = Math.floor(Math.random() * theTetronimoes.length)
      current = theTetronimoes[random][currentRotation]
      currentPosition = 4
      draw()
      displayShape()
    }
  }

  // Show upcoming tetonimo in mini-grid
  const displaySquares = document.querySelectorAll('.mini-grid div')
  const displayWidth = 4
  let displayIndex = 0

  // theTetronimoes sans rotations
  const upNextTetronimo = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2], // lTetromino
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], // zTetromino
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
  // Button functionality
  startBtn.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId)
      timerId = null
    }
    else {
      draw()
      timerId = setInterval(moveDown, 1000)
      nextRandom = Math.floor(Math.random() * theTetronimoes.length)
      displayShape()
    }
  })

})
