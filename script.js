const changeSize = document.querySelector(".changeSize");
const erase = document.querySelector(".erase");
const toggleRainbow = document.querySelector(".toggleRainbow");
const reset = document.querySelector(".reset");
const gridSize = document.querySelector(".grid-size");
const grid = document.querySelector(".grid");



window.addEventListener("load", setDefaultGridSize);
changeSize.addEventListener("click" , changeGridSize);
toggleRainbow.addEventListener("click", toggleRainbowModeAndErase);
erase.addEventListener("click",toggleRainbowModeAndErase);


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
        rainbowMode(e);
    }else if(e.buttons == 1 && !toggleRainbow.classList.contains("enabled")){
        e.target.style.backgroundColor = "black";
    }
}

function rainbowMode(e) {
    if (!e.target.style.backgroundColor || e.target.style.backgroundColor == "black"){
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${r},${g},${b})`;
    e.target.setAttribute("data-red",`${r}`);
    e.target.setAttribute("data-green",`${g}`);
    e.target.setAttribute("data-blue",`${b}`);
    }else {
        let red = Number(e.target.getAttribute("data-red"));
        let green = Number(e.target.getAttribute("data-green"));
        let blue = Number(e.target.getAttribute("data-blue"));
        let color = "";
        const colors = [];
        string = e.target.style.backgroundColor;
    outer: for (let str of string){
            for (let i = 0 ; i < 10 ; i++){
                if (str == `${i}`){
                    color += i;
                    continue outer;
                }else if (str == ","){
                    colors.push(color);
                    color = "";
                    continue outer;
                }else if (str == ")"){
                    colors.push(color);
                    break outer;
                }
            }
        }
        colors[0] -= red * 1/10;
        colors[1] -= green * 1/10;
        colors[2] -= blue * 1/10;
        e.target.style.backgroundColor = `rgb(${colors[0]},${colors[1]},${colors[2]})`;
    }
}

function toggleRainbowModeAndErase(e){
    if (e.target.classList.contains("erase")){
        erase.classList.toggle("enabled");
    }else{
        toggleRainbow.classList.toggle("enabled");
    }
}

