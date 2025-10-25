function gameAlgorithm(number, color, turn) {
  if (operating == true) {
    const timeOut = (200 + 200) * number;
    if (!pinPlayed(color)) {
      if (number == 6) {
        tracker += 1;
        if (turn && turn.name != playerName) {
          pausedMove = false;
          let randomPin = pickRandomPin(color);
          if (randomPin) {
            if (
              checkOpponentPin(
                color,
                document.querySelector(
                  `.box[data-${randomPin.classList[1].split("-")[0]}-step="1"]`
                ),
                false
              )
            ) {
              let eliminatingColor = checkOpponentPin(
                color,
                document.querySelector(
                  `.box[data-${randomPin.classList[1].split("-")[0]}-step="1"]`
                ),
                false
              );
              pinAnimation(
                turn,
                randomPin,
                randomPin.parentElement,
                number,
                randomPin.classList[1].split("-")[0],
                "move-out"
              );
              operating = true;

              setTimeout(() => {
                movePinHome(eliminatingColor, 0, turn, randomPin);
                resizePinForGoal(randomPin, eliminatingColor, number, turn);
              }, 700);
            } else {
              console.log("new entry");
              pinAnimation(
                turn,
                randomPin,
                randomPin.parentElement,
                number,
                randomPin.classList[1].split("-")[0],
                "move-out"
              );
              operating = true;
              setTimeout(() => {
                randomPin.classList.add("pin-in-box");
                operating = true;
                switchTurns(turn, true);
              }, 700);
            }
          }
        } else {
          operating = true;
          addClickEvent = (event) => {
            pickedPin(event.currentTarget, color, number, turn, event);
          };
          if (Array.isArray(color)) {
            pausedMove = true;
            document
              .querySelectorAll(`.${color[0]}-bg-lighter`)
              .forEach((element) => {
                element.classList.add("hover-pin");
                element.addEventListener("click", addClickEvent, {
                  once: true,
                });
              });
            document
              .querySelectorAll(`.${color[1]}-bg-lighter`)
              .forEach((element) => {
                element.classList.add("hover-pin");
                element.addEventListener("click", addClickEvent, {
                  once: true,
                });
              });
          } else {
            console.log("no color array");
            cancelTimer();
            let pin = pickRandomPin(color);
            if (!pin.parentElement.getAttribute(`data-${color}-step`)) {
              if (
                checkOpponentPin(
                  color,
                  document.querySelector(`.box[data-${color}-step="1"]`),
                  false
                )
              ) {
                pinAnimation(
                  turn,
                  pin,
                  pin.parentElement,
                  number,
                  color,
                  "move-out"
                );
                setTimeout(() => {
                  operating = true;
                  movePinHome(color, 0, turn, pin);
                  resizePinForGoal(pin, color, number, turn);
                  // let stoppingBox = document.querySelector(`.box[data-${pin.classList[1].split("-")[0]}-step="${parseInt(pin.parentElement.getAttribute(`data-${pin.classList[1].split("-")[0]}-step`)) + number}"]`);
                  // console.log(stoppingBox);

                  // resetPinSizes(color, stoppingBox, mull, null)
                }, 700);
              } else {
                pinAnimation(
                  turn,
                  pin,
                  pin.parentElement,
                  number,
                  color,
                  "move-out"
                );
                operating = true;
                setTimeout(() => {
                  pin.classList.add("pin-in-box");
                  movePinHome(color, 0, turn, pin);

                  operating = true;
                  switchTurns(turn, true);
                }, 700);
              }
            }
          }
        }
      } else if (number < 6) {
        if (turn && turn.name != playerName) {
          // operating = false;
          switchTurns(turn, false);
        } else {
          operating = true;
          switchTurns(turn, false);
        }
      }
    } else if (pinPlayed(color)) {
      if (number == 6) {
        tracker += 1;
        if (turn) {
          if (turn.name != playerName) {
            let randomPin = pickRandomPin(color);
            if (randomPin) {
              if (
                checkOpponentPin(
                  color,
                  document.querySelector(
                    `.box[data-${
                      randomPin.classList[1].split("-")[0]
                    }-step="1"]`
                  ),
                  false
                )
              ) {
                pinAnimation(
                  turn,
                  randomPin,
                  randomPin.parentElement,
                  number,
                  randomPin.classList[1].split("-")[0],
                  "move-out"
                );
                setTimeout(() => {
                  operating = true;
                  movePinHome(color, 0, turn, randomPin);
                  resizePinForGoal(randomPin, color, number, turn);
                  // let stoppingBox = document.querySelector(`.box[data-${randomPin.classList[1].split("-")[0]}-step="${parseInt(randomPin.parentElement.getAttribute(`data-${randomPin.classList[1].split("-")[0]}-step`)) + number}"]`);
                  // console.log(stoppingBox);

                  // resetPinSizes(color, stoppingBox, null, null)
                }, 400);
              } else {
                // movePinHome(color, 0, turn, randomPin);
                adjustPinSize(
                  color,
                  null,
                  document.querySelector(
                    `.box[data-${
                      randomPin.classList[1].split("-")[0]
                    }-step="1"]`
                  ),
                  randomPin,
                  200
                );
                pinAnimation(
                  turn,
                  randomPin,
                  randomPin.parentElement,
                  number,
                  randomPin.classList[1].split("-")[0],
                  "move-out"
                );
                operating = true;
                setTimeout(() => {
                  randomPin.classList.add("pin-in-box");
                  operating = true;
                  switchTurns(turn, true);
                }, 700);
              }
            } else {
              pausedMove = false;
              aiAlgorithm(number, color, turn);
            }
          } else {
            if (!morePinsLeftHome(color) && pinPlayed(color, 1)) {
              const lastBox = getPlayedPin(color);
              let lastPin = lastBox.querySelector(".pin");
              let currentColorStep = parseInt(
                lastBox.getAttribute(
                  `data-${lastPin.classList[1].split("-")[0]}-step`
                )
              );
              // if(Array.isArray(color)){
              //   currentColorStep
              // }
              if (CheakBoxesLeft(color, number, lastPin) === true) {
                if (
                  checkOpponentPin(
                    color,
                    document.querySelector(
                      `.box[data-${lastPin.classList[1].split("-")[0]}-step="${
                        currentColorStep + number
                      }"]`
                    ),
                    false
                  )
                ) {
                  cancelTimer();
                  pinAnimation(
                    turn,
                    lastPin,
                    lastPin.parentElement,
                    number,
                    lastPin.classList[1].split("-")[0]
                  );
                  setTimeout(() => {
                    operating = true;
                    movePinHome(
                      color,
                      currentColorStep + number - 1,
                      turn,
                      lastPin
                    );
                    resizePinForGoal(lastPin, color, number, turn);
                    // let stoppingBox = document.querySelector(`.box[data-${lastPin.classList[1].split("-")[0]}-step="${parseInt(lastPin.parentElement.getAttribute(`data-${lastPin.classList[1].split("-")[0]}-step`)) + number}"]`);
                    // console.log(stoppingBox);

                    // resetPinSizes(color, stoppingBox, null, null)
                  }, timeOut);
                } else {
                  cancelTimer();
                  pinAnimation(
                    turn,
                    lastPin,
                    lastPin.parentElement,
                    number,
                    lastPin.classList[1].split("-")[0]
                  );
                  operating = true;
                  setTimeout(() => {
                    operating = true;
                    switchTurns(turn, true);
                  }, timeOut);
                }
              } else if (CheakBoxesLeft(color, number, lastPin) === "Goal") {
                cancelTimer();
                pinAnimation(
                  turn,
                  lastPin,
                  lastPin.parentElement,
                  number,
                  lastPin.classList[1].split("-")[0]
                );
                setTimeout(() => {
                  operating = true;
                  resizePinForGoal(lastPin, color, number, turn);
                }, timeOut);
              } else {
                operating = true;
                switchTurns(turn, true);
              }
            } else {
              pausedMove = true;
              operating = true;
              addClickEvent = (event) => {
                pickedPin(event.currentTarget, color, number, turn, event);
              };
              if (Array.isArray(color)) {
                document
                  .querySelectorAll(`.${color[0]}-bg-lighter`)
                  .forEach((element) => {
                    element.classList.add("hover-pin");
                    element.addEventListener("click", addClickEvent, {
                      once: true,
                    });
                  });
                document
                  .querySelectorAll(`.${color[1]}-bg-lighter`)
                  .forEach((element) => {
                    element.classList.add("hover-pin");
                    element.addEventListener("click", addClickEvent, {
                      once: true,
                    });
                  });
              } else {
                document
                  .querySelectorAll(`.${color}-bg-lighter`)
                  .forEach((element2) => {
                    element2.classList.add("hover-pin");
                    element2.addEventListener("click", addClickEvent, {
                      once: true,
                    });
                  });
              }
              // switchTurns(turn, true);
            }
          }
        }
      } else if (number < 6) {
        if (turn && turn.name != playerName) {
          pausedMove = false;
          console.log(number);

          aiAlgorithm(number, color, turn);
          // switchTurns(turn, false);
        } else {
          console.log(pausedMove);

          if (pinPlayed(color, 1)) {
            let box = getPlayedPin(color);
            console.log(box);

            let pin = box.querySelector(".pin");
            let currentColorStep = parseInt(
              box.getAttribute(`data-${pin.classList[1].split("-")[0]}-step`)
            );
            if (
              checkOpponentPin(
                color,
                document.querySelector(
                  `.box[data-${pin.classList[1].split("-")[0]}-step="${
                    currentColorStep + number
                  }"]`
                ),
                false
              )
            ) {
              cancelTimer();
              pinAnimation(
                turn,
                pin,
                pin.parentElement,
                number,
                pin.classList[1].split("-")[0]
              );
              setTimeout(() => {
                operating = true;
                movePinHome(color, currentColorStep + number - 1, turn, pin);
                resizePinForGoal(pin, color, number, turn);
                // let stoppingBox = document.querySelector(`.box[data-${pin.classList[1].split("-")[0]}-step="${parseInt(pin.parentElement.getAttribute(`data-${pin.classList[1].split("-")[0]}-step`)) + number}"]`);
                // console.log(stoppingBox);

                // resetPinSizes(color, stoppingBox, null, null)
              }, timeOut);
            } else {
              if (CheakBoxesLeft(color, number, pin) === true) {
                cancelTimer();
                pinAnimation(
                  turn,
                  pin,
                  pin.parentElement,
                  number,
                  pin.classList[1].split("-")[0]
                );
                operating = true;
                setTimeout(() => {
                  operating = true;
                  switchTurns(turn, false);
                }, timeOut);
              } else if (CheakBoxesLeft(color, number, pin) === "Goal") {
                cancelTimer();
                pinAnimation(
                  turn,
                  pin,
                  pin.parentElement,
                  number,
                  pin.classList[1].split("-")[0]
                );
                setTimeout(() => {
                  operating = true;
                  resizePinForGoal(pin, color, number, turn);
                }, timeOut);
              } else {
                operating = true;
                switchTurns(turn, false);
              }
            }
          } else {
            pausedMove = true;
            operating = true;
            addClickEvent = (event) => {
              pickedPin(event.currentTarget, color, number, turn, event);
            };
            if (Array.isArray(color)) {
              document
                .querySelectorAll(`.box .${color[0]}-bg-lighter`)
                .forEach((element) => {
                  element.classList.add("hover-pin");
                  element.addEventListener("click", addClickEvent, {
                    once: true,
                  });
                });

              document
                .querySelectorAll(`.box .${color[1]}-bg-lighter`)
                .forEach((element) => {
                  element.classList.add("hover-pin");
                  element.addEventListener("click", addClickEvent, {
                    once: true,
                  });
                });
            } else {
              document
                .querySelectorAll(`.box .${color}-bg-lighter`)
                .forEach((element) => {
                  element.classList.add("hover-pin");
                  element.addEventListener("click", addClickEvent, {
                    once: true,
                  });
                });
            }
          }
        }
      }
    }
  }
}
function aiAlgorithm(number, color, turn) {
  let pinBoxes = [];
  let randomPick = false;
  const timeOut = (200 + 200) * number;
  const pins = [];
  const boxes = document.querySelectorAll(`.box`);
  for (let i = 0; i < boxes.length; i++) {
    let box = boxes[i];
    if (
      box.querySelectorAll(".pin").length < 2 &&
      box.querySelectorAll(".pin").length > 0
    ) {
      let pin = box.querySelector(".pin");
      if (Array.isArray(color)) {
        if (
          pin.classList.contains(`${color[0]}-bg-lighter`) ||
          pin.classList.contains(`${color[1]}-bg-lighter`)
        ) {
          let currentColorStep;
          let pinColor;
          if (
            pin.classList.contains(`${color[0]}-bg-lighter`) &&
            !pin.classList.contains(`${color[1]}-bg-lighter`)
          ) {
            pinColor = color[0];
            currentColorStep = parseInt(
              box.getAttribute(`data-${color[0]}-step`)
            );
          } else if (
            !pin.classList.contains(`${color[0]}-bg-lighter`) &&
            pin.classList.contains(`${color[1]}-bg-lighter`)
          ) {
            pinColor = color[1];

            currentColorStep = parseInt(
              box.getAttribute(`data-${color[1]}-step`)
            );
          } else {
            currentColorStep = 0;
          }
          const boxPin = box.querySelector(".pin");
          const entryBox = document.querySelector(
            `.box[data-${pinColor}-step="${currentColorStep + number}"]`
          );
          if (CheakBoxesLeft(color, number, boxPin) == true) {
            if (checkOpponentPin(color, entryBox, false)) {
              pinAnimation(
                turn,
                boxPin,
                box,
                number,
                boxPin.classList[1].split("-")[0]
              );
              setTimeout(() => {
                operating = true;
                movePinHome(color, currentColorStep + number - 1, turn, boxPin);
                resizePinForGoal(boxPin, color, number, turn);
              }, timeOut);
              randomPick = false;
              return;
            } else {
              pinBoxes.push(box);
              randomPick = true;
            }
          } else if (CheakBoxesLeft(color, number, boxPin) == "Goal") {
            pinAnimation(
              turn,
              boxPin,
              box,
              number,
              boxPin.classList[1].split("-")[0]
            );
            setTimeout(() => {
              operating = true;
              resizePinForGoal(boxPin, color, number, turn);
            }, timeOut);
            randomPick = false;
            return;
          } else {
            operating = true;
          }
        }
      } else {
        if (pin.classList.contains(`${color}-bg-lighter`)) {
          const boxPin = box.querySelector(".pin");
          const currentColorStep = parseInt(
            box.getAttribute(`data-${color}-step`)
          );
          const entryBox = document.querySelector(
            `.box[data-${color}-step="${currentColorStep + number}"]`
          );
          if (CheakBoxesLeft(color, number, boxPin) == true) {
            if (checkOpponentPin(color, entryBox, false)) {
              pinAnimation(
                turn,
                boxPin,
                box,
                number,
                boxPin.classList[1].split("-")[0]
              );
              setTimeout(() => {
                operating = true;
                movePinHome(color, currentColorStep + number - 1, turn, boxPin);
                resizePinForGoal(boxPin, color, number, turn);
              }, timeOut);
              randomPick = false;
              return;
            } else {
              pinBoxes.push(box);
              randomPick = true;
            }
          } else if (CheakBoxesLeft(color, number, boxPin) == "Goal") {
            pinAnimation(
              turn,
              boxPin,
              box,
              number,
              boxPin.classList[1].split("-")[0]
            );
            setTimeout(() => {
              operating = true;
              resizePinForGoal(boxPin, color, number, turn);
            }, timeOut);
            randomPick = false;
            return;
          } else {
            operating = true;
          }
        }
      }
    } else if (box.querySelectorAll(".pin").length >= 2) {
      const pins = box.querySelectorAll(".pin");
      for (let i = 0; i < pins.length; i++) {
        let pin = pins[i];
        if (Array.isArray(color)) {
          if (
            pin.classList.contains(`${color[0]}-bg-lighter`) ||
            pin.classList.contains(`${color[1]}-bg-lighter`)
          ) {
            let currentColorStep;
            let pinColor;
            if (
              pin.classList.contains(`${color[0]}-bg-lighter`) &&
              !pin.classList.contains(`${color[1]}-bg-lighter`)
            ) {
              pinColor = color[0];
              currentColorStep = parseInt(
                box.getAttribute(`data-${color[0]}-step`)
              );
            } else if (
              !pin.classList.contains(`${color[0]}-bg-lighter`) &&
              pin.classList.contains(`${color[1]}-bg-lighter`)
            ) {
              pinColor = color[1];

              currentColorStep = parseInt(
                box.getAttribute(`data-${color[1]}-step`)
              );
            } else {
              currentColorStep = 0;
            }
            const entryBox = document.querySelector(
              `.box[data-${pinColor}-step="${currentColorStep + number}"]`
            );
            if (CheakBoxesLeft(color, number, pin) == true) {
              if (checkOpponentPin(color, entryBox, false)) {
                pinAnimation(
                  turn,
                  pin,
                  box,
                  number,
                  pin.classList[1].split("-")[0]
                );
                setTimeout(() => {
                  operating = true;
                  movePinHome(color, currentColorStep + number - 1, turn, pin);
                  resizePinForGoal(pin, color, number, turn);
                }, timeOut);
                randomPick = false;
                return;
              } else {
                randomPick = true;
                pinBoxes.push(box);
                break;
              }
            } else if (CheakBoxesLeft(color, number, pin) == "Goal") {
              pinAnimation(
                turn,
                pin,
                box,
                number,
                pin.classList[1].split("-")[0]
              );
              setTimeout(() => {
                operating = true;
                resizePinForGoal(pin, color, number, turn);
              }, timeOut);
              randomPick = false;
              return;
            } else {
              operating = true;
            }
          }
        } else {
          if (pin.classList.contains(`${color}-bg-lighter`)) {
            const pin = box.querySelector(".pin");
            const currentColorStep = parseInt(
              box.getAttribute(`data-${color}-step`)
            );
            const entryBox = document.querySelector(
              `.box[data-${color}-step="${currentColorStep + number}"]`
            );
            if (CheakBoxesLeft(color, number, pin) == true) {
              if (checkOpponentPin(color, entryBox, false)) {
                pinAnimation(
                  turn,
                  pin,
                  box,
                  number,
                  pin.classList[1].split("-")[0]
                );
                setTimeout(() => {
                  operating = true;
                  movePinHome(color, currentColorStep + number - 1, turn, pin);
                  resizePinForGoal(pin, color, number, turn);
                }, timeOut);
                randomPick = false;
                return;
              } else {
                pinBoxes.push(box);
                randomPick = true;
                break;
              }
            } else if (CheakBoxesLeft(color, number, pin) == "Goal") {
              pinAnimation(
                turn,
                pin,
                box,
                number,
                pin.classList[1].split("-")[0]
              );
              setTimeout(() => {
                operating = true;
                resizePinForGoal(pin, color, number, turn);
              }, timeOut);
              randomPick = false;
              return;
            } else {
              operating = true;
            }
          }
        }
      }
    }
  }
  if (randomPick && pinBoxes.length > 0) {
    randomPinPick(color, number, pinBoxes, turn);
  } else {
    operating = true;
    if (number === 6) {
      switchTurns(turn, true);
    } else {
      switchTurns(turn, false);
    }
  }
}
function latePlayerAlgorithm(number, color, turn) {
  if (pinPlayed(color)) {
    //-----------------Pin exists outside the home-----------------//
    if (pinPlayed(color, "1")) {
      //------------------Only one pin exists outside the home--------------//
      if (number == 6) {
      } else {
      }
    } else {
      //--More than one pin exists outside the home therefore pick random pin to move outside or around the outside of the the home--//
      let boxes = [];
      if(Array.isArray(color)){
        document.querySelectorAll(`.box:has(.${color[0]}-bg-lighter)`).forEach((box)=>{
          boxes.push(box)
        })
        document.querySelectorAll(`.box:has(.${color[1]}-bg-lighter)`).forEach((box)=>{
          boxes.push(box)
        })
      }else{
        document.querySelectorAll(`.box:has(.${color}-bg-lighter)`).forEach((box)=>{
          boxes.push(box)
        })
      }
      if (morePinsLeftHome(color)) {
        //-There are more pins in the home so bring new pin outside home or move random pin from ouside the home-//
        if (number == 6) {
        } else {
        }
      } else {
        //-There are no more pins in the home so pick random pin outside home to move-//
      }
    }
  } else {
    // --------------No pin exists outside the home--------------//
    if (Array.isArray(color)) {
      //-------Loop through the color array for two player game to move outside the home-------//
      for (let i = 0; i < color.length; i++) {
        const Color = color[i];
      }
    } else {
      //-------Only one color in for player game to move outside the home-------//
    }
  }
}
