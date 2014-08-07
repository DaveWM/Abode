angular.module('Controllers.Login', ['Services.Auth','ui.router','ngTouch'])
    .config(function ($stateProvider) {
        $stateProvider.state('app.login', {
            url: '/login',
            templateUrl: 'Angular/Views/Login.html',
            controller: 'loginController',
            data: {
                allowAnonymous: true,
                sidebarCollapsed: true,
                pageTitle: 'Login'
            }
        });
    })
    .controller('loginController', function($scope, $http, authService, $state) {
    $scope.email = '';
    $scope.password = '';

    $scope.loggingIn = false;

    $scope.login = function () {
        $scope.loggingIn = true;
        authService.login($scope.email, $scope.password)
            .then(function (data) {
                $state.go('app.main.whiteboard');
            })
        .finally(function() {
            $scope.loggingIn = false;
        });
    };

    $scope.onSwipe = function() {
        $state.go('app.register');
    };
});