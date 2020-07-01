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
var culledPolygon = new vc.CulledPolygon(polygon.polygon, 15);
util.drawCulled(
    ctx2, 
    culledPolygon.culledPolygon, 
    culledPolygon.culledPoint,
    culledPolygon.polygon
    )