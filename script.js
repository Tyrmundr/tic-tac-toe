"use strict"

//DOM cache
const X_CLASS = "x";
const O_CLASS = "o";
const board = document.getElementById("board");
const cells = document.querySelectorAll("[data-cell]");
const winningMessageElement = document.querySelector(".winning-popup");
const winningMessageTextElement = document.getElementById("winning-msg");
const btnRestart = document.getElementById("btn-restart")

let oTurn;



btnRestart.addEventListener("click", startGame)

//Win conditions
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startGame()

function startGame(){
    oTurn = false;
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener("click", handleClick)
        cell.addEventListener("click", handleClick, { once : true })
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove("show")
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);

    if(checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
    
    
}

function endGame(draw) {
    if(draw) {
        winningMessageTextElement.innerText = `Draw!`;
    } else {
        winningMessageTextElement.innerText = `${oTurn ? "O's" : "X's"} win!`;
    }

    winningMessageElement.classList.add("show");
}

function isDraw() {
    return [...cells].every(cell => cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS))
}

const placeMark = (cell, currentClass) => {
    cell.classList.add(currentClass)
}

const swapTurns = () => {
    oTurn = !oTurn;
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if(oTurn) {
        board.classList.add(O_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    return winConditions.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass)
        })
    })
}


/*
//Function to load cells
let cellArray = [];

const loadCells = (() => {
    const load = () => {cells.forEach(cell => {
        cellArray.push(cell)
    })} 

    return { load };
})()

//Adding Marks on click
let mark;
//Mark X
const markX = () => {
    cells.forEach(cell => cell.addEventListener("click", (e) => {
        e.target.classList.add("x");
        
    }, {once:true}))
}

//Mark O
const markO = () => {
    cells.forEach(cell => cell.addEventListener("click", (e) => {
        e.target.classList.add("o");
        
    }, {once:true}))
}






//Loading cells when window loads
window.addEventListener("load", loadCells.load())
*/
