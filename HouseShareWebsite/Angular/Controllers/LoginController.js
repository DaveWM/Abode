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
            },
            resolve: {
                externalLogins: function($http) {
                    return $http.get(server.endpoints.account.getexternallogins.uri, {
                        params: {returnUrl: '/#/externallogin/'}
                        })
                        .then(function(response) {
                            return response.data;
                        });
                }
            }
        });
    })
    .controller('loginController', function ($scope, $http, authService, $state, $window, externalLogins) {
    $scope.email = '';
    $scope.password = '';

    $scope.externalLoginIconMap = {
        Google: 'fa-google-plus',
        Facebook: 'fa-facebook',
        Microsoft: 'fa-windows',
        Twitter: 'fa-twitter'
    };

    $scope.externalLogins = externalLogins;

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

    $scope.startExternalLogin = function(url) {
        $window.location.replace(url);
    };
});