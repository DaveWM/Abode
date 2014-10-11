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

        $scope.typeIconMapping = [
            {
                name: 'All',
                icon: 'fa-circle-thin'
            },
            {
                name: 'Note',
                icon: 'fa-clipboard'
            },
            {
                name: 'Chore',
                icon: 'fa-trash'
            }
        ];
        $scope.selectedItemType = $scope.typeIconMapping[0];

        $scope.tileTypeMapping = {
            'Note': {
                view: 'Note.html',
                colour: 'blue'
            },
            'Chore': {
                view: 'Chore.html',
                colour: 'purple'
            }
        };

    $scope.getTileView = function(type) {
        return 'Angular/Views/WhiteboardTileItems/' + $scope.tileTypeMapping[type].view;
    };

    var getTileIcons = function(tileItem) {
        var icons = ['fa ' + $scope.typeIconMapping.filter(function(mapping) {
            return mapping.name == tileItem.TileItemType;
        })[0].icon];
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