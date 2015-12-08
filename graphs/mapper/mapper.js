/*global angular, $ */
/**
 * @ngdoc directive
 * @name signportal
 * @description The wrapper directive around the skyslopeSignatureBox, providing a scrollable window over documents images containing signature fixtures.
 */
angular
    .module('mapper')
    .directive('map', ['$log', 'BFS', '$document',
        function ($log, BFS, $document) {

            var startDfs,
                startBfs;

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

                this.addEdge = function (node1, node2) {
                    if (node1.addConnectionTo(node2)) {
                        node2.addConnectionTo(node1);
                        this.edges.push({x1: node1.x, y1: node1.y, x2: node2.x, y2: node2.y});
                    }
                };

                this.bfs = function (nodeId) { BFS.go(this.getNode(nodeId)) };

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
                        if(this.connections.indexOf(otherNode) === -1) {
                            this.connections.push(otherNode);
                            return true;
                        }
                        $log.debug('connection from ', this, 'to ', otherNode, 'already exists');
                        return false;
                    };
                    this.getConnections = function () {
                        return this.connections;
                    };

                    this.resetColor = function () {
                        this.color = 'purple';
                    };
                    this.resetColor();
                }

                this.getNode = function (nodeId) {
                    var nodeMatch = false;
                    map.nodes.forEach(function(node) { if(node.id == nodeId) nodeMatch = node;  });
                    return nodeMatch;
                }
            }

            function NewEdgeGuide(map) {

                var guide = this,
                    map = map;

                this.reset = function () {
                    $document.find('body').css('cursor', 'default');
                    this.show = false;
                    this.color = 'red';
                };
                this.reset();

                this.registerMouseLocation = function (x, y) {
                    if(this.show) {
                        this.x2 = x;
                        this.y2 = y;
                        if(this.x1 > this.x2) {
                            this.x2 = this.x2 - 1;
                        } else {
                            this.x2 = this.x2 + 1;
                        }
                        if(this.y1 > this.y2) {
                            this.y2 = this.y2 + 1;
                        } else {
                            this.y2 = this.y2 - 1;
                        }
                    }
                };

                this.nodeClicked = function (nodeId) {
                    var node = map.getNode(nodeId);
                    $log.log('node clicked', nodeId, node);
                    if (this.show) {
                        end(node);
                    } else {
                        start(node);
                    }
                };

                this.mouseEntered = function (node) {
                    if (this.show && this.startingNode.id != node.id) {
                        this.color = 'green';
                    }
                };

                function start (node) {
                    $document.find('body').css('cursor', 'crosshair');
                    guide.show = true;
                    guide.startingNode = node;
                    guide.x1 = node.x;
                    guide.y1 = node.y;
                    guide.x2 = node.x;
                    guide.y2 = node.y;
                }

                function end (node) {
                    console.log(guide.startingNode, node);
                    map.addEdge(guide.startingNode, node);
                    guide.reset();
                }
            }

            function registerListeners($scope) {
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

            'use strict';
            return {
                // used as an element only (e.g., <map></map>)
                restrict: 'E',
                // replace the entire element with the contents of viewer
                replace: true,
                templateUrl: 'map.html',
                link: function ($scope, element, attrs) {

                    var map = new Map(),
                        guide = new NewEdgeGuide(map);

                    $scope.edges = map.getEdges();
                    $scope.nodes = map.getNodes();
                    $scope.newEdgeGuide = guide;

                    $scope.handleClick = function ($event) {
                        var nodeClickId;
                        //console.log($event);
                        if ($event.toElement.tagName === 'svg') {
                            map.addNode($event.x, $event.y);
                        } else if ($event.toElement.tagName === 'circle') {
                            nodeClickId = $event.target.attributes.getNamedItem('node-id').nodeValue;
                            if(startBfs) {
                                map.resetColors();
                                map.bfs(nodeClickId);
                                startBfs = false;
                            } else if (startDfs) {

                            } else {
                                guide.nodeClicked(nodeClickId);
                            }
                        } else {
                            if(guide.show) {
                                guide.reset();
                            }
                        }
                    };

                    registerListeners($scope);

                    $scope.registerMouseLocation = function($event) {
                        $scope.newEdgeGuide.registerMouseLocation($event.x, $event.y);
                    };

                    $scope.nodeMouseEntered = function (node) {
                        node.color = 'blue';
                        guide.mouseEntered(node);
                    };
                }
            };
        }]);
