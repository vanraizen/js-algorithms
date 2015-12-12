angular
    .module('mapper', [])
    .service('CircleGenerator', function($interval, $document, $window, $log) {
        var clientWidth = $window.innerWidth,
            clientHeight = $window.innerHeight,
            circlesAdded = 0;
        //$log.log($window);

        function Circle(id, size) {
            var circle = this,
                colorFunction;
            this.id = id;
            this.x = clientWidth / 2;
            this.y = clientHeight / 2;
            this.size = size;
            this.a = 1;

            this.draw = function (step, mode) {
                if(mode === 'random') {
                    colorFunction = randomColors;
                } else if(mode === 'hypno') {
                    colorFunction = hypnoticColors;
                } else if(mode === 'insanity') {
                    colorFunction = hypnoticColors;
                } else if(mode === 'out') {
                    colorFunction = out;
                }  else if(mode === 'in') {
                    colorFunction = inColors;
                }
                console.log(mode);
                colorFunction(circle, step);
            };
        }

        function randomColors (circle) {
            circle.r = Math.floor(Math.random() * 255);
            circle.g = Math.floor(Math.random() * 255);
            circle.b = Math.floor(Math.random() * 255);
        }

        function hypnoticColors(circle, step) {
            if (circle.id % 2 == 0) {
                if (step % 2 == 0) {
                    black(circle);
                } else {
                    white(circle);
                }
            } else {
                if (step % 2 == 0) {
                    white(circle);
                } else {
                    black(circle);
                }
            }
        }

        function out (circle, step) {
            if (step%circlesAdded == circle.id) {
                blue(circle);
            } else {
                black(circle);
            }
        }

        function inColors (circle, step) {
            if ((circlesAdded - step%circlesAdded) == circle.id) {
                blue(circle);
            } else {
                black(circle);
            }
        }

        function blue(circle) {
            circle.r = 0;
            circle.g = 0;
            circle.b = 255;
        }

        function white(circle) {
            circle.r = 255;
            circle.g = 255;
            circle.b = 255;
        }

        function black(circle) {
            circle.r = 0;
            circle.g = 0;
            circle.b = 0;
        }

        return {
            generate: function(circlesToAdd) {
                ++circlesAdded;
                var size = Math.round((clientWidth - ((circlesAdded/circlesToAdd) * clientWidth)) / 2);
                //console.log(size);
                if(size) {
                    return new Circle(circlesAdded, size);
                }
            }
        }
    })
    .controller('ConcentricCirclesController', function($scope, $location) {
        $scope.location = $location;
        $scope.$watch('location.search()', function() {
            $scope.$broadcast('mode', $location.search().mode);
        });
    });