
var appModule = angular.module('App', [
    'Controllers', 'Services', 'Filters', 'Directives', 'ui.router', 'ngAnimate', 'hmTouchEvents'])
                .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/whiteboard');

    $stateProvider.state('app', {
        'abstract': true,
        views: {
            'header': {
                templateUrl: 'Angular/Views/DefaultHeader.html'
            },
            'main': {
                templateUrl: 'Angular/Views/Main.html',
                controller: function($scope, $rootScope) {
                    $scope.closeSidebar = function () {
                        $rootScope.sidebar.collapsed = true;
                    };
                }
            }
        }
    });

    $stateProvider.state('app.main', {
        'abstract': true,
        views: {
            'sidebar': {
                templateUrl: 'Angular/Views/DefaultSidebar.html',
                controller: function($scope, authService) {
                    $scope.logout = authService.logout;
                }
            },
            '': {
                template: '<div class="row"><div ui-view class="content col-xs-12 slide"></div></div>'
            },
            'header@': {
                templateUrl: 'Angular/Views/SmallHeader.html',
                controller: 'headerController'
            }
        },
        resolve: {
            authenticated: function(authService, $state) {
                return authService.ping().catch(
                    function(error) { // not authenticated, need to log in
                        $state.go('app.login');
                    });
            }
        }
    });

    $httpProvider.interceptors.push(function(currentUserService, notificationsService, $q) {
        return {
            request: function (config) {
                if (!config) {
                    config = {};
                }
                config.headers['Authorization'] = 'Bearer ' + currentUserService.getToken();
                notificationsService.addLoadingTask();
                return config;
            },
            response: function(data) {
                notificationsService.removeLoadingTask();
                return data;
            },
            responseError: function(rejection) {
                notificationsService.notifyError(rejection.data.error_description || rejection.data.message || rejection.data.Message || rejection.data.Message || 'Unknown Error Occured');
                notificationsService.removeLoadingTask();
                return $q.reject(rejection);
            }
        };
    });
                })
.run(function($templateCache) {
    $templateCache.put("template/rating/rating.html",
    "<span class=\"ratingIcon\" ng-mouseleave=\"reset()\" ng-keydown=\"onKeydown($event)\" tabindex=\"0\" role=\"slider\" aria-valuemin=\"0\" aria-valuemax=\"{{range.length}}\" aria-valuenow=\"{{value}}\">\n" +
    "    <i ng-repeat=\"r in range track by $index\" ng-mouseenter=\"enter($index + 1)\" ng-click=\"rate($index + 1)\" ng-class=\"$index < value && (r.stateOn || 'glyphicon glyphicon-star') || (r.stateOff || 'glyphicon-star-empty')\">\n" +
    "        <span class=\"sr-only\">({{ $index < value ? '*' : ' ' }})</span>\n" +
    "    </i>\n" +
    "</span>");
});