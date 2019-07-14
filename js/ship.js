function drawShip(engineGlow = false) {
    if (alive) {
        ctx.save();

        if(angle > 360) {
            angle = angle - 360;
        } else if (angle < 0) {
            angle = angle + 360;
        }

        ctx.translate(xShip, yShip + 15);
        ctx.rotate(angle * Math.PI / 180);
        ctx.translate(-xShip, -(yShip +15));

        ctx.beginPath();
        // ctx.arc(xShip, yShip+17, 18, 0, 2 * Math.PI); //good shield. R 20
        ctx.shadowBlur = 10;
        ctx.shadowColor = "blue";
        ctx.lineWidth = 2;
        ctx.moveTo(xShip, yShip);
        ctx.lineTo(xShip + 12, yShip + 30);
        ctx.lineTo(xShip, yShip + 22);
        ctx.lineTo(xShip - 12, yShip + 30);
        ctx.lineTo(xShip, yShip);
        ctx.closePath();    
        ctx.strokeStyle = "rgba(50, 187, 46, 1)";
        ctx.stroke();
        ctx.fillStyle = "rgba(0, 114, 80, 1)";
        ctx.fill();
        
        ctx.restore();

        if (engineGlow) {
            setTimeout(function() {
                window.requestAnimationFrame(drawEngineGlow);
            }, 15);
        }
    }
}

function drawEngineGlow() {
    ctx.save();
    ctx.beginPath();

    ctx.translate(xShip, yShip + 15);
    ctx.rotate(angle * Math.PI / 180);
    ctx.translate(-xShip, -(yShip +15));

    ctx.shadowBlur = 10;
    ctx.shadowColor = "white";
    ctx.lineWidth = 1;
    ctx.moveTo(xShip, yShip + 24);
    ctx.lineTo(xShip + 6, yShip + 28);
    ctx.lineTo(xShip, yShip + 30);
    ctx.lineTo(xShip - 6, yShip + 28);
    ctx.lineTo(xShip, yShip + 24);
    ctx.lineTo(xShip, yShip + 32);

    ctx.strokeStyle = "rgb(132, 220, 255)";
    ctx.stroke();
    ctx.fillStyle = "rgb(132, 220, 255)";
    ctx.fill();

    ctx.closePath(); 
    ctx.restore();

    xDrift += (Math.cos( (angle - 90) * Math.PI / 180)/30);
    yDrift += (Math.sin( (angle - 90) * Math.PI / 180)/30);

    xShip += Math.cos( (angle - 90) * Math.PI / 180);
    yShip += Math.sin( (angle - 90) * Math.PI / 180);
}

class Remnants {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.xOrigin = x;
        this.yOrigin = y;
        this.distance = 0;
        this.speed = 0;
    }

    addRemnant(x, y, angle){
        if (alive){
            for (let i = 0; i < 150; i++)
            {
                const temp = {
                    id : remnants.length,
                    x : x,   
                    y : y,
                    angle : randA(),
                    xOrigin : x,
                    yOrigin : y,
                    distance : 0
                };
                remnants.push(temp);
            }
        }
    };

    drawShipPop() {   
        for (let i = 0; i < remnants.length; i++)
            {
                let x = remnants[i].x;
                let y = remnants[i].y;
                let angle = remnants[i].angle;
                let xOrigin = remnants[i].xOrigin;
                let yOrigin = remnants[i].yOrigin;
                let distance = remnants[i].distance;

                if (distance < randA() * 30) {
                    x += Math.cos( (angle - 90) * Math.PI / 180);
                    y += Math.sin( (angle - 90) * Math.PI / 180);
    
                    ctx.save();
                    ctx.translate(x, y + 15);
                    ctx.rotate(angle * Math.PI / 180);
                    ctx.translate(-x, -(y +15));
                    
                    ctx.beginPath(); 
    
                    ctx.lineWidth = 3;
                    ctx.shadowBlur = 3;
                    ctx.shadowColor = "rgb(255, 255, 255)";
                    ctx.moveTo(x, y + 3);
                    ctx.arc(x, y + 3, 1, 0, 2 * Math.PI);   
                    ctx.strokeStyle = "rgba(100, 255, 255, 1)";
                    ctx.stroke();
    
                    ctx.restore(); 
    
                    if (x < -10) {
                        x = ctx.canvas.width;
                    } else if (x > ctx.canvas.width + 10) {
                        x = 0;
                    }
                
                    if (y < -10) {
                        y = ctx.canvas.height;
                    } else if (y > ctx.canvas.height + 10) {
                        y = 0;
                    }
    
                } else {
                    remnants.splice(i, 1);
                    break;
                }
    
                remnants[i].x = x;
                remnants[i].y = y;
                remnants[i].angle = angle;
                remnants[i].xOrigin = xOrigin;
                remnants[i].yOrigin = yOrigin;
                remnants[i].distance++;
            };
            
        if (alive) {
            livesAdjust();
        }
    };
}