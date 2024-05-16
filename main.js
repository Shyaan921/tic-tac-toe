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
    let playerOneName = 'playerOne';
    let playerTwoName = 'playerTwo';

    let player1 = players(playerOneName, 'meow')
    let player2 = players(playerTwoName, 'woof')
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
        console.log(gameboard.printBoardArray())
        toggleActivePlayer();
    };  

    return{ getActivePlayer, toggleActivePlayer, playRound }
};
