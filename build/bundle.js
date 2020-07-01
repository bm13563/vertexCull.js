(function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var CulledPolygon = function CulledPolygon(polygon, angle) {
    var _this = this;

    _classCallCheck(this, CulledPolygon);

    this.cullVertices = function () {
      for (var i = 0; i < _this.polygon.length; i++) {
        _this.checkCullCriteria(i, i + 1, i + 2);
      }

      for (var j = 0; j < _this.vertexCount; j++) {
        if (!_this.culledIndex.includes(j)) {
          _this.culledPolygon.push(_this.polygon[j]);
        } else {
          _this.culledPoint.push(_this.polygon[j]);
        }
      }
    };

    this.checkCullCriteria = function (i, j, k) {
      if (_this.culledIndex.includes(j)) {
        return;
      }

      if (k >= _this.vertexCount) {
        var k = k - _this.vertexCount;
      }

      if (j >= _this.vertexCount) {
        var j = j - _this.vertexCount;
      }

      var thisNextAngle = _this.calcAngle(_this.polygon[i].x, _this.polygon[i].y, _this.polygon[j].x, _this.polygon[j].y);

      var nextLastAngle = _this.calcAngle(_this.polygon[j].x, _this.polygon[j].y, _this.polygon[k].x, _this.polygon[k].y);

      var theta = Math.abs(Math.atan2(Math.sin(thisNextAngle - nextLastAngle), Math.cos(thisNextAngle - nextLastAngle)));

      if (theta < _this.angle) {
        _this.culledIndex.push(j);

        if (k < _this.vertexCount) {
          return _this.checkCullCriteria(i, j + 1, k + 1);
        }
      }
    };

    this.calcAngle = function (cx, cy, ex, ey) {
      var dy = ey - cy;
      var dx = ex - cx;
      var theta = Math.atan2(dy, dx);
      return theta;
    };

    this.polygon = polygon;
    this.culledPolygon = [];
    this.vertexCount = polygon.length;
    this.angle = angle * Math.PI / 180;
    this.culledIndex = [];
    this.culledPoint = [];
    this.cullVertices();
  };

  var polygon = new rp.RandomPolygon(50, 250, 250, 5);
  var culledPolygon = new CulledPolygon(polygon.polygon, 15);

}());
