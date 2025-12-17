function assignBotColor(Colors) {
  const colors = ["blue", "red", "yellow", "green"];
  return colors.filter((s) => !Colors.includes(s));
}

function offlineVersion(version) {
  gameInfo["offline-mode"] = version;
  if (version === "PlayPass") {
    NumberOfPlayers();
  } else if (version === "Bot") {
    NumberOfPlayers();
  }
}
function startGame(playerName) {
  if (numberOfPlayers == 2) {
    let playerANumber = 0;
    players.push({
      name: playerName,
      color1: playerColor[0],
      color2: playerColor[1],
    });
    const botColors = assignBotColor(playerColor);
    console.log(botColors);

    players.push({
      name: `Bot`,
      color1: botColors[0],
      color2: botColors[1],
    });
    for (let i = 0; i < colorToPlayerNumber.length; i++) {
      const element = colorToPlayerNumber[i];
      if (element.color == playerColor[0]) {
        document.querySelector(`.player-${element.number}-info p`).innerText =
          playerName;
        continue;
      }
      if (element.color == playerColor[1]) {
        document.querySelector(`.player-${element.number}-info p`).innerText =
          playerName;
        continue;
      }
      if (element.color == botColors[0]) {
        document.querySelector(`.player-${element.number}-info p`).innerText =
          "Bot";
        continue;
      }
      if (element.color == botColors[1]) {
        document.querySelector(`.player-${element.number}-info p`).innerText =
          "Bot";
        continue;
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
        if (
          window.getComputedStyle(document.querySelector(".board-bg"))
            .flexDirection == "row"
        ) {
          if (element.number == 3) {
            document.querySelector(`.player-2-info p`).innerText = playerName;
          } else if (element.number == 2) {
            document.querySelector(`.player-3-info p`).innerText = playerName;
          } else {
            document.querySelector(
              `.player-${element.number}-info p`
            ).innerText = playerName;
          }
        } else {
          document.querySelector(`.player-${element.number}-info p`).innerText =
            playerName;
        }
      } else {
        botNumber += 1;
        players.push({
          name: `Bot${botNumber}`,
          color: element.color,
          number: element.number,
        });
        if (
          window.getComputedStyle(document.querySelector(".board-bg"))
            .flexDirection == "row"
        ) {
          if (element.number == 3) {
            document.querySelector(
              `.player-2-info p`
            ).innerText = `Bot${botNumber}`;
          } else if (element.number == 2) {
            document.querySelector(
              `.player-3-info p`
            ).innerText = `Bot${botNumber}`;
          } else {
            document.querySelector(
              `.player-${element.number}-info p`
            ).innerText = `Bot${botNumber}`;
          }
        } else {
          document.querySelector(
            `.player-${element.number}-info p`
          ).innerText = `Bot${botNumber}`;
        }
      }
    }
  }
  removeMenu();
  randomStartGame("with-AI", numberOfPlayers);
}
function randomStartGame(playering, amount) {
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
      if (randomStarter.hasOwnProperty("color2")) {
        playerTimer(
          [randomStarter.color1, randomStarter.color2],
          randomStarter
        );
      } else {
        playerTimer(randomStarter.color, randomStarter);
      }
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
  console.log(gameInfo);
  
}
function switchTurns(currentTurn, playAgain = false) {
  if (currentTurn.hasOwnProperty("color2")) {
    cancelTimer([currentTurn.color1, currentTurn.color2], currentTurn);
  } else {
    cancelTimer(currentTurn.color, currentTurn);
  }
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
            window.getComputedStyle(document.querySelector(".board-bg"))
              .flexDirection == "row"
          ) {
            if (nextPlayerInfo.color == "yellow") {
              if (
                playerInfos[2].querySelector(".player-cover").style.display ==
                "block"
              ) {
                playerInfos[2].querySelector(".player-cover").style.display =
                  "none";
              } else {
                playerInfos[2].querySelector(".player-cover").style.display =
                  "none";
              }
            } else if (nextPlayerInfo.color == "red") {
              if (
                playerInfos[1].querySelector(".player-cover").style.display ==
                "block"
              ) {
                playerInfos[1].querySelector(".player-cover").style.display =
                  "none";
              } else {
                playerInfos[1].querySelector(".player-cover").style.display =
                  "none";
              }
            } else {
              if (
                playerInfo.querySelector(".player-cover").style.display ==
                "block"
              ) {
                playerInfo.querySelector(".player-cover").style.display =
                  "none";
              } else {
                playerInfo.querySelector(".player-cover").style.display =
                  "none";
              }
            }
          } else {
            if (
              playerInfo.querySelector(".player-cover").style.display == "block"
            ) {
              playerInfo.querySelector(".player-cover").style.display = "none";
            } else {
              playerInfo.querySelector(".player-cover").style.display = "none";
            }
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
            window.getComputedStyle(document.querySelector(".board-bg"))
              .flexDirection == "row"
          ) {
            if (nextPlayerInfo.color == "yellow") {
              if (
                playerInfos[2].querySelector(".player-cover").style.display ==
                "block"
              ) {
                playerInfos[2].querySelector(".player-cover").style.display =
                  "none";
              } else {
                playerInfos[2].querySelector(".player-cover").style.display =
                  "none";
              }
            } else if (nextPlayerInfo.color == "red") {
              if (
                playerInfos[1].querySelector(".player-cover").style.display ==
                "block"
              ) {
                playerInfos[1].querySelector(".player-cover").style.display =
                  "none";
              } else {
                playerInfos[1].querySelector(".player-cover").style.display =
                  "none";
              }
            } else {
              if (
                playerInfo.querySelector(".player-cover").style.display ==
                "block"
              ) {
                playerInfo.querySelector(".player-cover").style.display =
                  "none";
              } else {
                playerInfo.querySelector(".player-cover").style.display =
                  "none";
              }
            }
          } else {
            if (
              playerInfo.querySelector(".player-cover").style.display == "block"
            ) {
              playerInfo.querySelector(".player-cover").style.display = "none";
            } else {
              playerInfo.querySelector(".player-cover").style.display = "none";
            }
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
        moduleConnections("aiMove", nextPlayerInfo);
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
        moduleConnections("aiMove", nextPlayerInfo);
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
        if (nextPlayerInfo.hasOwnProperty("color2")) {
          playerTimer(
            [nextPlayerInfo.color1, nextPlayerInfo.color2],
            nextPlayerInfo
          );
        } else {
          playerTimer(nextPlayerInfo.color, nextPlayerInfo);
        }
      }, timeOut);
    }
  }
}

