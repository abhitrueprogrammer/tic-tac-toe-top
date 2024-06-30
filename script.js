const GameBoard = (function (){
    // let _ticTacToeArray = [[null, null, null]
    //                 ,[null, null, null]
    //                 ,[null, null, null]]; //null means nothing added yet
    const emptySquare = '';
    let _ticTacToeArray = [['x', '', 'o']
                    ,['o', 'o', 'x']
                    ,['x', 'x', 'x']]; //null means nothing added yet
    
    // let _ticTacToeArray = [['o', '', '']
    //                 ,['', '', '']
    //                 ,['', '', '']]; //null means nothing added yet
    rowLength = _ticTacToeArray.length;
    getDimention = ()=>{
        return rowLength;
    }
    returnGameBoard = ()=>{
       return _ticTacToeArray;
    };
    setSquare = (symbol, xPos, yPos) => {
        if (_ticTacToeArray[xPos][yPos] === GameBoard.emptySquare){
            _ticTacToeArray[xPos][yPos] = symbol;
            return true;
        }
        else{
            return false;
        }
    }
    getSquare = (i, j) =>{
        return _ticTacToeArray[i][j];
    }
    checkEveryElementSameInArrayWithoutBeingNull = (arr) =>{
        if(arr[0] === GameBoard.emptySquare){
            return false;  
        }
        return arr.every((value, index, arr)=> value === arr[0]);
    }
    checkForDraw = () =>{
            return !_ticTacToeArray.some(row => row.some(element => element === GameBoard.emptySquare));
    }
    checkForWin = ()=>{
        //row check
        for(row of _ticTacToeArray){
            if(row[0] === GameBoard.emptySquare){
                continue;
            }
            const everyRowSame = checkEveryElementSameInArrayWithoutBeingNull(row); 
            if(everyRowSame){
                return true;
            }
        }
        
        //column check
        for(let i = 0; i < _ticTacToeArray.length ;i++){
            const column = []
            for(let j = 0; j <_ticTacToeArray.length ; j++){
                column.push(_ticTacToeArray[j][i]);
            }
            if(column[0] === GameBoard.emptySquare){
                continue;
            }
            const everyColumnSame = checkEveryElementSameInArrayWithoutBeingNull(column);
            if(everyColumnSame){
                return true;
            }
        }
        //diagonal check
        const diagonal = []
        for(let i = 0; i < _ticTacToeArray.length; i++){
            diagonal.push(_ticTacToeArray[i][i]);
        }
        const everyDiagonalSameii = checkEveryElementSameInArrayWithoutBeingNull(diagonal);
        if(everyDiagonalSameii){
            return true;
        }
        diagonal.length = 0;
        for(let i = 0, j = _ticTacToeArray.length-1; i < _ticTacToeArray.length; i++, j--){
            diagonal.push(_ticTacToeArray[i][j]);
        }
        const everyDiagonalSameij = checkEveryElementSameInArrayWithoutBeingNull(diagonal);
        if(everyDiagonalSameij){
            return true;
        }
    }
    return {emptySquare, checkForWin, returnGameBoard, getSquare, setSquare, checkForDraw, getDimention};
    })();

const DisplayControllerConsole = (function(){
    _ticTacToeArray = GameBoard.returnGameBoard(); 
    displayBoard = () =>{
        for (row in _ticTacToeArray){
            console.log(_ticTacToeArray[row]);
        }
        console.log();
    }
    askForCrds = () =>{
        do{
            let input = prompt("x,y:")
            let x,y;
            [x,y] = input.split(",");
            x = x.trim();
            y = y.trim();
            return [x,y];
        }
        while(isNaN(x) || isNaN(y) || x < 0 || x > GameBoard.getDimention() - 1 || y < 0 || y > GameBoard.getDimention -1); 
        //find way to display "ERROR WRONG USER INPUT" if fails. 
    }
    return{displayBoard, askForCrds};
})();
const DisplayController = (function(){
    _ticTacToeArray = GameBoard.returnGameBoard();
    const gameBoardHTML = document.querySelector('.game-board')
    createBoard = () =>{
        for(let i = 0; i < GameBoard.getDimention(); i++){
            const row = document.createElement('div');
            row.classList.toggle(`row`);
            for(let j = 0; j < GameBoard.getDimention(); j++) 
            {
                const cell = document.createElement('div');
                cell.id = `c${i}${j}`;
                cell.classList.toggle('cell');
                row.appendChild(cell);
                gameBoardHTML.appendChild(row);
            }
            
        }
    }
    updateBoard = () => {
        for(let i = 0; i < GameBoard.getDimention(); i++){
            for(let j = 0; j < GameBoard.getDimention(); j++){
                const cell = document.querySelector(`#c${i}${j}`);
                cell.textContent = _ticTacToeArray[i][j];
            }
        }
    }
    updateCell = (i,j) => {
        const cell = document.querySelector(`#c${i}${j}`);
        cell.textContent = _ticTacToeArray[i][j];
    }
    getIJFromCellName = (cellName) =>{
        return cellName.slice(1).split("");
    }
    return {updateCell, updateBoard, getIJFromCellName};
})();
function playerFactory(symbol){
    playTurn = (x, y) => {
        if(GameBoard.setSquare(symbol, x,y)){
            console.log("Square set");
            return true
        }
        else{
            console.log("Square already taken");
            return false
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
    //Play turn with specified object
    function playTurnAndDisplay(playerObject, xPos, yPos){
        playerObject.playTurn(xPos, yPos);
        DisplayControllerConsole.displayBoard();
        DisplayController.updateCell(xPos, yPos);
    }
    function play(x, y){
        console.log(`${whosTurn()}'s turn.`);
        // Comment to be deleted: [x,y] = DisplayControllerConsole.askForCrds();
        
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
        if(GameBoard.checkForDraw()){
            gameOver = true;
            console.log(`tie!`);
        }
        xTurn = !xTurn;
    }
    return{getGameOver, play};
})();

// while(!game.getGameOver()){
//     game.play();
// }
DisplayController.updateBoard();
const buttons = document.querySelectorAll('.cell');
for(const button of buttons){
    button.addEventListener('click', ()=>{
        [i,j] = DisplayController.getIJFromCellName(button.id);
       if(GameBoard.getSquare(i,j) !== GameBoard.emptySquare){
        console.log("Square already taken");
        // [x,y] = DisplayControllerConsole.askForCrds();
        }
       game.play(i,j); 
       DisplayController.updateCell(i,j)
    })
}
//TODO: I think if x wins if board full then tie will also get displayed. Also end game once winner is there, perhaps display modal when winner is selected.