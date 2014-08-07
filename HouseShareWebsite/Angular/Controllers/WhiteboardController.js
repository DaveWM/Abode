angular.module('Controllers.Home', ['Services.TileItems', 'Services.Notifications', 'Directives.LiveTile'])
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
    .controller('whiteboardController', function ($scope, tileItemsService, notificationsService) {
        $scope.tileItems = [];
        // TODO get web api to stop being shit, and serialise an enum to a string
        $scope.tileTypeMapping = {
            0: { // note
                view: 'Note.html',
                colour: 'blue'
            }
        };
    $scope.getTileView = function(type) {
        return '/Angular/Views/WhiteboardTileItems/' + $scope.tileTypeMapping[type].view;
    };

        $scope.loading = true;

    function refresh() {
        tileItemsService.getWhiteboardItems()
            .then(function(response) {
                $scope.tileItems = response.data;
            })
            .finally(function() {
                $scope.loading = false;
            });
    }

    refresh();

    var key = notificationsService.subscribeTileItems(function(tileItem) {
        $scope.tileItems.push(tileItem);
        $scope.$apply();
    });
    $scope.$on('$destroy', function() {
        notificationsService.unsubscribleTileItems(key);
    });
});