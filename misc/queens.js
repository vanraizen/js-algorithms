module.exports = Game;

function Game () {

    var board = newBoard(),
        pieces = [];

    this.addQueen = function (x, y, team) {
        var piece = new Queen(team);
        piece.x = x;
        piece.y = y;
        board[x][y] = piece;
        pieces.push(piece);
    };

    this.clear = function () { board = newBoard(); };

    this.check = function () {

        var result = false;

        //if 2 queens in line of sight of each other, return true
        pieces.forEach(function (queen) {

            //check for other queens going vertically up
            if(walkBoard(-1, 0, queen)) {
                result = true;
            }

            //check for other queens going vertically down
            if(walkBoard(1, 0, queen)) {
                result = true;
            }

            //check for other queens going horizontally right
            if(walkBoard(0, 1, queen)) {
                result = true;
            }

            //check for other queens going horizontally left
            if(walkBoard(0, -1, queen)) {
                result = true;
            }

            //check for queens up and to the left
            if(walkBoard(-1, -1, queen)) {
                result = true;
            }

            //check for queens down and to the right
            if(walkBoard(1, 1, queen)) {
                result = true;
            }

            //check for queens up and to the right
            if(walkBoard(1, -1, queen)) {
                result = true;
            }

            //check for queens down and to the left
            if(walkBoard(-1, 1, queen)) {
                result = true;
            }
        });

        //else return false
        return result;
    };

    function walkBoard (deltaX, deltaY, queen) {
        var i, offsetX, offsetY, tile;
        for (i = 0; i < board.length; i++) {
            offsetX = queen.x + deltaX;
            offsetY = queen.y + deltaY;
            if(withinBounds(offsetX) && withinBounds(offsetY)) {
                tile = board[offsetX][offsetY];
                if(tile && tile.team != queen.team) {
                    return true;
                }
            } else {
                break;
            }
        }

        function withinBounds (i) {
            return i >= 0 && i < board.length;
        }
    }

    function newBoard () {
        return [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
    }

    function Queen (team) {
        this.team = team;
    }
}