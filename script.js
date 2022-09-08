const changeSize = document.querySelector(".changeSize");
const erase = document.querySelector(".erase");
const toggleRainbow = document.querySelector(".toggleRainbow");
const reset = document.querySelector(".reset");
const gridSize = document.querySelector(".grid-size");
const grid = document.querySelector(".grid");



window.addEventListener("load", setDefaultGridSize);
window.addEventListener("load", () =>{
    const boxes = document.querySelectorAll(".box");
    boxes.forEach(box => {
    box.addEventListener("click",(e) => {
        e.target.style.backgroundColor = "black";
                
        })
    ;});
});


function setDefaultGridSize() {
    const box = document.createElement("div");
    box.classList.add("box");
    gridSize.textContent = "16x16";
    grid.setAttribute("style","grid-template-columns: repeat(16,1fr); grid-template-rows: repeat(16,1fr);");
    for (let i = 1; i<16**2 + 1; i++){
        /* console.log(box); */
        grid.appendChild(box.cloneNode(true));
    }
}

changeSize.addEventListener("click" , changeGridSize);

function changeGridSize() {
    const box = document.createElement("div");
    let n = parseInt(prompt('Enter your desired number of squares per side (max 100).'));
    gridSize.textContent = `${n}x${n}`;
    box.classList.add("box");
    grid.setAttribute("style",`grid-template-columns: repeat(${n},1fr); grid-template-rows: repeat(${n},1fr);`);
    while (grid.firstChild){
        grid.removeChild(grid.firstChild);
    }
    window.removeEventListener("load",setDefaultGridSize);
    for (let i = 1 ; i < n**2 + 1; i++){
        grid.appendChild(box.cloneNode(true));
    }
}







