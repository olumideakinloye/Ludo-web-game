window.addEventListener("resize", () => {
  let box = document.querySelector(".box");
  document.querySelectorAll(".home .pin").forEach((pin) => {
    pin.style.height = `${box.clientHeight}px`;
    pin.style.width = `${box.clientWidth}px`;
  });
  document.querySelectorAll(".player-game-info").forEach((playerInfo) => {
    playerInfo.querySelectorAll(".pin").forEach((pin) => {
      pin.style.height = `${box.clientHeight}px`;
      pin.style.width = `${box.clientWidth}px`;
    });
  });
  for (let i = 0; i < document.querySelectorAll(".box").length; i++) {
    const box = document.querySelectorAll(".box")[i];
    if (box.querySelector(".pin")) {
      console.log("good");

      if (box.querySelectorAll(".pin").length > 1) {
        box.querySelectorAll(".pin").forEach((pin) => {
          pin.style.height = `${box.clientHeight / 2}px`;
          pin.style.width = `${box.clientWidth / 2}px`;
        });
      } else {
        box.querySelector(".pin").style.height = `${box.clientHeight}px`;
        box.querySelector(".pin").style.width = `${box.clientWidth}px`;
      }
    } else {
      continue;
    }
  }
  if (
    window.getComputedStyle(document.querySelector(".board-bg"))
      .flexDirection == "column" &&
    initFlexDirection == "row"
  ) {
    initFlexDirection = window.getComputedStyle(
      document.querySelector(".board-bg")
    ).flexDirection;
    transferScores("column");
  } else if (
    window.getComputedStyle(document.querySelector(".board-bg"))
      .flexDirection == "row" &&
    initFlexDirection == "column"
  ) {
    initFlexDirection = window.getComputedStyle(
      document.querySelector(".board-bg")
    ).flexDirection;

    transferScores("row");
  }
});
window.addEventListener("load", () => {
  document.querySelectorAll(".pin").forEach((element) => {
    element.style.height = `${document.querySelector(".box").clientHeight}px`;
    element.style.width = `${document.querySelector(".box").clientWidth}px`;
  });
});
function transferScores(changedFlexDirection) {
  const player2InfoName = document.querySelector(".player-2-info p");
  const player2InfoScore = document.querySelectorAll(
    ".player-2-info .winning-pins .win-pin"
  );
  const temp1 = player2InfoName.innerText;
  const player3InfoName = document.querySelector(".player-3-info p");
  const player3InfoScore = document.querySelectorAll(
    ".player-3-info .winning-pins .win-pin"
  );
  player2InfoName.innerText = player3InfoName.innerText;
  player2InfoScore.innerHTML = player3InfoScore.innerHTML;
  player3InfoName.innerText = temp1;
  if (changedFlexDirection == "row") {
    for (let i = 0; i < player2InfoScore.length; i++) {
      const winPin = player2InfoScore[i];
      if (winPin.classList.contains("yellow-bg")) {
        winPin.classList.remove("yellow-bg");
        document
          .querySelectorAll(".player-3-info .winning-pins .win-pin")
          [player2InfoScore.length - (i + 1)].classList.add("yellow-bg");
      }
    }
    for (let i = 0; i < player3InfoScore.length; i++) {
      const winPin = player3InfoScore[i];
      if (winPin.classList.contains("red-bg")) {
        winPin.classList.remove("red-bg");
        document
          .querySelectorAll(".player-2-info .winning-pins .win-pin")
          [player3InfoScore.length - (i + 1)].classList.add("red-bg");
      }
    }
  } else if (changedFlexDirection == "column") {
    for (let i = 0; i < player2InfoScore.length; i++) {
      const winPin = player2InfoScore[i];
      if (winPin.classList.contains("red-bg")) {
        winPin.classList.remove("red-bg");
        document
          .querySelectorAll(".player-3-info .winning-pins .win-pin")
          [player2InfoScore.length - (i + 1)].classList.add("red-bg");
      }
    }
    for (let i = 0; i < player3InfoScore.length; i++) {
      const winPin = player3InfoScore[i];
      if (winPin.classList.contains("yellow-bg")) {
        winPin.classList.remove("yellow-bg");
        document
          .querySelectorAll(".player-2-info .winning-pins .win-pin")
          [player3InfoScore.length - (i + 1)].classList.add("yellow-bg");
      }
    }
  }
}
function playerTimer(color, currentTurn) {
  initiatedtime = Date.now();
  if (gameInfo["mode"] == "offline" && gameInfo["offline-mode"] == "Bot") {
    if (currentTurn.name == playerName) {
      if (Array.isArray(color)) {
        for (let i = 0; i < color.length; i++) {
          const Color = color[i];
          document
            .querySelector(`.${Color}`)
            .style.setProperty("--after-opacity", "1");
          document
            .querySelector(`.${Color}`)
            .style.setProperty("--after-width", "100%");
        }
      } else {
        document
          .querySelector(`.${color}`)
          .style.setProperty("--after-opacity", "1");
        document
          .querySelector(`.${color}`)
          .style.setProperty("--after-width", "100%");
      }
    }
  } else {
    if (Array.isArray(color)) {
      for (let i = 0; i < color.length; i++) {
        const Color = color[i];
        document
          .querySelector(`.${Color}`)
          .style.setProperty("--after-opacity", "1");
        document
          .querySelector(`.${Color}`)
          .style.setProperty("--after-width", "100%");
      }
    } else {
      document
        .querySelector(`.${color}`)
        .style.setProperty("--after-opacity", "1");
      document
        .querySelector(`.${color}`)
        .style.setProperty("--after-width", "100%");
    }
  }
  switchTurnsTimeout(currentTurn);
}
function cancelTimer(color, turn) {
  if (gameInfo["mode"] == "offline" && gameInfo["offline-mode"] == "Bot") {
    const thisplayer = turn;
    if (thisplayer.hasOwnProperty("color2")) {
      const home1 = document.querySelector(`.${thisplayer.color1}`);
      const home2 = document.querySelector(`.${thisplayer.color2}`);
      if (home1.classList.contains("home")) {
        home1.style.setProperty("--after-opacity", "0");
        home1.style.setProperty("--after-transition", "none");
        home1.style.setProperty("--after-width", "0%");
        setTimeout(() => {
          home1.style.removeProperty("--after-transition");
        }, 50);
      }
      if (home2.classList.contains("home")) {
        home2.style.setProperty("--after-opacity", "0");
        home2.style.setProperty("--after-transition", "none");
        home2.style.setProperty("--after-width", "0%");
        setTimeout(() => {
          home2.style.removeProperty("--after-transition");
        }, 50);
      }
    } else {
      const home = document.querySelector(`.${thisplayer.color}`);
      if (home.classList.contains("home")) {
        home.style.setProperty("--after-opacity", "0");
        home.style.setProperty("--after-transition", "none");
        home.style.setProperty("--after-width", "0%");
        setTimeout(() => {
          home.style.removeProperty("--after-transition");
        }, 50);
      }
    }
  } else {
    document.querySelectorAll(".home").forEach((home) => {
      home.style.setProperty("--after-opacity", "0");
      home.style.setProperty("--after-transition", "none");
      home.style.setProperty("--after-width", "0%");
      setTimeout(() => {
        home.style.removeProperty("--after-transition");
      }, 50);
    });
  }
  if (color) {
    operating = true;
    pausedMove = false;
    if (Array.isArray(color)) {
      document
        .querySelectorAll(`.${color[0]}-bg-lighter`)
        .forEach((element) => {
          element.classList.remove("hover-pin");
          element.removeEventListener("click", addClickEvent, {
            once: true,
          });
          console.log("removed Event listeener and hover pin class");
        });
      document
        .querySelectorAll(`.${color[1]}-bg-lighter`)
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
  }
  clearTimeout(timeoutId);
}
