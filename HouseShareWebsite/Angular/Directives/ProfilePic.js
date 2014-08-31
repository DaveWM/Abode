angular.module('Directives.ProfilePic', [])
    .directive('profilePic', function() {
        return {
            restrict: 'E',
            template: '<img class="profilePic" ng-class="sizeClass" ng-src="{{user.ProfilePictureUrl || \'/Content/images/profilePicPlaceholder.png\'}}" />',
            scope: {
                user: '=',
                size: '@'
            },
            replace: true,
            link: function($scope) {
                if ($scope.size) {
                    $scope.sizeClass = 'profilePic-' + $scope.size;
                }
            }
        };
    });