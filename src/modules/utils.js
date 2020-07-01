export const draw = (ctx, points, drawVertices=true) => {
    const xmax = Math.max.apply(Math, points.map(function(o) { return o.x; }));
    const ymax = Math.max.apply(Math, points.map(function(o) { return o.y; }));
    const xmin = Math.min.apply(Math, points.map(function(o) { return o.x; }));
    const ymin = Math.min.apply(Math, points.map(function(o) { return o.y; }));
    const xoffset = (((ctx.canvas.clientWidth) - (xmax - xmin)) / 2) - xmin;
    const yoffset = (((ctx.canvas.clientHeight) - (ymax - ymin)) / 2) - ymin;
    
    ctx.lineWidth= 1;
    ctx.fillStyle = '#989898';
    ctx.strokeStyle = '#00f';
    ctx.beginPath();
    ctx.moveTo(points[0].x + xoffset, points[0].y + yoffset);
    for(let j=1; j < points.length; j++){
        ctx.lineTo(points[j].x + xoffset, points[j].y + yoffset);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    if (drawVertices) {
        ctx.fillStyle = '#0f0';
        for(let i=0; i < points.length ; i++){
            ctx.beginPath();
            ctx.arc(points[i].x + xoffset, points[i].y + yoffset, 3, 0, 2*Math.PI);
            ctx.fill();
            ctx.closePath();
        }
    }
}

export const drawCulled = (ctx, culledPolygon, culledPoints, drawVertices, drawCulledVertices) => {
    const points = culledPolygon;
    const xmax = Math.max.apply(Math, points.map(function(o) { return o.x; }));
    const ymax = Math.max.apply(Math, points.map(function(o) { return o.y; }));
    const xmin = Math.min.apply(Math, points.map(function(o) { return o.x; }));
    const ymin = Math.min.apply(Math, points.map(function(o) { return o.y; }));
    const xoffset = (((ctx.canvas.clientWidth) - (xmax - xmin)) / 2) - xmin;
    const yoffset = (((ctx.canvas.clientHeight) - (ymax - ymin)) / 2) - ymin;

    ctx.lineWidth= 1;
    ctx.fillStyle = '#989898';
    ctx.strokeStyle = '#00f';
    ctx.beginPath();
    ctx.moveTo(points[0].x + xoffset, points[0].y + yoffset);
    for(let j=1; j < points.length; j++){
        ctx.lineTo(points[j].x + xoffset, points[j].y + yoffset);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    if (drawVertices) {
        ctx.fillStyle = '#0f0';
        for(let i=0; i < points.length ; i++){
            ctx.beginPath();
            ctx.arc(points[i].x + xoffset, points[i].y + yoffset, 3, 0, 2*Math.PI);
            ctx.fill();
            ctx.closePath();
        }
    }
    
    if (drawCulledVertices){
        for(let i=0; i < culledPoints.length ; i++){
            ctx.fillStyle = '#f00';
            ctx.beginPath();
            ctx.arc(culledPoints[i].x + xoffset, culledPoints[i].y + yoffset, 3, 0, 2*Math.PI);
            ctx.fill();
            ctx.closePath();
        }
    }
}