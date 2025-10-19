function moduleConnections(moduleName, argument){
(async () => {
  const file = await import(`./ludoModules.js`);
  if(moduleName === "setPlayerNumber"){
    file.setPlayerNumber(argument);
  }else if(moduleName === "setPlayerColor"){
    file.setPlayerColor(argument);
  }else if(moduleName === "setPlayerName"){
    file.setPlayerName(argument);
  }else if(moduleName === "aiMove"){
    file.aiMove(argument);
  }
    })();
}