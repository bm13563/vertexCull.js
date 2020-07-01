import * as vc from "../modules/vertexCull.js";
import * as util from "../modules/utils.js";

const bundle = window.bundle;
var canvas1=document.getElementById("canvas1")
var ctx1 = canvas1.getContext('2d');
var canvas2=document.getElementById("canvas2")
var ctx2 = canvas2.getContext('2d');

var polygon = new rp.RandomPolygon(50, 250, 250, 8);
util.draw(ctx1, polygon.polygon);
var culledPolygon = new vc.CulledPolygon(polygon.polygon, 15);
util.drawCulled(ctx2, culledPolygon.culledPolygon, culledPolygon.culledPoint, true, true)

var drawVertices = { drawVertices: true, drawCulledVertices: true }

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
        util.drawCulled(ctx2, culledPolygon.culledPolygon, culledPolygon.culledPoint, drawVertices.drawVertices, false);
        drawVertices.drawCulledVertices = false
    }
});