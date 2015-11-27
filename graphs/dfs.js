var inputGraph = require('./../germany');

function dfs (v) {

    var stack = [];
    var visited = [];

    stack.push(v);

    while(stack.length > 0) {
        visit();
    }

    function visit () {

        //If this vertex has not been visited, mark it as visited
        if (visited.indexOf(v) === -1) {
            visited.push(v);
        }

        var adjacentVertices = inputGraph[v].sort(),
            nextAdjacentVertex;
        for( var i = 0; i < adjacentVertices.length; i++ ) {
            if ( visited.indexOf(adjacentVertices[i]) === -1 ) {
                nextAdjacentVertex = adjacentVertices[i];
                break;
            }
        }
        console.log('Next adjacent unvisited vertex -> ', nextAdjacentVertex);
        if ( nextAdjacentVertex && stack.indexOf(nextAdjacentVertex) === -1) {
            console.log('PUSH -> ', v);
            stack.push(nextAdjacentVertex);
            v = nextAdjacentVertex;
        } else {
            v = stack.pop();
            console.log('POP -> ', v);
        }

        console.log('Stack -> ', stack);
        console.log('Visited is now -> ', visited);
    }
}

dfs('Frankfurt');