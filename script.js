let userScore = 0;
let computerScore = 0;
const winningScore = 15;

const choices = document.querySelectorAll('.choice');
const userScoreSpan = document.getElementById('your-score');
const computerScoreSpan = document.getElementById('computer-score');
const gameDiv = document.querySelector('.game');
const headerDiv = document.querySelector('.header');
const containerDiv = document.querySelector('.container');

const rulesBox = document.getElementById('rules-box');
const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');

const winScreen = document.getElementById('win-screen');
const winMessage = document.getElementById('win-message');
const playAgainBtn = document.getElementById('play-again-btn');


// Load saved scores from localStorage
if (localStorage.getItem('userScore')) {
    userScore = parseInt(localStorage.getItem('userScore'));
    userScoreSpan.textContent = userScore;
}

if (localStorage.getItem('computerScore')) {
    computerScore = parseInt(localStorage.getItem('computerScore'));
    computerScoreSpan.textContent = computerScore;
}

choices.forEach(choice => {
    choice.addEventListener('click', () => {
        const userChoice = choice.id;
        playRound(userChoice);
    });
});

function playRound(userChoice) {
    if (userScore >= winningScore || computerScore >= winningScore) return;

    const computerChoice = getComputerChoice();

    // Hide main game and show result screen
    gameDiv.style.display = 'none';
    document.getElementById('result-screen').style.display = 'flex';

    // Set user and computer choices in result screen
    const userPickedDiv = document.getElementById('user-picked');
    const computerPickedDiv = document.getElementById('computer-picked');

    // Function to create the choice display with potential winner rings
    function displayChoice(choice, divElement, isWinner) {
        let imageSrc = '';
        let borderStyleClass = '';
        if (choice === 'rock') {
            imageSrc = 'stone.png';
            borderStyleClass = 'picked-border-rock';
        } else if (choice === 'paper') {
            imageSrc = 'paper.png';
            borderStyleClass = 'picked-border-paper';
        } else if (choice === 'scissors') {
            imageSrc = 'scissors.png';
            borderStyleClass = 'picked-border-scissors';
        }

        const winnerRings = isWinner ? '<div class="winner-ring-outer"></div><div class="winner-ring-inner"></div>' : '';

        divElement.innerHTML = `
            <div class="picked-container ${borderStyleClass}">
                ${winnerRings}
                <img src="${imageSrc}" alt="${choice}" style="width: 80%; position: relative; z-index: 2;">
            </div>
        `;
    }

    let userWonRound = false;
    let computerWonRound = false;

    if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        userWonRound = true;
    } else if (userChoice !== computerChoice) { // If not a tie, computer wins if user didn't
        computerWonRound = true;
    }

    displayChoice(userChoice, userPickedDiv, userWonRound);
    displayChoice(computerChoice, computerPickedDiv, computerWonRound);

    // Determine result text and update scores
    let resultText = '';

    if (userChoice === computerChoice) {
        resultText = "It's a Tie! 😐";
    } else if (userWonRound) {
        resultText = "You Won against PC 🎉";
        userScore++;
        userScoreSpan.textContent = userScore;
        localStorage.setItem('userScore', userScore);
    } else {
        resultText = "You Lost against PC 😔";
        computerScore++;
        computerScoreSpan.textContent = computerScore;
        localStorage.setItem('computerScore', computerScore);
    }

    document.getElementById('result-message').textContent = resultText;

    // Check for winning score
    if (userScore >= winningScore) {
        setTimeout(() => {
            winMessage.textContent = "YOU WON THE GAME";
            winScreen.style.display = 'flex';
        }, 1000);
    } else if (computerScore >= winningScore) {
        setTimeout(() => {
            winMessage.textContent = "COMPUTER WON THE GAME";
            winScreen.style.display = 'flex';
        }, 1000);
    }
}

function getComputerChoice() {
    const options = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return options[randomIndex];
}


function getComputerChoice() {
    const options = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return options[randomIndex];
}

function getWinner(user, computer) {
    if (user === computer) {
        return 'draw';
    } else if (
        (user === 'rock' && computer === 'scissors') ||
        (user === 'scissors' && computer === 'paper') ||
        (user === 'paper' && computer === 'rock')
    ) {
        return 'user';
    } else {
        return 'computer';
    }
}

function endGame(winner) {
    const winScreen = document.querySelector('.win-screen');
    const winText = document.querySelector('.win-screen h1');
  
    if (winner === 'user') {
      winText.innerText = 'YOU WON THE GAME';
    } else {
      winText.innerText = 'COMPUTER WON THE GAME';
    }
  
    winScreen.style.display = 'flex';
  
    // Add these lines below to reset scores
    localStorage.setItem('userScore', 0);
    localStorage.setItem('computerScore', 0);
    userScoreSpan.innerText = 0;
computerScoreSpan.innerText = 0;

  }
  

// Rules popup
playAgainBtn.addEventListener('click', () => {
    userScore = 0;
    computerScore = 0;
    userScoreSpan.textContent = userScore;
    computerScoreSpan.textContent = computerScore;
    localStorage.setItem('userScore', userScore);
    localStorage.setItem('computerScore', computerScore);
    winScreen.style.display = 'none';
});

closeBtn.addEventListener('click', () => {
    rulesBox.style.display = 'none';
});

playAgainBtn.addEventListener('click', () => {
    resetGame();
});

function resetGame() {
    const winScreen = document.querySelector('.win-screen');
    winScreen.style.display = 'none';
  
    userScoreSpan.innerText = 0;
    computerScoreSpan.innerText = 0;

  
    localStorage.setItem('userScore', 0);
    localStorage.setItem('computerScore', 0);
}
  document.getElementById('play-again-btn').addEventListener('click', () => {
    resetGame();
  });
  const replayBtn = document.getElementById('replay-btn');

  replayBtn.addEventListener('click', () => {
    userScore = 0;
    computerScore = 0;
    localStorage.setItem('userScore', 0);
    localStorage.setItem('computerScore', 0);
    userScoreSpan.innerText = 0;
    computerScoreSpan.innerText = 0;
  });
  // Rules popup
rulesBtn.addEventListener('click', () => {
    rulesBox.style.display = 'flex'; // <-- this was missing
});

closeBtn.addEventListener('click', () => {
    rulesBox.style.display = 'none';
});
const nextBtn = document.getElementById('next-btn');

nextBtn.addEventListener('click', () => {
    document.getElementById('result-screen').style.display = 'none';
    gameDiv.style.display = 'flex';
});


  
  
