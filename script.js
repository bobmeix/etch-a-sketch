const container = document.querySelector('.container');

for (let i = 1; i <= 1024; i++) {
    const div = document.createElement('div');
    div.classList.add('square-div');
    container.appendChild(div);
    div.addEventListener('mouseover', changeBackgroundColor);
    div.addEventListener('contextmenu', e => e.preventDefault());
}

function changeBackgroundColor(e) {
    if (e.buttons === 1) {
        e.target.classList.add('square-div-changed');
    } else if (e.buttons === 2) {
        e.target.classList.remove('square-div-changed');
    }
}