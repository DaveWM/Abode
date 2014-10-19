angular.module('Services.House', ['Services.CurrentUser'])
    .factory('houseService', function($http, currentUserService, authService, Restangular) {
        return {
            getCurrentHouse: function() {
                return Restangular.one("houses", 0).get();
            },

            searchHouses: function(searchString) {
                return Restangular.all("houses").getList({ 'searchString': searchString });
            },

            getHousemates: function (houseId) {
                return Restangular.one("houses",houseId).all("housemates").getList();
            },

            createHouse: function(name, password) {
                return Restangular.all("houses").post({ Name: name, Password: password })
                    .then(function(house) {
                        currentUserService.setHouseId(house.Id);
                        return authService.ping().finally(function() {
                            return house;
                        });
                    });
            },

            joinHouse: function(id, password) {
                return Restangular.one("houses", id).customPUT({ password: password }, "join")
                    .then(function (house) {
                        currentUserService.setHouseId(house.Id);
                        return authService.ping().finally(function() {
                            return house;
                        });
                    });
            },

            getHouse: function(id) {
                return Restangular.one("houses", id).get();
            }
        };
    });