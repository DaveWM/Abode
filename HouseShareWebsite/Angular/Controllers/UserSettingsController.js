angular.module('Controllers.UserSettings', ['angularFileUpload', 'Services.Users', 'Services.House', 'Services.Notifications', 'Directives.ProfilePic', 'ui.bootstrap'])
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
    $scope.uploading = false;
    $scope.uploadProgress = 0;
    $scope.uploadProfilePicture = function($files) {
        $scope.uploading = true;
        $upload.upload({
            url: uploadUrl,
            method: 'POST',
            file: $files[0]
        })
            .progress(function (evt) {
                console.log('progress');
                $scope.uploadProgress = parseInt(100 * evt.loaded / evt.total);
            })
            .then(function (response) {
                $scope.user.ProfilePictureUrl = JSON.parse(response.data);
                notificationsService.notifySuccess('Uploaded new Image (you still need to save)');
            })
            .finally(function() {
                $scope.uploading = false;
                $scope.uploadProgress = 0;
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