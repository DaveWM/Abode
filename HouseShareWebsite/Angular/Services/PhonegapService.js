angular.module('Services.Phonegap', ['Services.PreviousState'])
    .factory('phonegapService', function (previousState, $document, $window, $rootScope) {
    var onBackButtonPressed = function() {};
    $document[0].addEventListener("backbutton", function () {
        var prevState = previousState.get();
        if (prevState.state) {
            onBackButtonPressed(prevState.state, prevState.params);
        }
    }, false);

    $document[0].addEventListener("menubutton", function() {
        $rootScope.sidebar.collapsed = !$rootScope.sidebar.collapsed;
        $rootScope.$apply();
    });

    return {
        notifyPhone: $window.plugin && $window.plugin.notification && $window.plugin.notification.local ? $window.plugin.notification.local.add :
            function () { },
        setBackButtonFunc: function(func) {
            onBackButtonPressed = func;
        }
    };
});