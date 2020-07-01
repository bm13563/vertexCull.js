import * as vc from "../modules/vertexCull.js";
import * as util from "../modules/utils.js";

const bundle = window.bundle;
var canvas1=document.getElementById("canvas1")
var ctx1 = canvas1.getContext('2d');
var canvas2=document.getElementById("canvas2")
var ctx2 = canvas2.getContext('2d');

var theta = document.getElementById("theta-range").value;
document.getElementById("theta-value").innerHTML = theta;

var vertexCount = util.getRandomInt(40, 60);
var polygon = new rp.RandomPolygon(vertexCount, 250, 250, 6);
util.draw(ctx1, polygon.polygon);
var culledPolygon = new vc.CulledPolygon(polygon.polygon, 15);
util.drawCulled(ctx2, culledPolygon.culledPolygon, culledPolygon.culledPoint, true, true)
var drawVertices = { drawVertices: true, drawCulledVertices: true }

document.getElementById("vertex-count").innerHTML = "Vertex count = " + vertexCount;
document.getElementById("culled-vertex-count").innerHTML = "Vertex count = " + culledPolygon.culledPolygon.length;

document.getElementById("unculled-vertices").addEventListener('change', function(event) {
    if (event.target.checked) {
        ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        util.draw(ctx1, polygon.polygon, true);
        util.drawCulled(ctx2, culledPolygon.culledPolygon, culledPolygon.culledPoint, true, drawVertices.drawCulledVertices);
        drawVertices.drawVertices = true
    } else {
        ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        util.draw(ctx1, polygon.polygon, false);
        util.drawCulled(ctx2, culledPolygon.culledPolygon, culledPolygon.culledPoint, false, drawVertices.drawCulledVertices);
        drawVertices.drawVertices = false
    }
}); 

document.getElementById("culled-vertices").addEventListener('change', function(event) {
    if (event.target.checked) {
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        util.drawCulled(ctx2, culledPolygon.culledPolygon, culledPolygon.culledPoint, drawVertices.drawVertices, true);
        drawVertices.drawCulledVertices = true
    } else {
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        console.log(theta)
        util.drawCulled(ctx2, culledPolygon.culledPolygon, culledPolygon.culledPoint, drawVertices.drawVertices, false);
        drawVertices.drawCulledVertices = false
    }
});

document.getElementById("theta-range").oninput = function() {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    theta = this.value;
    document.getElementById("theta-value").innerHTML = theta;
    culledPolygon = new vc.CulledPolygon(polygon.polygon, theta);
    util.drawCulled(ctx2, culledPolygon.culledPolygon, culledPolygon.culledPoint, drawVertices.drawVertices, drawVertices.drawCulledVertices);

    document.getElementById("culled-vertex-count").innerHTML = "Vertex count = " + culledPolygon.culledPolygon.length;
}

document.getElementById("new-polygon").onclick = function(e){
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

    vertexCount = util.getRandomInt(40, 60);
    polygon = new rp.RandomPolygon(vertexCount, 250, 250, 6);
    util.draw(ctx1, polygon.polygon, drawVertices.drawVertices);
    culledPolygon = new vc.CulledPolygon(polygon.polygon, theta);
    util.drawCulled(ctx2, culledPolygon.culledPolygon, culledPolygon.culledPoint, drawVertices.drawVertices, drawVertices.drawCulledVertices)

    document.getElementById("vertex-count").innerHTML = "Vertex count = " + vertexCount;
    document.getElementById("culled-vertex-count").innerHTML = "Vertex count = " + culledPolygon.culledPolygon.length;
}