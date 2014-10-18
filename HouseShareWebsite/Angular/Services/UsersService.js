angular.module('Services.Users', [])
    .factory('usersService', function($http, Restangular) {
        return {
            getUser: function(id) {
                return Restangular.one("users", id).get();
            },

            updateUser: function(user) {
                return Restangular.all("users").customPUT(user, "current");
            }
        };
    });