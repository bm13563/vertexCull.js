import * as rp from "./modules/randomPolys.js";
import * as vc from "./modules/vertexCull.js";

var canvas1=document.getElementById("canvas1")
var ctx1 = canvas1.getContext('2d');
var canvas2=document.getElementById("canvas2")
var ctx2 = canvas2.getContext('2d');

var polygon = new rp.RandomPolygon(25, 250, 250, 6);
polygon.draw(ctx1);
var culledPolygon = new vc.CulledPolygon(polygon.polygon, 8);
culledPolygon.draw(ctx2);
