# vertexCull.js
A very simple algorithm for culling excess vertices on a polygon without changing the shape of the polygon.

A simple algorithm designed to remove sub-linear vertices of a polygon to improve performance of spatial applications. Effective at preserving the shape of a polyline while substantially decreasing vertex count.  Not designed to be a subsitute for the Ramer-Douglas-Peucker algorithm, which is far more effective for large-scale generalisation.

# Use
Designed to be used at theta values of ```<= 5```. Will work for theta values ```> 5```, but the user may want to consider whether the Ramer-Douglas-Peucker algorithm is more effective in such cases. There are excellent implementations of this algorithm in javascript.

# Demo
https://bm13563.github.io/vertexCull.js/
