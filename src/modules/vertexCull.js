export class CulledPolygon {
    constructor(polygon, angle) {
        this.polygon = polygon;
        this.culledPolygon = [];
        this.vertexCount = polygon.length;
        this.angle = angle * Math.PI/180;
        this.culledIndex = [];
        this.culledPoint = [];
        this.cullVertices();
    }

    cullVertices = () => {
        for (let i = 0; i < this.polygon.length; i++) {
            this.checkCullCriteria(i, i+1, i+2);
        }

        for (let j=0; j < this.vertexCount; j++) {
            if (!(this.culledIndex.includes(j))) {
                this.culledPolygon.push(this.polygon[j]);
            } else {
                this.culledPoint.push(this.polygon[j]);
            }
        }
    }

    checkCullCriteria = (i, j, k) => {
        if (this.culledIndex.includes(j)) { return; };
        if (k >= this.vertexCount) { var k = k - this.vertexCount; };
        if (j >= this.vertexCount) { var j = j - this.vertexCount; };
        var thisNextAngle = this.calcAngle(this.polygon[i].x, this.polygon[i].y, this.polygon[j].x, this.polygon[j].y);
        var nextLastAngle = this.calcAngle(this.polygon[j].x, this.polygon[j].y, this.polygon[k].x, this.polygon[k].y);
        var theta = Math.abs(Math.atan2(Math.sin(thisNextAngle - nextLastAngle), Math.cos(thisNextAngle - nextLastAngle)));
        if (theta < this.angle) {
            this.culledIndex.push(j);
            if (k < this.vertexCount) {
                return this.checkCullCriteria(i, j + 1, k + 1);
            }
        }
    }

    calcAngle = (cx, cy, ex, ey) => {
        var dy = ey - cy;
        var dx = ex - cx;
        var theta = Math.atan2(dy, dx);
        return theta;
    }

}