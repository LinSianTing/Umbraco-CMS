angular.module("umbraco.directives")

    /**
    * @ngdoc directive
    * @name umbraco.directives.directive:localize
    * @restrict E
    * @function
    * @description Localize element directive
    **/
    .directive('localize', function ($log, localizationService) {
        return {
            restrict: 'E',
            scope:{
                key: '@'
            },
            replace: true,

            link: function (scope, element, attrs) {
                var key = scope.key;
                localizationService.localize(key).then(function(value){
                    element.html(value);
                });
            }
        };
    })

    /**
    * @ngdoc directive
    * @name umbraco.directives.directive:localize
    * @restrict A
    * @function
    * @description Localize attribute directive
    **/
    .directive('localize', function ($log, localizationService) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var keys = attrs.localize.split(',');

                angular.forEach(keys, function(value, key){
                    var attr = element.attr(value);

                    if(attr){
                        if(attr[0] === '@'){

                            var t = localizationService.tokenize(attr.substring(1), scope);
                            localizationService.localize(t.key, t.tokens).then(function(val){
                                    element.attr(value, val);
                            });

                        }
                    }
                });
            }
        };

    });