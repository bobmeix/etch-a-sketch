const container = document.querySelector('.container');
const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', clearContent);
const gridButton = document.querySelector('#grid');
gridButton.addEventListener('click', toggleGrid);
const colorButtons = document.querySelectorAll('.color-button');
colorButtons.forEach(button => {
    button.addEventListener('click', selectDrawColor);
})
const colorPicker = document.querySelector('#choose');
colorPicker.addEventListener('change', selectDrawColor);
const colorPickerButton = document.querySelector('#color-picker');
colorPickerButton.addEventListener('click', selectDrawColor);
const select = document.querySelector('.grid-size');
select.addEventListener('change', initBoard);

let squareSize;
let gradientButtonActive = true;
let rainbowButtonActive = false;
let gridButtonActive = true;
let drawColor = 'rgb(155, 155, 155)';
let grayColorComponent = 255;
let backgroundColor = '#fcf2f0';
let black = 'rgb(0, 0, 0)';
let brick = '#C13E22';

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function initBoard() {
    removeAllChildNodes(container);
    if (!gridButtonActive) {
        gridButton.setAttribute('style', `color: ${backgroundColor}; background: ${brick}`);
        gridButtonActive = true;
    }
    squareSize = select.value;
    for (let i = 1; i <= Math.pow((512 / squareSize), 2); i++) {
        let square = document.createElement('div');
        square.classList.add('square-div');
        square.setAttribute('style', `width: ${squareSize}px; height: ${squareSize}px;`);
        container.appendChild(square);
        square.addEventListener('mousedown', changeColor);
        square.addEventListener('mouseenter', changeColor);
        square.addEventListener('contextmenu', e => e.preventDefault());
    }
}

function changeColor(e) {
    if (e.buttons === 1 && rainbowButtonActive) {
        e.target.setAttribute('style', `background: ${generateRandomColors()}; width: ${squareSize}px; height: ${squareSize}px;`);
    } else if (e.buttons === 1 && gradientButtonActive) {
        e.target.setAttribute('style', `background: ${generateGrayGradient(e)}; width: ${squareSize}px; height: ${squareSize}px;`);
    } else if (e.buttons === 1) {
        e.target.setAttribute('style', `background: ${drawColor}; width: ${squareSize}px; height: ${squareSize}px;`);
    } else if (e.buttons === 2) {
        e.target.setAttribute('style', `background: rgb(255, 255, 255); width: ${squareSize}px; height: ${squareSize}px;`);
    }
}

function clearContent() {
    let squares = document.querySelectorAll('.square-div');
    squares.forEach(square => {
        square.setAttribute('style', `background: rgb(255, 255, 255); width: ${squareSize}px; height: ${squareSize}px;`);
        if (!gridButtonActive) {
            square.classList.add('remove-grid');
        }
    });
}

function selectDrawColor(color) {
    if (color.target.id === 'black') {
        drawColor = black;
        gradientButtonActive = false;
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
        gradientButtonActive = true;
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
        gradientButtonActive = false;
        rainbowButtonActive = true;
        colorButtons.forEach(button => {
            if (button.id === 'rainbow') {
                button.setAttribute('style', `color: ${backgroundColor}; background: ${brick}`);
            } else {
                button.setAttribute('style', `color: black; background: ${backgroundColor}`);
            }
        });
    } else if (color.target.id === 'choose' || color.target.id === 'color-picker') {
        drawColor = color.target.value ? color.target.value : color.target.children[0].value;
        gradientButtonActive = false;
        rainbowButtonActive = false;
        colorButtons.forEach(button => {
            if (button.id === 'color-picker') {
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

function generateGrayGradient(e) {
    if (e.target.style.backgroundColor.split('(')[1] === undefined ||
        e.target.style.backgroundColor.split('(')[1].split(',')[0] == 255) {
        grayColorComponent = 230;
        return `rgb(${grayColorComponent}, ${grayColorComponent}, ${grayColorComponent})`;
    }
    let actualColor = e.target.style.backgroundColor.split('(')[1].split(',')[0];

    if (actualColor == 230) {
        grayColorComponent = 205;
    } else if (actualColor == 205) {
        grayColorComponent = 180;
    } else if (actualColor == 180) {
        grayColorComponent = 155;
    } else if (actualColor == 155) {
        grayColorComponent = 130;
    } else if (actualColor == 130) {
        grayColorComponent = 105;
    } else if (actualColor == 105) {
        grayColorComponent = 80;
    } else if (actualColor == 80) {
        grayColorComponent = 55;
    } else if (actualColor == 55) {
        grayColorComponent = 30;
    } else if (actualColor == 30) {
        grayColorComponent = 5;
    } else if (actualColor == 5) {
        grayColorComponent = 0;
    } else if (actualColor == 0) {
        grayColorComponent = 0;
    } else {
        return `rgb(230, 230, 230)`;
    }
    return `rgb(${grayColorComponent}, ${grayColorComponent}, ${grayColorComponent})`;
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

initBoard();