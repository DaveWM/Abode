angular.module('Services.Notifications', ['Services.CurrentUser', 'Services.Phonegap', 'config'])
    .factory('notificationsService', function (currentUserService, phonegapService, config) {
        var loadingTasksCount = 0;
        var hub;

    function connectToHub() {
        var connection = $.hubConnection(config.apiUrl + "/signalr", { useDefaultPath: false });
            hub = connection.createHubProxy('houseHub');
            connection.qs = { 'token': currentUserService.getToken() };

            hub.on('commentAdded', function (comment) {
                // if not posted by current user
                if (currentUserService.getUserDetails().name != comment.UserName) {
                    var message = comment.UserName + " posted a comment for the tile item: '" + comment.TileItemTitle + "'";
                    toastr.info(message);
                    phonegapService.notifyPhone({
                        id: new Date().getTime(),
                        message: message,
                        title: 'Abode: ' + comment.username + ' added a comment',
                        autoCancel: true
                    });
                }
                angular.forEach(commentAddedSubscribers, function (sub, key) {
                    sub(comment);
                });
            });

            hub.on('tileItemAdded', function (tileItem) {
                // if not posted by current user
                if (currentUserService.getUserDetails().name != tileItem.CreatedUser.RealName) {
                    toastr.info(tileItem.CreatedUser.RealName + " created a new tile item: '" + tileItem.Title + "'");
                }
                angular.forEach(tileItemSubscribers, function (sub, key) {
                    sub(tileItem);
                });
            });

            connection.start({ jsonp: true })
            .done(function() {
                hub.invoke('joinHouseGroup');
            });
        }

    var connectedToHub = false;
    function tryConnectToHub() {
        if (!connectedToHub) {
            var userDetails = currentUserService.getUserDetails();
            if (userDetails && userDetails.houseId) {
                connectedToHub = true;
                connectToHub();
            }
        }
    }

    tryConnectToHub();
    currentUserService.onDetailsChange(function(newDetails) {
        tryConnectToHub();
    });

    var commentAddedSubscribers = {};
    var tileItemSubscribers = {};

    return {
        notify: function(text) {
            toastr.info(text);
        },
        notifySuccess: function(text) {
            toastr.success(text);
        },
        notifyError: function(text) {
            toastr.error(text);
        },
        notifyWarning: function(text) {
            toastr.warning(text);
        },
        addLoadingTask: function() {
            loadingTasksCount++;
        },
        removeLoadingTask: function() {
            if (loadingTasksCount > 0)
                loadingTasksCount--;
        },
        isLoading: function() {
            return loadingTasksCount > 0;
        },

        connectToHub: connectToHub,

        subscribeComments: function(onAdded) {
            var key = new Date().getTime(); // should be a guid but javascript is shit
            commentAddedSubscribers[key] = onAdded;
            return key;
        },
        unsubscribleComments: function(key) {
            delete commentAddedSubscribers[key];
        },
        subscribeTileItems: function(onAdded) {
            var key = new Date().getTime(); // should be a guid but javascript is shit
            tileItemSubscribers[key] = onAdded;
            return key;
        },
        unsubscribleTileItems: function (key) {
            delete tileItemSubscribers[key];
        }
    };
});