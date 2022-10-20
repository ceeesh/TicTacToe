const playerOption = document.querySelector(".playerOption");
const selectXbtn = playerOption.querySelector(".playerX");
const selectObtn = playerOption.querySelector(".playerO");
const playBoard = document.querySelector(".playBoard");
const playersSlider = document.querySelector(".players");
const restartSection = document.querySelector("#buttons");
const restartBtn = document.querySelector("#restartButton")
const previousButton = document.querySelector("#previousButton");
const nextButton = document.querySelector("#nextButton");

let currentPlayer;

function choosePlayer() {
    if (this.id === "playerX") {
        currentPlayer = "X";
        playerOption.classList.add('hide');
        playBoard.classList.add('show');
    } else {
        currentPlayer = "O";
        playerOption.classList.add('hide');
        playBoard.classList.add('show');
        playersSlider.setAttribute('class', 'players active')
    }
}

// player selection listeners
selectXbtn.addEventListener('click', choosePlayer);
selectObtn.addEventListener('click', choosePlayer);

let gameOver = false;
const boxes = Array.from(document.querySelectorAll(".box"));
let history = [];
let boxesHistory = [];
let boardStates = ["", "", "", "", "", "", "", "", ""];
let turnCounter = 0;
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const startGame = () => {
    boxes.forEach((box) => box.addEventListener('click', boxClicked))
    restartBtn.addEventListener("click", restartGame);
    previousButton.addEventListener('click', previousTurn)
    nextButton.addEventListener('click', nextTurn)
    gameOver = true;
}
startGame();

function boxClicked() {
    const id = this.id;
    console.log(id)

    if (boardStates[id] !== "" || !gameOver) {
        return;
    }

    updateBox(this, id);
    checkWinner();
    history.push(id)
    console.log(history)
    turnCounter++;
}

function updateBox(box, index) {

    boardStates[index] = currentPlayer;
    box.textContent = currentPlayer;
    boxesHistory.push(boardStates[index]);
    console.log(boxesHistory)
}

function changePlayer() {
    if (currentPlayer === "X") {
        currentPlayer = "O"
        playersSlider.classList.add("active")
    } else {
        currentPlayer = "X"
        playersSlider.classList.remove("active")
    }
}

function checkWinner() {
    let playerWon = false;

    for (const condition of winningCombinations) {
        let [a, b, c] = condition

        if ([a, b, c] === "") {
            continue;
        }

        if (boardStates[a] && (boardStates[a] == boardStates[b] && boardStates[a] == boardStates[c])) {
            boxes[a].classList.add('fire', 'font-effect-fire-animation');
            boxes[b].classList.add('fire', 'font-effect-fire-animation');
            boxes[c].classList.add('fire', 'font-effect-fire-animation');
            playerWon = true;
            break
        }
    }

    if (playerWon) {
        boxes.forEach(box => {
            box.style.pointerEvents = "none"
        })
        statusText.textContent = `${currentPlayer} wins!`;
        restartSection.style.display = 'block';
        gameOver = false;
    }
    else if (!boardStates.includes("")) {
        boxes.forEach(box => {
            box.style.pointerEvents = "none"
        })
        statusText.textContent = `Draw!`;
        restartSection.style.display = 'block';
        gameOver = false;
    }
    else {
        changePlayer();
    }
};

function restartGame() {
    location.reload();
}

function previousTurn() {
    boxes[history[turnCounter - 1]].textContent = '';
    turnCounter--;
}

function nextTurn() {
    boxes[history[turnCounter]].textContent = `${boxesHistory[turnCounter]}`;
    turnCounter++;
}
const body = document.querySelector("body")
const lightsButton = document.querySelector(".container")
const darkButton = document.querySelector('.buttonDark')
const slider = document.querySelector(".slider")
const Xslider = document.querySelector(".Xturn")
const Oslider = document.querySelector(".Oturn")
const backgroundSwitch = [slider, restartBtn, previousButton, nextButton, selectXbtn, selectObtn];

function darkMode() {
    if (body.className === 'dark') {
        boxes.forEach(box => {
            box.style.borderColor = "black"
        })
        backgroundSwitch.forEach(el => {
            el.style.backgroundColor = '#ede6d6'
        })
        body.classList.add("light");
        body.classList.remove("dark");
        lightsButton.style.display = 'none'
        darkButton.style.display = 'block'
        localStorage.setItem("user", "light");
    } else {
        boxes.forEach(box => {
            box.style.borderColor = "rgb(241, 213, 176)"
        })
        backgroundSwitch.forEach(el => {
            el.style.backgroundColor = 'orange'
        })
        darkButton.style.display = 'none'
        lightsButton.style.display = 'block'
        body.classList.add("dark");
        body.classList.remove("light");
        localStorage.setItem("user", "dark");
    }
}

function dataStore() {
    if (localStorage.user === "undefined") {
        localStorage.setItem("user", "light");
    }
    let user = localStorage.user;

    if (user !== body.className) {
        darkMode();
    }
}
dataStore()


darkButton.addEventListener("click", darkMode);
lightsButton.addEventListener("click", darkMode);





