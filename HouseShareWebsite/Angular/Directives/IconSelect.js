angular.module('Directives.IconSelect', ['ui.bootstrap'])
    .directive('iconSelect', function() {
        return {
            restrict: 'E',
            template: '<div class="iconSelect"><i ng-repeat="mapping in iconMapping" ng-class="[mapping == selected ? \'selected\' : \'\', mapping.icon]" class="fa fa-2x" ng-click="onClick(mapping)" tooltip-placement="bottom" tooltip="{{mapping.name}}"></i></div>',
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