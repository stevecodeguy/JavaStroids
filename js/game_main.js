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

let x = (ctx.canvas.width - 2) / 2;
let y = (ctx.canvas.height - 2 ) / 2;

function drawShip(engineGlow = false) {
    ctx.save();

    ctx.translate(x, y + 15);
    ctx.rotate(angle * Math.PI / 180);
    ctx.translate(-x, -(y +15));

    ctx.beginPath();
    ctx.shadowBlur = 10;
    ctx.shadowColor = "blue";
    ctx.lineWidth = 2;
    ctx.moveTo(x, y);
    ctx.lineTo(x + 12, y + 30);
    ctx.lineTo(x, y + 22);
    ctx.lineTo(x - 12, y + 30);
    ctx.lineTo(x, y);
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

    ctx.translate(x, y + 15);
    ctx.rotate(angle * Math.PI / 180);
    ctx.translate(-x, -(y +15));

    ctx.shadowBlur = 10;
    ctx.shadowColor = "white";
    ctx.lineWidth = 1;
    ctx.moveTo(x, y + 24);
    ctx.lineTo(x + 6, y + 28);
    ctx.lineTo(x, y + 30);
    ctx.lineTo(x - 6, y + 28);
    ctx.lineTo(x, y + 24);
    ctx.lineTo(x, y + 32);

    ctx.strokeStyle = "rgb(132, 220, 255)";
    ctx.stroke();
    ctx.fillStyle = "rgb(132, 220, 255)";
    ctx.fill();

    ctx.closePath(); 
    ctx.restore();

    x += Math.cos( (angle - 90) * Math.PI / 180);
    y += Math.sin( (angle - 90) * Math.PI / 180);
}

function drawBolt(xPath = 0, yPath = 0) {
    ctx.save();
    ctx.beginPath(); 
console.log(yPath);
    // ctx.translate(x, y);
    // ctx.rotate(angle * Math.PI / 180);
    // ctx.translate(-x, -y);
    

    ctx.lineWidth = 3;
    ctx.shadowBlur = 3;
    ctx.shadowColor = "rgb(174, 255, 0)";
    ctx.moveTo(x, y + 3);
    ctx.arc(xPath, yPath + 3, 1, 0, Math.PI * 2);
    // ctx.closePath();    
    ctx.strokeStyle = "rgba(255, 255, 255, 1)";
    ctx.stroke();

    // x += Math.cos( (angle - 90) * Math.PI / 180);
    // y += Math.sin( (angle - 90) * Math.PI / 180);
    xPath += 0;
    yPath += -0.5;
    
    ctx.restore();
    // setInterval(drawBolt(xPath, yPath), 10);
    if (yPath > 0) {
        requestAnimationFrame(drawBolt(xPath, yPath));
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
        drawBolt(x, y);
    } else if (thrust) {
        drawShip(thrust);
    }

    drawShip(thrust);
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