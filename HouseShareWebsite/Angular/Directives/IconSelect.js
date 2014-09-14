angular.module('Directives.IconSelect', ['ui.bootstrap'])
    .directive('iconSelect', function() {
        return {
            restrict: 'E',
            template: '<div class="iconSelect"><i ng-repeat="(option, iconClass) in iconMapping" ng-class="[option == selected ? \'selected\' : \'\', iconClass]" class="fa fa-2x" ng-click="onClick(option)" tooltip-placement="bottom" tooltip="{{option}}"></i></div>',
            scope: {
                iconMapping: '=',
                selected: '='
            },
            replace: true,
            link: function($scope) {
                $scope.onClick = function(option) {
                    $scope.selected = option;
                };
            }
        };
    });