const startButtonEl = document.querySelector("#startButton");
const gameAreaEl = document.querySelector("#gameArea");
const scoreEl = document.querySelector("#score");
const timerEl= document.querySelector("#timer");
const triesEl = document.querySelector("#tries");

let tries = 5;
let wrongGuesses = 0;
let countdown = 30;
let interval;
let randomWord;
let blanks = [];
let score = JSON.parse(localStorage.getItem("score")) || {wins: 0, losses: 0};

// Cleaned up repeated words
const words = [...new Set(["apple", "banana", "cherry", "grape", "kiwi", "lemon", "mango", "orange", "pineapple", "strawberry", "watermelon", "pizza", "pear",])];

scoreEl.textContent = `Wins: ${score.wins} Losses: ${score.losses}`;

function init() {
    countdown = 30;
    randomWord = "";
    blanks = [];
	wrongGuesses = 0;
	triesEl.textContent = 'Tries left: 5';
}

function startHandler() {
    init();
    startTimer();

    randomWord = randomWordSelector();
    blanks = Array(randomWord.length).fill("_");
    gameAreaEl.textContent = blanks.join(" ");
}

function randomWordSelector() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

function startTimer() {
    interval = setInterval(() => {
        countdown--;
		timerEl.textContent = countdown;
        if (countdown === 0) {
            endgame("loss");
        }
    }, 1000);
}

function guessLetter(event) {
    const letter = event.key;
    for (let i = 0; i < randomWord.length; i++) {
        if (letter === randomWord[i]) {
            blanks[i] = letter;
            gameAreaEl.textContent = blanks.join(" ");
            if (!blanks.includes("_")) {
                endgame("win");
            }
        }
    }
	if (letter) {
		wrongGuesses++;
		triesEl.textContent = `Tries Left: ${5 - wrongGuesses}`;
		if (wrongGuesses === 5) {
			endgame("loss");
        }
}
}

function endgame(condition) {
    clearInterval(interval);
    if (condition === "win") {
        score.wins++;
        alert("You Win!");
    } else {
        score.losses++;
        alert("You Lose!");
    }
    localStorage.setItem("score", JSON.stringify(score));
}

startButtonEl.addEventListener("click", startHandler);
document.addEventListener("keydown", guessLetter);

