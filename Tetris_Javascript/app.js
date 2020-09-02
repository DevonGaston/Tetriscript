document.addEventListener('DOMContentLoaded', () => {
  //Create grid
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
    [width + 1, width + 2, width * 2, width * 2 + 1],
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

  // Draw tetronimo
  function draw() {
    current.forEach (index => {
      squares[currentPosition + index].classList.add('tetronimo')
    })
  }

  // Undraw tetronimo
  function undraw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetronimo')
    })
  }
})
