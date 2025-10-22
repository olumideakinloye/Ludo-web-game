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
  // let newSize;
  // let pin;
  // let diff;
  // if (document.querySelector(".home .pin")) {
  //   pin = document.querySelector(".home .pin");
  // } else {
  //   for (let i = 0; i < document.querySelectorAll(".box").length; i++) {
  //     const box = document.querySelectorAll(".box")[i];
  //     if (box.querySelectorAll(".pin").length < 2) {
  //       pin = box.querySelector(".pin");
  //       break;
  //     } else {
  //       continue;
  //     }
  //   }
  // }
  // newSize = Math.abs(
  //   document.querySelector(".box").clientHeight - pin.clientHeight
  // );
  // if (document.querySelector(".box").clientHeight > pin.clientHeight) {
  //   diff = "greater";
  // } else if (document.querySelector(".box").clientHeight < pin.clientHeight) {
  //   diff = "less";
  // }
  // document.querySelectorAll(".pin").forEach((element) => {
  //   console.log(
  //     `Box width: ${document.querySelector(".box").clientWidth}, Pin width: ${
  //       element.clientWidth
  //     }`
  //   );

  //   if (diff == "greater") {
  //     element.style.height = `${newSize + element.clientHeight}px`;
  //     element.style.width = `${newSize + element.clientWidth}px`;
  //   } else {
  //     element.style.height = `${element.clientHeight - newSize}px`;
  //     element.style.width = `${element.clientWidth - newSize}px`;
  //   }
  // });
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
  const player2InfoScore = document.querySelector(".player-2-info .winning-pins");
  const temp1 = player2InfoName.innerText;
  const temp2 = player2InfoScore.innerHTML;
  const player3InfoName = document.querySelector(".player-3-info p");
  const player3InfoScore = document.querySelector(".player-3-info .winning-pins");
  player2InfoName.innerText = player3InfoName.innerText
  player2InfoScore.innerHTML = player3InfoScore.innerHTML
  player3InfoName.innerText = temp1
  player3InfoScore.innerHTML = temp2
  // player
  if(changedFlexDirection == "column"){

  // }else if(changedFlexDirection == "row"){
  //   player3InfoName.innerHTML = player2InfoName.innerHTML
  //   player3InfoScore.innerHTML = player2InfoScore.innerHTML
  //   player3InfoName.innerHTML = temp1
  //   player3InfoScore.innerHTML = temp2
  }
}
