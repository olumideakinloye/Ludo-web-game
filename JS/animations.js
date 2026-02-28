function diceAnimation(cube, number) {
  if(gameInfo["play-state"] === "play"){
    if (number == 1) {
      cube.classList.add("scale-dice");
      cube.querySelector(".dice").classList.add("scale-dice-face");
      cube.style.transform = `rotateX(${resetTransformation + 0}deg) rotateY(${
        resetTransformation + 0
      }deg)`;
      setTimeout(() => {
        cube.classList.remove("scale-dice");
        cube.querySelector(".dice").classList.remove("scale-dice-face");
      }, 1700);
    } else if (number == 2) {
      cube.classList.add("scale-dice");
      cube.style.transform = `rotateX(${resetTransformation + 0}deg) rotateY(${
        resetTransformation - 90
      }deg)`;
      setTimeout(() => {
        cube.classList.remove("scale-dice");
        cube.querySelector(".dice").classList.remove("scale-dice-face");
      }, 1700);
    } else if (number == 3) {
      cube.classList.add("scale-dice");
      cube.style.transform = `rotateX(${resetTransformation - 90}deg) rotateY(${
        resetTransformation + 0
      }deg)`;
      setTimeout(() => {
        cube.classList.remove("scale-dice");
        cube.querySelector(".dice").classList.remove("scale-dice-face");
      }, 1700);
    } else if (number == 4) {
      cube.classList.add("scale-dice");
      cube.style.transform = `rotateX(${resetTransformation + 90}deg) rotateY(${
        resetTransformation + 0
      }deg)`;
      setTimeout(() => {
        cube.classList.remove("scale-dice");
        cube.querySelector(".dice").classList.remove("scale-dice-face");
      }, 1700);
    } else if (number == 5) {
      cube.classList.add("scale-dice");
      cube.style.transform = `rotateX(${resetTransformation + 0}deg) rotateY(${
        resetTransformation + 90
      }deg)`;
      setTimeout(() => {
        cube.classList.remove("scale-dice");
        cube.querySelector(".dice").classList.remove("scale-dice-face");
      }, 1700);
    } else if (number == 6) {
      cube.classList.add("scale-dice");
      cube.style.transform = `rotateX(${resetTransformation + 0}deg) rotateY(${
        resetTransformation + 180
      }deg)`;
      setTimeout(() => {
        cube.classList.remove("scale-dice");
        cube.querySelector(".dice").classList.remove("scale-dice-face");
      }, 1700);
    }
  }
}
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function pinAnimation(turn, pin, box, number, color, operation) {
  if(gameInfo["play-state"] === "play"){
    if (operation === "move-home") {
      pin.classList.add("shrink");
      await delay(200);
      let stoppingBox = document.querySelector(
        `.box[data-${pin.classList[1].split("-")[0]}-step="${
          parseInt(
            pin.parentElement.getAttribute(
              `data-${pin.classList[1].split("-")[0]}-step`
            )
          ) + number
        }"]`
      );
      document.querySelector(`.${color} .pins`).append(pin);
      console.log(stoppingBox);
      resetPinSizes(color, stoppingBox, null, pin);
      pin.classList.remove("shrink");
      pin.classList.add("grow");
      await delay(200);
  
      pin.classList.remove("grow");
  
    } else if (operation === "move-out") {
      pin.classList.add("shrink");
      await delay(200);
      document.querySelector(`.box[data-${color}-step="1"]`).append(pin);
      pin.classList.remove("shrink");
      pin.classList.add("grow");
      await delay(200);
  
      pin.classList.remove("grow");
  
    } else {
      let playerColor = color;
      if (turn.hasOwnProperty("color2")) {
        playerColor = [turn.color1, turn.color2];
      }
      const currentColorStep = parseInt(box.getAttribute(`data-${color}-step`));
      if (currentColorStep + number > 56) {
        for (let i = 1; i < number; i++) {
          await delay(200);
          adjustPinSize(
            playerColor,
            pin.parentElement,
            document.querySelector(
              `.box[data-${color}-step="${currentColorStep + i}"]`
            ),
            pin
          );
          document
            .querySelector(`.box[data-${color}-step="${currentColorStep + i}"]`)
            .append(pin);
          await delay(200);
  
        }
      } else {
        for (let i = 1; i <= number; i++) {
          await delay(200);
          adjustPinSize(
            playerColor,
            pin.parentElement,
            document.querySelector(
              `.box[data-${color}-step="${currentColorStep + i}"]`
            ),
            pin
          );
          document
            .querySelector(`.box[data-${color}-step="${currentColorStep + i}"]`)
            .append(pin);
          await delay(200);
        }
      }
    }
  }
}
