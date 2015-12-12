/*global angular, $ */
/**
 * @ngdoc directive
 * @name circles
 * @description The container where all the SVG circles will drop, appropriately sized with CircleGenerator
 */
angular
    .module('mapper')
    .directive('circles', ['$log', 'CircleGenerator', '$interval',
        function ($log, CircleGenerator, $interval) {

            'use strict';
            return {
                // used as an element only (e.g., <circles></circles>)
                restrict: 'E',
                //scope: {
                //  mode: '='
                //},
                // replace the entire element with the contents of viewer
                replace: true,
                templateUrl: 'map.html',
                link: function ($scope, element, attrs) {

                    var circles = 50,
                        i,
                        speed,
                        step,
                        mode = 'random',
                        intervalId;

                    $scope.circles = [];
                    for(i = 0; i < circles; i++) {
                        var newCircle = CircleGenerator.generate(circles);
                        if (newCircle) {
                            //$log.debug(newCircle);
                            $scope.circles.push(newCircle);
                        }
                    }

                    $scope.$on('mode', function (event, newMode) {
                        $log.debug('new color mode: ', newMode);
                        mode = newMode;
                        run();
                    });

                    run();

                    function run() {
                        step = 0;
                        if(mode === 'random') {
                            speed = 100;
                        } else if(mode === 'hypno') {
                            speed = 300;
                        } else if(mode === 'insanity') {
                            speed = 10;
                        } else if(mode === 'out' || mode === 'in') {
                            speed = 10;
                        }
                        if (intervalId) {
                            $interval.cancel(intervalId);
                        }
                        intervalId = $interval(function () {
                            ++step;
                            $scope.circles.forEach(function (circle) { circle.draw(step, mode); })
                        }, speed);
                    }
                }
            };
        }]);
