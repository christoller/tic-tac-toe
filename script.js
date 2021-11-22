const catImageArray = [
    '/images/cat-avatars/cat-1.png',
    '/images/cat-avatars/cat-2.png',
    '/images/cat-avatars/cat-3.png',
    '/images/cat-avatars/cat-4.png',
    '/images/cat-avatars/cat-5.png',
    '/images/cat-avatars/cat-6.png',
    '/images/cat-avatars/cat-7.png',
    '/images/cat-avatars/cat-8.png',
    '/images/cat-avatars/cat-9.png',
    '/images/cat-avatars/cat-10.png',
    '/images/cat-avatars/cat-11.png',
];

const players = {
    playerOne: {
        username: '',
        avatar: '',
        score: 0,
    },

    playerTwo: {
        username: '',
        avatar: '',
        score: 0,
    },
};

// ************* ********* ************* //
// ************* Variables ************* //
// ************* ********* ************* //

const startBtn = document.getElementById('start-button');
const openingDisplay = document.getElementById('opening-display');
const playerOneDisplay = document.getElementById('player-one-display');
const playerOneDisplayImg = document.getElementById('player-one-display-img');
const playerTwoDisplay = document.getElementById('player-two-display');
const playerTwoDisplayImg = document.getElementById('player-two-display-img');
const endGameScreen = document.getElementById('end-game-screen');
const endGameHeader = document.getElementById('end-game-header');
const endGameBtn = document.getElementById('end-game-button');
const endGameImg = document.getElementById('end-game-img');
const playerOneName = document.getElementById('player-one-name');
const playerTwoName = document.getElementById('player-two-name');
const playerOneInput = document.getElementById('player-one-input');
const playerOneBtn = document.getElementById('player-one-btn');
const playerTwoInput = document.getElementById('player-two-input');
const playerTwoBtn = document.getElementById('player-two-btn');
const playerOneScore = document.getElementById('player-one-score');
const playerTwoScore = document.getElementById('player-two-score');
const container = document.getElementById('container');
const playerOneAvatar_img = document.getElementById('player-one-avatar');
const playerTwoAvatar_img = document.getElementById('player-two-avatar');
const gameFlow = document.getElementById('game-flow');
const catRef_img = document.getElementById('cat-ref');
const gridBox = document.getElementsByClassName('grid-box');

// ************* ********* ************* //
// ********** Event Listeners ********** //
// ************* ********* ************* //

startBtn.addEventListener('click', () => {
    openingDisplay.style.display = 'none';
    playerOneInput.focus();
    playerOneDisplayImg.src = players.playerOne.avatar;
    playerTwoDisplayImg.src = players.playerTwo.avatar;
});

playerOneBtn.addEventListener('click', () => {
    if (playerOneInput.value === '') {
        alert('Please enter a name');
    } else {
        players.playerOne.username = playerOneInput.value;
        playerOneDisplay.style.display = 'none';
        playerOneName.textContent = players.playerOne.username;
        playerTwoInput.focus();
    }
});
playerTwoBtn.addEventListener('click', () => {
    if (playerTwoInput.value === '') {
        alert('Please enter a value');
    } else {
        players.playerTwo.username = playerTwoInput.value;
        playerTwoDisplay.style.display = 'none';
        playerTwoName.textContent = players.playerTwo.username;
        container.style.display = 'contents';
        choosePlayerToStart();
        initializeGame();
    }
});

endGameBtn.addEventListener('click', () => {
    resetBoard();
    choosePlayerToStart();
    initializeGame();
});

for (let box of gridBox) {
    box.addEventListener('click', (event) => {
        // Creates img element and adds to clicked box
        let catImg = document.createElement('img');
        let img = playerTurn.avatar;
        catImg.src = img;
        event.target.appendChild(catImg);
        event.target.style.pointerEvents = 'none';

        const clickedBox = event.target;
        const boxIndex = parseInt(clickedBox.getAttribute('data-cell-index'));
        gameBoard[boxIndex - 1] = playerTurn.username;
        turns++;

        checkForWin();
        initializePlayerTurn();
    });
}

// ************* ********* ************* //
// ********** Game Variables *********** //
// ************* ********* ************* //

