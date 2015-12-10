angular
    .module('mapper', [])
    .service('CircleGenerator', function($interval, $document, $window, $log) {
        var clientWidth = $window.innerWidth,
            clientHeight = $window.innerHeight,
            circlesAdded = 0;
        $log.log($window);
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