function CheakBoxesLeft(color, number, pin) {
  const pinColor = pin.classList[1].split("-")[0];
  if (pin.parentElement.hasAttribute(`data-${pinColor}-step`)) {
    let currentStep = parseInt(
      pin.parentElement.getAttribute(`data-${pinColor}-step`)
    );
    if (currentStep + number > 57) {
      return false;
    } else if (currentStep + number == 57) {
      return "Goal";
    } else {
      return true;
    }
  } else {
    return true;
  }
}
function getPlayedPin(color) {
  if (Array.isArray(color)) {
    let boxes1 = document.querySelectorAll(`.box[data-${color[0]}-step]`);
    for (let i = 0; i < boxes1.length; i++) {
      if (
        boxes1[i].querySelector(".pin") &&
        boxes1[i]
          .querySelector(".pin")
          .classList.contains(`${color[0]}-bg-lighter`)
      ) {
        return boxes1[i];
      }
    }
    let boxes2 = document.querySelectorAll(`.box[data-${color[1]}-step]`);
    for (let i = 0; i < boxes2.length; i++) {
      if (
        boxes2[i].querySelector(".pin") &&
        boxes2[i]
          .querySelector(".pin")
          .classList.contains(`${color[1]}-bg-lighter`)
      ) {
        return boxes2[i];
      }
    }
  } else {
    let boxes = document.querySelectorAll(`.box[data-${color}-step]`);
    for (let i = 0; i < boxes.length; i++) {
      if (
        boxes[i].querySelector(".pin") &&
        boxes[i].querySelector(".pin").classList.contains(`${color}-bg-lighter`)
      ) {
        return boxes[i];
      }
    }
  }
}
function pinPlayed(color, alowedNumber = "") {
  let amountOfPins = 0;
  if (Array.isArray(color)) {
    let boxes1 = document.querySelectorAll(`.box[data-${color[0]}-step]`);
    let boxes2 = document.querySelectorAll(`.box[data-${color[1]}-step]`);
    for (let i = 0; i < boxes1.length; i++) {
      if (
        boxes1[i].querySelector(".pin") &&
        boxes1[i]
          .querySelector(".pin")
          .classList.contains(`${color[0]}-bg-lighter`)
      ) {
        if (boxes1[i].querySelectorAll(".pin").length > 1) {
          amountOfPins += boxes1[i].querySelectorAll(".pin").length;
        } else {
          amountOfPins += 1;
        }
      }
    }
    for (let i = 0; i < boxes2.length; i++) {
      if (
        boxes2[i].querySelector(".pin") &&
        boxes2[i]
          .querySelector(".pin")
          .classList.contains(`${color[1]}-bg-lighter`)
      ) {
        if (boxes2[i].querySelectorAll(".pin").length > 1) {
          amountOfPins += boxes2[i].querySelectorAll(".pin").length;
        } else {
          amountOfPins += 1;
        }
      }
    }
  } else {
    let boxes = document.querySelectorAll(`.box[data-${color}-step]`);
    for (let i = 0; i < boxes.length; i++) {
      if (
        boxes[i].querySelector(".pin") &&
        boxes[i].querySelector(".pin").classList.contains(`${color}-bg-lighter`)
      ) {
        if (boxes[i].querySelectorAll(".pin").length > 1) {
          amountOfPins += boxes[i].querySelectorAll(".pin").length;
        } else {
          amountOfPins += 1;
        }
      }
    }
  }
  if (alowedNumber == 1) {
    if (amountOfPins == 1) {
      return true;
    } else {
      return false;
    }
  } else {
    if (amountOfPins > 0) {
      return true;
    } else {
      return false;
    }
  }
}
function morePinsLeftHome(color) {
  if (Array.isArray(color)) {
    const pins1 = document.querySelectorAll(
      `.${color[0]} .pins .${color[0]}-bg-lighter`
    );
    const pins2 = document.querySelectorAll(
      `.${color[1]} .pins .${color[1]}-bg-lighter`
    );

    if (pins1.length > 0 || pins2.length > 0) {
      return true;
    } else {
      return false;
    }
  } else {
    const pins = document.querySelectorAll(
      `.${color} .pins .${color}-bg-lighter`
    );
    if (pins.length > 0) {
      return true;
    } else {
      return false;
    }
  }
}

