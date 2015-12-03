function TicTacToe($boardElement) {

    this.$boardElement = $boardElement;
    this.currentPlayer = 1;
    this.gameActive = true;
    this.gameBoard = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ];

    this.render = function () {
        if(this.$boardElement[0].childElementCount === 0) {
            this.$boardElement.append('<table>' +
                '<tr><td id="0_0"></td><td id="0_1"></td><td id="0_2"></td></tr>' +
                '<tr><td id="1_0"></td><td id="1_1"></td><td id="1_2"></td></tr>' +
                '<tr><td id="2_0"></td><td id="2_1"></td><td id="2_2"></td></tr>' +
                '</table>');
        }
        this.gameBoard.forEach(function(row, x) {
            row.forEach(function(tile, y) {
                var $tile = $('td#'+x+"_"+y);
                if(tile == 1) {
                    $tile.attr('class', 'player1');
                }
                if(tile == 2) {
                    $tile.attr('class', 'player2');
                }
            });
        });
    };

    this.click = function (x, y) {
        if(this.gameActive) {
            var tile = this.gameBoard[x][y];
            if (tile === 0) {
                this.gameBoard[x][y] = this.currentPlayer;
            }
            this.render();
            this.currentPlayer = this.currentPlayer == 1 ? 2 : 1;
            this.checkWinCondition();
        }
    };

    this.checkWinCondition = function () {

        var game = this;

        checkVerticalWin();
        checkHorizontalWin();
        checkDiagonalWin();

        function checkVerticalWin() {
            var player1YScore, player2YScore, row, col;
            for (row = 0; row < game.gameBoard.length; row++) {
                player1YScore = 0;
                player2YScore = 0;
                for (col = 0; col < game.gameBoard[row].length; col++) {
                    var tile = game.gameBoard[col][row];
                    if(tile == 1) {
                        player1YScore++;
                    } else if(tile == 2) {
                        player2YScore++;
                    }
                }
                checkScore(player1YScore, player2YScore);
            }
        }

        function checkHorizontalWin() {
            game.gameBoard.forEach(function(row, x) {
                var player1XScore = 0, player2XScore = 0;
                row.forEach(function(tile, y) {
                    if(tile == 1) {
                        player1XScore++;
                    } else if(tile == 2) {
                        player2XScore++;
                    }
                });
                checkScore(player1XScore, player2XScore);
            });
        }

        function checkDiagonalWin() {
            var player1DScore = 0, player2DScore = 0;
            if(game.gameBoard[0][0] == 1) {
                player1DScore++;
            } else if(game.gameBoard[0][0] == 2) {
                player2DScore++;
            }
            if(game.gameBoard[1][1] == 1) {
                player1DScore++;
            } else if(game.gameBoard[1][1] == 2) {
                player2DScore++;
            }
            if(game.gameBoard[2][2] == 1) {
                player1DScore++;
            } else if(game.gameBoard[2][2] == 2) {
                player2DScore++;
            }
            checkScore(player1DScore, player2DScore);
            player1DScore = 0;
            player2DScore = 0;
            if(game.gameBoard[2][0] == 1) {
                player1DScore++;
            } else if(game.gameBoard[2][0] == 2) {
                player2DScore++;
            }
            if(game.gameBoard[1][1] == 1) {
                player1DScore++;
            } else if(game.gameBoard[1][1] == 2) {
                player2DScore++;
            }
            if(game.gameBoard[0][2] == 1) {
                player1DScore++;
            } else if(game.gameBoard[0][2] == 2) {
                player2DScore++;
            }
            checkScore(player1DScore, player2DScore);
        }

        function checkScore(p1Score, p2Score) {
            if(game.gameActive) {
                if(p1Score == 3) {
                    alert('player 1 wins');
                    game.gameActive = false;
                }
                if(p2Score == 3) {
                    alert('player 2 wins');
                    game.gameActive = false;
                }
            }
        }
    };

    this.render();
}