// Game variables

let pause = false;
let gameOver = false;
let score = 0;
let nextLife = 5000;
let lives = 3;
let running = false;

// Sound variables

let musicMute = false;
let soundMute = false;

//Ship variables

let rotateRight = false;
let rotateLeft = false;
let thrust = false;
let shoot = false;
let angle = 0;
let shipRadius = 15;
let xDrift = 0;
let yDrift = 0;
let alive = true;
let remnants = [];
let boom = new Remnants(xShip, yShip, angle);

//Bolt variables

let lastShot = 0;
let activeBolt = [];
let bolt = new Bolt(xShip, yShip, angle);

//Asteroid variables

let asteroidCount = 3;
let rockSize = 50;
let arrayAsteroids = [];        
let asteroids = new Asteroid(randX(), randY(), randA());
asteroids.addAsteroid(rockSize, asteroidCount);

const endGameMessage = time => new Promise(resolve => {
    if (lives < 1) {
        timeOut = setTimeout(() => {
            ctx.save();
            ctx.font = "50px spacey";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", (ctx.canvas.width - 2) / 2, ( (ctx.canvas.height - 100) - 2) / 2);
            ctx.font = "25px spacey";
            ctx.fillText("Press Space to play again!", (ctx.canvas.width - 2) / 2, (((ctx.canvas.height - 100) - 2) / 2) + 60);
            ctx.restore();
            clearTimeout(timeOut);
            resolve();
        } , time);
    };
});

function pauseMessage() {
    if (!gameOver){
        ctx.save();
        ctx.font = "50px spacey";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("PAUSED", (ctx.canvas.width - 2) / 2, ( (ctx.canvas.height - 100) - 2) / 2);
        ctx.font = "25px spacey";
        ctx.fillText("Press 'P' to unpause", (ctx.canvas.width - 2) / 2, (( (ctx.canvas.height - 100) - 2) / 2) + 60);
        ctx.restore();
    };
};

function draw() {
    if (pause) {
        if (gameOver) {
            endGameMessage();
        } else {
            pauseMessage();
        }
    } else {
        collideBoltAsteroid();
        collideShipAsteroid();

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // if(x + dx > canvas.width-shipRadius || x + dx < shipRadius) {
        //     dx = -dx;
        // }
        // if(y + dy > canvas.height-(shipRadius * 2) || y + dy < 0) {
        //     dy = -dy;
        // } To implement later

        if (rotateRight) {
            angle += 1.5;
        } 
        if (rotateLeft) {
            angle -= 1.5;
        } 
        if (shoot) {
            if (alive) {
                if((new Date().getTime() - lastShot) >= 350) {
                    lastShot = new Date().getTime();
                    bolt.addBolt(xShip, yShip, angle);
                }
            }
        } 

        if (thrust) {
            drawShip(thrust);
        }
        
        if (alive) {
            drawShip(thrust);
        } else {
            boom.drawShipPop();
            if (remnants.length === 0)
            {
                if (gameOver) {
                    endGameMessage(1000)
                        .then( () => pause = true);
                } else {
                    // Reset ship after death
                    shoot = false;
                    angle = 0;
                    xDrift = 0;
                    yDrift = 0;
                    xShip = (ctx.canvas.width - 2) / 2;
                    yShip = ( (ctx.canvas.height - 100) - 2 ) / 2;
                    alive = true;
                }
            }
        }

        for (let i = 0; i < 3; i++){
            bolt.drawBolts();
        }

        asteroids.drawAsteroids();
        stats();

        if (xShip < 0) {
            xShip = ctx.canvas.width;
        } else if (xShip > ctx.canvas.width) {
            xShip = 0;
        }

        if (yShip < 0) {
            yShip = ctx.canvas.height;
        } else if (yShip > (ctx.canvas.height) ) {
            yShip = 0;
        }

        xShip += xDrift;
        yShip += yDrift;
    }
}

function keyDownHandler(event) {
    event.preventDefault();
    switch(event.key){
        case "Right":
        case "ArrowRight":
            rotateRight = true;
            break;
        case "Left":
        case "ArrowLeft":
            rotateLeft = true;
            break;
        case "Up":
        case "ArrowUp":
            thruster.play();
            thrust = true;
            break;
        case "Spacebar":
        case " ":
            {
                if (running) {
                    if (gameOver && pause) {
                        if (event.key === "Spacebar" || event.key === " ") {
                            reInitGame();
                        }
                    } else {
                        shoot = true;
                    }
                } else {
                    document.getElementById('start-message').remove('start-wait');
                    running = true;
                    startGame();
                }
            }
            break;
        case "p":
            {
                if (gameOver) {
                    break;
                }
                if (pause) {
                    pause = false;
                } else {
                    pause = true;
                }
            }
            break;
        case "m":
            mute('music');
            break;
        case "s":
            mute('sound');
            break;
        default:
            return false;
    }
}

function keyUpHandler(event) {
    event.preventDefault();
    switch(event.key){
        case "Right":
        case "ArrowRight":
            rotateRight = false;
            break;
        case "Left":
        case "ArrowLeft":
            rotateLeft = false;
            break;
        case "Up":
        case "ArrowUp":
            thruster.pause();
            thrust = false;
            break;
        case "Spacebar":
        case " ":
            shoot = false;
            break;
        default:
            return false;
    }
}

function reInitGame() {
    alive = true; 
    lives = 3;
    pause = false;
    gameOver = 0;

    shoot = false;
    angle = 0;
    xDrift = 0;
    yDrift = 0;
    remnants = [];

    //Bolt variables

    lastShot = 0;
    activeBolt = [];

    //Asteroid variables

    asteroidCount = 3;
    arrayAsteroids = [];        
    asteroids = new Asteroid(randX(), randY(), randA());
    asteroids.addAsteroid(rockSize, asteroidCount);

    xShip = (ctx.canvas.width - 2) / 2;
    yShip = ( (ctx.canvas.height) - 2 ) / 2;

    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function step() {
    draw();
    playGame = window.requestAnimationFrame(step);
}

function startGame() {
    playGame = window.requestAnimationFrame(step);
    theme.play();
}

window.addEventListener("keydown", keyDownHandler, false);
window.addEventListener("keyup", keyUpHandler, false);

window.addEventListener('resize', resizeTimer);

resizeTimer();