function pickRandomPin(color) {
  let pins = [];
  if (Array.isArray(color)) {
    document.querySelectorAll(`.${color[0]} .pins .pin`).forEach((pin) => {
      pins.push(pin);
    });
    document.querySelectorAll(`.${color[1]} .pins .pin`).forEach((pin) => {
      pins.push(pin);
    });
  } else {
    document.querySelectorAll(`.${color} .pins .pin`).forEach((pin) => {
      pins.push(pin);
    });
  }
  if (pins.length > 0) {
    const randomPin = pins[Math.floor(Math.random() * pins.length)];
    return randomPin;
  } else {
    return false;
  }
}
function pickedPin(element, pickedColor, number, currentTurn, e) {
  if (currentTurn.hasOwnProperty("color2")) {
    cancelTimer([currentTurn.color1, currentTurn.color2], currentTurn);
  } else {
    cancelTimer(pickedColor, currentTurn);
  }
  operating = true;
  pausedMove = false;
  e.stopPropagation();
  const timeOut = 400 * number;
  const color = element.classList[1].split("-")[0];
  if (Array.isArray(pickedColor)) {
    document
      .querySelectorAll(`.${pickedColor[0]}-bg-lighter`)
      .forEach((element) => {
        element.classList.remove("hover-pin");
        element.removeEventListener("click", addClickEvent, {
          once: true,
        });
        console.log("removed Event listeener and hover pin class");
      });
    document
      .querySelectorAll(`.${pickedColor[1]}-bg-lighter`)
      .forEach((element) => {
        element.classList.remove("hover-pin");
        element.removeEventListener("click", addClickEvent, {
          once: true,
        });
        console.log("removed Event listeener and hover pin class");
      });
  } else {
    document.querySelectorAll(`.${color}-bg-lighter`).forEach((element) => {
      element.classList.remove("hover-pin");
      element.removeEventListener("click", addClickEvent, {
        once: true,
      });
      console.log("removed Event listeener and hover pin class");
    });
  }
  if (CheakBoxesLeft(pickedColor, number, element) == true) {
    if (number == 6) {
      alertPlayer("block", `${currentTurn.name} rools dice again`);
      tracker += 1;
      console.log(tracker);
      if (element.classList[2]) {
        console.log(element.parentElement);
        if (!element.parentElement.getAttribute(`data-${color}-step`)) {
          if (
            checkOpponentPin(
              pickedColor,
              document.querySelector(`.box[data-${color}-step="1"]`),
              false
            )
          ) {
            pinAnimation(
              currentTurn,
              element,
              element.parentElement,
              number,
              color,
              "move-out"
            );
            setTimeout(() => {
              operating = true;
              movePinHome(pickedColor, 0, currentTurn, element);
              resizePinForGoal(element, pickedColor, number, currentTurn);
            }, 700);
          } else {
            setTimeout(() => {
              adjustPinSize(
                pickedColor,
                null,
                document.querySelector(`.box[data-${color}-step="1"]`),
                element
              );
            }, 200);
            pinAnimation(
              currentTurn,
              element,
              element.parentElement,
              number,
              color,
              "move-out"
            );
            operating = true;
            setTimeout(() => {
              operating = true;
              switchTurns(currentTurn, true);
            }, 700);
          }
        } else {
          let currentColorStep = parseInt(
            element.parentElement.getAttribute(`data-${color}-step`)
          );
          console.log(
            "current Color Step: " + currentColorStep + ", color: " + color
          );
          if (
            checkOpponentPin(
              pickedColor,
              document.querySelector(
                `.box[data-${color}-step="${currentColorStep + number}"]`
              ),
              false
            )
          ) {
            pinAnimation(
              currentTurn,
              element,
              element.parentElement,
              number,
              color
            );
            setTimeout(() => {
              operating = true;
              movePinHome(
                pickedColor,
                currentColorStep + number - 1,
                currentTurn,
                element
              );
              resizePinForGoal(element, pickedColor, number, currentTurn);
            }, timeOut);
          } else {
            pinAnimation(
              currentTurn,
              element,
              element.parentElement,
              number,
              color
            );
            operating = true;
            setTimeout(() => {
              operating = true;
              switchTurns(currentTurn, true);
            }, timeOut);
          }
        }
      }
    } else {
      tracker = 0;
      console.log(tracker);
      let currentColorStep = parseInt(
        element.parentElement.getAttribute(`data-${color}-step`)
      );
      console.log(
        "current Color Step: " + currentColorStep + ", color: " + color
      );
      if (
        checkOpponentPin(
          pickedColor,
          document.querySelector(
            `.box[data-${color}-step="${currentColorStep + number}"]`
          ),
          false
        )
      ) {
        pinAnimation(
          currentTurn,
          element,
          element.parentElement,
          number,
          color
        );
        setTimeout(() => {
          operating = true;
          movePinHome(
            pickedColor,
            currentColorStep + number - 1,
            currentTurn,
            element
          );
          resizePinForGoal(element, pickedColor, number, currentTurn);
        }, timeOut);
      } else {
        pinAnimation(
          currentTurn,
          element,
          element.parentElement,
          number,
          color
        );
        operating = true;
        setTimeout(() => {
          operating = true;
          switchTurns(currentTurn, false);
        }, timeOut);
      }
    }
  } else if (CheakBoxesLeft(pickedColor, number, element) == false) {
    operating = true;
    if (number == 6) {
      switchTurns(currentTurn, true);
    } else {
      switchTurns(currentTurn, false);
    }
  } else if (CheakBoxesLeft(pickedColor, number, element) == "Goal") {
    pinAnimation(currentTurn, element, element.parentElement, number, color);
    setTimeout(() => {
      operating = true;
      resizePinForGoal(element, pickedColor, number, currentTurn);
    }, timeOut);
  }
}
function resizePinForGoal(element, color, number, turn) {
  let box = element.parentElement;
  element.remove();
  const playedColor = element.classList[1].split("-")[0];
  let winningPins;
  let losingPins;
  if (
    window.getComputedStyle(document.querySelector(".board-bg"))
      .flexDirection == "row"
  ) {
    if (playedColor == "red") {
      winningPins = document.querySelectorAll(
        `.winning-pins .win-${"yellow"}-pin`
      );
      losingPins = document.querySelectorAll(
        `.winning-pins .win-${"yellow"}-pin:not(.${"red"}-bg)`
      );
    } else if (playedColor == "yellow") {
      winningPins = document.querySelectorAll(
        `.winning-pins .win-${"red"}-pin`
      );
      losingPins = document.querySelectorAll(
        `.winning-pins .win-${"red"}-pin:not(.${"yellow"}-bg)`
      );
    } else {
      winningPins = document.querySelectorAll(
        `.winning-pins .win-${playedColor}-pin`
      );
      losingPins = document.querySelectorAll(
        `.winning-pins .win-${playedColor}-pin:not(.${playedColor}-bg)`
      );
    }
  } else {
    winningPins = document.querySelectorAll(
      `.winning-pins .win-${playedColor}-pin`
    );
    losingPins = document.querySelectorAll(
      `.winning-pins .win-${playedColor}-pin:not(.${playedColor}-bg)`
    );
  }
  if (Array.isArray(color)) {
    if (
      (document.querySelectorAll(`.winning-pins .${color[0]}-bg`).length == 3 &&
        document.querySelectorAll(`.winning-pins .${color[1]}-bg`).length ==
          4) ||
      (document.querySelectorAll(`.winning-pins .${color[0]}-bg`).length == 4 &&
        document.querySelectorAll(`.winning-pins .${color[1]}-bg`).length == 3)
    ) {
      playAgainPlayers = JSON.parse(JSON.stringify(players));
      declearWinner(turn);
      return;
    }
  } else {
    if (document.querySelectorAll(`.winning-pins .${color}-bg`).length == 3) {
      if (turn.color == "blue") {
        if (players.findIndex((player) => player.color === "red") >= 0) {
          gameInfo["currentTurn"] = `${players.findIndex(
            (player) => player.color === "red"
          )}`;
        } else {
          if (
            players.findIndex((player) => player.color === "red") >
            players.findIndex((player) => player.name === turn.name)
          ) {
            gameInfo["currentTurn"] = gameInfo["currentTurn"] - 1;
          } else {
            gameInfo["currentTurn"] = `${players.findIndex(
              (player) => player.color === "green"
            )}`;
          }
        }
      } else if (turn.color == "red") {
        if (players.findIndex((player) => player.color === "green") < 0) {
          if (
            players.findIndex((player) => player.color === "green") >
            players.findIndex((player) => player.name === turn.name)
          ) {
            gameInfo["currentTurn"] = gameInfo["currentTurn"] - 1;
          } else {
            gameInfo["currentTurn"] = `${players.findIndex(
              (player) => player.color === "yellow"
            )}`;
          }
        } else {
          gameInfo["currentTurn"] = `${players.findIndex(
            (player) => player.color === "green"
          )}`;
        }
      } else if (turn.color == "green") {
        gameInfo["currentTurn"] = `${players.findIndex(
          (player) => player.color === "yellow"
        )}`;
        if (
          players.findIndex((player) => player.color === "yellow") >
          players.findIndex((player) => player.name === turn.name)
        ) {
          gameInfo["currentTurn"] = gameInfo["currentTurn"] - 1;
        }
      } else if (turn.color == "yellow") {
        gameInfo["currentTurn"] = `${players.findIndex(
          (player) => player.color === "blue"
        )}`;
        if (
          players.findIndex((player) => player.color === "blue") >
          players.findIndex((player) => player.name === turn.name)
        ) {
          gameInfo["currentTurn"] = gameInfo["currentTurn"] - 1;
        }
      }
      if ("positions" in gameInfo) {
        console.log(gameInfo["positions"]);
        if (gameInfo["positions"].length == 0) {
          gameInfo["positions"].push({ name: turn.name, position: 1 });
        } else if (gameInfo["positions"].length < 4) {
          let formerPlayerScore =
            gameInfo["positions"][gameInfo["positions"].length - 1].position;
          if (gameInfo["positions"].length == 3) {
            gameInfo["positions"].push({
              name: turn.name,
              position: formerPlayerScore + 1,
            });
          } else {
            if (players.length === 2) {
              gameInfo["positions"].push({
                name: turn.name,
                position: formerPlayerScore + 1,
              });
              const lastPlayer = players.find(
                (player) => player.name !== turn.name
              );
              gameInfo["positions"].push({
                name: lastPlayer.name,
                position: 4,
              });
              declearWinner(turn);
              return;
            } else {
              gameInfo["positions"].push({
                name: turn.name,
                position: formerPlayerScore + 1,
              });
            }
          }
        } else if (gameInfo["positions"].length == 4) {
          console.log(gameInfo["positions"]);
        }
      } else {
        console.log(gameInfo["positions"]);
      }
      if (players.length === 4) {
        playAgainPlayers = JSON.parse(JSON.stringify(players));
      }
      console.log(turn);
      
      players = players.filter((player) => player.name !== turn.name);
      console.log(players);
      
      if (
        window.getComputedStyle(document.querySelector(".board-bg"))
          .flexDirection == "row"
      ) {
        if (playedColor == "red" || playedColor == "blue") {
          losingPins[losingPins.length - 1].classList.add(`${playedColor}-bg`);
        } else {
          for (let i = 0; i < winningPins.length; i++) {
            const element = winningPins[i];
            if (!element.classList.contains(`${playedColor}-bg`)) {
              element.classList.add(`${playedColor}-bg`);
              break;
            }
          }
        }
      } else {
        if (playedColor == "yellow" || playedColor == "blue") {
          losingPins[losingPins.length - 1].classList.add(`${playedColor}-bg`);
        } else {
          for (let i = 0; i < winningPins.length; i++) {
            const element = winningPins[i];
            if (!element.classList.contains(`${playedColor}-bg`)) {
              element.classList.add(`${playedColor}-bg`);
              break;
            }
          }
        }
      }
      if (box.classList.contains("box")) {
        if (box.querySelectorAll(".pin").length > 1) {
        }
      }
      document.querySelector(`.player-${turn.number}-cover`).style.display ==
        "block";
      document.querySelector(`.${turn.color}`).classList.add("removed-player");
      document.querySelector(`.${turn.color} .flash`).style.display = "none";
      if (players.length == 1) {
        declearWinner(turn);
        return;
      }
      switchTurns(players[gameInfo["currentTurn"]], true);
      return;
    }
  }
  if (
    window.getComputedStyle(document.querySelector(".board-bg"))
      .flexDirection == "row"
  ) {
    if (playedColor == "red" || playedColor == "blue") {
      losingPins[losingPins.length - 1].classList.add(`${playedColor}-bg`);
    } else {
      for (let i = 0; i < winningPins.length; i++) {
        const element = winningPins[i];
        if (!element.classList.contains(`${playedColor}-bg`)) {
          element.classList.add(`${playedColor}-bg`);
          break;
        }
      }
    }
  } else {
    if (playedColor == "yellow" || playedColor == "blue") {
      losingPins[losingPins.length - 1].classList.add(`${playedColor}-bg`);
    } else {
      for (let i = 0; i < winningPins.length; i++) {
        const element = winningPins[i];
        if (!element.classList.contains(`${playedColor}-bg`)) {
          element.classList.add(`${playedColor}-bg`);
          break;
        }
      }
    }
  }
  if (box.classList.contains("box")) {
    if (box.querySelectorAll(".pin").length > 1) {
    }
  }
  if (number == 6) {
    operating = true;
    switchTurns(turn, true);
  } else {
    operating = true;
    switchTurns(turn, false);
  }
  console.log(box);
  console.log(`data-${element.classList[1].split("-")[0]}-step`);
}
function playAgain(Players) {
  if(document
    .getElementById("play-again")){
      document
        .getElementById("play-again")
        .removeEventListener("click", clickPlayAgain);
    }
  console.log(Players);
  if (Players) {
    if (gameInfo["positions"].length > 0) {
      gameInfo["positions"] = [];
      players.length = 0;
      if (Array.isArray(Players)) {
        Players.forEach((player) => {
          players.push(player);
        });
      }
    }
    resetBoard();
    removeMenu();
    if (listenerAdded) {
      document
        .getElementById("rool-dice")
        .removeEventListener("click", clickRoolDice);
    }
    randomStartGame("with-Ai", numberOfPlayers);
  }
}
function resetBoard() {
  document.querySelectorAll(".board .pin").forEach((pin) => {
    pin.remove();
  });
  document.querySelectorAll(".win-pin").forEach((winPin) => {
    if (winPin.classList.length > 3) {
      Array.from(winPin.classList).forEach((cls, i) => {
        if (i > 2) {
          winPin.classList.remove(cls);
        }
      });
    }
  });
  document.querySelectorAll(".home").forEach((home) => {
    let firstPin = document.createElement("div");
    firstPin.classList.add(
      "pin",
      `${home.classList[0]}-bg-lighter`,
      `${home.classList[0]}-pin-1`,
      "pin-in-parent-1"
    );
    let secondPin = document.createElement("div");
    secondPin.classList.add(
      "pin",
      `${home.classList[0]}-bg-lighter`,
      `${home.classList[0]}-pin-2`,
      "pin-in-parent-2"
    );
    let thirdPin = document.createElement("div");
    thirdPin.classList.add(
      "pin",
      `${home.classList[0]}-bg-lighter`,
      `${home.classList[0]}-pin-3`,
      "pin-in-parent-3"
    );
    let forthPin = document.createElement("div");
    forthPin.classList.add(
      "pin",
      `${home.classList[0]}-bg-lighter`,
      `${home.classList[0]}-pin-4`,
      "pin-in-parent-4"
    );
    if (home.classList.contains("removed-player")) {
      home.classList.remove("removed-player");
    }
    home.querySelector(".pins").appendChild(firstPin);
    home.querySelector(".pins").appendChild(secondPin);
    home.querySelector(".pins").appendChild(thirdPin);
    home.querySelector(".pins").appendChild(forthPin);
  });
  document.querySelectorAll(".pin").forEach((element) => {
    element.style.height = `${document.querySelector(".box").clientHeight}px`;
    element.style.width = `${document.querySelector(".box").clientWidth}px`;
  });
  document.querySelectorAll(".player-cover").forEach((playerInfoCover) => {
    playerInfoCover.style.display = "none";
  });
  document.querySelector(".board-cover").style.display = "none";
  document.querySelectorAll(`.flash`).forEach((flash) => {
    flash.style.display = "none";
    if (flash.classList.contains("flash2")) {
      flash.classList.remove("flash2");
    }
  });
  document.querySelector(".board-cover").style.display = "none";
}
function resetPinSizes(color, currentBox, entryBox, playedPin) {
  if (entryBox) {
    if (!entryBox.querySelector(".pin")) {
      if (playedPin.classList.length > 4) {
        Array.from(playedPin.classList).forEach((cls, i) => {
          if (i > 4) {
            playedPin.classList.remove(cls);
          }
        });
      }
    }
  }
  console.log(currentBox);
  if (currentBox) {
    let pins = currentBox.querySelectorAll(".pin");
    if (playedPin) {
      let indexToRemove = Array.from(
        currentBox.querySelectorAll(".pin")
      ).indexOf(playedPin);
      pins = Array.from(currentBox.querySelectorAll(".pin")).filter(
        (_, index) => index !== indexToRemove
      );
    }
    let pinNumber = 1;
    console.log(pins);

    if (pins.length > 1) {
      for (let i = 0; i < pins.length; i++) {
        let pin = pins[i];
        if (pin.classList.length > 3) {
          Array.from(pin.classList).forEach((cls, index) => {
            if (index > 3) {
              pin.classList.remove(`${cls}`);
            }
          });
        }
        pin.style.width = `${currentBox.clientWidth / 2}px`;
        pin.style.height = `${currentBox.clientHeight / 2}px`;
        pin.classList.add(`pin-in-box-${pinNumber}`);
        console.log(`pin-in-box-${pinNumber}`);
        pinNumber += 1;
      }
    } else if (pins.length == 1) {
      console.log(playedPin);

      if (pins[0].classList.length > 4) {
        Array.from(pins[0].classList).forEach((cls, index) => {
          if (index > 3) {
            pins[0].classList.remove(`${cls}`);
          }
        });
      }
      pins[0].style.width = `${currentBox.clientWidth}px`;
      pins[0].style.height = `${currentBox.clientHeight}px`;
      if (playedPin) {
        if (playedPin.classList.length > 4) {
          Array.from(playedPin.classList).forEach((cls, index) => {
            if (index > 3) {
              playedPin.classList.remove(`${cls}`);
            }
          });
        }
        playedPin.style.width = `${currentBox.clientWidth}px`;
        playedPin.style.height = `${currentBox.clientHeight}px`;
      }
    }
  }
}
function adjustPinSize(colorArray, currentBox, entryBox, playedPin, timeOut) {
  let color;
  let color2;
  if (Array.isArray(colorArray)) {
    color = colorArray[0];
    color2 = colorArray[1];
  } else {
    color = colorArray;
    color2 = "";
  }
  if (entryBox) {
    if (currentBox) {
      if (currentBox.querySelector(".pin")) {
        if (currentBox.querySelectorAll(".pin").length == 2) {
          let index = Array.from(currentBox.querySelectorAll(".pin")).indexOf(
            playedPin
          );
          let pin;
          if (index == 0) {
            pin = currentBox.querySelectorAll(".pin")[1];
          } else if (index == 1) {
            pin = currentBox.querySelectorAll(".pin")[0];
          } else {
          }
          pin.style.width = `${currentBox.clientWidth}px`;
          pin.style.height = `${currentBox.clientHeight}px`;
          playedPin.style.width = `${currentBox.clientWidth}px`;
          playedPin.style.height = `${currentBox.clientHeight}px`;
          console.log("1 pin in current box");
        } else if (currentBox.querySelectorAll(".pin").length > 2) {
          resetPinSizes(color, currentBox, entryBox, playedPin);
          console.log("1 pin in current box 2");
        } else {
          Array.from(playedPin.classList).forEach((cls, i) => {
            if (i > 3) {
              playedPin.classList.remove(cls);
            }
          });
          console.log(currentBox.querySelectorAll(".pin").length);
        }
      }
    }
    if (entryBox.querySelector(".pin")) {
      let pins = entryBox.querySelectorAll(".pin");
      if (
        entryBox
          .querySelector(".pin")
          .classList.contains(`${color}-bg-lighter`) ||
        entryBox
          .querySelector(".pin")
          .classList.contains(`${color2}-bg-lighter`)
      ) {
        if (pins.length - 1 == 0) {
          if (playedPin.classList.length > 4) {
            Array.from(playedPin.classList).forEach((cls, i) => {
              if (i > 3) {
                playedPin.classList.remove(cls);
              }
            });
          }
          if (pins[0].classList.length > 4) {
            Array.from(pins[0].classList).forEach((cls, i) => {
              if (i > 3) {
                pins[0].classList.remove(cls);
              }
            });
          }

          console.log("pin number:");
          setTimeout(() => {
            pins[0].classList.add(`pin-in-box-1`);
            pins[0].style.width = `${entryBox.clientWidth / 2}px`;
            pins[0].style.height = `${entryBox.clientHeight / 2}px`;
            playedPin.classList.add(`pin-in-box-2`);
            playedPin.style.width = `${entryBox.clientWidth / 2}px`;
            playedPin.style.height = `${entryBox.clientHeight / 2}px`;
            console.log(timeOut);
          }, timeOut);
        } else if (pins.length - 1 > 0) {
          if (pins[pins.length - 1].classList.contains("pin-in-box-2")) {
            setTimeout(() => {
              for (let i = 0; i < pins.length; i++) {
                let pin = pins[i];
                pin.style.width = `${entryBox.clientWidth / 2}px`;
                pin.style.height = `${entryBox.clientHeight / 2}px`;
              }
              playedPin.classList.add(`pin-in-box-3`);
              playedPin.style.width = `${entryBox.clientWidth / 2}px`;
              playedPin.style.height = `${entryBox.clientHeight / 2}px`;
            }, timeOut);
          } else if (pins[pins.length - 1].classList.contains("pin-in-box-3")) {
            setTimeout(() => {
              for (let i = 0; i < pins.length; i++) {
                let pin = pins[i];
                pin.style.width = `${entryBox.clientWidth / 2}px`;
                pin.style.height = `${entryBox.clientHeight / 2}px`;
              }
              playedPin.classList.add(`pin-in-box-4`);
              playedPin.style.width = `${entryBox.clientWidth / 2}px`;
              playedPin.style.height = `${entryBox.clientHeight / 2}px`;
            }, timeOut);
          }
        } else {
          console.log("0 pin in current box");
          playedPin.style.width = `${entryBox.clientWidth}px`;
          playedPin.style.height = `${entryBox.clientHeight}px`;
          if (playedPin.classList.length > 3) {
            Array.from(playedPin.classList).forEach((cls, i) => {
              if (i > 3) {
                playedPin.classList.remove(cls);
              }
            });
          }
        }
      }
    } else {
      console.log("0 pin in current box");
      playedPin.style.width = `${entryBox.clientWidth}px`;
      playedPin.style.height = `${entryBox.clientHeight}px`;
      if (playedPin.classList.length > 3) {
        Array.from(playedPin.classList).forEach((cls, i) => {
          if (i > 3) {
            playedPin.classList.remove(cls);
          }
        });
      }
    }
  }
}
function movePinHome(color, number, currentTurn, playedPin) {
  let pinColor;
  let pinColor2;
  if (Array.isArray(color)) {
    pinColor = color[0];
    pinColor2 = color[1];
  } else {
    pinColor = color;
    pinColor2 = "";
  }
  let entryBox = document.querySelector(
    `.box[data-${playedPin.classList[1].split("-")[0]}-step="${number + 1}"]`
  );
  if (entryBox) {
    if (entryBox.querySelector(".pin")) {
      if (entryBox.querySelectorAll(".pin").length <= 2) {
        let entryBoxPin = entryBox.querySelector(".pin");
        if (
          entryBoxPin.classList[1] != `${pinColor}-bg-lighter` &&
          entryBoxPin.classList[1] != `${pinColor2}-bg-lighter`
        ) {
          let opponentColor = entryBoxPin.classList[1].split("-")[0];
          Array.from(entryBoxPin.classList).forEach((cls, i) => {
            if (i > 3) {
              entryBoxPin.classList.remove(cls);
            }
          });
          entryBoxPin.style.width = `${entryBox.clientWidth}px`;
          entryBoxPin.style.height = `${entryBox.clientHeight}px`;
          console.log(entryBox.clientHeight);
          if (
            entryBoxPin.classList.contains(
              `pin-in-box-${entryBoxPin.classList[2].split("-")[2]}`
            )
          ) {
            entryBoxPin.classList.remove(
              `pin-in-box-${entryBoxPin.classList[2].split("-")[2]}`
            );
          }
          pinAnimation(
            currentTurn,
            entryBoxPin,
            entryBoxPin.parentElement,
            number,
            opponentColor,
            "move-home"
          );
        }
      } else {
        let pins = entryBox.querySelectorAll(".pin");
        for (let i = 0; i < pins.length; i++) {
          let pin = pins[i];
          if (
            pin.classList[1] != `${pinColor}-bg-lighter` &&
            pin.classList[1] != `${pinColor2}-bg-lighter`
          ) {
            let movingPin = pin;
            Array.from(movingPin.classList).forEach((cls, i) => {
              if (i > 3) {
                movingPin.classList.remove(cls);
              }
            });
            if (
              movingPin.classList.contains(
                `pin-in-box-${movingPin.classList[2].split("-")[2]}`
              )
            ) {
              movingPin.classList.remove(
                `pin-in-box-${movingPin.classList[2].split("-")[2]}`
              );
            }
            let opponentColor = movingPin.classList[1].split("-")[0];
            movingPin.style.height = `${entryBox.clientHeight}px`;
            movingPin.style.width = `${entryBox.clientWidth}px`;
            pinAnimation(
              currentTurn,
              movingPin,
              movingPin.parentElement,
              number,
              opponentColor,
              "move-home"
            );
            setTimeout(() => {
              resetPinSizes(opponentColor, entryBox, null, playedPin);
            }, 200);
            return;
          }
        }
      }
    }
  }
  resetPinSizes(color, entryBox, null, playedPin);
}
function checkOpponentPin(color, entryBox, currentBox) {
  if (entryBox) {
    if (entryBox.querySelector(".pin")) {
      if (entryBox.querySelectorAll(".pin").length > 1) {
        let pins = entryBox.querySelectorAll(".pin");
        for (let i = 0; i < pins.length; i++) {
          let pin = pins[i];
          if (Array.isArray(color)) {
            if (
              pin.classList[1] != `${color[0]}-bg-lighter` &&
              pin.classList[1] != `${color[1]}-bg-lighter`
            ) {
              return true;
            } else {
              if (i == pins.length - 1) {
                return false;
              }
            }
          } else {
            if (pin.classList[1] != `${color}-bg-lighter`) {
              return true;
            } else {
              if (i == pins.length - 1) {
                return false;
              }
            }
          }
        }
      } else {
        let entryBoxPin = entryBox.querySelector(".pin");
        if (Array.isArray(color)) {
          if (
            entryBoxPin.classList[1] != `${color[0]}-bg-lighter` &&
            entryBoxPin.classList[1] != `${color[1]}-bg-lighter`
          ) {
            return true;
          } else {
            return false;
          }
        } else {
          if (entryBoxPin.classList[1] != `${color}-bg-lighter`) {
            return true;
          } else {
            return false;
          }
        }
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function randomPinPick(color, number, pinBoxes, turn) {
  console.log(pinBoxes);
  const timeOut = (200 + 200) * number;
  const randomBox = pinBoxes[Math.floor(Math.random() * pinBoxes.length)];
  let randomBoxColorStep;
  let randomPinColor;
  if (Array.isArray(color)) {
    if (
      randomBox
        .querySelector(".pin")
        .classList.contains(`${color[0]}-bg-lighter`) &&
      !randomBox
        .querySelector(".pin")
        .classList.contains(`${color[1]}-bg-lighter`)
    ) {
      randomBoxColorStep = parseInt(
        randomBox.getAttribute(`data-${color[0]}-step`)
      );
      randomPinColor = color[0];
    } else if (
      !randomBox
        .querySelector(".pin")
        .classList.contains(`${color[0]}-bg-lighter`) &&
      randomBox
        .querySelector(".pin")
        .classList.contains(`${color[1]}-bg-lighter`)
    ) {
      randomBoxColorStep = parseInt(
        randomBox.getAttribute(`data-${color[1]}-step`)
      );
      randomPinColor = color[1];
    }
  } else {
    randomBoxColorStep = parseInt(randomBox.getAttribute(`data-${color}-step`));
    randomPinColor = color;
  }
  if (randomBoxColorStep + number <= 56) {
    if (
      checkOpponentPin(
        color,
        document.querySelector(
          `.box[data-${randomPinColor}-step="${randomBoxColorStep + number}"]`
        ),
        false
      )
    ) {
      pinAnimation(
        turn,
        randomBox.querySelector(`.${randomPinColor}-bg-lighter`),
        randomBox,
        number,
        randomPinColor
      );
      setTimeout(() => {
        operating = true;
        movePinHome(
          color,
          randomBoxColorStep + number - 1,
          turn,
          randomBox.querySelector(`.${randomPinColor}-bg-lighter`)
        );
        resizePinForGoal(
          randomBox.querySelector(`.${randomPinColor}-bg-lighter`),
          color,
          number,
          turn
        );
      }, timeOut);
    } else {
      pinAnimation(
        turn,
        randomBox.querySelector(`.${randomPinColor}-bg-lighter`),
        randomBox,
        number,
        randomPinColor
      );
      operating = true;
      setTimeout(() => {
        operating = true;
        if (number === 6) {
          switchTurns(turn, true);
        } else {
          switchTurns(turn, false);
        }
      }, timeOut);
    }
  } else {
    operating = true;
    if (number === 6) {
      switchTurns(turn, true);
    } else {
      switchTurns(turn, false);
    }
  }
}
function roolDice(turn) {
  let color;
  console.log(turn);

  if (turn.hasOwnProperty("color1")) {
    color = [turn.color1, turn.color2];
  } else {
    color = turn.color;
  }
  console.log(turn);
  if (
    (operating == false && turn.name == playerName && pausedMove == false) ||
    (operating == true && turn.name != playerName && pausedMove == false)
  ) {
    console.log("good");

    const cube = document.getElementById("rool-dice");
    if (cube.style.display == "none" || !cube.style.display) {
      cube.style.display = "block";
    }
    operating = true;
    if (resetTransformation == 0) {
      resetTransformation = 360 * 4;
    } else {
      resetTransformation = 0;
    }
    console.log(resetTransformation);
    let number = Math.floor(Math.random() * 6) + 1;
    setTimeout(() => {
      diceAnimation(cube, number);
    }, 100);
    if (turn.name == playerName) {
      if (adjustTimer(turn, color, number) == true) {
        setTimeout(() => {
          if (
            document.getElementById("rool-dice").getAttribute("data-turn") ==
            turn.name
          ) {
            gameAlgorithm(number, color, turn);
            document
              .getElementById("rool-dice")
              .setAttribute("data-turn", turn.name);
          } else {
            if (
              turn.name != playerName ||
              document.getElementById("rool-dice").getAttribute("data-turn") !=
                playerName
            ) {
              gameAlgorithm(number, color, turn);
            }
          }
        }, 1700);
      }
    }else{
      setTimeout(() => {
        if (
          document.getElementById("rool-dice").getAttribute("data-turn") ==
          turn.name
        ) {
          gameAlgorithm(number, color, turn);
          document
            .getElementById("rool-dice")
            .setAttribute("data-turn", turn.name);
        } else {
          if (
            turn.name != playerName ||
            document.getElementById("rool-dice").getAttribute("data-turn") !=
              playerName
          ) {
            gameAlgorithm(number, color, turn);
          }
        }
      }, 1700);
    }
  } else {
    console.log("bad");
    console.log(pausedMove);
    console.log(operating);
    return;
  }
}
