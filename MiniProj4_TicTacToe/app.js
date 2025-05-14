const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info');
const newGameBtn = document.querySelector('.btn');

let currentPlayer;
let gameGrid; //3 x 3 grid
initGame();
/*
 0 1 2
 3 4 5
 6 7 8
*/ 

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// fn to initialize the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""]
    //also reset the box 
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //one more thing to do i.e. make bg of winning pos back to normal from green
        box.classList.remove('win');

    })
    newGameBtn.classList.remove('active');
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index) // index will let me know which box is clicked
    })
})

function handleClick(index) {
    // we need to handle click if clicked box is empty
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // swap the turn 
        swapTurn();
        // chekc if either player won ?
        checkGameOver(); 
    }    
}

function swapTurn() {
    if(currentPlayer === "X")
        currentPlayer = "O";
    else 
        currentPlayer = "X";

    // UPDATE UI
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = ""

    winningPositions.forEach((position) => {
        if(
            gameGrid[position[0]] !== "" && gameGrid[position[1]] !== "" &&
            gameGrid[position[2]] !== "" &&
            gameGrid[position[0]] === gameGrid[position[1]] &&
            gameGrid[position[0]] === gameGrid[position[2]]
        ){
            // check if winner ix X
            if(gameGrid[position[0]] === "X")   
                answer = "X"
            else 
                answer = "O";

            // disable pointer events 
            boxes.forEach((box) =>{
                box.style.pointerEvents = "none";
            })

            boxes[position[0]].classList.add('win');
            boxes[position[1]].classList.add('win');
            boxes[position[2]].classList.add('win');

        }
    })

    // it means we have a winner
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add('active');
        return;
    }

    // if no winner found
    // checking tie or not
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
            fillCount++;
    })

    if(fillCount == 9){
        gameInfo.innerText = "Game Tied";
        newGameBtn.classList.add("active");
    }
}

newGameBtn.addEventListener('click', initGame);