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
