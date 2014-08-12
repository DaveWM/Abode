angular.module('Directives.LoadingIcon', [])
    .directive('loadingIcon', function() {
        return {
            restrict: 'E',
            template: '<img class="fadeIn fadeIn-inline" ng-src="{{src}}" ng-class=\'{"loadingIcon": !fixed, "loadingIcon-fixed": fixed, "loadingIcon-lg": large}\'/>',
            scope: {
                fixed: '@',
                alt: '@',
                large: '@'
            },
            replace: true,
            link: function($scope) {
                $scope.src = $scope.alt ? '../Content/images/loading_alt.gif' : '../Content/images/loading.gif';
            }
        };
    });