const choices = ['🪨', '✂️', '📄'];
let playerScore = 0;
let computerScore = 0;
const buttons = document.querySelectorAll('button');
const scoreboard = document.getElementById('scoreboard');
const card = document.getElementById('card');

function dicideWinner(player, computer) {
    if(player===computer)return 'draw';
    else if (player === '🪨' && computer === '✂️') return 'player';
    else if (player === '✂️' && computer === '📄') return 'player';
    else if (player === '📄' && computer === '🪨') return 'player';
    else return 'computer';
}

function disableButtons(value) {
    buttons.forEach(btn => btn.disabled = value);
}

function clearSelected() {
    buttons.forEach(btn => btn.classList.remove('selected'));
}

function updateScoreboard() {
    scoreboard.textContent = `Player: ${playerScore} – Computer: ${computerScore}`;
}

function showModal(winner) {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    let message = '';
    let emoji = '';

    if (winner == 'player') {
        message = `You're win! 🎉`;
        emoji = '🏆';
    } else if (winner == 'computer') {
        message = `Computer win! 🖥️`;
        emoji = '🤖';
    } else {
        message = `Draw! 🤝`;
        emoji = '⚖️';
    }
    modal.innerHTML = `<div>${emoji} ${message}</div>`;

    const btn = document.createElement('button');
    btn.textContent = 'Restart';
    btn.addEventListener('click', function() {
        playerScore = 0;
        computerScore = 0;
        updateScoreboard();
        card.textContent = '❓';
        document.body.removeChild(modal);
        disableButtons(false);
    });
    modal.appendChild(btn);
    document.body.appendChild(modal);
}

function playGround(playerChoice) {
    disableButtons(true);
    clearSelected();

    //Подсветка выбранной кнопки
    buttons.forEach(btn => {
        if (btn.textContent == playerChoice) {
            btn.classList.add('selected');
        }
    });

    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    card.classList.add("rotate");

    setTimeout(() => {
      card.textContent = computerChoice;
      const winner = dicideWinner(playerChoice, computerChoice);
      if (winner === "player") playerScore++;
      else if (winner === "computer") computerScore++;
      else if (winner === 'draw') {
        playerScore++;
        computerScore++;
      }
      updateScoreboard();
    }, 200);

    setTimeout(() => {
      setTimeout(() => {
        card.textContent = "❓";
        // Проверяем, есть ли победитель
        if (playerScore === 3 || computerScore === 3) {
          let winner = "";
          if (playerScore > computerScore) {
            winner = "player";
          } else if (computerScore > playerScore) {
            winner = "computer";
          } else {
            winner = "draw";
          }
          disableButtons(true);
          showModal(winner);
        } else {
          setTimeout(() => {
            disableButtons(false);}, 400);
        }
      }, 200);
      card.classList.remove("rotate");
      clearSelected();
    }, 1700);
}


buttons.forEach((btn) => {
    btn.addEventListener('click', function () {
        const playerChoice = btn.textContent;
        playGround(playerChoice);

    });
});