export class CulledPolygon {
    constructor(polygon, angle) {
        this.polygon = polygon;
        this.culledPolygon = [];
        this.vertexCount = polygon.length;
        this.angle = angle * Math.PI/180;
        this.cullIndex = [];
        this.cullVertices();
    }

    cullVertices = () => {
        for (let i = 0; i < this.polygon.length; i++) {
            this.checkCullCriteria(i, i+1, i+2);
        }

        for (let j=0; j < this.vertexCount; j++) {
            if (!(this.cullIndex.includes(j))) {
                this.culledPolygon.push(this.polygon[j])
            }
        }
    }

    checkCullCriteria = (i, j, k) => {
        if (this.cullIndex.includes(j)) { return; };
        if (k >= this.vertexCount) { var k = k - this.vertexCount; };
        if (j >= this.vertexCount) { var j = j - this.vertexCount; };
        var thisNextAngle = this.calcAngle(this.polygon[i].x, this.polygon[i].y, this.polygon[j].x, this.polygon[j].y);
        var nextLastAngle = this.calcAngle(this.polygon[j].x, this.polygon[j].y, this.polygon[k].x, this.polygon[k].y);
        var theta = Math.abs(Math.atan2(Math.sin(thisNextAngle - nextLastAngle), Math.cos(thisNextAngle - nextLastAngle)));
        if (theta < this.angle) {
            this.cullIndex.push(j);
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

    draw = (ctx) => {
        const points = this.polygon;
        const culledPoints = this.culledPolygon;
        const xmax = Math.max.apply(Math, this.polygon.map(function(o) { return o.x; }));
        const ymax = Math.max.apply(Math, this.polygon.map(function(o) { return o.y; }));
        const xoffset = (ctx.canvas.clientWidth - xmax) / 2;
        const yoffset = (ctx.canvas.clientHeight - ymax) / 2;

        ctx.lineWidth= 1;
        ctx.fillStyle = '#f00';
        ctx.beginPath();
        ctx.moveTo(culledPoints[0].x + xoffset, culledPoints[0].y + yoffset);
        for(let j=1; j < culledPoints.length; j++){
            ctx.lineTo(culledPoints[j].x + xoffset, culledPoints[j].y + yoffset);
        }
        ctx.closePath();
        ctx.fill();


        for(let i=0; i < points.length ; i++){
            ctx.fillStyle = '#00f';
            ctx.beginPath();
            ctx.arc(points[i].x + xoffset, points[i].y + yoffset, 2, 0, 2*Math.PI);
            ctx.fill();
            ctx.closePath();
        }

        ctx.fillStyle = '#000';
        for(let i=0; i < culledPoints.length ; i++){
            ctx.beginPath();
            ctx.arc(culledPoints[i].x + xoffset, culledPoints[i].y + yoffset, 2, 0, 2*Math.PI);
            ctx.fill();
            ctx.closePath();
        }
    }

}