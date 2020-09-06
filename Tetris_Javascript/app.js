document.addEventListener('DOMContentLoaded', () => {
  // Create grid
  var iDiv = document.createElement('div')
  iDiv.id = 'grid'
  iDiv.className = 'grid'
  document.body.appendChild(iDiv)

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

  // Define and HTML elements (grid, squares, etc)
  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const ScoreDisplay = document.querySelector('#score')
  const StartBtn = document.querySelector('#start-button')
  const width = 10
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
  let current = theTetronimoes[random][currentRotation]

  //Initial draw; looks cleaner
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

  // Make tetronimo move down every second
  var timerId = setInterval(moveDown, 1000)

  // Allow player to move Tetronimo with keyboard controls
  function control(e) {
    if (e.keyCode == 37 || e.keyCode == 65) {
      moveLeft()
    }
    if (e.keyCode == 39 || e.keyCode == 68) {
      moveRight()
    }
    if(e.keyCode == 38 || e.keyCode == 87) {
      //rotate()
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

  // Freeze function; tetronimo stands on taken space
  function freeze() {
    if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
      current.forEach(index => squares[currentPosition + index].classList.add('taken'))
      // New tetronimo begins to fall
      random = Math.floor(Math.random() * theTetronimoes.length)
      current = theTetronimoes[random][currentRotation]
      currentPosition = 4
      draw()
    }
  }

})
