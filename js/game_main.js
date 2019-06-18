var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var rotateRight = false;
var rotateLeft = false;
var thrust = false;
var shoot = false;

var angle = 0;

var dx = 2;
var dy = 2;
var shipRadius = 15;

ctx.canvas.width  = window.innerWidth - 2;
ctx.canvas.height = window.innerHeight - 2;

let xShip = (ctx.canvas.width - 2) / 2;
let yShip = (ctx.canvas.height - 2 ) / 2;
let xBolt = 0;
let yBolt = 0;

function drawShip(engineGlow = false) {
    ctx.save();

    ctx.translate(xShip, yShip + 15);
    ctx.rotate(angle * Math.PI / 180);
    ctx.translate(-xShip, -(yShip +15));

    ctx.beginPath();
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
        requestAnimationFrame(drawEngineGlow);
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

    xShip += Math.cos( (angle - 90) * Math.PI / 180);
    yShip += Math.sin( (angle - 90) * Math.PI / 180);
}

function drawBolt(x, y, boltAngle) {
    xBolt = x;
    yBolt = y;

    ctx.save();
    ctx.beginPath(); 

    if (xBolt === xShip && yBolt === yShip) {
        ctx.rotate(angle * Math.PI / 180);
    }

    ctx.lineWidth = 3;
    ctx.shadowBlur = 3;
    ctx.shadowColor = "rgb(174, 255, 0)";
    ctx.moveTo(xBolt, yBolt + 3);
    ctx.arc(xBolt, yBolt + 3, 1, 0, 2 * Math.PI);   
    ctx.strokeStyle = "rgba(255, 255, 255, 1)";
    ctx.stroke();

    
    xBolt += Math.cos( (boltAngle - 90) * Math.PI / 180);
    yBolt += Math.sin( (boltAngle - 90) * Math.PI / 180);
    
    if (xBolt > 0 && yBolt > 0) {
        setTimeout( () => {
            requestAnimationFrame(() => {drawBolt(xBolt, yBolt, boltAngle)});
        }, 15);
    }

    ctx.restore();
}

class Bolt {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    drawMe(x, y, angle) {
        ctx.save();
        ctx.beginPath(); 

        if (x === xShip && y === yShip) {
            ctx.rotate(angle * Math.PI / 180);
        }

        ctx.lineWidth = 3;
        ctx.shadowBlur = 3;
        ctx.shadowColor = "rgb(174, 255, 0)";
        ctx.moveTo(x, y + 3);
        ctx.arc(x, y + 3, 1, 0, 2 * Math.PI);   
        ctx.strokeStyle = "rgba(255, 255, 255, 1)";
        ctx.stroke();

        ctx.restore();
    }

    moveMe(x, y, boltAngle) {
        ctx.save();
        x += Math.cos( (boltAngle - 90) * Math.PI / 180);
        y += Math.sin( (boltAngle - 90) * Math.PI / 180);
        
        if (x > 0 && y > 0) {
            setTimeout( () => {
                requestAnimationFrame(() => {this.moveMe});
            }, 15);
        }
        ctx.restore();
    }

}


function drawCircle() {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.arc(100, 75, 50, 0, 2 * Math.PI);
    ctx.strokeStyle = "rgba(50, 187, 46, 1)";
    ctx.stroke();
    ctx.closePath();    
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // if(x + dx > canvas.width-shipRadius || x + dx < shipRadius) {
    //     dx = -dx;
    // }
    // if(y + dy > canvas.height-(shipRadius * 2) || y + dy < 0) {
    //     dy = -dy;
    // }

    if (rotateRight) {
        angle += 1.5;
    } else if (rotateLeft) {
        angle -= 1.5;
    } else if (shoot) {
        // drawBolt(xShip, yShip, angle); 
        let bolt = new Bolt(xShip, yShip);
    } else if (thrust) {
        drawShip(thrust);
    }

    drawShip(thrust);
    moveBolts();
    drawCircle();
    // drawBolt();

    // x += dx;
    // y += dy;
}

function keyDownHandler(event) {
    event.preventDefault();
    if (event.key == "Right" || event.key == "ArrowRight") {
        rotateRight = true;
    } else if (event.key == "Left" || event.key == "ArrowLeft") {
        rotateLeft = true;
    } else if (event.key == "Up" || event.key == "ArrowUp") {
        thrust = true;
    } else if (event.key == "Spacebar" || event.key == " ") {
            shoot = true;
    }
}

function keyUpHandler(event) {
    event.preventDefault();
    if (event.key == "Right" || event.key == "ArrowRight") {
        rotateRight = false;
    } else if (event.key == "Left" || event.key == "ArrowLeft") {
        rotateLeft = false;
    } else if (event.key == "Up" || event.key == "ArrowUp") {
        thrust = false;
    } else if (event.key == "Spacebar" || event.key == " ") {
        shoot = false;
    }
}

setInterval(draw, 10);
// setInterval(drawBolt, 10);


window.addEventListener("keydown", keyDownHandler, false);
window.addEventListener("keyup", keyUpHandler, false);