﻿angular.module('Controllers.App', ['Services', 'Directives.LoadingIcon', 'Services.House', 'breakpointApp', 'Services.PreviousState', 'Services.Phonegap'])
    .controller('appController', function ($scope, authService, $state, $rootScope, notificationsService, houseService, previousState, phonegapService, currentUserService) {
    $scope.appName = 'Abode';

    $rootScope.pageTitle = '';
    $scope.getTitle = function() {
        var str = $scope.appName;
        if ($scope.pageTitle) {
            str += ' - ' + $rootScope.pageTitle;
        }
        return str;
    };

    $rootScope.sidebar = {
        collapsed: true,
        toggleCollapsed: function () {
            $rootScope.sidebar.collapsed = !$rootScope.sidebar.collapsed;
        }
    };

    $rootScope.choreTypeIcons = {
        'Dishes': 'fa-circle-o',
        'Rubbish': 'fa-trash-o',
        'Cleaning': 'fa-tint',
        'Other': 'fa-asterisk'
    };

    $scope.isPhone = phonegapService.isPhone;

    $scope.isLoading = notificationsService.isLoading;

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

        if (!(toState.data && (toState.data.allowHomeless || toState.data.allowAnonymous)) && currentUserService.getUserDetails()) { // user logged in
            return houseService.getCurrentHouse().then(function (house) {
                if (!house || house == "null") {
                    $state.go('app.main.house.join');
                }
            });
        }

        if (toState.data && angular.isDefined(toState.data.sidebarCollapsed)) {
            $rootScope.sidebar.collapsed = toState.data.sidebarCollapsed || ($scope.breakpoint.class == 'hideSidebar');
        }

        if (toState.data) {
            $rootScope.pageTitle = toState.data.pageTitle;
        }
    });

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        previousState.set(fromState, fromParams);
    });

    phonegapService.setBackButtonFunc(function (state, params) {
        $state.go(state, params);
    });
});
