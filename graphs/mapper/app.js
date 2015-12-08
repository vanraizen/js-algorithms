angular
    .module('mapper', [])
    .controller('MapperController', function($scope) {
        $scope.dfs = function () {
            $scope.$broadcast('startDfs');
        };
        $scope.bfs = function () {
            $scope.startBfs = true;
            $scope.$broadcast('startBfs');
        };
        $scope.logMapState = function () {
            $scope.$broadcast('logMapState');
        };
        $scope.clearGraph = function () {
            $scope.$broadcast('clearGraph');
        };
        $scope.$on('clearModes', function () {
            $scope.startDfs = false;
            $scope.startBfs = false;
        });
    })
    .service('BFS', function($log, $rootScope, $interval) {

        function bfs (startingNode) {

            var visited = [],
                queue = [],
                runIntervalId;

            queue.push(startingNode);
            $rootScope.$broadcast('markNodes', { node: startingNode, color: 'yellow' });

            runIntervalId = $interval(visit, 1000);

            function visit() {
                var visitNode = queue.splice(0, 1)[0],
                    adjacentNodes,
                    nodesToQueue;
                $log.log('Visiting -> ', visitNode);
                $rootScope.$broadcast('markNodes', { node: visitNode, color: 'green' });
                visited.push(visitNode);
                $log.log('Visited is now -> ', visited);
                adjacentNodes = visitNode.getConnections();
                $log.debug('Adjacent Nodes -> ', adjacentNodes);
                nodesToQueue = [];
                adjacentNodes.forEach(function(adjacentNode) {
                    if (visited.indexOf(adjacentNode) === -1 && queue.indexOf(adjacentNode) === -1) {
                        console.log('Adding to unvisited -> ', adjacentNode);
                        nodesToQueue.push(adjacentNode);
                    }
                });
                Array.prototype.push.apply(queue, nodesToQueue);
                $log.log('Queue is now -> ', queue);
                if(queue.length) {
                    $rootScope.$broadcast('markNodes', { nodes: nodesToQueue, color: 'yellow' });
                } else {
                    $log.log('BFS complete...');
                    $rootScope.$broadcast('animationComplete');
                    $interval.cancel(runIntervalId);
                }
            }
        }

        return {
            go: function (startingNode, nodes) {
                $log.log('starting BFS with node', startingNode.id);
                bfs(startingNode, nodes);
            }
        }
    });