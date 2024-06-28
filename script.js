let GameBoard = (function (){
    let _ticTacToeArray = [[null, null, null]
                    ,[null, null, null]
                    ,[null, null, null]]; //null means nothing added yet
    
    returnGameBoard = ()=>{
       return _ticTacToeArray;
    };
    setSquare = (symbol, xPos, yPos) => {
        if (_ticTacToeArray[xPos][yPos] == null){
            _ticTacToeArray[xPos][yPos] = symbol;
            return true;
        }
        else{
            return false;
        }
    }
    return {returnGameBoard, setSquare};
    })();

DisplayController = (function(){
    _ticTacToeArray = GameBoard.returnGameBoard(); 
    displayBoard = () =>{
        for (row in _ticTacToeArray){
            console.log(_ticTacToeArray[row]);
        }
        console.log();
    }
    askForCrds = () =>{
       let input = prompt("x,y:")
       let x,y;
       [x,y] = input.split(",");
       return [x,y];
        
    }
    return{displayBoard, askForCrds};
})();
function playerFactory(symbol){
    playTurn = (x, y) => {{y}
        if(GameBoard.setSquare(symbol, x,y)){
            console.log("Square set");
        }
        else{
            console.log("Square already taken");
        }
    }
    return {playTurn}
}
//Play turn without a object in mind.
function playTurnAndDisplay(playerObject, xPos, yPos){
    playerObject.playTurn(xPos, yPos);
    DisplayController.displayBoard();
}
const game = (function (){
    const playerX = playerFactory('x');
    const playerO = playerFactory('o');
    let xTurn = true;
    let gameOver = false;
    function getGameOver(){
        return gameOver
    }
    function whosTurn(){
    if(xTurn){
            return 'x';
        }
        else{
            return 'o';
        }
    } 
    function play(){
        console.log(`${whosTurn()}'s turn.`);
        [x,y] = DisplayController.askForCrds();
        if(xTurn){
            playTurnAndDisplay(playerX, x, y);
        }
        else{
            playTurnAndDisplay(playerO, x, y);
        }
        xTurn = !xTurn;
        if(checkForWin()){
            gameOver = true;
            console.log(`${whosTurn()} won!`)
        }
    }
    return{getGameOver, play};
})();

while(!game.getGameOver()){
    game.play();
}
