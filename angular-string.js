(function(window, angular) {
  "use strict";

  angular.module("angular-string",[])
    .service("string", ["$window",
      function ($window) {
        var service = {},
            S = $window.S;

        var s = new S(),
            availableMethods = Object.keys(Object.getPrototypeOf(s)); // collect library method names

        angular.forEach(availableMethods, function(method) {
          service[method] = function() {
            var value = [].shift.apply(arguments),
                stringObj = new S(value);

            if (typeof stringObj[method] === "undefined") {
              return;
            }
            var output = stringObj[method].apply(stringObj, arguments);

            return typeof output.s !== "undefined" ? output.s : output;
          };
        });

        return service;
      }])
    .filter("string", [
      "string",
      function(string) {
        return function () {
          var args = [].slice.call(arguments);

          var method = args.splice(1, 1);
          if (typeof string[method] === "undefined") {
            return args[0];
          }

          return string[method].apply(null, args);
        };
      }
    ]);
})(window, window.angular);
