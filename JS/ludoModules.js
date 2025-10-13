function assignPlayers(A, B) {
  const opposition = { 1: 4, 4: 1, 2: 3, 3: 2 };
  const opponent = { 1: 2, 2: 1, 3: 4, 4: 3 };
  if (A != null) return opposition[A];
  else if (B != null) return opponent[B];
}
function startGame(playerName) {
  if (numberOfPlayers == 2) {
    let playerANumber = 0;
    for (let i = 0; i < colorToPlayerNumber.length; i++) {
      const element = colorToPlayerNumber[i];
      if (element.color == playerColor) {
        players.push({
          name: playerName,
          color1: element.color,
          color2:
            colorToPlayerNumber[assignPlayers(element.number, null) - 1].color,
          number: element.number,
        });
        document.querySelector(`.player-${element.number}-info p`).innerText =
          playerName;
        document.querySelector(
          `.player-${assignPlayers(element.number, null)}-info p`
        ).innerText = playerName;
        playerANumber = element.number;
        let playerBNumber = assignPlayers(null, element.number);

        players.push({
          name: `Bot`,
          color1: colorToPlayerNumber[playerBNumber - 1].color,
          color2:
            colorToPlayerNumber[assignPlayers(playerBNumber, null) - 1].color,
          number: playerBNumber,
        });
        document.querySelector(`.player-${playerBNumber}-info p`).innerText =
          "Bot";
        document.querySelector(
          `.player-${assignPlayers(playerBNumber, null)}-info p`
        ).innerText = "Bot";
        break;
      }
    }
  } else if (numberOfPlayers == 4) {
    let botNumber = 0;
    for (let i = 0; i < colorToPlayerNumber.length; i++) {
      const element = colorToPlayerNumber[i];
      if (element.color == playerColor) {
        players.push({
          name: playerName,
          color: element.color,
          number: element.number,
        });
        document.querySelector(`.player-${element.number}-info p`).innerText =
          playerName;
      } else {
        botNumber += 1;
        players.push({
          name: `Bot${botNumber}`,
          color: element.color,
          number: element.number,
        });
        document.querySelector(
          `.player-${element.number}-info p`
        ).innerText = `Bot${botNumber}`;
      }
    }
  }
  removeMenu();
  randomStartGame("with-AI", numberOfPlayers);
}
function setPlayerName(name) {
  playerName = name;
}
function setPlayerColor(color) {
  playerColor = color;
  nextToPlayerNames();
}
function setPlayerNumber(amount) {
  numberOfPlayers = amount;
  displayColors();
}
function randomStartGame(playering, amount) {
  console.log(players);

  gameInfo["currentTurn"] = Math.floor(Math.random() * players.length);
  const randomStarter = players[gameInfo["currentTurn"]];
  const playerInfos = document.querySelectorAll(".player");
  for (let i = 0; i < playerInfos.length; i++) {
    let playerInfo = playerInfos[i];
    if (
      playerInfo.querySelector(".player-info p").innerText == randomStarter.name
    ) {
      if (playerInfo.querySelector(".player-cover").style.display == "block") {
        playerInfo.querySelector(".player-cover").style.display = "none";
      } else {
        playerInfo.querySelector(".player-cover").style.display = "none";
      }
      continue;
    }
    playerInfo.querySelector(".player-cover").style.display = "block";
  }
  if (randomStarter.name === playerName) {
    document.querySelector(".board-cover").style.display = "none";
  } else {
    document.querySelector(".board-cover").style.display = "block";
  }
  if (randomStarter.color1) {
    document.querySelector(`.${randomStarter.color1} .flash`).style.display =
      "block";
    document.querySelector(`.${randomStarter.color2} .flash`).style.display =
      "block";
  } else {
    document.querySelector(`.${randomStarter.color} .flash`).style.display =
      "block";
  }

  if (randomStarter.name == playerName) {
    if (randomStarter.color1) {
      document
        .querySelector(`.${randomStarter.color1} .flash`)
        .classList.add("flash2");
      document
        .querySelector(`.${randomStarter.color2} .flash`)
        .classList.add("flash2");
    } else {
      document
        .querySelector(`.${randomStarter.color} .flash`)
        .classList.add("flash2");
    }
    operating = false;
    let message = `You're starting the game`;
    const timeOut = message.length * 100;
    alertPlayer("block", message);
    setTimeout(() => {
      pausedMove = false;
      listenerAdded = true;
      roolDice(randomStarter);
      operating = true;
      clickRoolDice = () => {
        roolDice(randomStarter);
      };
      document
        .getElementById("rool-dice")
        .addEventListener("click", clickRoolDice);
    }, timeOut);

    console.log(`You're starting the game`);
    console.log(randomStarter);
  } else {
    const userPlayer = players.find((player) => player.name === playerName);
    if (userPlayer.hasOwnProperty("color2")) {
      document
        .querySelector(`.${userPlayer.color1} .flash`)
        .classList.add("flash2");
      document
        .querySelector(`.${userPlayer.color2} .flash`)
        .classList.add("flash2");
    } else {
      document
        .querySelector(`.${userPlayer.color} .flash`)
        .classList.add("flash2");
    }
    operating = true;
    let message = `${randomStarter.name} is starting the game`;
    const timeOut = message.length * 100;
    alertPlayer("block", message);
    const playerInfo = players.find((player) => player.name === playerName);
    setTimeout(() => {
      pausedMove = false;
      roolDice(randomStarter);
      listenerAdded = true;

      clickRoolDice = () => {
        roolDice(playerInfo);
      };
      document
        .getElementById("rool-dice")
        .addEventListener("click", clickRoolDice);
    }, timeOut);

    console.log(playerInfo);
  }
}
function removeMenu() {
        document.querySelector(".pop-up-cover").style.display = "none";
      }
      function displayMenu() {
        document.querySelector(".pop-up-cover").style.display = " flex";
      }
      function aiMove(bot) {
        operating = true;
        roolDice(bot);
      }