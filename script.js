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
    return {displayBoard, returnGameBoard, setSquare};
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
        
    }
})
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
    GameBoard.displayBoard();
}
const game = (function (){
    const playerX = playerFactory('x');
    const playerO = playerFactory('o');
    let xTurn = true;
    function whosTurn(){
    if(xTurn){
            return 'x';
        }
        else{
            return 'o';
        }
    } 
    function play(x,y){
    console.log(`${whosTurn()}'s turn.`);
        if(xTurn){
            playTurnAndDisplay(playerX, x, y);
        }
        else{
            playTurnAndDisplay(playerO, x, y);
        }
        xTurn = !xTurn;
        if(checkForWin()){
            console.log(`${whosTurn()} won!`)
        }
    }
    return{play};
})();

game.play();
game.play();
