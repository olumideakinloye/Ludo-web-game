function displayColors() {
  document.getElementById("pop-up").innerHTML = `<div class="color-pic">
              <p class="headers">Select your color</p>
              <div class="colors">
                <div class="input-color">
                  <label style="color: blue" for="blue">Blue</label>
                  <input
                  class="radio"
                    type="radio"
                    style="
                      accent-color: blue;
                      color: blue;
                      background-color: blue;
                    "
                    required
                    name="color"
                    value="blue"
                    id="blue"
                  />
                </div>
                <div class="input-color">
                  <label style="color: red" for="red">Red</label>
                  <input
                  class="radio"
                    type="radio"
                    style="accent-color: red; color: red; background-color: red"
                    required
                    name="color"
                    value="red"
                    id="red"
                  />
                </div>
                <div class="input-color">
                  <label style="color: yellow" for="yellow">Yellow</label>
                  <input
                  class="radio"
                    type="radio"
                    style="
                      accent-color: yellow;
                      color: yellow;
                      background-color: yellow;
                    "
                    required
                    name="color"
                    value="yellow"
                    id="yellow"
                  />
                </div>
                <div class="input-color">
                  <label style="color: green" for="green">Green</label>
                  <input
                  class="radio"
                    type="radio"
                    style="
                      accent-color: green;
                      color: green;
                      background-color: green;
                    "
                    required
                    name="color"
                    value="green"
                    id="green"
                  />
                </div>
              </div>
              <div class="controles">
                <button class="back-btn" onclick="NumberOfPlayers()"><i class="fa-solid fa-turn-up arrow-icon-2" style=" transform: rotateZ(-90deg);"></i></button>
                <button onclick='setPlayerColor(document.querySelector(".colors input[name=${"color"}]:checked").value)'>Next</button>
              </div>
            </div>`;
}

