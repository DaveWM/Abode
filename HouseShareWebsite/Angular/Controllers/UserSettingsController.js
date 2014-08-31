angular.module('Controllers.UserSettings', ['angularFileUpload', 'Services.Users', 'Services.House', 'Services.Notifications', 'Directives.ProfilePic'])
    .config(function($stateProvider) {
        $stateProvider.state('app.main.userSettings', {
            url: '/settings/:userId',
            views: {
                '': {
                    templateUrl: 'Angular/Views/UserSettings.html',
                    controller: 'userSettingsController'
                }
            },
            data: {
                pageTitle: 'User Settings',
                allowHomeless: true
            },
            resolve: {
                user: function (usersService, $stateParams) {
                    var userId = $stateParams.userId;
                    return usersService.getUser(userId)
                        .then(function(response) {
                            return response.data;
                        });
                },
                house: function (houseService, user, $q) {
                    if (user.HouseId) {
                        return houseService.getHouse(user.HouseId)
                            .then(function(response) {
                                return response.data;
                            });
                    }
                    return {};
                },
                housemates: function (usersService, user, $q) {
                    if (user.HouseId) {
                        return usersService.getHousemates(user.HouseId)
                            .then(function(response) {
                                return response.data;
                            });
                    }
                    return [];
                }
            }
        });
    })
    .controller('userSettingsController', function($scope, $stateParams, $upload, $q, notificationsService, usersService, user, house, housemates) {
    $scope.user = user;
    $scope.house = house;
    $scope.housemates = housemates;

    var uploadUrl = server.endpoints.user.uploadprofilepicture.uri;
    $scope.uploadProfilePicture = function($files) {
        $upload.upload({
            url: uploadUrl,
            file: $files[0]
        }).then(function(response) {
            $scope.user.ProfilePictureUrl = JSON.parse(response.data) + "?" + new Date().getTime(); // the date bit is to force the image to refresh
        });
    };

    $scope.saving = false;
    $scope.save = function() {
        $scope.saving = true;
        usersService.updateUser($scope.user)
            .then(function() {
                notificationsService.notifySuccess('Updated User Details');
            })
            .finally(function() {
                $scope.saving = false;
            });
    };
});