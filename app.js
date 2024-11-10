document.addEventListener('DOMContentLoaded', ()=> {
    const gridDisplay = document.querySelector('.grid')
    const width = 4
    const squares = []

    // creating the playing board
    function createBoard() {
        for(let i = 0; i < width * width; i++) {
            const square = document.createElement('div')
            square.innerHTML = "0"
            gridDisplay.appendChild(square)
            squares.push(square)
            console.log(squares)
        }
    }
    createBoard()
})
