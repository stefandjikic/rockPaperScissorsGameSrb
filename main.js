const game = () => {
  let pScore = 0;
  let cScore = 0;

  const startGame = () => {
    const playBtn = document.querySelector(".intro button");
    const introScreen = document.querySelector(".intro");
    const matchScreen = document.querySelector(".match");
    const playAgainBtnW = document.querySelector(".playAgainBtnW");
    const playAgainBtnL = document.querySelector(".playAgainBtnL");

    playBtn.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      matchScreen.classList.add("fadeIn");
    });
  
  if(playAgainBtnW) {
    playAgainBtnW.addEventListener("click", () => {
      location.reload(game);
    });
  }
  if(playAgainBtnL) {
    playAgainBtnL.addEventListener("click", () => {
      location.reload(startGame);
    });
  }
  };

  const playMatch = () => {
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const playAgainW = document.querySelector(".playAgainWin");
    const playAgainL = document.querySelector(".playAgainLose");
    const hands = document.querySelectorAll(".hands img");
    const options = document.querySelectorAll(".options button");

    hands.forEach((hand) => {
      hand.addEventListener("animationend", function () {
        this.style.animation = "";
      });
    });

    const computerOptions = ["камен", "папир", "маказе"];
    options.forEach((option) => {
      option.addEventListener("click", function () {

        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];

        setTimeout(() => {
          compareHadns(this.textContent, computerChoice);
          playerHand.src = `./assets/${this.textContent}.png`;
          computerHand.src = `./assets/${computerChoice}.png`;
          if (cScore === 5) {
            playAgainL.classList.add("fadeIn");
          }
          if (pScore === 5) {
            playAgainW.classList.add("fadeIn");
          }
        }, 2000);

        playerHand.style.animation = "shakePlayer 2s ease";
        computerHand.style.animation = "shakeComputer 2s ease";
      });
    });
  };
    
  const updateScore = () => {
    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;
  };

  const compareHadns = (playerChoice, computerChoice) => {
    const winner = document.querySelector(".winner");

    if (playerChoice === computerChoice) {
      winner.textContent = "Нерешено";
      return;
    }

    if (playerChoice === "камен") {
      if (computerChoice === "маказе") {
        winner.textContent = "Кандидат добија";
        pScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Аца добија";
        cScore++;
        updateScore();
        return;
      }
    }

    if (playerChoice === "папир") {
      if (computerChoice === "маказе") {
        winner.textContent = "Аца добија";
        cScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Кандидат добија";
        pScore++;
        updateScore();
        return;
      }
    }

    if (playerChoice === "маказе") {
      if (computerChoice === "камен") {
        winner.textContent === "Аца добија";
        cScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Кандидат добија";
        pScore++;
        updateScore();
        return;
      }
    }
  };

  startGame();
  playMatch();
};

game();
