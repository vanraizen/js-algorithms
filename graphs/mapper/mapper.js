/*global angular, $ */
/**
 * @ngdoc directive
 * @name signportal
 * @description The wrapper directive around the skyslopeSignatureBox, providing a scrollable window over documents images containing signature fixtures.
 */
angular
    .module('mapper')
    .directive('map', ['$log', 'BFS',
        function ($log, BFS) {

            function Map() {

                var map = this;
                this.nextId = 1;
                this.nodes = [];
                this.edges = [];

                this.addNode = function (x,y) {
                    this.nodes.push(new Node(x,y));
                    this.nextId++;
                };

                this.getNodes = function () { return this.nodes; };

                this.addEdge = function (node1Id, node2Id) {
                    var node1 = getNode(node1Id),
                        node2 = getNode(node2Id);
                    node1.addConnectionTo(node2);
                    node2.addConnectionTo(node1);
                    this.edges.push({x1: node1.x, y1: node1.y, x2: node2.x, y2: node2.y});
                };

                this.bfs = function (nodeId) { BFS.go(getNode(nodeId)) };

                this.getEdges = function () { return this.edges };

                this.resetColors = function () {
                    this.nodes.forEach(function(node) {
                        node.resetColor();
                    });
                };

                function Node(x,y) {

                    this.id = map.nextId;
                    this.x = x;
                    this.y = y;
                    this.radius = 10;
                    this.connections = [];

                    this.addConnectionTo = function (otherNode) {
                        this.connections.push(otherNode);
                    };
                    this.getConnections = function () {
                        return this.connections;
                    };

                    this.resetColor = function () {
                        this.color = 'purple';
                    };
                    this.resetColor();
                }

                function getNode(nodeId) {
                    var nodeMatch = false;
                    map.nodes.forEach(function(node) { if(node.id == nodeId) nodeMatch = node;  });
                    return nodeMatch;
                }
            }

            'use strict';
            return {
                // used as an element only (e.g., <map></map>)
                restrict: 'E',
                // replace the entire element with the contents of viewer
                replace: true,
                templateUrl: 'map.html',
                link: function ($scope, element, attrs) {

                    var map = new Map(),
                        nodeClick1Id,
                        startDfs,
                        startBfs;

                    $scope.edges = map.getEdges();
                    $scope.nodes = map.getNodes();

                    $scope.handleClick = function ($event) {
                        var nodeClickId,
                            nodeClick2Id;
                        //console.log($event);
                        if($event.toElement.tagName === 'svg') {
                            map.addNode($event.x, $event.y);
                        } else {
                            nodeClickId = $event.target.attributes.getNamedItem('node-id').nodeValue;
                            if(startBfs) {
                                map.resetColors();
                                map.bfs(nodeClickId);
                                startBfs = false;
                            } else if (startDfs) {

                            } else {
                                if(nodeClick1Id) {
                                    nodeClick2Id = nodeClickId;
                                    console.log('link end', nodeClick2Id);
                                    map.addEdge(nodeClick1Id, nodeClick2Id);
                                    nodeClick1Id = nodeClick2Id = null;
                                } else {
                                    nodeClick1Id = nodeClickId;
                                    console.log('link start', nodeClick1Id);
                                }
                            }
                        }
                    };

                    $scope.$on('startDfs', function () {
                        startDfs = true;
                    });

                    $scope.$on('startBfs', function () {
                        startBfs = true;
                    });

                    $scope.$on('logMapState', function () {
                        $log.log('nodes', map.getNodes(), 'edges', map.getEdges());
                    });

                    $scope.$on('markNodes', function (event, args) {
                        var nodes = args.nodes || [args.node];
                        nodes.forEach(function(node) {
                            node.color = args.color;
                        })
                    });
                }
            };
        }]);
