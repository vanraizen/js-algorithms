angular
    .module('ChatClient', ['ngWebsocket'])
    .service('EventHandler', function($websocket, $log, $rootScope) {
        'use strict';
        return {
            start: function (url) {

                var ws = $websocket.$new(url);

                ws.$on('$open', function () {
                    $log.log('Connection to server established...');
                });

                ws.$on('newMessage', function (data) {
                    console.log('new message received from server: ', data);
                    $rootScope.$broadcast('newMessage', data);
                });

                $rootScope.$on('pushMessage', function(event, message) {
                    console.log('sending new message to server: ', message);
                    ws.$emit('newMessage', {message:message});
                });
            }
        }
    })
    .controller('ChatController', function($scope, EventHandler) {
        EventHandler.start('ws://localhost:8080');
    })
    .directive('messageBox', function () {
        'use strict';

        return {
            // used as an element only (e.g., <messageBox></messageBox>)
            restrict: 'E',
            // replace the entire element with the contents of viewer
            replace: true,
            templateUrl: 'messageBox.html',
            link: function ($scope, element, attrs) {

                var messages = [];

                $scope.messages = messages;
                $scope.newMessage = '';

                $scope.sendMessage = function () {
                    if ($scope.newMessage.length) {
                        $scope.$emit('pushMessage', $scope.newMessage);
                    }
                    $scope.newMessage = '';
                };

                $scope.$on('newMessage', function(event, message) {
                    $scope.messages.push(message);
                    $scope.$apply();
                });
            }
        };
    });