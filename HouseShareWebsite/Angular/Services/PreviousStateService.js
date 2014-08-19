angular.module('Services.PreviousState', [])
    .factory('previousState', function () {
        var _state = {};
        var _params = [];
        return {
            set: function(state, params) {
                _state = state;
                _params = params;
            },
            get: function() {
                return {
                    state: _state,
                    params: _params
                };
            }
        };
    });