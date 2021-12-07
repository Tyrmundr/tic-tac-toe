"use strict"

//DOM cache
const board = document.getElementById("board");
const cells = document.querySelectorAll("[data-cell]");

let cellArray = [];

const loadCells = () => {
    cells.forEach(cell => {
        cellArray.push(cell)
    })   
}



const winConditions = (() => {
   const a = [0,1,2];
   const b = [3,4,5];
   const c = [6,7,8];
   const d = [0,3,6];
   const e = [1,4,7];
   const f = [2,5,8];
   const g = [0,4,8];
   const h = [2,4,6];

   return {a, b, c, d, e, f, g, h}
})()


window.addEventListener("load", loadCells)
