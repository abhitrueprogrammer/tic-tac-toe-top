const GameBoard = (function (){
    const emptySquare = '';
    const _ticTacToeArrayInitial = [['', '', '']
                    ,['', '', '']
                    ,['', '', '']]; //null means nothing added yet
    let _ticTacToeArray = structuredClone(_ticTacToeArrayInitial);
    rowLength = _ticTacToeArray.length;
    getDimention = ()=>{
        return rowLength;
    }
    returnGameBoard = ()=>{
       return _ticTacToeArray;
    };
    reset = () =>{
        console.log(_ticTacToeArrayInitial)
        _ticTacToeArray = structuredClone(_ticTacToeArrayInitial);
        console.log(_ticTacToeArray);
    }
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
    return {reset, emptySquare, checkForWin, returnGameBoard, getSquare, setSquare, checkForDraw, getDimention};
    })();

const DisplayControllerConsole = (function(){
    displayBoard = () =>{
        _ticTacToeArray = GameBoard.returnGameBoard(); 
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
    //Takes in last player name and outputs next player name on display
    showNextPlayerName = (nextPlayer) => {
        const nextPlayerMessage = document.querySelector('p.next-player-msg');
        nextPlayerMessage.textContent = `${nextPlayer}'s turn.`
    }
    updateBoard = () => {
        const cells = document.querySelectorAll('.cell');
        console.log(cells);
        for(cell of cells){
            [i,j] = getIJFromCellName(cell.id);
            cell.textContent = GameBoard.getSquare(i,j);
        }
    }
    updateCell = (i,j) => {       
        const cell = document.querySelector(`#c${i}${j}`);
        cell.textContent = GameBoard.getSquare(i,j);
    }
    getIJFromCellName = (cellName) =>{
        return cellName.slice(1).split("");
    }
    return {updateCell, updateBoard, getIJFromCellName, showNextPlayerName};
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
    function reset(){
        gameOver = false;
        xTurn = true;
    }
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
            return [whosTurn(), 'w'];
        }
        if(GameBoard.checkForDraw()){
            gameOver = true;
            console.log(`tie!`);
            return [whosTurn(), 't'];
        }
        xTurn = !xTurn;
        return [whosTurn(), '-'];
    }
    return{getGameOver, play, whosTurn, reset};
})();

// while(!game.getGameOver()){
//     game.play();
// }

DisplayController.showNextPlayerName(game.whosTurn());
DisplayController.updateBoard();
const buttons = document.querySelectorAll('.cell');
const resetButton = document.querySelector('.reset-btn')
resetButton.addEventListener("click",()=>{
    console.log("reset");
    GameBoard.reset();
    DisplayController.updateBoard();
    game.reset()
    DisplayController.showNextPlayerName(game.whosTurn());
    const dialog = document.querySelector('dialog');
    dialog.close();
})
for(const button of buttons){
    button.addEventListener('click', (e)=>{
        // DisplayController.updateBoard();
        const errorMessageHTML = document.querySelector('.error-msg');
        errorMessageHTML.textContent = "";
        [i,j] = DisplayController.getIJFromCellName(button.id);
        if(GameBoard.getSquare(i,j) !== GameBoard.emptySquare){
            errorMessageHTML.textContent = "Square already taken" 
            console.log("Square already taken");
            return;
        // [x,y] = DisplayControllerConsole.askForCrds();
        }
        [lastPlayer, state] = game.play(i,j); 
        if(state == 'w'|| state == 't'){
            const dialog = document.querySelector('dialog');
            const endGameMsg = document.querySelector('dialog p')
            if(state ==='w'){
                console.log('winner detected!')
                playerName = document.querySelector(`#${lastPlayer}-name`);
                if(playerName.value === ""){
                    endGameMsg.textContent = `${lastPlayer} won!`
                }
                else{
                    endGameMsg.textContent = `${playerName.value} won!`
                }
            }
            else if(state==='t'){
                endGameMsg.textContent = `Tie.`
            }
            dialog.showModal();
        }
        DisplayController.showNextPlayerName(game.whosTurn());
        DisplayController.updateCell(i,j);
    })
}


// Display winner text. Also end game once winner is there, perhaps display modal when winner is selected.
