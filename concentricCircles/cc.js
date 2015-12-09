/*global angular, $ */
/**
 * @ngdoc directive
 * @name circles
 * @description The container where all the SVG circles will drop, appropriately sized with CircleGenerator
 */
angular
    .module('mapper')
    .directive('circles', ['$log', 'CircleGenerator',
        function ($log, CircleGenerator) {

            'use strict';
            return {
                // used as an element only (e.g., <circles></circles>)
                restrict: 'E',
                // replace the entire element with the contents of viewer
                replace: true,
                templateUrl: 'map.html',
                link: function ($scope, element, attrs) {

                    var circles = 50,
                        i;
                    $scope.circles = [];
                    for(i = 0; i < circles; i++) {
                        var newCircle = CircleGenerator.generate(circles);
                        if (newCircle) {
                            console.log(newCircle);
                            $scope.circles.push(newCircle);
                        }
                    }
                }
            };
        }]);
