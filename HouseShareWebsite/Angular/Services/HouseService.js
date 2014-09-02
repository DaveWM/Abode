angular.module('Services.House', ['Services.CurrentUser'])
.factory('houseService', function ($http, currentUserService, authService) {
    return {
        getCurrentHouse: function () {
            return $http.get(server.endpoints.house.getcurrenthouse.uri);
        },

        searchHouses: function(str) {
            return $http.get(server.endpoints.house.search.uri, {
                params: { searchString: str }
            });
        },

        createHouse: function(name, password) {
            return $http.post(server.endpoints.house.createhouse.uri, { Name: name, Password: password })
            .then(function(response) {
                currentUserService.setHouseId(response.data.Id);
                return authService.ping().finally(function () {
                    return response;
                });
            });
        },

        joinHouse: function(id, password) {
            return $http.post(server.endpoints.house.joinhouse.uri, { Id: id, Password: password })
            .then(function (response) {
                currentUserService.setHouseId(response.data.Id);
                return authService.ping().finally(function() {
                    return response;
                });
            });
        },

        getHouse: function(id) {
            return $http.get(server.endpoints.house.gethouse.uri, { params: { houseId: id } });
        }
    };
})