import * as vc from "../modules/vertexCull.js";
import * as util from "../modules/utils.js";

const bundle = window.bundle;
var canvas1=document.getElementById("canvas1")
var ctx1 = canvas1.getContext('2d');
var canvas2=document.getElementById("canvas2")
var ctx2 = canvas2.getContext('2d');
var canvas3=document.getElementById("canvas3")
var ctx3 = canvas3.getContext('2d');

var theta = document.getElementById("theta-range").value;
document.getElementById("theta-value").innerHTML = theta;
var tolerance = document.getElementById("tolerance-range").value;
document.getElementById("tolerance-value").innerHTML = tolerance;

var vertexCount = util.getRandomInt(20, 100);
var epsilon = util.getRandomInt(2, 8);
var polygon = new rp.RandomPolygon(vertexCount, 250, 250, epsilon);
util.draw(ctx1, polygon.polygon);
var culledPolygon = new vc.CulledPolygon(polygon.polygon, 10);
util.drawCulled(ctx2, culledPolygon.culledPolygon, culledPolygon.culledPoint, true, true)
var drawVertices = { drawVertices: true, drawCulledVertices: true }

// set up simplify for comparison
var simplifyPolygon = simplify(polygon.polygon, 1, false);
var simplifyCulled = [];
for (let i = 0; i < polygon.polygon.length; i++) {
    if (!(simplifyPolygon.includes(polygon.polygon[i]))) {
        simplifyCulled.push(polygon.polygon[i]);
    }
}
util.drawCulled(ctx3, simplifyPolygon, simplifyCulled, true, true);
var simplifyVertices = { drawVertices: true, drawCulledVertices: true }

document.getElementById("vertex-count").innerHTML = "Vertex count = " + vertexCount;
document.getElementById("culled-vertex-count").innerHTML = "Vertex count = " + culledPolygon.culledPolygon.length;
document.getElementById("dp-vertex-count").innerHTML = "Vertex count = " + simplifyPolygon.length;

document.getElementById("unculled-vertices").addEventListener('change', function(event) {
    if (event.target.checked) {
        ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
        util.draw(ctx1, polygon.polygon, true);
        util.drawCulled(ctx2, culledPolygon.culledPolygon, culledPolygon.culledPoint, true, drawVertices.drawCulledVertices);
        util.drawCulled(ctx3, simplifyPolygon, simplifyCulled, true, simplifyVertices.drawCulledVertices);
        drawVertices.drawVertices = true;
        simplifyVertices.drawVertices = true;
    } else {
        ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
        util.draw(ctx1, polygon.polygon, false);
        util.drawCulled(ctx2, culledPolygon.culledPolygon, culledPolygon.culledPoint, false, drawVertices.drawCulledVertices);
        util.drawCulled(ctx3, simplifyPolygon, simplifyCulled, false, simplifyVertices.drawCulledVertices);
        drawVertices.drawVertices = false;
        simplifyVertices.drawVertices = false;
    }
}); 

document.getElementById("culled-vertices").addEventListener('change', function(event) {
    if (event.target.checked) {
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
        util.drawCulled(ctx2, culledPolygon.culledPolygon, culledPolygon.culledPoint, drawVertices.drawVertices, true);
        util.drawCulled(ctx3, simplifyPolygon, simplifyCulled, simplifyVertices.drawVertices, true);
        drawVertices.drawCulledVertices = true;
        simplifyVertices.drawCulledVertices = true;
    } else {
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
        util.drawCulled(ctx2, culledPolygon.culledPolygon, culledPolygon.culledPoint, drawVertices.drawVertices, false);
        util.drawCulled(ctx3, simplifyPolygon, simplifyCulled, simplifyVertices.drawVertices, false);
        drawVertices.drawCulledVertices = false;
        simplifyVertices.drawCulledVertices = false;
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

document.getElementById("tolerance-range").oninput = function() {
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
    tolerance = this.value;
    document.getElementById("tolerance-value").innerHTML = tolerance;
    simplifyPolygon = simplify(polygon.polygon, tolerance, false);
    simplifyCulled = [];
    for (let i = 0; i < polygon.polygon.length; i++) {
        if (!(simplifyPolygon.includes(polygon.polygon[i]))) {
            simplifyCulled.push(polygon.polygon[i]);
        }
    }
    util.drawCulled(ctx3, simplifyPolygon, simplifyCulled, simplifyVertices.drawVertices, simplifyVertices.drawCulledVertices);

    document.getElementById("dp-vertex-count").innerHTML = "Vertex count = " + simplifyPolygon.length;
}

document.getElementById("new-polygon").onclick = function(e){
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height);

    vertexCount = util.getRandomInt(40, 60);
    epsilon = util.getRandomInt(2, 8);
    polygon = new rp.RandomPolygon(vertexCount, 250, 250, epsilon);
    util.draw(ctx1, polygon.polygon, drawVertices.drawVertices);
    culledPolygon = new vc.CulledPolygon(polygon.polygon, theta);
    util.drawCulled(ctx2, culledPolygon.culledPolygon, culledPolygon.culledPoint, drawVertices.drawVertices, drawVertices.drawCulledVertices)

    simplifyPolygon = simplify(polygon.polygon, tolerance, false);
    simplifyCulled = [];
    for (let i = 0; i < polygon.polygon.length; i++) {
        if (!(simplifyPolygon.includes(polygon.polygon[i]))) {
            simplifyCulled.push(polygon.polygon[i]);
        }
    }
    util.drawCulled(ctx3, simplifyPolygon, simplifyCulled, simplifyVertices.drawVertices, simplifyVertices.drawCulledVertices);

    document.getElementById("vertex-count").innerHTML = "Vertex count = " + vertexCount;
    document.getElementById("culled-vertex-count").innerHTML = "Vertex count = " + culledPolygon.culledPolygon.length;
    document.getElementById("dp-vertex-count").innerHTML = "Vertex count = " + simplifyPolygon.length;
}