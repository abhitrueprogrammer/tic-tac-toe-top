const GameBoard = (function (){
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
    checkEveryElementSameInArray = (arr) =>{
        return arr.every((value, index, arr)=> value === arr[0]);
    }
    checkForWin = ()=>{
        for(row of _ticTacToeArray){
            if(row[0] === null){
                continue;
            }
            const everyRowSame = checkEveryElementSameInArray(row); 
            if(everyRowSame){
                return true;
            }
        }
        for(let i = 0; i < _ticTacToeArray.length ;i++ ){
            const column = []
            for(let j = 0; j <_ticTacToeArray.length ; j++){
                column.push(_ticTacToeArray[j][i]);
            }
            if(column[0] === null){
                continue;
            }
            const everyColumnSame = checkEveryElementSameInArray(column);
            if(everyColumnSame){
                return true;
            }

        }
    }
    return {checkForWin, returnGameBoard, setSquare};
    })();

const DisplayController = (function(){
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
    //Play turn without a object in mind.
    function playTurnAndDisplay(playerObject, xPos, yPos){
        playerObject.playTurn(xPos, yPos);
        DisplayController.displayBoard();
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
        if(GameBoard.checkForWin()){
            gameOver = true;
            console.log(`${whosTurn()} won!`)
        }
        xTurn = !xTurn;
    }
    return{getGameOver, play};
})();

while(!game.getGameOver()){
    game.play();
}
