document.addEventListener('DOMContentLoaded', ()=> {
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.querySelector('#score')
    const resultDisplay = document.querySelector('#result')
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
        for(let i=0; i < 15; i++) {
            if(i % 4 === 0) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+1].innerHTML
                let totalThree = squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                const row = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]
                console.log(row)
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

    function moveLeft() {
        for(let i = 0; i < 15; i++) {
            if(i % 4 === 0) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+1].innerHTML
                let totalThree = squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                let row = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]
                // console.log(row)
                let filteredRow = row.filter(num => num)
                let zeroMissing = 4 - filteredRow.length
                let zeros = Array(zeroMissing).fill(0)
                let newRow = filteredRow.concat(zeros)
                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]
            }
        }
    }

    function moveDown() {
        console.log('test')
        for(let i = 0; i < 15; i++) {
            if(i === 0 || i === 1 || i === 2 || i === 3) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+width].innerHTML
                let totalThree= squares[i+width*2].innerHTML
                let totalFour = squares[i+width*3].innerHTML
                let column = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]
                // console.log(column)
                let filteredColumn = column.filter(column => column)
                let zeroMissing = 4 - filteredColumn.length
                let zero = Array(zeroMissing).fill(0)
                let newColumn = zero.concat(filteredColumn)
                console.log(newColumn)
                squares[i].innerHTML = newColumn[0]
                squares[i+width].innerHTML = newColumn[1]
                squares[i+width*2].innerHTML = newColumn[2]
                squares[i+width*3].innerHTML = newColumn[3]
            }
        }
    }

    function moveUp() {
        console.log('test')
        for(let i = 0; i < 15; i++) {
            if(i === 0 || i === 1 || i === 2 || i === 3) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+width].innerHTML
                let totalThree= squares[i+width*2].innerHTML
                let totalFour = squares[i+width*3].innerHTML
                let column = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]
                // console.log(column)
                let filteredColumn = column.filter(column => column)
                let zeroMissing = 4 - filteredColumn.length
                let zero = Array(zeroMissing).fill(0)
                let newColumn = filteredColumn.concat(zero)
                console.log(newColumn)
                squares[i].innerHTML = newColumn[0]
                squares[i+width].innerHTML = newColumn[1]
                squares[i+width*2].innerHTML = newColumn[2]
                squares[i+width*3].innerHTML = newColumn[3]
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
        //combine column
        function combineColumn() {
            for(let i = 0; i < 12; i++) {
                if (squares[i].innerHTML === squares[i+width].innerHTML) {
                    let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML)
                    squares[i].innerHTML = combinedTotal
                    squares[i+width].innerHTML = 0
                    score+=combinedTotal
                    scoreDisplay.innerHTML = score
                }
            }
        }

    //assign functions to keys
    function control(e) {
        console.log('re')
        if (e.key === "ArrowLeft") {
            keyLeft()
        } else if(e.key === 'ArrowRight') {
            keyRight()
        } else if(e.key === 'ArrowDown') {
            keyDown()
        } else if(e.key === 'ArrowUp') {
            keyUp()
        }
    }

    document.addEventListener('keydown', control)

    function keyRight() {
        moveRight()
        combineRow()
        moveRight()
        generate()
    }

    function keyLeft() {
        moveLeft()
        combineRow()
        moveLeft()
        generate()
    }

    function keyUp() {
        moveUp()
        combineColumn()
        moveUp()
        generate()
    }

    function keyDown() {
        moveDown()
        combineColumn()
        moveDown()
        generate()
    }

    function checkForWin() {
        for(let i = 0; i < squares.length; i++) {
            if(squares[i].innerHTML == 2048){
                resultDisplay.innerHTML = 'You win'
                document.removeEventListener(keyDown, control)
            }
        }
    }

    function checkForGameOver() {
        for(let i = 0; i < squares.length; i++) {
            let zeros = 0
            if(squares[i].innerHTML == 0){
                zeros++
            }
        }
        if(zeros === 0){
            resultDisplay.innerHTML = 'You lose!'
            document.removeEventListener(keyDown, control)
        }
    }

})
