const container = document.querySelector('.container');
const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', clearContent);
const gridButton = document.querySelector('#grid');
gridButton.addEventListener('click', toggleGrid);
const colorButtons = document.querySelectorAll('.color-button');
colorButtons.forEach(button => {
    button.addEventListener('click', selectDrawColor);
})
const select = document.querySelector('.grid-size');
select.addEventListener('change', initBoard);

let squareSize;
let rainbowButtonActive = false;
let gridButtonActive = true;
let drawColor = '#aca2a0';
let backgroundColor = '#fcf2f0';
let black = '#000';
let brick = '#C13E22';

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function initBoard() {
    removeAllChildNodes(container);
    squareSize = select.value;
    for (let i = 1; i <= Math.pow((512 / squareSize), 2); i++) {
        let square = document.createElement('div');
        square.classList.add('square-div');
        square.setAttribute('style', `width: ${squareSize}px; height: ${squareSize}px;`)
        container.appendChild(square);
        square.addEventListener('mousedown', changeColor);
        square.addEventListener('mouseenter', changeColor);
        square.addEventListener('contextmenu', e => e.preventDefault());
    }
}

function changeColor(e) {
    if (e.buttons === 1 && rainbowButtonActive) {
        e.target.setAttribute('style', `background: ${generateRandomColors()}; width: ${squareSize}px; height: ${squareSize}px;`);
    } else if (e.buttons === 1) {
        e.target.setAttribute('style', `background: ${drawColor}; width: ${squareSize}px; height: ${squareSize}px;`);
    } else if (e.buttons === 2) {
        e.target.setAttribute('style', `background: #fff; width: ${squareSize}px; height: ${squareSize}px;`);
    }
}

function clearContent() {
    let squares = document.querySelectorAll('.square-div');
    squares.forEach(square => {
        square.setAttribute('style', `background: #fff; width: ${squareSize}px; height: ${squareSize}px;`);
        if (!gridButtonActive) {
            square.classList.add('remove-grid');
        }
    });
}

function selectDrawColor(color) {
    if (color.target.id === 'black') {
        drawColor = black;
        rainbowButtonActive = false;
        colorButtons.forEach(button => {
            if (button.id === 'black') {
                button.setAttribute('style', `color: ${backgroundColor}; background: ${brick}`);
            } else {
                button.setAttribute('style', `color: black; background: ${backgroundColor}`);
            }
        });
        return drawColor;
    } else if (color.target.id === 'gray') {
        drawColor = '#aca2a0';
        rainbowButtonActive = false;
        colorButtons.forEach(button => {
            if (button.id === 'gray') {
                button.setAttribute('style', `color: ${backgroundColor}; background: ${brick}`);
            } else {
                button.setAttribute('style', `color: black; background: ${backgroundColor}`);
            }
        });
        return drawColor;
    } else if (color.target.id === 'rainbow') {
        rainbowButtonActive = true;
        colorButtons.forEach(button => {
            if (button.id === 'rainbow') {
                button.setAttribute('style', `color: ${backgroundColor}; background: ${brick}`);
            } else {
                button.setAttribute('style', `color: black; background: ${backgroundColor}`);
            }
        });
    }
}

function randomColor() {
    return Math.floor(Math.random() * 256);
}

function generateRandomColors() {
    return `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
}

function toggleGrid() {
    if (gridButtonActive) {
        let squares = document.querySelectorAll('.square-div');
        squares.forEach(square => {
            square.classList.add('remove-grid');
        });
        gridButton.setAttribute('style', `color: black; background: ${backgroundColor}`);
        gridButtonActive = false;
    } else {
        let squares = document.querySelectorAll('.square-div');
        squares.forEach(square => {
            square.classList.remove('remove-grid');
        });
        gridButton.setAttribute('style', `color: ${backgroundColor}; background: ${brick}`);
        gridButtonActive = true;
    }
}

// function getSelectValue(e) {
//     console.log(e.target.value);
//     console.log(select.value);
//     return e.target.value;
// }

initBoard();