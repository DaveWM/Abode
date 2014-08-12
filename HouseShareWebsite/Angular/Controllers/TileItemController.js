angular.module('Controllers.TileItem', ['Services.Comments', 'Services.Notifications'])
    .config(function($stateProvider) {
        $stateProvider.state('app.main.tileItemDetails', {
            url: '/details/{tileItemId}',
            templateUrl: 'Angular/Views/TileItemDetails.html',
            controller: 'tileItemController'
        });
    })
    .controller('tileItemController', function ($scope, $stateParams, commentsService, tileItemsService, notificationsService) {
    $scope.comments = [];
    var tileItemId = $stateParams.tileItemId;
    var subscriptionKey = notificationsService.subscribeComments(function(comment) {
        if (comment.TileItemId == tileItemId) {
            $scope.comments.push(comment);
            $scope.$apply();
        }
    });
    $scope.$on('$destroy', function () {
        // unsubscribe when leaving view
        notificationsService.unsubscribleComments(subscriptionKey);
    });

    $scope.tileItem = {};
    $scope.tileItemView = "";

    $scope.commentLimit = 3;
    $scope.commentsRevealed = false;
    $scope.showAllComments = function() {
        $scope.commentLimit = 9999;
        $scope.commentsRevealed = true;
    };

    $scope.loadingComments = true;
    commentsService.getItemComments(tileItemId)
        .then(function(comments) {
            $scope.comments = comments.data;
        })
        .finally(function() {
            $scope.loadingComments = false;
        });

    $scope.newComment = null;
    $scope.postingComment = false;
    $scope.postComment = function(comment) {
        $scope.postingComment = true;
        // comment should be added by signalR once posted
        commentsService.postComment(tileItemId, comment)
            .finally(function () {
                $scope.newComment = null;
                $scope.postingComment = false;
            });
    };

    var tileViewMapping = {
        0: 'Angular/Views/TileItemDetailViews/Note.html'
    };

    $scope.loadingTileItem = true;
    tileItemsService.getTileItemDetails(tileItemId)
    .then(function (tileItem) {
        $scope.tileItemView = tileViewMapping[tileItem.data.TileItemType];
            $scope.tileItem = tileItem.data;
        })
        .finally(function() {
            $scope.loadingTileItem = false;
    });
});