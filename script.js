const GameBoard = (function (){
    const emptySquare = '';
    const _ticTacToeArrayInitial = [['', '', '']
                    ,['', '', '']
                    ,['', '', '']]; // Empty cells
    let _ticTacToeArray = structuredClone(_ticTacToeArrayInitial);
    rowLength = _ticTacToeArray.length;
    getDimention = ()=>{
        return rowLength;
    }
    returnGameBoard = ()=>{
       return _ticTacToeArray;
    };
    reset = () =>{
        console.log("Bonfire lit. Game reset.");
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
            let input = prompt("Enter coordinates (x,y):")
            let x,y;
            [x,y] = input.split(",");
            x = x.trim();
            y = y.trim();
            return [x,y];
        }
        while(isNaN(x) || isNaN(y) || x < 0 || x > GameBoard.getDimention() - 1 || y < 0 || y > GameBoard.getDimention -1); 
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
    showNextPlayerName = (nextPlayer) => {
        const nextPlayerMessage = document.querySelector('p.next-player-msg');
        nextPlayerMessage.textContent = `${nextPlayer === 'x' ? 'Chosen Undead X' : 'Chosen Undead O'} must fight.`
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
            console.log("Soul claimed");
            return true
        }
        else{
            console.log("This ground is already claimed");
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
    function playTurnAndDisplay(playerObject, xPos, yPos){
        playerObject.playTurn(xPos, yPos);
        DisplayControllerConsole.displayBoard();
        DisplayController.updateCell(xPos, yPos);
    }
    function play(x, y){
        console.log(`${whosTurn() === 'x' ? 'Fire Linker X' : 'Dark Lord O'}'s turn.`);
        
        if(xTurn){
            playTurnAndDisplay(playerX, x, y);
        }
        else{
            playTurnAndDisplay(playerO, x, y);
        }
        if(GameBoard.checkForWin()){
            gameOver = true;
            console.log(`${whosTurn()} has defeated the Lords of Cinder!`)
            return [whosTurn(), 'w'];
        }
        if(GameBoard.checkForDraw()){
            gameOver = true;
            console.log(`The Age of Fire fades to darkness...`);
            return [whosTurn(), 't'];
        }
        xTurn = !xTurn;
        return [whosTurn(), '-'];
    }
    return{getGameOver, play, whosTurn, reset};
})();

DisplayController.showNextPlayerName(game.whosTurn());
DisplayController.updateBoard();
const buttons = document.querySelectorAll('.cell');
const resetButton = document.querySelector('.reset-btn')
resetButton.addEventListener("click",()=>{
    console.log("Bonfire lit. Game reset.");
    GameBoard.reset();
    DisplayController.updateBoard();
    game.reset()
    DisplayController.showNextPlayerName(game.whosTurn());
    const dialog = document.querySelector('dialog');
    dialog.close();
})
for(const button of buttons){
    button.addEventListener('click', (e)=>{
        const errorMessageHTML = document.querySelector('.error-msg');
        errorMessageHTML.textContent = "";
        [i,j] = DisplayController.getIJFromCellName(button.id);
        if(GameBoard.getSquare(i,j) !== GameBoard.emptySquare){
            errorMessageHTML.textContent = "This ground is already claimed" 
            console.log("This ground is already claimed");
            return;
        }
        [lastPlayer, state] = game.play(i,j); 
        if(state == 'w'|| state == 't'){
            const dialog = document.querySelector('dialog');
            const endGameMsg = document.querySelector('dialog p')
            if(state ==='w'){
                console.log('A Lord of Cinder has fallen!')
                playerName = document.querySelector(`#${lastPlayer}-name`);
                if(playerName.value === ""){
                    endGameMsg.textContent = `Chosen Undead ${lastPlayer.toUpperCase()} has linked the flame!`
                }
                else{
                    endGameMsg.textContent = `${playerName.value} has linked the flame!`
                }
            }
            else if(state==='t'){
                endGameMsg.textContent = `The Age of Fire fades to darkness...`
            }
            dialog.showModal();
        }
        DisplayController.showNextPlayerName(game.whosTurn());
        DisplayController.updateCell(i,j);
    })
}
