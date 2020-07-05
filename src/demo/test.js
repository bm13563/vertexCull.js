(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  (function (global, factory) {
    (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : (global = global || self, factory(global.rp = {}));
  })(undefined, function (exports) {

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    var RandomPolygon = function RandomPolygon(length, xmax, ymax) {
      var _this = this;

      var epsilon = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

      _classCallCheck(this, RandomPolygon);

      this.generatePolygon = function () {
        var theta = 360 / _this.length * (Math.PI / 180);
        var centre = {
          x: _this.xmax / 2,
          y: _this.ymax / 2
        };

        for (var i = 0; i < _this.length; i++) {
          var random = Math.pow(Math.random(), 1 / _this.epsilon);
          var angle = i * theta;
          var randomAngle = angle + random * theta;
          var absCosAngle = Math.abs(Math.cos(randomAngle));
          var absSinAngle = Math.abs(Math.sin(randomAngle));

          if (_this.xmax / 2 * absSinAngle <= _this.ymax / 2 * absCosAngle) {
            var magnitude = _this.xmax / 2 / absCosAngle;
          } else {
            var magnitude = _this.ymax / 2 / absSinAngle;
          }

          var xEdge = centre.x + Math.cos(randomAngle) * magnitude;
          var yEdge = centre.y + Math.sin(randomAngle) * magnitude;
          var vector = {
            x: xEdge - centre.x,
            y: yEdge - centre.y
          };

          _this.polygon.push({
            x: centre.x + random * vector.x,
            y: centre.y + random * vector.y
          });
        }
      };

      this.length = length;
      this.xmax = xmax;
      this.ymax = ymax;
      this.epsilon = epsilon;
      this.polygon = [];
      this.generatePolygon();
    };

    exports.RandomPolygon = RandomPolygon;
    Object.defineProperty(exports, '__esModule', {
      value: true
    });
  });

  rp.RandomPolygon(10000, 1000, 1000, 8);

})));
