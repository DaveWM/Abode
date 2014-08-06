angular.module('Controllers.Header', ['Services.CurrentUser', 'Services.Auth'])
    .controller('headerController', function($scope, currentUserService, $rootScope, authService) {
    $scope.userDetails = {};
    $scope.userDetails = currentUserService.getUserDetails();
    $scope.logout = authService.logout;

    $scope.toggleSidebar = function() {
        $rootScope.sidebar.toggleCollapsed();
    };
});