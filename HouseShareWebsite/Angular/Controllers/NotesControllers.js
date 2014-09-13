angular.module('Controllers.Notes', ['ui.bootstrap', 'Services.TileItems'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('app.main.createNote', {
                url: '/notes/create',
                templateUrl: 'Angular/Views/CreateNote.html',
                controller: 'createNoteController',
                data: {
                    transition: 'slide-left',
                    sidebarCollapsed: true,
                    pageTitle: 'Add a Note'
                }
            });
    })
    .controller('createNoteController', function($scope, tileItemsService, $state) {
        $scope.title = '';
        $scope.content = '';
        $scope.maxRating = 10;
        $scope.importanceRating = $scope.maxRating/2;

        $scope.saving = false;
        $scope.saveNote = function() {
            var note = {
                Content: $scope.content,
                Title: $scope.title,
                Importance: $scope.importanceRating / $scope.maxRating
            };

            $scope.saving = true;
            tileItemsService.createNote(note).then(function () {
                $state.go('app.main.whiteboard');
            })
            .finally(function() {
                $scope.saving = false;
            });
        };
    })
    .controller('viewNote', function() {
        
    });