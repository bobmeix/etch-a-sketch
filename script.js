const border = document.querySelector('.border');
const container = document.querySelector('.container');
const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', clearContent);
const colorButtons = document.querySelectorAll('.color-button');
colorButtons.forEach(button => {
    button.addEventListener('click', selectDrawColor);
})
// const blackButton = document.querySelector('#black');
// const grayButton = document.querySelector('#gray');
let drawColor = '#aca2a0';
let backgroundColor = '#fcf2f0';
let black = '#000';
let gray = '#808080';

// blackButton.addEventListener('click', selectDrawColor);
// grayButton.addEventListener('click', select)

function initBoard() {
    for (let i = 1; i <= 1024; i++) {
        let square = document.createElement('div');
        square.classList.add('square-div');
        container.appendChild(square);
        square.addEventListener('mouseover', changeColor);
        square.addEventListener('contextmenu', e => e.preventDefault());
    }
}

function changeColor(e) {
    if (e.buttons === 1) {
        e.target.setAttribute('style', `background: ${drawColor};`);
    } else if (e.buttons === 2) {
        e.target.setAttribute('style', `background: ${backgroundColor};`);
    }
}

function clearContent() {
    let square = document.querySelectorAll('.square-div');
    square.forEach(square => {
        square.setAttribute('style', `background: ${backgroundColor};`);
    });
}

function selectDrawColor(color) {
    if (color.target.id === 'black') {
        drawColor = black;
        colorButtons.forEach(button => {
            if (button.id === 'black') {
                button.setAttribute('style', `background: ${gray}`);
            } else {
                button.setAttribute('style', `background: ${backgroundColor}`);
            }
        });
    } else if (color.target.id === 'gray') {
        drawColor = '#aca2a0';
        colorButtons.forEach(button => {
            if (button.id === 'gray') {
                button.setAttribute('style', `background: ${gray}`);
            } else {
                button.setAttribute('style', `background: ${backgroundColor}`);
            }
        });
    }
    return drawColor;
}

initBoard();