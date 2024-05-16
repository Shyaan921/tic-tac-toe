const gameboard = (function() {
    const boardArray = [['', '', ''], ['', '', ''], ['', '', '']];

    const getBoardArray = () => boardArray;
    const markSymbol = function(row, column, player) {
        boardArray[row][column] = player.symbol;
    };
    const printBoardArray = function() {
        for (row in boardArray) {
            console.log(boardArray[row]);
        }
    };
    return { boardArray, getBoardArray, printBoardArray, markSymbol };
}) ();

function players(name, symbol) {
    const wins = 0;
    const getWins = () => wins;
    const incWins = () => wins++;

    return { name, symbol, getWins, incWins };
};

function gameController() {
    let boardArray = gameboard.getBoardArray();
    let playerOneName = 'playerOne';
    let playerTwoName = 'playerTwo';

    let player1 = players(playerOneName, 1)
    let player2 = players(playerTwoName, 2)
    let activePlayer = player1;

    const getActivePlayer = () => activePlayer;
    const toggleActivePlayer = function() {
        if (activePlayer == player1) {
            activePlayer = player2;
        } else {
            activePlayer = player1;
        }
    };

    const playRound = function(row, column) {

        gameboard.markSymbol(row, column, getActivePlayer());
        gameboard.printBoardArray()
        console.log(checkForWin())
        toggleActivePlayer();
    };  

    const checkForWin = function() {
        if ((!checkForDraw()) && ((checkRows()) || (checkColumns()) || (checkDiagonals()))) {
            return true
        } else {
            return false;
        }
    };

    const checkForDraw = function() {
        for (let i = 0; i < boardArray.length; i++) {
            for (let j = 0; j < boardArray.length; j++) {
                if (boardArray[i][j] === '') {
                    return false;
                }
            };
        };
        return true;
    };

    const checkRows = function() {
        for (let i = 0; i < boardArray.length; i++) {
            if (((boardArray[i][0] === boardArray[i][1]) && (boardArray[i][0] === boardArray[i][2])) && (boardArray[i][0] !== '')) {
                return true;
            }
        };
        return false;
    };

    const checkColumns = function() {
        for (let i = 0; i < boardArray.length; i++) {
            if (((boardArray[0][i] === boardArray[1][i]) && (boardArray[0][i] === boardArray[2][i])) && (boardArray[0][i] !== '')) {
                return true;
            }
        };
        return false;
    };

    const checkDiagonals = function() {
        if (((boardArray[1][1] === boardArray[0][0]) && (boardArray[1][1] === boardArray[2][2])) || ((boardArray[1][1] === boardArray[2][0]) && (boardArray[1][1] === boardArray[0][2])) && (boardArray[1][1] !== '')) {
            return true;
        }
        return false;
    };

    return{ getActivePlayer, toggleActivePlayer, playRound }
};

let ttt = gameController()
ttt.playRound(0, 0)
ttt.playRound(1, 0)
ttt.playRound(0, 1)
ttt.playRound(1, 1)
ttt.playRound(0, 2) 