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

})
