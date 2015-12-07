/*global angular, $ */
/**
 * @ngdoc directive
 * @name signportal
 * @description The wrapper directive around the skyslopeSignatureBox, providing a scrollable window over documents images containing signature fixtures.
 */
angular
    .module('mapper')
    .directive('map', ['$log', '$http',
        function ($log, $http) {

            function Map() {
                var map = this;
                this.nextId = 1;
                this.nodes = [];
                this.addNode = function (x,y) {
                    this.nodes.push(new Node(x,y));
                    this.nextId++;
                };
                this.getNodes = function () { return this.nodes; };
                function Node(x,y) {
                    this.id = map.nextId;
                    this.x = x;
                    this.y = y;
                    this.color = 'purple';
                    this.connections = [];
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
                    var map = new Map();
                    console.log(d3);
                    $scope.nodes = map.getNodes();
                    $scope.handleClick = function ($event) {
                        console.log($event);
                        if($event.toElement.tagName === 'svg') {
                            map.addNode($event.x, $event.y);
                        } else {
                            var nodeId = $event.target.innerHTML;
                            console.log('link start', nodeId);
                        }
                    };
                }
            };
        }]);
