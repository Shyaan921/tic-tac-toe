const gameboard = (function() {
    const Array = [['', '', ''], ['', '', ''], ['', '', '']];

    const getArray = () => Array;
    const updateArray = function(row, column, symbol) {
        if (Array[row][column] === '') {
            Array[row][column] = symbol;
            return true;
        }
    };
    const displayArray = function() {
        let content = document.querySelector('.content')
        content.innerHTML = '';
        for (let i = 0; i < Array.length; i++) {
            for (let j = 0; j < Array.length; j++) {
                let div = document.createElement('button')
                div.classList = 'box';
                div.dataset.row = i;
                div.dataset.column = j;
                div.innerText = Array[i][j];
                if (Array[i][j] === '⭕') {
                    div.style.color = '#ff477e'
                } else if ( Array[i][j] === '❌') {
                    div.style.color = '#f9bec7'
                }
                content.appendChild(div)
            };
        }
    };
    return { getArray, updateArray, displayArray };
}) ();

function players(name, symbol) {
    const wins = 0;
    const getWins = () => wins;
    const incWins = () => wins++;

    return { name, symbol, getWins, incWins };
};

const gameController = (function (playerOneName = 'Player 1', playerTwoName = 'Player 2') {
    let Array = gameboard.getArray();

    let player1 = players(playerOneName, '⭕')
    let player2 = players(playerTwoName, '❌')
    let activePlayer = player1;

    const getActivePlayer = () => activePlayer;
    const toggleActivePlayer = function() {
        if (activePlayer ===  player1) {
            activePlayer = player2;
        } else {
            activePlayer = player1;
        }
    };

    const playRound = function(row, column) {
        if (gameboard.updateArray(row, column, getActivePlayer().symbol)) {
            return true;
        }

    };  

    const checkForWin = function() {
        if (((checkRows()) || (checkColumns()) || (checkDiagonals()))) {
            return true
        } else {
            return false;
        }
    };

    const checkForDraw = function() {
        for (let i = 0; i < Array.length; i++) {
            for (let j = 0; j < Array.length; j++) {
                if (Array[i][j] === '') {
                    return false;
                }
            };
        };
        return true;
    };

    const checkRows = function() {
        for (let i = 0; i < Array.length; i++) {
            if (((Array[i][0] === Array[i][1]) && (Array[i][0] === Array[i][2])) && (Array[i][0] !== '')) {
                console.log("rows")
                return true;
                
            }
        };
        return false;
    };

    const checkColumns = function() {
        for (let i = 0; i < Array.length; i++) {
            if (((Array[0][i] === Array[1][i]) && (Array[0][i] === Array[2][i])) && (Array[0][i] !== '')) {
                console.log('columns')
                return true;
            }
        };
        return false;
    };

    const checkDiagonals = function() {
        if (((Array[0][0] === Array[1][1]) && (Array[0][0] === Array[2][2])) || ((Array[0][2] === Array[1][1]) && (Array[0][2] === Array[2][0]))) {
            if (Array[1][1] !== '') {
                return true;
            }
        }
        return false;
    };

    const disableButtons = function() {
        let buttons = document.querySelectorAll('.box')
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        };
    }

    return{ getActivePlayer, toggleActivePlayer, playRound, checkForWin, checkForDraw, disableButtons }
}) ()

function screenController() {
    let Array = gameboard.getArray()
    let game = gameController
    let playerOneName = document.querySelector('.player1 .name')
    let playerTwoName = document.querySelector('.player2 .name')
    let playerOneSymbol = document.querySelector('.player1 .symbol')
    let playerTwoSymbol = document.querySelector('.player2 .symbol')
    let footer = document.querySelector('.footer p')
    let content = document.querySelector('.content')
    let resetBtn = document.querySelector('.reset')

    function startDisplay() {
        gameboard.displayArray();
        footer.innerText = game.getActivePlayer().name + "'s turn"

        playerOneName.innerText = game.getActivePlayer().name
        playerOneSymbol.innerText = game.getActivePlayer().symbol
        game.toggleActivePlayer()
        playerTwoName.innerText = game.getActivePlayer().name
        playerTwoSymbol.innerText = game.getActivePlayer().symbol
        game.toggleActivePlayer()
    }

    function changeDisplay() {
        gameboard.displayArray();

        if (game.checkForWin()) {
            footer.innerText = game.getActivePlayer().name + ' wins'
            game.disableButtons()
        } else if (game.checkForDraw()) {
            footer.innerText = "Game ended in a draw"
            game.disableButtons()
        } else {
            game.toggleActivePlayer()
            footer.innerText = game.getActivePlayer().name + "'s turn"
        }
    };

    function clickHandler(e) {
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;

        
        if (game.playRound(selectedRow, selectedColumn)) {
            changeDisplay();
        }
    }

    startDisplay();
    content.addEventListener('click', clickHandler);
}

screenController()