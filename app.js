document.addEventListener('DOMContentLoaded', ()=> {
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.querySelector('#score')
    const width = 4
    const squares = []
    let score = 0

    // creating the playing board
    function createBoard() {
        for(let i = 0; i < width * width; i++) {
            const square = document.createElement('div')
            square.innerHTML = "0"
            gridDisplay.appendChild(square)
            squares.push(square)
            // console.log(squares)
        }
        generate()
        generate()
    }
    createBoard()

    // generate a new number
    function generate() {
        const randomNumber = Math.floor(Math.random() * squares.length)
        if (squares[randomNumber].innerHTML === "0") {
            squares[randomNumber].innerHTML = "2"
        } else generate()
    }

    // move the number to the right
    function moveRight() {
        for(let i=0; i < 16; i++) {
            if(i % 4 === 0) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+1].innerHTML
                let totalThree = squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                const row = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]
                // console.log(row)
                let filteredRow = row.filter(num => num)
                // console.log(filteredRow)
                let zeroMissing = 4 - filteredRow.length
                let zeros = Array(zeroMissing).fill(0)
                let newRow = zeros.concat(filteredRow)
                // console.log(newRow)
                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]
            }
        }
    }

    //combine rows
    function combineRow() {
        for(let i = 0; i < 15; i++) {
            console.log(squares[i+1])
            if (squares[i].innerHTML === squares[i+1].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i+1].innerHTML = 0
                score+=combinedTotal
                scoreDisplay.innerHTML = score
            }
        }
    }


    //assign functions to keys
    function control(e) {
        console.log('re')
        if (e.key === "ArrowLeft") {
            // keyLeft()
        } else if(e.key === 'ArrowRight') {
            keyRight()
        }
    }

    document.addEventListener('keydown', control)

    function keyRight() {
        moveRight()
        combineRow()
        moveRight()
        generate()
    }

})
