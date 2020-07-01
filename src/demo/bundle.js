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
  var drawVertices = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
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
  ctx.fillStyle = '#989898';
  ctx.strokeStyle = '#00f';
  ctx.beginPath();
  ctx.moveTo(points[0].x + xoffset, points[0].y + yoffset);

  for (var j = 1; j < points.length; j++) {
    ctx.lineTo(points[j].x + xoffset, points[j].y + yoffset);
  }

  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  if (drawVertices) {
    ctx.fillStyle = '#0f0';

    for (var i = 0; i < points.length; i++) {
      ctx.beginPath();
      ctx.arc(points[i].x + xoffset, points[i].y + yoffset, 3, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    }
  }
};
var drawCulled = function drawCulled(ctx, culledPolygon, culledPoints, drawVertices, drawCulledVertices) {
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
  ctx.fillStyle = '#989898';
  ctx.strokeStyle = '#00f';
  ctx.beginPath();
  ctx.moveTo(points[0].x + xoffset, points[0].y + yoffset);

  for (var j = 1; j < points.length; j++) {
    ctx.lineTo(points[j].x + xoffset, points[j].y + yoffset);
  }

  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  if (drawVertices) {
    ctx.fillStyle = '#0f0';

    for (var i = 0; i < points.length; i++) {
      ctx.beginPath();
      ctx.arc(points[i].x + xoffset, points[i].y + yoffset, 3, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    }
  }

  if (drawCulledVertices) {
    for (var _i = 0; _i < culledPoints.length; _i++) {
      ctx.fillStyle = '#f00';
      ctx.beginPath();
      ctx.arc(culledPoints[_i].x + xoffset, culledPoints[_i].y + yoffset, 3, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    }
  }
};
var getRandomInt = function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var canvas1 = document.getElementById("canvas1");
var ctx1 = canvas1.getContext('2d');
var canvas2 = document.getElementById("canvas2");
var ctx2 = canvas2.getContext('2d');
var theta = document.getElementById("theta-range").value;
document.getElementById("theta-value").innerHTML = theta;
var vertexCount = getRandomInt(40, 60);
var polygon = new rp.RandomPolygon(vertexCount, 250, 250, 6);
draw(ctx1, polygon.polygon);
var culledPolygon = new CulledPolygon(polygon.polygon, 15);
drawCulled(ctx2, culledPolygon.culledPolygon, culledPolygon.culledPoint, true, true);
var drawVertices = {
  drawVertices: true,
  drawCulledVertices: true
};
document.getElementById("vertex-count").innerHTML = "Vertex count = " + vertexCount;
document.getElementById("culled-vertex-count").innerHTML = "Vertex count = " + culledPolygon.culledPolygon.length;
document.getElementById("unculled-vertices").addEventListener('change', function (event) {
  if (event.target.checked) {
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    draw(ctx1, polygon.polygon, true);
    drawCulled(ctx2, culledPolygon.culledPolygon, culledPolygon.culledPoint, true, drawVertices.drawCulledVertices);
    drawVertices.drawVertices = true;
  } else {
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    draw(ctx1, polygon.polygon, false);
    drawCulled(ctx2, culledPolygon.culledPolygon, culledPolygon.culledPoint, false, drawVertices.drawCulledVertices);
    drawVertices.drawVertices = false;
  }
});
document.getElementById("culled-vertices").addEventListener('change', function (event) {
  if (event.target.checked) {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    drawCulled(ctx2, culledPolygon.culledPolygon, culledPolygon.culledPoint, drawVertices.drawVertices, true);
    drawVertices.drawCulledVertices = true;
  } else {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    console.log(theta);
    drawCulled(ctx2, culledPolygon.culledPolygon, culledPolygon.culledPoint, drawVertices.drawVertices, false);
    drawVertices.drawCulledVertices = false;
  }
});

document.getElementById("theta-range").oninput = function () {
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  theta = this.value;
  document.getElementById("theta-value").innerHTML = theta;
  culledPolygon = new CulledPolygon(polygon.polygon, theta);
  drawCulled(ctx2, culledPolygon.culledPolygon, culledPolygon.culledPoint, drawVertices.drawVertices, drawVertices.drawCulledVertices);
  document.getElementById("culled-vertex-count").innerHTML = "Vertex count = " + culledPolygon.culledPolygon.length;
};

document.getElementById("new-polygon").onclick = function (e) {
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  vertexCount = getRandomInt(40, 60);
  polygon = new rp.RandomPolygon(vertexCount, 250, 250, 6);
  draw(ctx1, polygon.polygon, drawVertices.drawVertices);
  culledPolygon = new CulledPolygon(polygon.polygon, theta);
  drawCulled(ctx2, culledPolygon.culledPolygon, culledPolygon.culledPoint, drawVertices.drawVertices, drawVertices.drawCulledVertices);
  document.getElementById("vertex-count").innerHTML = "Vertex count = " + vertexCount;
  document.getElementById("culled-vertex-count").innerHTML = "Vertex count = " + culledPolygon.culledPolygon.length;
};
