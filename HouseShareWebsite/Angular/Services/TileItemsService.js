angular.module('Services.TileItems', ['Services.Notifications'])
.factory('tileItemsService', function($http, notificationsService) {
    return {
        createNote: function(note) {
            return $http.post(server.endpoints.notes.createnote.uri, note)
                .then(function() {
                    notificationsService.notifySuccess('Note Added');
                });
        },

        getWhiteboardItems: function() {
            return $http.get(server.endpoints.tileitems.getwhiteboardtileitems.uri);
        },

        getTileItemDetails: function(tileItemId) {
            return $http.get(server.endpoints.tileitems.gettileitem.uri, {
                params: { tileItemId: tileItemId }
            });
        }
    };
})