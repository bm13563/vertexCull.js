import * as vc from "./modules/vertexCull.js";

const bundle = window.bundle;
var polygon = new rp.RandomPolygon(50, 250, 250, 5);
var culledPolygon = new vc.CulledPolygon(polygon.polygon, 15);
