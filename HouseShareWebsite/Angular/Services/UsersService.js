angular.module('Services.Users', [])
    .factory('usersService', function($http) {
        return {
            getUser: function(id) {
                return $http.get(server.endpoints.user.getuser.uri, { params: { userId: id } });
            },

            getHousemates: function(houseId) {
                return $http.get(server.endpoints.user.gethousemates.uri, { params: { houseId: houseId } });
            },

            updateUser: function(user) {
                return $http.post(server.endpoints.user.updateuser.uri, user);
            }
        };
    });