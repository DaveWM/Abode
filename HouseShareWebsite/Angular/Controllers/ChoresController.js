angular.module('Controllers.Chores', ['ui.router'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('app.main.createChore', {
                url: '/chores/create',
                templateUrl: 'Angular/Views/CreateChore.html',
                controller: 'createChoreController',
                data: {
                    transition: 'slide-left',
                    sidebarCollapsed: true,
                    pageTitle: 'Add a Chore'
                }
            });
    })
    .controller('createChoreController', function ($scope, tileItemsService, $state, $rootScope) {
    $scope.description = '';
    $scope.selectedUrgency = null;
    $scope.selectedChoreType = null;

    // convert choreTypeIcons from object to array
    $scope.types = Object.keys($rootScope.choreTypeIcons)
        .map(function(key) {
        return {
            name: key,
            icon: $rootScope.choreTypeIcons[key]
        };
    });
    $scope.completionDates = [
        {
            name: 'Any Time',
            icon: 'fa-meh-o',
            date: moment().add(30, 'd')
        },
        {
            name: 'Within a Week',
            icon: 'fa-calendar-o',
            date: moment().add(7, 'd')
        },
        {
            name: 'Today',
            icon: 'fa-exclamation-circle',
            date: moment().hour(23).minute(59)
        }
    ];

    $scope.saving = false;
    $scope.save = function() {
        $scope.saving = true;
        var newChore = {
            ExpectedCompletionDate: $scope.selectedUrgency.date,
            Description: $scope.description,
            ChoreType: $scope.selectedChoreType.name
        };

        tileItemsService.createChore(newChore)
            .then(function () {
                $state.go('app.main.whiteboard');
            })
            .finally(function() {
                $scope.saving = false;
            });
    };
});