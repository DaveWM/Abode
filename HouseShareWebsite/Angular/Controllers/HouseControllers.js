﻿angular.module('Controllers.House', ['ui.router', 'Directives.LoadingIcon', 'ui.bootstrap', 'Services.Notifications', 'Directives.LiveTile'])
    .config(function($stateProvider) {
        $stateProvider
            .state('app.main.createHouse', {
                url: '/house/create',
                views: {
                    '': {
                        templateUrl: 'Angular/Views/CreateHouse.html',
                        controller: 'createHouseController'
                    },
                    'sidebar@app': {
                        templateUrl: 'Angular/Views/NoHouseSidebar.html'
                    }
                },
                data: {
                    transition: 'slide-right',
                    allowHomeless: true,
                    sidebarCollapsed: false,
                    pageTitle: 'Create House'
                }
            })
            .state('app.main.joinHouse', {
                url: '/house/join',
                views: {
                    '': {
                        templateUrl: 'Angular/Views/JoinHouse.html',
                        controller: 'joinHouseController'
                    },
                    'sidebar@app': {
                        templateUrl: 'Angular/Views/NoHouseSidebar.html'
                    }
                },
                data: {
                    transition: 'slide-left',
                    allowHomeless: true,
                    sidebarCollapsed: false,
                    pageTitle: 'Join House'
                }
            });
    })
    .controller('createHouseController', function ($scope, $state, houseService, notificationsService) {
        $scope.name = '';
        $scope.password = '';

        $scope.creatingHouse = false;

        $scope.createHouse = function () {
            $scope.creatingHouse = true;
            houseService.createHouse($scope.name, $scope.password)
                .then(function() {
                    $state.go('app.main.whiteboard');
                    notificationsService.notifySuccess('New House Created');
                })
            .finally(function() {
                $scope.creatingHouse = false;
            });
        };
    })
    .controller('joinHouseController', function ($scope, houseService, $modal, $state, notificationsService) {
        $scope.searchString = '';
        $scope.searching = false;
        $scope.houses = [];

        $scope.$watch('searchString', function (value) {
            if (value) {
                $scope.searching = true;
                $scope.houses = [];
                houseService.searchHouses(value).then(function(response) {
                        $scope.houses = response.data;
                    })
                    .finally(function() {
                        $scope.searching = false;
                    });
            }
        });

    $scope.joinHouse = function(houseId) {
        $modal.open({
            template: '<div class="modal-header"><h4>Enter the Password</h4></div><div class="modal-body"><input type="text" ng-model="password" class="form-control" placeholder="password" /></div>' +
                '<div class="modal-footer"><button ng-click="joinHouse(password)" class="pull-right btn btn-primary" ng-disabled="joining">Join <loading-icon ng-show="joining"></loading-icon></button>' +
                '<button ng-click="$dismiss()" ng-disabled="joining" class="pull-right btn btn-default">Cancel</button></div>',
            controller: ['$scope', '$modalInstance', function ($modalScope, $modalInstance) {
                $modalScope.joining = false;

                $modalScope.joinHouse = function (password) {
                    $modalScope.joining = true;
                    $scope.houses = [];
                    houseService.joinHouse(houseId, password)
                        .then(function (success) {
                            if (success.data && success.data != "false") {
                                $modalInstance.close(true);
                            } else {
                                notificationsService.notifyWarning('Incorrect password');
                            }
                        })
                        .catch(function() {
                            $modalInstance.dismiss();
                        })
                    .finally(function() {
                        $modalScope.joining = false;
                    });
                };
            }]
        })
        .result.then(function() {
            $state.go('app.main.whiteboard');
            notificationsService.notifySuccess('Joined a House');
        });
    };
});