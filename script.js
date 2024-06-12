

window.onload = function() {
    drawTable(table, '')
}

document.addEventListener('keydown', function(event) {
    switch(event.keyCode) {
        case 37: // Left arrow key code
            moveLeft();
            break;
        case 38: // Up arrow key code
            moveUp();
            break;
        case 39: // Right arrow key code
            moveRight();
            break;
        case 40: // Down arrow key code
            moveDown();
            break;
        default:
            // Handle other keys if needed
            break;
    }
});

// let table = [
//     1, 1, 1,
//     0, 0, 0,
//     0, 0, 1
// ]

let table = [
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
]

// let table = [
//     0, 1, 2,
//     3, 4, 5,
//     6, 7, 8
// ]

async function moveTable(previous_table, direction)
{

    let divs = document.querySelectorAll('#gameContainer > div');

    let non_movable = []
    for (let i = 0; i < previous_table.length; i++) {

        if (previous_table[i] === 0) {
            non_movable.push(i)
        } else if (direction === 'down' && i + 3 < previous_table.length && previous_table[i] !== previous_table[i + 3] && previous_table[i + 3] !== 0) {
            non_movable.push(i)
        } else if (direction === 'up' && i - 3 >= 0 && previous_table[i] !== previous_table[i - 3] && previous_table[i - 3] !== 0) {
            non_movable.push(i)
        } else if (direction === 'left' && i - 1 >= 0 && previous_table[i] !== previous_table[i - 1] && previous_table[i - 1] !== 0) {
            non_movable.push(i)
        } else if (direction === 'right' && i + 1 < previous_table.length && previous_table[i] !== previous_table[i + 1] && previous_table[i + 1] !== 0) {
            non_movable.push(i)
        }

    }

    console.log('previous_table')
    console.log(previous_table)
    console.log('now table')
    console.log(table)

    console.log('non_movable')
    console.log(non_movable)

    for (let i = 0; i < divs.length; i++) {

        let div = divs[i]
        console.log(div)

        if (direction === 'down' && ![6, 7, 8].includes(i) && !non_movable.includes(i)) {
            div.style.top = '100px'
        } else if (direction === 'up' && ![0, 1, 2].includes(i) && !non_movable.includes(i)) {
            div.style.top = '-100px'
        } else if (direction === 'left' && ![0, 3, 6].includes(i) && !non_movable.includes(i)) {
            div.style.left = '-100px'
        } else if (direction === 'right' && ![2, 5, 8].includes(i) && !non_movable.includes(i)) {
            div.style.left = '100px'
        }

    }

    await new Promise(resolve => setTimeout(resolve, 300));
}

async function draw() {

    // generate new blocks
    // for (let i = 0; i < table.length; i++) {
    //     if (table[i] === 0 && Math.random() > 0.8) {
    //         table[i] = 1
    //     }
    // }

    let str = '';

    for (let i = 0; i < table.length; i++) {
        if (table[i] > 0) {
            str += '<div class="taken">'+table[i]+'</div>'
        } else {
            str += '<div class="empty"></div>'
        }
    }

    document.getElementById("gameContainer").innerHTML = str
    console.log(table)

    console.log('end')
}

async function drawTable(previous_table, direction)
{

    await moveTable(previous_table, direction)

    await draw()

}

async function moveUp()
{

    const previous_table = table.slice()

    console.log('table previous_table')
    console.log(previous_table)
    for (let column = 0; column < 3; column++) {
        for (let row = 0; row < 2; row++) {

            if (table[column + (row * 3)] === table[column + ((row + 1) * 3)]) {

                table[column + (row * 3)] = table[column + (row * 3)] + table[column + ((row + 1) * 3)]
                table[column + ((row + 1) * 3)] = 0

            } else if (table[column + (row * 3)] === 0) {

                table[column + (row * 3)] = table[column + ((row + 1) * 3)]
                table[column + ((row + 1) * 3)] = 0

            }

        }
    }

    await drawTable(previous_table, 'up')
}

async function moveLeft()
{

    const previous_table = table.slice()

    for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 2; column++) {

            if (table[row * 3 + column] === table[row * 3 + column + 1]) {
                table[row * 3 + column] = table[row * 3 + column] + table[row * 3 + column + 1]
                table[row * 3 + column + 1] = 0
            } else if (table[row * 3 + column] === 0) {
                table[row * 3 + column] = table[row * 3 + column + 1]
                table[row * 3 + column + 1] = 0
            }

        }
    }

    await drawTable(previous_table, 'left')
}

async function moveDown()
{

    const previous_table = table.slice()

    for (let column = 0; column < 3; column++) {
        for (let row = 2; row > 0; row--) {

            if (table[column + ((row - 1) * 3)] === table[column + (row * 3)]) {

                table[column + (row * 3)] = table[column + ((row - 1) * 3)] + table[column + (row * 3)]
                table[column + ((row - 1) * 3)] = 0

            } else if (table[column + (row * 3)] === 0) {

                table[column + (row * 3)] = table[column + ((row - 1) * 3)]
                table[column + ((row - 1) * 3)] = 0

            }

        }
    }

    await drawTable(previous_table, 'down')
}

async function moveRight()
{

    const previous_table = table.slice()

    for (let row = 0; row < 3; row++) {
        for (let column = 2; column > 0; column--) {

            if (table[row * 3 + column] === table[row * 3 + column - 1]) {
                table[row * 3 + column] = table[row * 3 + column] + table[row * 3 + column - 1]
                table[row * 3 + column - 1] = 0
            } else if (table[row * 3 + column] === 0) {
                table[row * 3 + column] = table[row * 3 + column - 1]
                table[row * 3 + column - 1] = 0
            }

        }
    }

    await drawTable(previous_table, 'right')
}


function run()
{
    let myDiv = document.getElementById('myDiv'); // Get the div by ID

    console.log(myDiv)

// Function to move the div
    function moveDiv(newTop, newLeft) {
        myDiv.style.top = newTop + 'px';
        myDiv.style.left = newLeft + 'px';
    }

// Example usage: Move the div to 100px down and 150px to the right
    moveDiv(100, 150);
}