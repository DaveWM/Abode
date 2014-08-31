angular.module('Directives.LiveTile', [])
    .directive('liveTile', function() {
        return {
            restrict: 'E',
            replace:true,
            template: '<div class="live-tile flyIn" ng-class="colourClass" ng-mouseenter="onMouseEnter()" ng-mouseleave="onMouseLeave()"><div class="slideContainer" ng-transclude></div></div>',
            transclude: true,
            scope: {
                colour: '@',
                animation: '@',
                speed: '@',
                hoverSlide: '@'
            },
            controller: function liveTile($scope, $window, $timeout) {
                $scope.colourClass = "live-tile-" + $scope.colour;

                var slides = [];
                this.addSlide = function($slideScope) {
                    var visible = slides.length == 0;
                    $slideScope.visible = visible;
                    $slideScope.animation = $scope.animation || 'flip-x';
                    slides.push($slideScope);
                };

                var changeFrequency;
                function calculateChangeFrequency() {
                    changeFrequency = baseFrequency + (($window.Math.random()) * variance);
                    changeFrequency *= ($scope.speed || 1);
                }
                var baseFrequency = 5000;
                var variance = 30000;
                calculateChangeFrequency();

                var currentSlide = 0;

                function goToNextSlide() {
                    var index = currentSlide + 1;
                    if (index >= slides.length) {
                        index = 0;
                    }
                    goToSlide(index);
                }

                function goToSlide(index) {
                    if (slides.length && index < slides.length) {
                        slides[currentSlide].visible = false;
                        slides[index].visible = true;
                        currentSlide = index;
                        calculateChangeFrequency();
                    }
                }

                var slideChangePromise;
                function startSliding() {
                    slideChangePromise = $timeout(function () {
                        goToNextSlide();
                        startSliding();
                    }, changeFrequency);
                }

                startSliding();

                $scope.onMouseEnter = function () {
                    if ($scope.hoverSlide) {
                        $timeout.cancel(slideChangePromise);
                        goToSlide($scope.hoverSlide);
                    }
                };
                $scope.onMouseLeave = function() {
                    if ($scope.hoverSlide) {
                        goToSlide(0);
                        startSliding();
                    }
                };
            }
        };
    })
    .directive('liveTileSlide', function() {
    return {
        require: '^liveTile',
        restrict: 'E',
        transclude: true,
        replace: true,
        template: '<div class="live-tile-slide disable-highlight col-xs-12" ng-class="animation" ng-show="visible" ng-transclude></div>',
        scope: {},
        link: function($scope, element, attrs, liveTileCtrl) {
            liveTileCtrl.addSlide($scope);
        }
    };
});