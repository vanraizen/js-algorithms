angular
    .module('mapper', [])
    .service('CircleGenerator', function($interval, $document, $window) {
        var clientWidth = $window.outerWidth,
            clientHeight = $window.outerHeight,
            circlesAdded = 0;
        console.log($window);
        function FollowingCircle(size) {
            var circle = this;
            this.x = clientWidth / 2;
            this.y = clientHeight / 2;
            this.size = size;
            $interval(function () {
                circle.r = Math.floor(Math.random() * 255);
                circle.g = Math.floor(Math.random() * 255);
                circle.b = Math.floor(Math.random() * 255);
            }, 500);
        }
        return {
            generate: function(circlesToAdd) {
                ++circlesAdded;
                var size = Math.round(clientWidth - ((circlesAdded/circlesToAdd) * clientWidth));
                if(size) {
                    return new FollowingCircle(size);
                }
            }
        }
    })
    .controller('ConcentricCirclesController', function($scope) {});