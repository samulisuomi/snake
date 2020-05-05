this.field = [
  [3,0,0,0,0,0,0,0,0,0],
  [2,0,0,0,0,0,0,0,0,0],
  [1,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
]

this.width = this.field[0].length
this.height = this.field.length

this.direction = 'r'
this.nextDirectionCandidate = null
this.length = 5
this.headY = 2
this.headX = 0
this.tailY = 0
this.tailX = 0
this.gameOver = false
this.directionUpdatedThisTick = false

window.foo = this

this.nextHeadY = () => {
  switch(this.direction) {
    case 'u':
      return this.headY - 1
    case 'd':
      return this.headY + 1
    default:
      return this.headY
  }
}

this.nextHeadX = () => {
  switch(this.direction) {
    case 'l':
      return this.headX - 1
    case 'r':
      return this.headX + 1
    default:
      return this.headX
  }
}

this.moveSnake = () => {
  const nextHeadY = this.nextHeadY()
  const nextHeadX = this.nextHeadX()

  if (nextHeadX < 0 || nextHeadX >= this.width || nextHeadY < 0 || nextHeadY >= this.height) {
    return this.endGame()
  }

  this.headY = nextHeadY
  this.headX = nextHeadX

  this.field[nextHeadY][nextHeadX] = 1
}

this.onMouseDown = event => {
  switch (event.target.textContent) {
    case '2':
      return this.onNewDirection('u')
    case '6':
      return this.onNewDirection('r')
    case '8':
      return this.onNewDirection('d')
    case '4':
      return this.onNewDirection('l')
  }
}

this.onKeyDown = event => {
  switch (event.code) {
    case 'ArrowUp':
    case 'KeyW':
      return this.onNewDirection('u')
    case 'ArrowRight':
    case 'KeyD':
      return this.onNewDirection('r')
    case 'ArrowDown':
    case 'KeyS':
      return this.onNewDirection('d')
    case 'ArrowLeft':
    case 'KeyA':
      return this.onNewDirection('l')
  }
}

this.onNewDirection = newDirection => {
  switch (newDirection) {
    case 'u':
      if (this.direction !== 'd') this.setDirection('u')
      break
    case 'r':
      if (this.direction !== 'l') this.setDirection('r')
      break
    case 'd':
      if (this.direction !== 'u') this.setDirection('d')
      break
    case 'l':
      if (this.direction !== 'r') this.setDirection('l')
      break
  }
}

this.setDirection = newDirection => {
  // TODO: Buffer direction updates
  if (this.directionUpdatedThisTick) return

  this.directionUpdatedThisTick = true
  this.direction = newDirection
}

this.onTick = () => {
  this.directionUpdatedThisTick = false
  if (this.nextDirectionCandidate) {
    this.direction = this.nextDirectionCandidate
    this.nextDirectionCandidate = null
  }
  if (!this.gameOver) this.moveSnake()
  this.draw()
}

this.endGame = () => {
  this.gameOver = true
  // alert('Game over')
  console.log('Game over')
}

this.draw = () => {
  const containerElement = document.querySelector('.snake')
  containerElement.textContent = ''

  this.field.forEach(row => {
    const rowElement = document.createElement('div')
    rowElement.className = 'row'

    row.forEach(cell => {
      const cellElement = document.createElement('div')
      cellElement.className = `cell ${cell ? 'snake' : ''}`

      rowElement.appendChild(cellElement)
    })

    containerElement.appendChild(rowElement)
  })
}

window.addEventListener('DOMContentLoaded', _event => {
  this.draw()
  document.querySelector('.keyboard').addEventListener('mousedown', this.onMouseDown)
  document.addEventListener('keydown', this.onKeyDown)
  setInterval(this.onTick, 200)
})