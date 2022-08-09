const border = document.querySelector('.border');
const container = document.querySelector('.container');
const clearButton = document.querySelector('#clear');
const blackButton = document.querySelector('#black');
let drawColor = '#aca2a0';
let backgroundColor = '#fcf2f0';

clearButton.addEventListener('click', clearContent);

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

initBoard();