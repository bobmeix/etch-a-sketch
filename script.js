const container = document.querySelector('.container');

for (let i = 1; i <= 256; i++) {
    const div = document.createElement('div');
    div.classList.add('square-div');
    div.textContent = i;
    container.appendChild(div);
    div.addEventListener('mouseover', changeBackgroundColor);
}

function changeBackgroundColor(e){
    e.target.classList.add('square-div-changed');
}