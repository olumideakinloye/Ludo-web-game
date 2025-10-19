export function setPlayerColor(color) {
  if (numberOfPlayers == 4) {
    playerColor = color;
  } else {
    playerColor = color.split("-");
  }
  playerNames();
}
export function setPlayerName(name) {
  playerName = name;
}
export function setPlayerNumber(amount) {
  numberOfPlayers = amount;
  displayColors();
}
export function aiMove(bot) {
  operating = true;
  roolDice(bot);
}
