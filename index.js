window.foo = this

this.initialize = () => {
  this.field = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,1,'l','l','l',0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
  ]
  
  this.width = this.field[0].length
  this.height = this.field.length
  
  this.inputBuffer = []
  this.direction = 'r'
  this.headY = 8
  this.headX = 1
  this.tailY = 0
  this.tailX = 0
  this.gameOver = false
}

this.onMouseDown = event => {
  switch (event.target.textContent) {
    case '2':
      return this.addInputToBuffer('u')
    case '6':
      return this.addInputToBuffer('r')
    case '8':
      return this.addInputToBuffer('d')
    case '4':
      return this.addInputToBuffer('l')
    default:
      if (this.gameOver) {
        this.initialize()
      }
  }
}

this.onKeyDown = event => {
  switch (event.code) {
    case 'ArrowUp':
    case 'KeyW':
      return this.addInputToBuffer('u')
    case 'ArrowRight':
    case 'KeyD':
      return this.addInputToBuffer('r')
    case 'ArrowDown':
    case 'KeyS':
      return this.addInputToBuffer('d')
    case 'ArrowLeft':
    case 'KeyA':
      return this.addInputToBuffer('l')
    default:
      if (this.gameOver) {
        this.initialize()
      }
  }
}

this.addInputToBuffer = direction => {
  const previousInput = this.inputBuffer[this.inputBuffer.length - 1] || this.direction
  switch (direction) {
    case 'u':
      if (previousInput !== 'u' && previousInput !== 'd') {
        this.inputBuffer = [...this.inputBuffer, direction]
      }
      break
    case 'r':
      if (previousInput !== 'r' && previousInput !== 'l') {
        this.inputBuffer = [...this.inputBuffer, direction]
      }
      break
    case 'd':
      if (previousInput !== 'd' && previousInput !== 'u') {
        this.inputBuffer = [...this.inputBuffer, direction]
      }
      break
    case 'l':
      if (previousInput !== 'l' && previousInput !== 'r') {
        this.inputBuffer = [...this.inputBuffer, direction]
      }
      break
  }
}

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

  // TODO: Check if the snake would collide

  this.headY = nextHeadY
  this.headX = nextHeadX

  this.field[nextHeadY][nextHeadX] = 1
}

this.onTick = () => {
  if (this.inputBuffer.length) {
    const [firstInput, ...otherInputs] = this.inputBuffer

    this.direction = firstInput
    this.inputBuffer = otherInputs
  }
  if (!this.gameOver) this.moveSnake()
  this.draw()
}

this.endGame = () => {
  this.gameOver = true
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
  this.initialize()
  this.draw()
  document.querySelector('.keyboard').addEventListener('mousedown', this.onMouseDown)
  document.addEventListener('keydown', this.onKeyDown)
  setInterval(this.onTick, 200)
})