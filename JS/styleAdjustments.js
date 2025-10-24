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
  const player2InfoScore = document.querySelector(
    ".player-2-info .winning-pins"
  );
  const temp1 = player2InfoName.innerText;
  const temp2 = player2InfoScore.innerHTML;
  const player3InfoName = document.querySelector(".player-3-info p");
  const player3InfoScore = document.querySelector(
    ".player-3-info .winning-pins"
  );
  player2InfoName.innerText = player3InfoName.innerText;
  player2InfoScore.innerHTML = player3InfoScore.innerHTML;
  Array.from(player2InfoScore.children)
    .reverse()
    .forEach((pin) => {
      player2InfoScore.appendChild(pin);
    });
  player3InfoName.innerText = temp1;
  player3InfoScore.innerHTML = temp2;

  Array.from(player3InfoScore.children)
    .reverse()
    .forEach((pin) => {
      player3InfoScore.appendChild(pin);
    });
}
function playerTimer(color, currentTurn) {
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
  switchTurnsTimeout(currentTurn);
}
function cancelTimer() {
  document.querySelectorAll(".home").forEach((home) => {
    home.style.setProperty("--after-opacity", "0");
    home.style.setProperty("--after-transition", "none");
    home.style.setProperty("--after-width", "0%");
    setTimeout(() => {
      home.style.removeProperty("--after-transition");
    }, 50);
  });
  clearTimeout(timeoutId);
}
