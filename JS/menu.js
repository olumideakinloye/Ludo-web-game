
function offlineMode() {
  document.getElementById("pop-up").innerHTML = `
  <div class="players">
    <button onclick="offlineVersion('Bot')">Play with Bot</button>
    <button onclick="offlineVersion('PlayPass')">Play n' Pass</button>
    <button onclick="mainMenu()" class="back-btn"><i class="fa-solid fa-turn-up arrow-icon-2" style=" transform: rotateZ(-90deg);"></i></button>
  </div>`;
}
function displayColors() {
  if (gameInfo["offline-mode"]) {
    if (gameInfo["offline-mode"] === "PlayPass") {
    }
    // alert(gameInfo["offline-mode"])
  }
  if (numberOfPlayers == 4) {
    document.getElementById("pop-up").innerHTML = `
    <div class="color-pic">
      <p class="headers">Select your color</p>
      <div class="colors four-colors">
        <div class="input-color">
          <label style="color: blue" for="blue">Blue</label>
            <div class="input blue-input">
              <input
              class="radio-color"
                type="radio"
                style="
                  opacity: 0;
                "
                required
                name="color"
                value="blue"
                id="blue"
              />
            </div>
        </div>
        <div class="input-color">
          <label style="color: red" for="red">Red</label>
            <div class="input red-input">
              <input
              class="radio-color"
                type="radio"
                style="
                  opacity: 0;
                "
                required
                name="color"
                value="red"
                id="red"
              />
            </div>
        </div>
        <div class="input-color">
          <label style="color: yellow" for="yellow">Yellow</label>
            <div class="input yellow-input">
              <input
              class="radio-color"
                type="radio"
                style="
                  opacity: 0;
                "
                required
                name="color"
                value="yellow"
                id="yellow"
              />
            </div>
        </div>
        <div class="input-color">
          <label style="color: green" for="green">Green</label>
            <div class="input green-input">
              <input
              class="radio-color"
                type="radio"
                style="
                  opacity: 0;
                "
                required
                name="color"
                value="green"
                id="green"
              />
            </div>
        </div>
      </div>
      <div class="controles">
        <button class="back-btn" onclick="NumberOfPlayers()"><i class="fa-solid fa-turn-up arrow-icon-2" style=" transform: rotateZ(-90deg);"></i></button>
        <button onclick='moduleConnections("setPlayerColor", document.querySelector(".colors input[name=${"color"}]:checked").value)'>Next</button>
      </div>
    </div>`;
  } else {
    document.getElementById("pop-up").innerHTML = `
    <div class="color-pic">
      <p class="headers">Select your color</p>
      <div class="colors">
        <div class="input-color">
          <label style="display: flex; gap: 4px" for="blue-green"><p style="color: blue">Blue </p><p> - </p><p style="color: green"> Green</p></label>
          <div class="input blue-green">
            <input
            class="radio-color"
              type="radio"
              style="
                opacity: 0;
              "
              required
              name="color"
              value="blue-green"
              id="blue-green"
            />
          </div>
        </div>
        <div class="input-color">
          <label style="display: flex; gap: 4px" for="red-yellow"><p style="color: red">Red </p><p> - </p><p style="color: Yellow"> Yellow</p></label>
          <div class="input red-yellow">
            <input
              class="radio-color"
              type="radio"
              style="opacity: 0"
              required
              name="color"
              value="red-yellow"
              id="red-yellow"
          />
          </div>
        </div>
      </div>
      <div class="controles">
        <button class="back-btn" onclick="NumberOfPlayers()"><i class="fa-solid fa-turn-up arrow-icon-2" style=" transform: rotateZ(-90deg);"></i></button>
        <button onclick='moduleConnections("setPlayerColor", document.querySelector(".colors input[name=${"color"}]:checked").value)'>Next</button>
      </div>
    </div>`;
  }
}
function mainMenu() {
  if (players.length > 0) {
    players.length = 0;
    console.log(players);
    if (listenerAdded) {
      document
        .getElementById("rool-dice")
        .removeEventListener("click", clickRoolDice);
    }
    resetBoard();
  }
  document.getElementById("pop-up").innerHTML = `<div class="players">
              <button onclick="offlineMode()">Play Offline</button>
              <button>Play Online</button>
            </div>`;
}
function playerNames() {
  document.getElementById(
    "pop-up"
  ).innerHTML = `<div class='players-info players'>
        <div class='single-player-info player-1'>
          <input type='text' minlength='1' maxlength='23' placeholder='Enter your name' name='player-1' id='single-player-name'
            required />
            <div class='single-player-info-buttons'>
            <button class="back-btn" onclick="displayColors()"><i class="fa-solid fa-turn-up arrow-icon-2" style=" transform: rotateZ(-90deg);"></i></button>
            <button onclick="displayStart(document.getElementById('single-player-name').value)">Enter</button>
            </div>
        </div>
      </div>`;
}
function NumberOfPlayers() {
  document.getElementById("pop-up").innerHTML = `<div class="players-num">
        <p class="headers">Select players</p>
        <div class="options">
          <div class="option">
            <input
            class="radio-number"
              required
              type="radio"
              name="number-of-players"
              id="2"
              value="2"
            />
            <label for="2">2 Players</label>
          </div>
          <div class="option">
            <input
            class="radio-number"
              required
              type="radio"
              name="number-of-players"
              id="4"
              value="4"
            />
            <label for="4">4 Players</label>
          </div>
        </div>
        <div class='single-player-info-buttons'>
            <button class="back-btn" onclick="offlineMode()"><i class="fa-solid fa-turn-up arrow-icon-2" style=" transform: rotateZ(-90deg);"></i></button>
            <button onclick='moduleConnections("setPlayerNumber",document.querySelector(".options input[name=${"number-of-players"}]:checked").value)'>Next</button>
        </div>
      </div>`;
}

