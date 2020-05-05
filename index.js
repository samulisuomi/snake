this.field = [
  [5,0,0,0,0,0,0,0,0,0],
  [4,0,0,0,0,0,0,0,0,0],
  [3,2,1,0,0,0,0,0,0,0],
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
this.length = 5
this.headY = 2
this.headX = 2
this.tailY = 0
this.tailX = 0
this.gameOver = false

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

this.onTick = () => {
  if (!this.gameOver) this.moveSnake()
  this.draw()
}

this.endGame = () => {
  this.gameOver = true
  alert('Game Over')
}

this.draw = () => {
  const containerElement = document.querySelector('#snake')
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
  setInterval(this.onTick, 500)
})