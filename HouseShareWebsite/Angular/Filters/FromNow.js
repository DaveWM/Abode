angular.module('Filters.FromNow', [])
    .filter('fromNow', function() {
        return function(input) {
            return moment.duration(moment(input).diff(moment())).humanize(true);
        };
    });