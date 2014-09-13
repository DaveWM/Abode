angular.module('Directives.ProfilePic', [])
    .directive('profilePic', function() {
        return {
            restrict: 'E',
            template: '<img class="profilePic" ng-class="sizeClass" ng-src="{{user.ProfilePictureUrl || comment.UserProfilePicUrl || \'Content/images/profilePicPlaceholder.png\'}}" />',
            scope: {
                user: '=',
                comment: '=',
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