function displayStart(playerName) {
  moduleConnections("setPlayerName", playerName);
  document.getElementById("pop-up").innerHTML = `<div class="players">
              <button onclick="startGame('${playerName}')">Start</button>
            </div>`;
}
function removeMenu() {
  document.querySelector(".pop-up-cover").style.display = "none";
}
function displayMenu() {
  document.querySelector(".pop-up-cover").style.display = " flex";
}
function declearWinner(winner) {
  displayMenu();
  const cube = document.getElementById("rool-dice");
  if (cube.style.display == "block" || cube.style.display) {
    cube.style.display = "none";
  }
  operating = true;
  pausedMove = true;
  if (
    gameInfo["positions"].length > 0 &&
    !players[0].hasOwnProperty("color2")
  ) {
    clickPlayAgain = (event) => {
      playAgain(playAgainPlayers);
    };
    console.log(gameInfo["positions"]);
    document.getElementById("pop-up").innerHTML = `
            <table class="score-table">
            <tr>
              <th class="max-text">Player</th>
              <th class="max-text">Score</th>
            </tr>
            <tr>
              <td class="min-text">${gameInfo["positions"][0].name}</td>
              <td>
                <i class="fas fa-star star"></i><i class="fas fa-star star"></i
                ><i class="fas fa-star star"></i>
              </td>
            </tr>
            <tr>
              <td class="min-text">${gameInfo["positions"][1].name}</td>
              <td>
                <i class="fas fa-star star"></i><i class="fas fa-star star"></i>
              </td>
            </tr>
            <tr>
              <td class="min-text">${gameInfo["positions"][2].name}</td>
              <td><i class="fas fa-star star"></i></td>
            </tr>
            <tr>
              <td class="min-text">${gameInfo["positions"][3].name}</td>
              <td></td>
            </tr>
          </table>
          <div class="score-menu">
            <button onclick="mainMenu()">
              Main menu
            </button>
            <button id="play-again">
              Play again
            </button>
          </div>`;
  } else {
    if (players.length == 2) {
      clickPlayAgain = (event) => {
        playAgain(players);
      };
      let winnnerScore = "1";
      let looserScore = "0";
      const opponentInfo = players.find(
        (opponent) => opponent.name !== winner.name
      );
      const indexOfWinner = players.findIndex(
        (Winner) => Winner.name === winner.name
      );
      const indexOfOpponent = players.findIndex(
        (Opponent) => Opponent.name === opponentInfo.name
      );
      if (winner.score) {
        winnnerScore = parseInt(winner.score);
        winnnerScore += 1;
      }
      if (opponentInfo.score) {
        looserScore = opponentInfo.score;
      }
      players[indexOfWinner].score = winnnerScore;
      players[indexOfOpponent].score = looserScore;
      document.getElementById("pop-up").innerHTML = `
            <div class="winner-menu">
              <div class="score-info">
                <div class="player-info">
                  <p>${winner.name}</p>
                </div>
                <div class="score">${winnnerScore} - ${looserScore}</div>
                <div class="player-info">
                  <p>${opponentInfo.name}</p>
                </div>
              </div>
              <div class="score-menu">
                <button onclick="mainMenu()">
                  Main menu
                </button>
                <button id="play-again">
                  Play again
                </button>
              </div>
            </div>`;
    }
  }
  if (document.getElementById("play-again")) {
    document
      .getElementById("play-again")
      .addEventListener("click", clickPlayAgain, { once: true });
  }
}
function alertPlayer(display, message) {
  const alert = document.getElementById("alert");
  if (message) {
    alert.querySelector("p").innerText = message;
    alert.style.paddingTop = "2rem";
    const timeOut = message.length * 100;
    setTimeout(() => {
      alert.style.paddingTop = "0";
      alert.querySelector("p").innerText = "";
    }, timeOut);
  } else {
    alert.style.paddingTop = "0";
    alert.querySelector("p").innerText = "";
  }
}
