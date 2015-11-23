var inputGraph = require('./germany');

function bfs (v) {

    var visited = [];
    var queue = [];

    queue.push(v);

    while(queue.length > 0) {
        visit(queue);
    }

    console.log('FINAL RESULT', visited);

    function visit(queue) {
        var v = queue.splice(0, 1)[0];
        console.log('Visiting -> ', v);
        visited.push(v);
        console.log('Visited is now -> ', visited);
        var orderedAdjacentVertices = inputGraph[v].sort();
        var verticesToQueue = [];
        orderedAdjacentVertices.forEach(function(e) {
           if (visited.indexOf(e) === -1 && queue.indexOf(e) === -1) {
               console.log('Adding to unvisited -> ', e);
               verticesToQueue.push(e);
           }
        });
        Array.prototype.push.apply(queue, verticesToQueue);
        console.log('Queue is now -> ', queue);
    }
}

bfs('Frankfurt');