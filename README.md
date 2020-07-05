# vertexCull.js
A very simple algorithm for culling vertices while minimally changing the shape of a polygon.

A simple algorithm that recursively removes sub-linear vertices to improve performance of spatial applications. Effective at preserving the shape of a polygon while substantially decreasing vertex count, particularly  with regularly-shaped polygons (e.g buildings).  Not designed to be a subsitute for the Ramer-Douglas-Peucker algorithm, which is far more effective for large-scale generalisation.

# Source

```javascript
// URL
<script src="https://bm13563.github.io/vertexCull.js/build/bundle.js"></script>

// NODE
npm install vertexcull
```

NPM package info: https://www.npmjs.com/package/vertexcull.

# Use

```javascript
// FROM URL
var culledPolygon = new vc.CulledPolygon(polygon, theta);
console.log(culledPolygon.culledPolygon);

// FROM NODE
var vc = require('vertexcull/build/bundle');
var culledPolygon = new vc.CulledPolygon(polygon, theta);
console.log(culledPolygon.culledPolygon);
```
Where **polygon** is an array in the form ```[{x:100, y:200}, {x:300, y:400}, ...] ``` and **theta** is a tolerance for point discarding. Designed to be used at theta values of ```<= 5```. Will work for theta values ```> 5```, but the user may want to consider whether the Ramer-Douglas-Peucker algorithm is more appropriate in such cases.

# Demo
https://bm13563.github.io/vertexCull.js/
