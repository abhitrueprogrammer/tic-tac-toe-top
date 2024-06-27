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
        }
    }
    return {displayBoard, returnGameBoard, setSquare};
    })();
// let DisplayController = (function(){
//     let gameBoard = GameBoard.returnGameBoard();
// })
GameBoard.displayBoard();
GameBoard.setSquare("x", 1, 1);
GameBoard.displayBoard();