angular.module('Controllers.ChoreDetails', [])
    .controller('choreDetailsController', function($scope, tileItemsService, $state) {
        $scope.completing = false;
    $scope.completeChore = function() {
        $scope.completing = true;
        tileItemsService.completeChore($scope.tileItem.Id)
            .then(function() {
                $state.go("app.main.whiteboard");
            })
            .finally(function() {
                $scope.completing = false;
            });
    };
});