function backToPlayOption() {
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
              <button onclick="NumberOfPlayers()">Play with AI</button>
              <button>Play with friends</button>
            </div>`;
}
function nextToPlayerNames() {
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
            class="radio"
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
            class="radio"
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
            <button class="back-btn" onclick="backToPlayOption()"><i class="fa-solid fa-turn-up arrow-icon-2" style=" transform: rotateZ(-90deg);"></i></button>
            <button onclick='setPlayerNumber(document.querySelector(".options input[name=${"number-of-players"}]:checked").value)'>Enter</button>
        </div>
      </div>`;
}
function displayStart(playerName) {
  setPlayerName(playerName);
  document.getElementById("pop-up").innerHTML = `<div class="players">
              <button onclick="startGame('${playerName}')">Start</button>
            </div>`;
}
function switchTurns(currentTurn, playAgain = false) {
  let currentPlayerInfo = "";
  let nextPlayerInfo = "";
  console.log(players);
  console.log(gameInfo["currentTurn"]);

  if (players.length == 2) {
    if (playAgain) {
      currentPlayerInfo = players.find(
        (player) => player.name !== players[gameInfo["currentTurn"]].name
      );
      nextPlayerInfo = players[gameInfo["currentTurn"]];
    } else {
      currentPlayerInfo = players[gameInfo["currentTurn"]];
      nextPlayerInfo = players.find(
        (player) => player.name !== players[gameInfo["currentTurn"]].name
      );
      gameInfo["currentTurn"] = players.findIndex(
        (player) => player.name === nextPlayerInfo.name
      );
    }
    if (currentPlayerInfo != "" && nextPlayerInfo != "") {
      const playerInfos = document.querySelectorAll(".player");
      for (let i = 0; i < playerInfos.length; i++) {
        let playerInfo = playerInfos[i];
        if (
          playerInfo.querySelector(".player-info p").innerText ==
          nextPlayerInfo.name
        ) {
          if (
            playerInfo.querySelector(".player-cover").style.display == "block"
          ) {
            playerInfo.querySelector(".player-cover").style.display = "none";
          } else {
            playerInfo.querySelector(".player-cover").style.display = "none";
          }
          continue;
        }
        playerInfo.querySelector(".player-cover").style.display = "block";
      }
      if (nextPlayerInfo.name === playerName) {
        document.querySelector(".board-cover").style.display = "none";
      } else {
        document.querySelector(".board-cover").style.display = "block";
      }
      if (currentPlayerInfo.color1) {
        if (
          document.querySelector(`.${currentPlayerInfo.color1} .flash`).style
            .display == "block" &&
          document.querySelector(`.${currentPlayerInfo.color2} .flash`).style
            .display == "block"
        ) {
          document.querySelector(
            `.${currentPlayerInfo.color1} .flash`
          ).style.display = "none";
          document.querySelector(
            `.${currentPlayerInfo.color2} .flash`
          ).style.display = "none";
          document.querySelector(
            `.${nextPlayerInfo.color1} .flash`
          ).style.display = "block";
          document.querySelector(
            `.${nextPlayerInfo.color2} .flash`
          ).style.display = "block";
        } else {
          document.querySelector(
            `.${nextPlayerInfo.color1} .flash`
          ).style.display = "block";
          document.querySelector(
            `.${nextPlayerInfo.color2} .flash`
          ).style.display = "block";
        }
      } else {
        if (
          document.querySelector(`.${currentPlayerInfo.color} .flash`).style
            .display == "block"
        ) {
          document.querySelector(
            `.${currentPlayerInfo.color} .flash`
          ).style.display = "none";
          document.querySelector(
            `.${nextPlayerInfo.color} .flash`
          ).style.display = "block";
        } else {
          document.querySelector(
            `.${nextPlayerInfo.color} .flash`
          ).style.display = "block";
        }
      }
    }
  } else if (players.length == 4) {
    if (players[parseInt(gameInfo["currentTurn"])].color == "blue") {
      if (playAgain) {
        currentPlayerInfo = players.find((player) => player.color === "yellow");
        nextPlayerInfo = players.find((player) => player.color === "blue");
      } else {
        currentPlayerInfo = players[parseInt(gameInfo["currentTurn"])];
        nextPlayerInfo = players.find((player) => player.color === "red");
        gameInfo["currentTurn"] = nextPlayerInfo.number - 1;
      }
    } else if (players[parseInt(gameInfo["currentTurn"])].color == "red") {
      if (playAgain) {
        currentPlayerInfo = players.find((player) => player.color === "blue");
        nextPlayerInfo = players.find((player) => player.color === "red");
      } else {
        currentPlayerInfo = players[parseInt(gameInfo["currentTurn"])];
        nextPlayerInfo = players.find((player) => player.color === "green");
        gameInfo["currentTurn"] = nextPlayerInfo.number - 1;
      }
    } else if (players[parseInt(gameInfo["currentTurn"])].color == "green") {
      if (playAgain) {
        currentPlayerInfo = players.find((player) => player.color === "red");
        nextPlayerInfo = players.find((player) => player.color === "green");
      } else {
        currentPlayerInfo = players[parseInt(gameInfo["currentTurn"])];
        nextPlayerInfo = players.find((player) => player.color === "yellow");
        gameInfo["currentTurn"] = nextPlayerInfo.number - 1;
      }
    } else if (players[parseInt(gameInfo["currentTurn"])].color == "yellow") {
      if (playAgain) {
        currentPlayerInfo = players.find((player) => player.color === "green");
        nextPlayerInfo = players.find((player) => player.color === "yellow");
      } else {
        currentPlayerInfo = players[parseInt(gameInfo["currentTurn"])];
        nextPlayerInfo = players.find((player) => player.color === "blue");
        gameInfo["currentTurn"] = nextPlayerInfo.number - 1;
      }
    }
    if (currentPlayerInfo != "" && nextPlayerInfo != "") {
      const playerInfos = document.querySelectorAll(".player");
      for (let i = 0; i < playerInfos.length; i++) {
        let playerInfo = playerInfos[i];
        if (
          playerInfo.querySelector(".player-info p").innerText ==
          nextPlayerInfo.name
        ) {
          if (
            playerInfo.querySelector(".player-cover").style.display == "block"
          ) {
            playerInfo.querySelector(".player-cover").style.display = "none";
          } else {
            playerInfo.querySelector(".player-cover").style.display = "none";
          }
          continue;
        }
        playerInfo.querySelector(".player-cover").style.display = "block";
      }
      if (nextPlayerInfo.name === playerName) {
        document.querySelector(".board-cover").style.display = "none";
      } else {
        document.querySelector(".board-cover").style.display = "block";
      }
      if (
        document.querySelector(`.${currentPlayerInfo.color} .flash`).style
          .display == "block"
      ) {
        document.querySelector(
          `.${currentPlayerInfo.color} .flash`
        ).style.display = "none";
        document.querySelector(
          `.${nextPlayerInfo.color} .flash`
        ).style.display = "block";
      } else {
        document.querySelector(
          `.${nextPlayerInfo.color} .flash`
        ).style.display = "block";
      }
    }
  } else if (players.length == 3) {
    if (players[parseInt(gameInfo["currentTurn"])].color == "blue") {
      if (playAgain) {
        if (players.find((player) => player.color === "yellow")) {
          currentPlayerInfo = players.find(
            (player) => player.color === "yellow"
          );
        } else {
          currentPlayerInfo = players.find(
            (player) => player.color === "green"
          );
        }
        nextPlayerInfo = players.find((player) => player.color === "blue");
      } else {
        currentPlayerInfo = players[parseInt(gameInfo["currentTurn"])];
        if (players.find((player) => player.color === "red")) {
          nextPlayerInfo = players.find((player) => player.color === "red");
        } else {
          nextPlayerInfo = players.find((player) => player.color === "green");
        }
        gameInfo["currentTurn"] = players.findIndex(
          (player) => player.name === nextPlayerInfo.name
        );
      }
    } else if (players[parseInt(gameInfo["currentTurn"])].color == "red") {
      if (playAgain) {
        if (players.find((player) => player.color === "blue")) {
          currentPlayerInfo = players.find((player) => player.color === "blue");
        } else {
          currentPlayerInfo = players.find(
            (player) => player.color === "yellow"
          );
        }
        nextPlayerInfo = players.find((player) => player.color === "red");
      } else {
        currentPlayerInfo = players[parseInt(gameInfo["currentTurn"])];
        if (players.find((player) => player.color === "green")) {
          nextPlayerInfo = players.find((player) => player.color === "green");
        } else {
          nextPlayerInfo = players.find((player) => player.color === "yellow");
        }
        gameInfo["currentTurn"] = players.findIndex(
          (player) => player.name === nextPlayerInfo.name
        );
      }
    } else if (players[parseInt(gameInfo["currentTurn"])].color == "green") {
      if (playAgain) {
        if (players.find((player) => player.color === "red")) {
          currentPlayerInfo = players.find((player) => player.color === "red");
        } else {
          currentPlayerInfo = players.find((player) => player.color === "blue");
        }
        nextPlayerInfo = players.find((player) => player.color === "green");
      } else {
        currentPlayerInfo = players[parseInt(gameInfo["currentTurn"])];
        if (players.find((player) => player.color === "yellow")) {
          nextPlayerInfo = players.find((player) => player.color === "yellow");
        } else {
          nextPlayerInfo = players.find((player) => player.color === "blue");
        }
        gameInfo["currentTurn"] = players.findIndex(
          (player) => player.name === nextPlayerInfo.name
        );
      }
    } else if (players[parseInt(gameInfo["currentTurn"])].color == "yellow") {
      if (playAgain) {
        if (players.find((player) => player.color === "green")) {
          currentPlayerInfo = players.find(
            (player) => player.color === "green"
          );
        } else {
          currentPlayerInfo = players.find((player) => player.color === "red");
        }
        nextPlayerInfo = players.find((player) => player.color === "yellow");
      } else {
        currentPlayerInfo = players[parseInt(gameInfo["currentTurn"])];
        if (players.find((player) => player.color === "blue")) {
          nextPlayerInfo = players.find((player) => player.color === "blue");
        } else {
          nextPlayerInfo = players.find((player) => player.color === "red");
        }
        gameInfo["currentTurn"] = players.findIndex(
          (player) => player.name === nextPlayerInfo.name
        );
      }
    }
    if (currentPlayerInfo != "" && nextPlayerInfo != "") {
      const playerInfos = document.querySelectorAll(".player");
      for (let i = 0; i < playerInfos.length; i++) {
        let playerInfo = playerInfos[i];
        if (
          playerInfo.querySelector(".player-info p").innerText ==
          nextPlayerInfo.name
        ) {
          if (
            playerInfo.querySelector(".player-cover").style.display == "block"
          ) {
            playerInfo.querySelector(".player-cover").style.display = "none";
          } else {
            playerInfo.querySelector(".player-cover").style.display = "none";
          }
          continue;
        }
        playerInfo.querySelector(".player-cover").style.display = "block";
      }
      if (nextPlayerInfo.name === playerName) {
        document.querySelector(".board-cover").style.display = "none";
      } else {
        document.querySelector(".board-cover").style.display = "block";
      }
      if (
        document.querySelector(`.${currentPlayerInfo.color} .flash`).style
          .display == "block"
      ) {
        document.querySelector(
          `.${currentPlayerInfo.color} .flash`
        ).style.display = "none";
        document.querySelector(
          `.${nextPlayerInfo.color} .flash`
        ).style.display = "block";
      } else {
        document.querySelector(
          `.${nextPlayerInfo.color} .flash`
        ).style.display = "block";
      }
    }
  }
  if (currentPlayerInfo != "" && nextPlayerInfo != "") {
    if (
      currentPlayerInfo.name == playerName &&
      nextPlayerInfo.name != playerName
    ) {
      operating = true;
      document.getElementById("rool-dice").removeAttribute("data-turn");
      let message = `${nextPlayerInfo.name}'s turn`;
      if (playAgain === true) {
        message = `${nextPlayerInfo.name} rools dice again`;
      }
      const timeOut = message.length * 100;
      alertPlayer("block", message);
      setTimeout(() => {
        aiMove(nextPlayerInfo);
      }, timeOut);
    } else if (
      currentPlayerInfo.name != playerName &&
      nextPlayerInfo.name != playerName
    ) {
      operating = true;
      document.getElementById("rool-dice").removeAttribute("data-turn");
      let message = `${nextPlayerInfo.name}'s turn`;
      if (playAgain === true) {
        message = `${nextPlayerInfo.name} rools dice again`;
      }
      const timeOut = message.length * 100;
      alertPlayer("block", message);
      setTimeout(() => {
        aiMove(nextPlayerInfo);
      }, timeOut);
    } else if (
      currentPlayerInfo.name != playerName &&
      nextPlayerInfo.name == playerName
    ) {
      operating = true;
      document
        .getElementById("rool-dice")
        .setAttribute("data-turn", nextPlayerInfo.name);
      let message = "Your turn";
      if (playAgain === true) {
        message = `Rool dice again`;
      }
      const timeOut = message.length * 100;
      alertPlayer("block", message);
      setTimeout(() => {
        operating = false;
      }, timeOut);
    }
  }
}
