let gameInfo = [];
let listenerAdded = false;
gameInfo["positions"] = [];
let roolDiceTimer = 0;
let playerName = "";
let playerColor = "";
let numberOfPlayers = "";
let pausedMove = false;
let players = [];
let playAgainPlayers;
let tracker = 0;
let addClickEvent;
let operating = false;
let resetTransformation = 0;
let clickRoolDice;
const colorToPlayerNumber = [
  { color: "green", number: 1 },
  { color: "yellow", number: 2 },
  { color: "red", number: 3 },
  { color: "blue", number: 4 },
];
let initFlexDirection = window.getComputedStyle(
  document.querySelector(".board-bg")
).flexDirection;
let timeoutId;
let initiatedtime;
const adjustTimer = (turn, color, number) => {
  let timeOut;
  if (initiatedtime != undefined) {
    const timeLeft = 10000 - Math.abs(initiatedtime - Date.now());
    console.log(`Time left: ${timeLeft}`);
    if (timeLeft < 1700) {
      clearTimeout(timeoutId);
      timeOut = 10000 + (1700 - timeLeft);
      console.log(`Timeout: ${timeOut}`);
      console.log(`Timeout in seconds: ${timeOut / 1000}s`);
      if (turn.hasOwnProperty("color2")) {
        const color = [turn.color1, turn.color2];
        for (let i = 0; i < color.length; i++) {
          const Color = color[i];
          document
            .querySelector(`.${Color}`)
            .style.setProperty(
              "--after-transition",
              `width linear ${timeOut / 1000}s`
            );
          setTimeout(() => {
            document
              .querySelector(`.${Color}`)
              .style.removeProperty("--after-transition");
          }, timeLeft);
        }
      } else {
        document
          .querySelector(`.${turn.color}`)
          .style.setProperty(
            "--after-transition",
            `width linear ${timeOut / 1000}s`
          );
        setTimeout(() => {
          document
            .querySelector(`.${turn.color}`)
            .style.removeProperty("--after-transition");
        }, timeLeft);
      }
      
      timeoutId = setTimeout(() => {
        latePlayerAlgorithm(number, color, turn)
        switchTurns(turn, false);
      }, 1700);
    }else{
      return true
    }
  }else{
    return true
  }
};
const switchTurnsTimeout = (turn) => {
  timeoutId = setTimeout(() => {
    switchTurns(turn, false);
  }, 10000);
};
