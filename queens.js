var pieces = [
    new Queen(2, 1, 0),
    new Queen(2, 3, 1)
];

var board = [
    [0, 0, 0, pieces[1]],
    [0, 0, pieces[0], 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

function checkQueens() {

    var result = false;

    //if 2 queens in line of sight of each other, return true
    pieces.forEach(function (queen) {

        //any other queen in horizontal path should return true
        var horizontalRow = board[queen.y];
        horizontalRow.forEach(function(tile) {
            if(tile && tile.team != queen.team) {
                result = true;
            }
        });

        //any other queen in vertical path should return true
        var i,
            tile;
        for (i = 0; i < board.length; i++) {
            tile = board[i][queen.x];
            if(tile && tile.team != queen.team) {
                result = true;
            }
        }

        //check for queens up and to the left
        if(walkBoardDiagonally(-1, -1, queen)) {
            result = true;
        }
        //check for queens down and to the right
        if(walkBoardDiagonally(1, 1, queen)) {
            result = true;
        }
        //check for queens up and to the right
        if(walkBoardDiagonally(1, -1, queen)) {
            result = true;
        }
        //check for queens down and to the left
        if(walkBoardDiagonally(-1, 1, queen)) {
            result = true;
        }
    });

    //else return false
    return result;
}

function Queen(x, y, team) {
    this.x = x;
    this.y = y;
    this.team = team;
}

function walkBoardDiagonally(deltaX, deltaY, queen) {
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
}

function withinBounds(i) {
    return i >= 0 && i < board.length;
}

console.log(checkQueens());