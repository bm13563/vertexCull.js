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

var draw = function draw(ctx, points) {
  var xmax = Math.max.apply(Math, points.map(function (o) {
    return o.x;
  }));
  var ymax = Math.max.apply(Math, points.map(function (o) {
    return o.y;
  }));
  var xmin = Math.min.apply(Math, points.map(function (o) {
    return o.x;
  }));
  var ymin = Math.min.apply(Math, points.map(function (o) {
    return o.y;
  }));
  var xoffset = (ctx.canvas.clientWidth - (xmax - xmin)) / 2 - xmin;
  var yoffset = (ctx.canvas.clientHeight - (ymax - ymin)) / 2 - ymin;
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
var drawCulled = function drawCulled(ctx, culledPolygon, culledPoints, polygon) {
  var points = culledPolygon;
  var xmax = Math.max.apply(Math, points.map(function (o) {
    return o.x;
  }));
  var ymax = Math.max.apply(Math, points.map(function (o) {
    return o.y;
  }));
  var xmin = Math.min.apply(Math, points.map(function (o) {
    return o.x;
  }));
  var ymin = Math.min.apply(Math, points.map(function (o) {
    return o.y;
  }));
  var xoffset = (ctx.canvas.clientWidth - (xmax - xmin)) / 2 - xmin;
  var yoffset = (ctx.canvas.clientHeight - (ymax - ymin)) / 2 - ymin;
  ctx.lineWidth = 1;
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.moveTo(points[0].x + xoffset, points[0].y + yoffset);

  for (var j = 1; j < points.length; j++) {
    ctx.lineTo(points[j].x + xoffset, points[j].y + yoffset);
  }

  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#0f0';

  for (var i = 0; i < points.length; i++) {
    ctx.beginPath();
    ctx.arc(points[i].x + xoffset, points[i].y + yoffset, 3, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }

  for (var _i = 0; _i < culledPoints.length; _i++) {
    ctx.fillStyle = '#f00';
    ctx.beginPath();
    ctx.arc(culledPoints[_i].x + xoffset, culledPoints[_i].y + yoffset, 3, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }
};

var canvas1 = document.getElementById("canvas1");
var ctx1 = canvas1.getContext('2d');
var canvas2 = document.getElementById("canvas2");
var ctx2 = canvas2.getContext('2d');
var polygon = new rp.RandomPolygon(50, 250, 250, 8);
draw(ctx1, polygon.polygon);
var culledPolygon = new CulledPolygon(polygon.polygon, 15);
var culledPolygon = new CulledPolygon(polygon.polygon, 15);
drawCulled(ctx2, culledPolygon.culledPolygon, culledPolygon.culledPoint, culledPolygon.polygon);