let field = [
  ['t',0,0,0,0,0,0,0,0,0],
  ['b',0,0,0,0,0,0,0,0,0],
  ['b','b','h',0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
]

const draw = () => {
  const containerElement = document.querySelector('#snake')

  field.forEach(row => {
    const rowElement = document.createElement('div')
    rowElement.className = 'row'

    row.forEach(cell => {
      const cellElement = document.createElement('div')
      cellElement.className = `cell ${cell}`

      rowElement.appendChild(cellElement)
    })

    containerElement.appendChild(rowElement)
  })
}

window.addEventListener('DOMContentLoaded', _event => {
  draw()
})