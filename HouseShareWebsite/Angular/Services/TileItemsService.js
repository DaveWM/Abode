angular.module('Services.TileItems', ['Services.Notifications'])
    .factory('tileItemsService', function($http, notificationsService) {
        return {
            createNote: function(note) {
                return $http.post(server.endpoints.notes.createnote.uri, note)
                    .then(function() {
                        notificationsService.notifySuccess('Note Added');
                    });
            },

            createChore: function(chore) {
                return $http.post(server.endpoints.chores.create.uri, chore)
                    .then(function() {
                        notificationsService.notifySuccess('Chore Added');
                    });
            },
            completeChore: function(id) {
                return $http.delete(server.endpoints.chores.complete.uri, {
                        params: { id: id }
                    })
                    .then(function() {
                        notificationsService.notifySuccess('Chore Completed');
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
    });