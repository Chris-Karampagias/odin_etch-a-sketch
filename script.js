const changeSize = document.querySelector(".changeSize");
const erase = document.querySelector(".erase");
const toggleRainbow = document.querySelector(".toggleRainbow");
const clear = document.querySelector(".clear");
const gridSize = document.querySelector(".grid-size");
const grid = document.querySelector(".grid");



window.addEventListener("load", setDefaultGridSize);
changeSize.addEventListener("click" , changeGridSize);
toggleRainbow.addEventListener("click", toggleRainbowModeAndErase);
erase.addEventListener("click",toggleRainbowModeAndErase);
clear.addEventListener("click",clearMode);


function setDefaultGridSize() {
    const box = document.createElement("div");
    box.setAttribute("id","gridBox")
    gridSize.textContent = "16 x 16";
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
    let n = parseInt(prompt('Enter your desired number of squares per side (max 100).',"16"));
    console.log(n);
    if (n > 100){
        n = parseInt(prompt("Please enter a number no greater than 100.","16"));
         if (isNaN(n)) {
            n = 16;
        }
    }else if (isNaN(n)|| n == ""){
        n = 16;
    }
    gridSize.textContent = `${n} x ${n}`;
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
    if (e.buttons == 1 && toggleRainbow.classList.contains("enabled") && !erase.classList.contains("enabled")){
        rainbowMode(e);
    }else if(e.buttons == 1 && !toggleRainbow.classList.contains("enabled") && !erase.classList.contains("enabled")){
        standardMode(e);
    }else if (e.buttons == 1 && erase.classList.contains("enabled")){
        eraseMode(e);
    }
}


function eraseMode(e){
    e.target.style.backgroundColor = '';
}
    
function rainbowMode(e) {
    erase.classList.remove("enabled");
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
        if (toggleRainbow.classList.contains("enabled") && erase.classList.contains("enabled")){
        toggleRainbow.classList.remove("enabled");
        }
    }else{
        toggleRainbow.classList.toggle("enabled");
        if (toggleRainbow.classList.contains("enabled") && erase.classList.contains("enabled")){
        erase.classList.remove("enabled");
        }
    }
}

function standardMode(e){
    e.target.style.backgroundColor = "black";
}

 function clearMode(){
    const boxes = document.querySelectorAll("#gridBox");
    boxes.forEach(box => box.style.backgroundColor = '');
 }