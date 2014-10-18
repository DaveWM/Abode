angular.module('Services.TileItems', ['Services.Notifications'])
    .factory('tileItemsService', function($http, notificationsService, Restangular) {
        return {
            createNote: function(note) {
                return Restangular.all("notes").post(note)
                    .then(function() {
                        notificationsService.notifySuccess('Note Added');
                    });
            },

            createChore: function(chore) {
                return Restangular.all("chores").post(chore)
                    .then(function() {
                        notificationsService.notifySuccess('Chore Added');
                    });
            },
            completeChore: function(id) {
                return Restangular.one("chores", id).remove()
                    .then(function() {
                        notificationsService.notifySuccess('Chore Completed');
                    });
            },

            getWhiteboardItems: function() {
                return Restangular.all("items").getList();
            },

            getTileItemDetails: function(tileItemId) {
                return Restangular.one("items", tileItemId).get();
            }
        };
    });