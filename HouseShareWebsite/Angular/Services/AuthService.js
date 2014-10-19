angular.module('Services.Auth', ['Services.CurrentUser', 'config'])
    .factory('authService', function ($http, $q, $state, currentUserService, Restangular, config) {
        function setUserDataFromToken(token) {
            var userDetails = {
                id: token.id,
                email: token.userName,
                name: token.realName,
                houseId: token.houseId,
                token: token.access_token
            };
            currentUserService.setUserDetails(userDetails);
        }

    return {
        login: function(email, password) {
            var deferred = $q.defer();
            // can't use restangular because this isn't really restful - well done microsoft
            $http.post(config.apiUrl + '/Token', $.param({ // have to use this because server expects parameter string, not json
                    grant_type: 'password',
                    username: email,
                    password: password
                }), {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }
            ).then(function(response) {
                if (response.data.access_token) {
                    setUserDataFromToken(response.data);
                    deferred.resolve();
                } else deferred.reject('No access token in response');
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        },

        register: function (email, password, name) {
            return Restangular.all("account").post({
                Email: email,
                Password: password,
                ConfirmPassword: password, // fuck da police
                Name: name
            });
        },

        ping: function() {
            return Restangular.all("account").customGET("ticket")
            .then(function(ticket) {
                currentUserService.setToken(JSON.parse(ticket));
                return ticket;
            });
        },

        logout: function () {
            Restangular.one("account").remove().then(function() {
                currentUserService.setUserDetails(null);
                $state.go('app.login');
            });
        },
        getUserInfo: function() {
            return Restangular.one("account").get()
                .then(function (data) {
                    var userDetails = {
                        id: data.Id,
                        email: data.Email,
                        name: data.RealName,
                        houseId: data.HouseId,
                        token: currentUserService.getToken()
                    };
                    currentUserService.setUserDetails(userDetails);
                });
        }
    };
});