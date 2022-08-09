const border = document.querySelector('.border');
const container = document.querySelector('.container');
const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', clearContent);

// let blackButton = false;
// let grayButton = true;
let rainbowButton = false;

const colorButtons = document.querySelectorAll('.color-button');
colorButtons.forEach(button => {
    button.addEventListener('click', selectDrawColor);
})

// console.log(colorButtons[2].id);

let drawColor = '#aca2a0';
let backgroundColor = '#fcf2f0';
let black = '#000';
let brick = '#C13E22';

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
    if (e.buttons === 1 && rainbowButton) {
        console.log(rainbowButton);
        e.target.setAttribute('style', `background: ${generateRandomColors()};`);
    } else if (e.buttons === 1) {
                e.target.setAttribute('style', `background: ${drawColor};`);
    } else if (e.buttons === 2) {
        e.target.setAttribute('style', `background: #fff;`);
    }
}

function clearContent() {
    let square = document.querySelectorAll('.square-div');
    square.forEach(square => {
        square.setAttribute('style', `background: #fff;`);
    });
}

function selectDrawColor(color) {
    if (color.target.id === 'black') {
        drawColor = black;
        rainbowButton = false;
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
        rainbowButton = false;
        colorButtons.forEach(button => {
            if (button.id === 'gray') {
                button.setAttribute('style', `color: ${backgroundColor}; background: ${brick}`);
            } else {
                button.setAttribute('style', `color: black; background: ${backgroundColor}`);
            }
        });
        return drawColor;
    } else if (color.target.id === 'rainbow') {
        rainbowButton = true;
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

initBoard();