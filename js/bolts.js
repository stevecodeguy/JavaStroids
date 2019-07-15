class Bolt {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.xOrigin = x;
        this.yOrigin = y;
        this.distance = 0;
    }

    addBolt(x, y, angle){
        const temp = {
            id : activeBolt.length,
            x : x,   
            y : y,
            angle : angle,
            xOrigin : x,
            yOrigin : y,
            distance : 0
        };
        activeBolt.push(temp);
        laser.play();
    };

    drawBolts() {
        for (let i = 0; i < activeBolt.length; i++)
        {
            let x = activeBolt[i].x;
            let y = activeBolt[i].y;
            let angle = activeBolt[i].angle;
            let xOrigin = activeBolt[i].xOrigin;
            let yOrigin = activeBolt[i].yOrigin;
            let distance = activeBolt[i].distance;

            if (distance < 380) {
                x += Math.cos( (angle - 90) * Math.PI / 180);
                y += Math.sin( (angle - 90) * Math.PI / 180);

                ctx.save();
                ctx.translate(x, y + 15);
                ctx.rotate(angle * Math.PI / 180);
                ctx.translate(-x, -(y +15));
                
                ctx.beginPath(); 

                ctx.lineWidth = 3;
                ctx.shadowBlur = 3;
                ctx.shadowColor = "rgb(174, 255, 0)";
                ctx.moveTo(x, y + 3);
                ctx.arc(x, y + 3, 1, 0, 2 * Math.PI);   
                ctx.strokeStyle = "rgba(255, 255, 255, 1)";
                ctx.stroke();

                ctx.restore(); 

                if (x < -10) {
                    x = ctx.canvas.width;
                } else if (x > ctx.canvas.width + 10) {
                    x = 0;
                }
            
                if (y < -10) {
                    y = (ctx.canvas.height - 100);
                } else if (y > ctx.canvas.height - 90) {
                    y = 0;
                }

            } else {
                activeBolt.splice(i, 1);
                break;
            }

            activeBolt[i].x = x;
            activeBolt[i].y = y;
            activeBolt[i].angle = angle;
            activeBolt[i].xOrigin = xOrigin;
            activeBolt[i].yOrigin = yOrigin;
            activeBolt[i].distance++;
        };
    }
}