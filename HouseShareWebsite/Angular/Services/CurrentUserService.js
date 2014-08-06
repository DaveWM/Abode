angular.module('Services.CurrentUser', ['LocalStorageModule'])
    .factory('currentUserService', function (localStorageService) {
    var userDetailsKey = "abode_user_details";
    var onChangeFunc = function() {};

    return {
        setUserDetails: function(user) {
            localStorageService.set(userDetailsKey, user);
            onChangeFunc(user);
        },
        getUserDetails: function() {
            return localStorageService.get(userDetailsKey);
        },
        getToken: function() {
            var details = localStorageService.get(userDetailsKey);
            if (details)
                return details.token;
            return null;
        },
        setHouseId: function(houseId) {
            var user = localStorageService.get(userDetailsKey);
            user.houseId = houseId;
            localStorageService.set(userDetailsKey, user);
            onChangeFunc(user);
        },
        onDetailsChange: function(func) {
            onChangeFunc = func;
        }
    };
});