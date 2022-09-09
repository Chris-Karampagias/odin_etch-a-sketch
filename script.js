const changeSize = document.querySelector(".changeSize");
const erase = document.querySelector(".erase");
const toggleRainbow = document.querySelector(".toggleRainbow");
const reset = document.querySelector(".reset");
const gridSize = document.querySelector(".grid-size");
const grid = document.querySelector(".grid");



window.addEventListener("load", setDefaultGridSize);


function setDefaultGridSize() {
    const box = document.createElement("div");
    box.setAttribute("id","gridBox")
    gridSize.textContent = "16x16";
    grid.setAttribute("style","grid-template-columns: repeat(16,1fr); grid-template-rows: repeat(16,1fr);");
    for (let i = 1; i<16**2 + 1; i++){
        grid.appendChild(box.cloneNode(true));
    }
    const boxes = document.querySelectorAll("#gridBox");
    boxes.forEach(box => {
            ["mousedown","mouseover"].forEach(event => box.addEventListener(event,changeBackgroundColor));
    })
}
changeSize.addEventListener("click" , changeGridSize);

function changeGridSize() {
    const box = document.createElement("div");
    let n = parseInt(prompt('Enter your desired number of squares per side (max 100).'));
    gridSize.textContent = `${n}x${n}`;
    box.setAttribute("id","gridBox");
    grid.setAttribute("style",`grid-template-columns: repeat(${n},1fr); grid-template-rows: repeat(${n},1fr);`);
    while (grid.firstChild){
        grid.removeChild(grid.firstChild);
    }
    window.removeEventListener("load",setDefaultGridSize);
    for (let i = 1 ; i < n**2 + 1; i++){
        grid.appendChild(box.cloneNode(true));
    }
    const boxes = document.querySelectorAll("#gridBox");
    boxes.forEach(box => {
            ["mousedown","mouseover"].forEach(event => box.addEventListener(event,changeBackgroundColor));
    });
}

function changeBackgroundColor(e) {
    if (e.buttons == 1 && toggleRainbow.classList.contains("enabled")){
        e.target.style.backgroundColor = "black";
    }
}

toggleRainbow.addEventListener("click", toggleRainbowModeAndErase);
erase.addEventListener("click",toggleRainbowModeAndErase);




function toggleRainbowModeAndErase(e){
    if (e.target.classList.contains("erase")){
    erase.classList.toggle("enabled");
    }else{
        toggleRainbow.classList.toggle("enabled");
    }
}

