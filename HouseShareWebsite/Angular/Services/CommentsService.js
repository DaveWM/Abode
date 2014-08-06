angular.module('Services.Comments', ['Services.Notifications'])
    .factory('commentsService', function($http, notificationsService) {
    return {
        getItemComments: function(tileItemId) {
            return $http.get(server.endpoints.comments.getitemcomments.uri, {
                params: {
                    tileItemId: tileItemId
                }
            }).catch(function() {
                notificationsService.notifyError("Failed to retrieve comments, try reloading the page");
            });
        },

        postComment: function(tileItemId, comment) {
            return $http.post(server.endpoints.comments.postcomment.uri, {
                Text: comment,
                TileItemId: tileItemId
            }).success(function(response) {
                notificationsService.notifySuccess("Comment Posted <i class='fa fa-comment-o'></i>");
            })
            .catch(function() {
                notificationsService.notifyError("Failed to post comment, please try again");
            });
        }
    };
});