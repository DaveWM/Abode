angular.module('Controllers.Sidebar', ['Services.Auth', 'Services.CurrentUser', 'ui.bootstrap'])
    .controller('sidebarController', function($scope, $rootScope, currentUserService) {
        $scope.sidebar = $rootScope.sidebar;

        $scope.currentUser = currentUserService.getUserDetails();
});