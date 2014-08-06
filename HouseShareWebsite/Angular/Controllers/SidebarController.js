angular.module('Controllers.Sidebar', ['Services.Auth'])
    .controller('sidebarController', function($scope, $rootScope, $state) {
        $scope.sidebar = $rootScope.sidebar;
});