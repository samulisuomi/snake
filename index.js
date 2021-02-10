window.SnakeGame = this

this.initialize = () => {
  this.height = 11
  this.width = 20

  this.field = new Array(this.height).fill([])
  this.field.forEach((_cell, index) => {
    this.field[index] = new Array(this.width).fill(0)
  })
  this.headY = this.height - 1
  this.headX = Math.floor((this.width - 1) / 2)
  this.tailY = this.headY
  this.tailX = 0
  for (let i = this.tailX; i <= this.headX; i++) {
    this.field[this.tailY][i] = i === this.headX ? 'l' : 'lr'
  }

  this.inputBuffer = []
  this.direction = 'r'
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

this.addInputToBuffer = inputDirection => {
  const previousInput = this.inputBuffer[this.inputBuffer.length - 1] || this.direction

  switch (inputDirection) {
    case 'u':
    case 'd':
      if (previousInput !== 'u' && previousInput !== 'd') {
        this.inputBuffer = [...this.inputBuffer, inputDirection]
      }
      break
    case 'l':
    case 'r':
      if (previousInput !== 'r' && previousInput !== 'l') {
        this.inputBuffer = [...this.inputBuffer, inputDirection]
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



this.getInvertedDirection = direction => {
  switch(direction) {
    case 'u':
      return 'd'
    case 'r':
      return 'l'
    case 'd':
      return 'u'
    case 'l':
      return 'r'
  }
}

this.moveSnake = () => {
  const nextHeadX = this.nextHeadX()
  const nextHeadY = this.nextHeadY()

  if (nextHeadX < 0 || nextHeadX >= this.width || nextHeadY < 0 || nextHeadY >= this.height) {
    return this.endGame()
  }

  // TODO: Check if the snake would collide

  const oldHeadX = this.headX
  const oldHeadY = this.headY
  this.headX = nextHeadX
  this.headY = nextHeadY

  this.field[oldHeadY][oldHeadX] = [this.field[oldHeadY][oldHeadX], this.direction].sort().join('')
  this.field[this.headY][this.headX] = this.getInvertedDirection(this.direction)


}

this.onTick = () => {
  if (this.inputBuffer.length) {
    const [firstInput, ...otherInputs] = this.inputBuffer

    this.direction = firstInput
    this.inputBuffer = otherInputs
  }
  if (!this.gameOver) {
    this.moveSnake()
    this.draw()
  }
}

this.endGame = () => {
  this.gameOver = true
  console.log('Game over')
}

this.getTileName = directions => {
  switch(directions) {
    case 'lr':
    case 'r':
    case 'ru':
      return 'lr-r-ru'
    case 'd':
    case 'dl':
    case 'du':
      return 'd-dl-du'
    case 'l':
    case 'lu':
    case 'u':
      return 'l-lu-u'
    case 'dr':
      return 'dr'
  }
}

// TODO: Use canvas + https://developer.mozilla.org/en-US/docs/Games/Techniques/Crisp_pixel_art_look :
this.draw = () => {
  const containerElement = document.querySelector('.snake')
  containerElement.textContent = ''

  // Top border:

  const topBorderRowElement = document.createElement('div')
  topBorderRowElement.className = 'row'

  const topLeftBorderCellElement = document.createElement('div')
  topLeftBorderCellElement.className = 'border-cell top-left'
  topBorderRowElement.appendChild(topLeftBorderCellElement)

  for (let i = 0; i < this.width; i++) {
    const borderCellElement = document.createElement('div')
    borderCellElement.className = 'border-cell top'
    topBorderRowElement.appendChild(borderCellElement)
  }

  const topRightBorderCellElement = document.createElement('div')
  topRightBorderCellElement.className = 'border-cell top-right'
  topBorderRowElement.appendChild(topRightBorderCellElement)

  containerElement.appendChild(topBorderRowElement)

  // Left border + playable area + right border:

  this.field.forEach(row => {
    const rowElement = document.createElement('div')
    rowElement.className = 'row'

    const leftBorderCellElement = document.createElement('div')
    leftBorderCellElement.className = 'border-cell left'
    rowElement.appendChild(leftBorderCellElement)

    row.forEach(cell => {
      const cellElement = document.createElement('div')
      cellElement.className = `cell ${cell ? `snake ${this.getTileName(cell)}` : ''}`
      rowElement.appendChild(cellElement)
    })

    const rightBorderCellElement = document.createElement('div')
    rightBorderCellElement.className = 'border-cell right'
    rowElement.appendChild(rightBorderCellElement)

    containerElement.appendChild(rowElement)
  })

  // Bottom border:

  const bottomBorderRowElement = document.createElement('div')
  bottomBorderRowElement.className = 'row'

  const bottomLeftBorderCellElement = document.createElement('div')
  bottomLeftBorderCellElement.className = 'border-cell bottom-left'
  bottomBorderRowElement.appendChild(bottomLeftBorderCellElement)

  for (let i = 0; i < this.width; i++) {
    const borderCellElement = document.createElement('div')
    borderCellElement.className = 'border-cell bottom'
    bottomBorderRowElement.appendChild(borderCellElement)
  }

  const bottomRightBorderCellElement = document.createElement('div')
  bottomRightBorderCellElement.className = 'border-cell bottom-right'
  bottomBorderRowElement.appendChild(bottomRightBorderCellElement)

  containerElement.appendChild(bottomBorderRowElement)
}

window.addEventListener('DOMContentLoaded', _event => {
  this.initialize()
  this.draw()
  document.querySelector('.keyboard').addEventListener('mousedown', this.onMouseDown)
  document.addEventListener('keydown', this.onKeyDown)
  setInterval(this.onTick, 200)
})