generateAvatar();
playerOneAvatar_img.src = players.playerOne.avatar;
playerTwoAvatar_img.src = players.playerTwo.avatar;

let turns = 0;
let gameBoard = ['', '', '', '', '', '', '', '', ''];
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
let gameWon = false;
let playerTurn;

// ************* ********* ************* //
// ************* FUNCTIONS ************* //
// ************* ********* ************* //

function generateAvatar() {
    const randNum = Math.floor(Math.random() * 11);
    const secondRandNum = Math.floor(Math.random() * 11);

    if (randNum === secondRandNum) {
        let numArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        numArray.splice(randNum, 1);
        let randomNum = Math.floor(Math.random() * 10);
        players.playerOne.avatar = catImageArray[randomNum];
        players.playerTwo.avatar = catImageArray[secondRandNum];
    } else {
        players.playerOne.avatar = catImageArray[randNum];
        players.playerTwo.avatar = catImageArray[secondRandNum];
    }
}

function initializeGame() {
    catRef_img.src = '/images/cat-flipped/cat-point-left.png';

    if (playerTurn == players.playerOne) {
        playerTurn = players.playerTwo;
        catRef_img.src = '/images/cat-flipped/cat-point-right.png';
        gameFlow.textContent = `${playerTwoName.innerHTML} Starts First! Click on a square to make your move`;
    } else if (playerTurn == players.playerTwo) {
        playerTurn = players.playerOne;
        catRef_img.src = '/images/cat-flipped/cat-point-left.png';
        gameFlow.textContent = `${playerOneName.innerHTML} Starts First. Click on a square to make your move`;
    }
}

function choosePlayerToStart() {
    const randNum = Math.floor(Math.random() * 2);
    if (randNum === 0) {
        playerTurn = players.playerOne;
    } else if (randNum === 1) {
        playerTurn = players.playerTwo;
    } else {
        console.log('error');
    }
}

function initializePlayerTurn() {
    if (gameWon === false) {
        if (playerTurn == players.playerOne) {
            playerTurn = players.playerTwo;
            catRef_img.src = '/images/cat-flipped/cat-point-right.png';
            gameFlow.textContent = `It's ${players.playerTwo.username}'s turn!`;
        } else if (playerTurn == players.playerTwo) {
            playerTurn = players.playerOne;
            catRef_img.src = '/images/cat-flipped/cat-point-left.png';
            gameFlow.textContent = `It's ${players.playerOne.username}'s turn!`;
        }
    }
}

function checkForWin() {
    for (let i = 0; i < winningCombinations.length; i++) {
        let winCondition = winningCombinations[i];
        let indexZero = gameBoard[winCondition[0]];
        let indexOne = gameBoard[winCondition[1]];
        let indexTwo = gameBoard[winCondition[2]];

        if (indexZero === '' || indexOne === '' || indexTwo === '') {
            continue;
        } else if (indexZero === indexOne && indexOne === indexTwo) {
            gameFlow.textContent = `${playerTurn.username} Wins!`;
            gameWon = true;
            endGame('win');
        } else if (turns === 9) {
            endGame('draw');
            gameFlow.textContent = `It's a Draw!`;
        }
    }
}

function endGame(gameStatus) {
    if (gameStatus === 'win') {
        endGameScreen.style.display = 'contents';
        endGameImg.src = playerTurn.avatar;
        endGameHeader.innerHTML = `${playerTurn.username} Wins!`;
        playerTurn.score++;
        playerOneScore.innerText = players.playerOne.score;
        playerTwoScore.innerText = players.playerTwo.score;

        for (let box of gridBox) {
            box.style.pointerEvents = 'none';
        }
    } else if (gameStatus === 'draw') {
        endGameScreen.style.display = 'contents';
        endGameHeader.innerHTML = `It's a Draw!`;
    }
}

function resetBoard() {
    endGameScreen.style.display = 'none';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    turns = 0;
    gameWon = false;

    for (let box of gridBox) {
        if (box.hasChildNodes()) {
            box.removeChild(box.firstElementChild);
        }
        box.style.pointerEvents = 'auto';
    }
}
