angular.module('Controllers.App', ['Services', 'Directives.LoadingIcon', 'Services.House', 'breakpointApp', 'Services.PreviousState', 'Services.Phonegap'])
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

    $scope.isLoading = notificationsService.isLoading;


    var defaultTransition = 'slide-left';
    $scope.options = {
        transitionType: defaultTransition
    };

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

        if (!(toState.data && (toState.data.allowHomeless || toState.data.allowAnonymous)) && currentUserService.getUserDetails()) { // user logged in
            return houseService.getCurrentHouse().then(function (response) {
                if (!response.data || (response.data.toLowerCase && response.data.toLowerCase() == "null")) {
                    $state.go('app.main.house.join');
                }
            });
        }

        // set animation type for transition
        if (fromState.data && fromState.data.transition) {
            $scope.options.transitionType = fromState.data.transition;
        } else {
            $scope.options.transitionType = defaultTransition;
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
