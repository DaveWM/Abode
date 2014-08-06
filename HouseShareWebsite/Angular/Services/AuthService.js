angular.module('Services.Auth', ['Services.CurrentUser'])
    .factory('authService', function ($http, $q, $state, currentUserService) {

    return {
        login: function(email, password) {
            var deferred = $q.defer();
            $http.post('/Token', $.param({ // have to use this because server expects parameter string, not json
                    grant_type: 'password',
                    username: email,
                    password: password
                }), {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }
            ).then(function(response) {
                if (response.data.access_token) {
                    userDetails = {
                        email: response.data.userName,
                        name: response.data.realName,
                        houseId: response.data.houseId,
                        token: response.data.access_token
                    };
                    currentUserService.setUserDetails(userDetails);
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
            return $http.post(server.endpoints.account.ping.uri);
        },

        logout: function() {
            currentUserService.setUserDetails(null);
            $state.go('app.login');
        }
    };
});