let GameBoard = (function (){
    let _ticTacToeArray = [[null, null, null]
                    ,[null, null, null]
                    ,[null, null, null]]; //null means nothing added yet
    
    displayBoard = () =>{
        for (row in _ticTacToeArray){
            console.log(_ticTacToeArray[row]);
        }
        console.log();
    } 
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
// let DisplayController = (function(){
//     let gameBoard = GameBoard.returnGameBoard();
// })

function playerFactory(symbol){
    playTurn = (x, y) => {
        if(GameBoard.setSquare(symbol, x,y)){
            console.log("Square set");
        }
        else{
            console.log("Square already taken");
        }
    }
    return {playTurn}
}
function play(playerObject, xPos, yPos){
    playerObject.playTurn(xPos, yPos);
    GameBoard.displayBoard();
}
let game = function (){
    const playerX = playerFactory('x');
    const playerO = playerFactory('o');
    play(playerX, 1, 1);
    play(playerO, 0, 1);
}
game();