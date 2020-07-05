# vertexCull.js
A very simple algorithm for culling vertices while minimally changing the shape of a polygon.

A simple algorithm that recursively removes sub-linear vertices to improve performance of spatial applications. Effective at preserving the shape of a polyline while substantially decreasing vertex count.  Not designed to be a subsitute for the Ramer-Douglas-Peucker algorithm, which is far more effective for large-scale generalisation.

# Use
Designed to be used at theta values of ```<= 5```. Will work for theta values ```> 5```, but the user may want to consider whether the Ramer-Douglas-Peucker algorithm is more appropriate in such cases. Most effective for large, regular shapes with lots of sub-linear vertices.

# Demo
https://bm13563.github.io/vertexCull.js/
