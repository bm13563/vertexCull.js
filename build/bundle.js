'use strict';

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

  this.draw = function (ctx) {
    var points = _this.polygon;
    var xoffset = (ctx.canvas.clientWidth - _this.xmax) / 2;
    var yoffset = (ctx.canvas.clientHeight - _this.ymax) / 2;
    ctx.lineWidth = 1;
    ctx.fillStyle = '#f00';
    ctx.beginPath();
    ctx.moveTo(points[0].x + xoffset, points[0].y + yoffset);

    for (var j = 1; j < points.length; j++) {
      ctx.lineTo(points[j].x + xoffset, points[j].y + yoffset);
    }

    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#000';

    for (var i = 0; i < points.length; i++) {
      ctx.beginPath();
      ctx.arc(points[i].x + xoffset, points[i].y + yoffset, 2, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    }
  };

  this.length = length;
  this.xmax = xmax;
  this.ymax = ymax;
  this.epsilon = epsilon;
  this.polygon = [];
  this.generatePolygon();
};

var CulledPolygon = function CulledPolygon(polygon, angle) {
  var _this = this;

  _classCallCheck(this, CulledPolygon);

  this.cullVertices = function () {
    for (var i = 0; i < _this.polygon.length; i++) {
      _this.checkCullCriteria(i, i + 1, i + 2);
    }

    console.log(_this.cullIndex);

    for (var j = 0; j < _this.vertexCount; j++) {
      if (!_this.cullIndex.includes(j)) {
        _this.culledPolygon.push(_this.polygon[j]);
      }
    }
  };

  this.checkCullCriteria = function (i, j, k) {
    if (_this.cullIndex.includes(j)) {
      return;
    }

    if (k >= _this.vertexCount) {
      var k = k - _this.vertexCount;
    }

    if (j >= _this.vertexCount) {
      var j = j - _this.vertexCount;
    }
    console.log(i, j, k);

    var thisNextAngle = _this.calcAngle(_this.polygon[i].x, _this.polygon[i].y, _this.polygon[j].x, _this.polygon[j].y);

    var nextLastAngle = _this.calcAngle(_this.polygon[j].x, _this.polygon[j].y, _this.polygon[k].x, _this.polygon[k].y);

    var theta = Math.abs(Math.atan2(Math.sin(thisNextAngle - nextLastAngle), Math.cos(thisNextAngle - nextLastAngle)));

    if (theta < _this.angle) {
      _this.cullIndex.push(j);

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

  this.draw = function (ctx) {
    var points = _this.polygon;
    var culledPoints = _this.culledPolygon;
    var xmax = Math.max.apply(Math, _this.polygon.map(function (o) {
      return o.x;
    }));
    var ymax = Math.max.apply(Math, _this.polygon.map(function (o) {
      return o.y;
    }));
    var xoffset = (ctx.canvas.clientWidth - xmax) / 2;
    var yoffset = (ctx.canvas.clientHeight - ymax) / 2;
    ctx.lineWidth = 1;
    ctx.fillStyle = '#f00';
    ctx.beginPath();
    ctx.moveTo(culledPoints[0].x + xoffset, culledPoints[0].y + yoffset);

    for (var j = 1; j < culledPoints.length; j++) {
      ctx.lineTo(culledPoints[j].x + xoffset, culledPoints[j].y + yoffset);
    }

    ctx.closePath();
    ctx.fill();

    for (var i = 0; i < points.length; i++) {
      ctx.fillStyle = '#0f0';
      ctx.beginPath();
      ctx.arc(points[i].x + xoffset, points[i].y + yoffset, 2, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
      ctx.fillStyle = '#000';
      ctx.font = "10px Arial";
      ctx.fillText(i, points[i].x + xoffset + 2, points[i].y + yoffset);
    }

    for (var _i = 0; _i < culledPoints.length; _i++) {
      ctx.beginPath();
      ctx.arc(culledPoints[_i].x + xoffset, culledPoints[_i].y + yoffset, 2, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    }
  };

  this.polygon = polygon;
  this.culledPolygon = [];
  this.vertexCount = polygon.length;
  this.angle = angle * Math.PI / 180;
  this.cullIndex = [];
  this.cullVertices();
};

var canvas1 = document.getElementById("canvas1");
var ctx1 = canvas1.getContext('2d');
var canvas2 = document.getElementById("canvas2");
var ctx2 = canvas2.getContext('2d');
var polygon = new RandomPolygon(25, 250, 250, 6);
polygon.draw(ctx1);
var culledPolygon = new CulledPolygon(polygon.polygon, 8);
culledPolygon.draw(ctx2);
