angular.module('Services.Auth', ['Services.CurrentUser'])
    .factory('authService', function ($http, $q, $state, currentUserService) {
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
            $http.post(globalConfig.apiUrl + '/Token', $.param({ // have to use this because server expects parameter string, not json
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
            return $http.post(server.endpoints.account.register.uri, {
                Email: email,
                Password: password,
                ConfirmPassword: password, // fuck da police
                Name: name
            });
        },

        ping: function() {
            return $http.post(server.endpoints.account.ping.uri)
            .then(function(response) {
                currentUserService.setToken(JSON.parse(response.data));
                return response;
            });
        },

        logout: function() {
            currentUserService.setUserDetails(null);
            $state.go('app.login');
        },
        getUserInfo: function() {
            return $http.get(server.endpoints.account.getuserinfo.uri)
                .then(function (response) {
                var data = response.data;
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