angular.module('Controllers.Register', ['Services.Auth', 'Services.Notifications', 'ui.router'])
    .config(function ($stateProvider) {
        $stateProvider.state('app.register', {
            url: '/register',
            templateUrl: 'Angular/Views/Register.html',
            controller: 'registerController',
            data: {
                transition: 'slide-right',
                allowAnonymous: true,
                sidebarCollapsed: true,
                pageTitle: 'Register'
            }
        });
    })
    .controller('registerController', function($scope, authService, notificationsService, $state) {
    $scope.name = '';
    $scope.email = '';
    $scope.password = '';

    $scope.registering = false;

    $scope.register = function () {
        $scope.registering = true;
        authService.register($scope.email, $scope.password, $scope.name)
            .then(function() {
                authService.login($scope.email, $scope.password)
                .finally(function () {
                    $scope.registering = false;
                })
                .then(function () {
                    notificationsService.notifySuccess('Registered Successfully');
                    $state.go('app.main.whiteboard');
                });
        });
    };
    $scope.onSwipe = function() {
        $state.go('app.login');
    };
});