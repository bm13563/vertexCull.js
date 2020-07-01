# vertexCull.js
A very simple algorithm for culling excess vertices on a polygon without changing the shape of the polygon.

A simple algorithm designed to remove sub-linear vertices of a polygon to improve performance of spatial applications in O(n) time. Effective at preserving the shape of a polyline while substantially decreasing vertex count.  Not designed to be a subsitute for the Ramey-Douglas-Peucker algorithm, which is far more effective for large-scale generalisation.

# Demo
https://bm13563.github.io/vertexCull.js/
