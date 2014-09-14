angular.module('Controllers.Home', ['Services.TileItems', 'Services.Notifications', 'Directives.LiveTile', 'Directives.IconSelect', 'ui.bootstrap'])
    .config(function($stateProvider) {
        $stateProvider.state('app.main.whiteboard', {
            url: '/whiteboard',
            templateUrl: 'Angular/Views/Whiteboard.html',
            controller: 'whiteboardController',
            data: {
                pageTitle: 'Whiteboard'
            }
        });
    })
    .controller('whiteboardController', function ($scope, tileItemsService, notificationsService, $window) {
        $scope.tileItems = [];

        $scope.typeIconMapping = {
            'All': 'fa-circle-thin',
            'Note': 'fa-clipboard',
            'Events': 'fa-calendar'
        };
        $scope.typeFilter = 'All';

        $scope.tileTypeMapping = {
            'Note': {
                view: 'Note.html',
                colour: 'blue'
            }
        };

    $scope.getTileView = function(type) {
        return 'Angular/Views/WhiteboardTileItems/' + $scope.tileTypeMapping[type].view;
    };

    var getTileIcons = function(tileItem) {
        var icons = ['fa ' + $scope.typeIconMapping[tileItem.TileItemType]];
        if (tileItem.Priority > 0.75) {
            icons.push('fa fa-exclamation fa-red');
        }
        return icons;
    };

    $scope.loading = true;

    function refresh() {
        tileItemsService.getWhiteboardItems()
            .then(function(response) {
                $scope.tileItems = response.data;
                $scope.tileItems.forEach(function(item) {
                    item.icons = getTileIcons(item);
                });
            })
            .finally(function() {
                $scope.loading = false;
            });
    }
    refresh();

    $scope.tileItemOrdering = function (tileItem) {
        var Math = $window.Math;
        var dateDiff = moment() - moment(tileItem.CreatedDate);
        return -1 * Math.sqrt(Math.pow(tileItem.Priority, 2) + Math.pow(Math.pow(Math.E, -1 * moment.duration(dateDiff).asDays()), 2));
    };
    $scope.getTileItemSize = function(tileItem) {
        var totalPriority = $scope.tileItems.reduce(function(prev, curr) {
            return prev + curr.Priority;
        }, 0);
        var numTileItems = $scope.tileItems.length;
        var expectedPriority = totalPriority / numTileItems;
        return tileItem.Priority / expectedPriority;
    };

    var key = notificationsService.subscribeTileItems(function(tileItem) {
        $scope.tileItems.push(tileItem);
        $scope.$apply();
    });
    $scope.$on('$destroy', function() {
        notificationsService.unsubscribleTileItems(key);
    });
});