angular.module('Services.Comments', ['Services.Notifications'])
    .factory('commentsService', function ($http, notificationsService, Restangular) {
    return {
        getItemComments: function(tileItemId) {
            return Restangular.one("items", tileItemId).all("comments").getList()
                .catch(function () {
                notificationsService.notifyError("Failed to retrieve comments, try reloading the page");
            });
        },

        postComment: function (tileItemId, comment) {
            return Restangular.one("items", tileItemId).all("comments").post({ 'content': comment })
            .then(function() {
                notificationsService.notifySuccess("Comment Posted <i class='fa fa-comment-o'></i>");
            })
            .catch(function() {
                notificationsService.notifyError("Failed to post comment, please try again");
            });
        }
    };
});