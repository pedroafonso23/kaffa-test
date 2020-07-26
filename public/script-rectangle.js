// Initializing variables that keep track of the coordinates the user selected
let i = 0
let redPnt1 = []
let redPnt2 = []
let redX = []
let redY = []
let greenPnt1 = []
let greenPnt2 = []
let greenX = []
let greenY = []
let bluePnt1 = []
let bluePnt2 = []
let blueX = []
let blueY = []

// Building grid and inserting it in the HTML
let grid = clickableGrid()
document.body.appendChild(grid)

// Function that creates the 16x16 grid
function clickableGrid() {

    let grid = document.createElement('table')
    grid.className = 'grid'

    for (let r = 15; r >= 0; r--) {
        let tr = grid.appendChild(document.createElement('tr'))

        for (let c = 0; c <= 15; c++) {
            let cell = tr.appendChild(document.createElement('td'))
            cell.innerHTML = `${r}, ${c}`
            cell.id = `${r},${c}`
            cell.addEventListener('click', function() {selectCell(cell, r, c)}, false)
        }
    }

    return grid
}

// Callback function of the click listener associated with each cell of the grid
// This function will color the clicked cells and calculate the intersections and areas
function selectCell(el, row, col) {

    if (i < 6) {    // User have to choose 6 coordinates, two for each of the three rectangles

        switch (i) {
            case 0:
                redPnt1 = [row, col]
                el.classList.add('red') // Adding class to color the cell
                break

            case 1:
                // This will add classes to every cell in the rectangle defined by the two coordinates, so the cell can be colored the right color
                // This logic will repeat for each rectangle, when the user select its second coordinate (cases 1, 3, 5)
                redPnt2 = [row, col]
                redX = [redPnt1[0], redPnt2[0]].sort(function(a, b) {return a - b})
                redY = [redPnt1[1], redPnt2[1]].sort(function(a, b) {return a - b})

                for (let ir = redX[0]; ir <= redX[1]; ir++) {
                    for (let jr = redY[0]; jr <= redY[1]; jr++) {
                        document.getElementById(`${ir},${jr}`).classList.add('red')                  
                    }
                }
                break

            case 2:
                greenPnt1 = [row, col]
                el.classList.add('green')
                break

            case 3:
                greenPnt2 = [row, col]   
                greenX = [greenPnt1[0], greenPnt2[0]].sort(function(a, b) {return a - b})
                greenY = [greenPnt1[1], greenPnt2[1]].sort(function(a, b) {return a - b})

                for (let ig = greenX[0]; ig <= greenX[1]; ig++) {
                    for (let jg = greenY[0]; jg <= greenY[1]; jg++) {
                        document.getElementById(`${ig},${jg}`).classList.add('green')         
                    }
                }  
                break

            case 4:
                bluePnt1 = [row, col]
                el.classList.add('blue')
                break

            case 5:
                bluePnt2 = [row, col]   
                blueX = [bluePnt1[0], bluePnt2[0]].sort(function(a, b) {return a - b})
                blueY = [bluePnt1[1], bluePnt2[1]].sort(function(a, b) {return a - b})

                for (let ib = blueX[0]; ib <= blueX[1]; ib++) {
                    for (let jb = blueY[0]; jb <= blueY[1]; jb++) {
                        document.getElementById(`${ib},${jb}`).classList.add('blue')                  
                    }
                }                  
                break

            default: 
                console.log("Error!")
            }

        i++
        
        // Variables to calculate intersection area
        let interRedGreen = 0
        let interRedBlue = 0
        let interGreenBlue = 0
        let interRedGreenBlue = 0
        
        // Calculating the intersection area, by checking each cell classes
        if (i == 6) {

            for (let r = 0; r <= 15; r++) {

                for (let c = 0; c <= 15; c++) {

                    if (document.getElementById(`${r},${c}`).className == 'red green') interRedGreen++
                    if (document.getElementById(`${r},${c}`).className == 'red blue') interRedBlue++
                    if (document.getElementById(`${r},${c}`).className == 'green blue') interGreenBlue++
                    if (document.getElementById(`${r},${c}`).className == 'red green blue') {
                        interRedGreenBlue++
                        interRedGreen++
                        interRedBlue++
                        interGreenBlue++

                    }
                }  
            }

            // Writting the result
            let result = document.getElementById('result')
            result.innerHTML = 'Intersection between the rectangles:<br>'

            if (interRedGreen != 0) result.innerHTML += `Rectangles <font color="red">RED</font> and <font color="green">GREEN</font> are intersecting and its area is <font color="yellow">${interRedGreen}</font><br>`
            else result.innerHTML += 'There is no intersection between rectangles <font color="red">RED</font> and <font color="green">GREEN</font><br>'

            if (interRedBlue != 0) result.innerHTML += `Rectangles <font color="red">RED</font> and <font color="blue">BLUE</font> are intersecting and its area is <font color="purple">${interRedBlue}</font><br>`
            else result.innerHTML += 'There is no intersection between rectangles <font color="red">RED</font> and <font color="blue">BLUE</font><br>'

            if (interGreenBlue != 0) result.innerHTML += `Rectangles <font color="green">GREEN</font> and <font color="blue">BLUE</font> are intersecting and its area is <font color="cyan">${interGreenBlue}</font><br>`
            else result.innerHTML += 'There is no intersection between rectangles <font color="green">GREEN</font> and <font color="blue">BLUE</font><br>'

            if (interRedGreenBlue != 0) result.innerHTML += `The three rectangles are intersecting and its area is ${interRedGreenBlue}<br>`
            else result.innerHTML += 'There is no intersection between the three rectangles<br>'

            result.innerHTML += 'To try again click on "Rectangles Tool" on the upper menu!'
        }
    }
}