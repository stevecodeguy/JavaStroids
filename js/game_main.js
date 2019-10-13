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
let asteroids = new Asteroid(randX(), randY(), randMinMax(0, 360));
asteroids.addAsteroid(rockSize, asteroidCount);

const endGameMessage = time => new Promise(resolve => {
    if (lives < 1) {
        timeOut = setTimeout(() => {
            ctx.save();
            ctx.font = "50px spacey";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", (ctx.canvas.width - 2) / 2, ((ctx.canvas.height - 100) - 2) / 2);
            ctx.font = "25px spacey";
            ctx.fillText("Press Space to play again!", (ctx.canvas.width - 2) / 2, (((ctx.canvas.height - 100) - 2) / 2) + 60);
            ctx.restore();
            clearTimeout(timeOut);
            resolve();
        }, time);
    };
});

function pauseMessage() {
    if (!gameOver) {
        ctx.save();
        ctx.font = "50px spacey";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("PAUSED", (ctx.canvas.width - 2) / 2, ((ctx.canvas.height - 100) - 2) / 2);
        ctx.font = "25px spacey";
        ctx.fillText("Press 'P' to unpause", (ctx.canvas.width - 2) / 2, (((ctx.canvas.height - 100) - 2) / 2) + 60);
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
                if ((new Date().getTime() - lastShot) >= 425) {
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
            if (remnants.length === 0) {
                if (gameOver) {
                    endGameMessage(1000)
                        .then(() => pause = true);
                } else {
                    // Reset ship after death
                    shoot = false;
                    angle = 0;
                    xDrift = 0;
                    yDrift = 0;
                    xShip = (ctx.canvas.width - 2) / 2;
                    yShip = ((ctx.canvas.height - 100) - 2) / 2;
                    alive = true;
                }
            }
        }

        for (let i = 0; i < 3; i++) {
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
        } else if (yShip > (ctx.canvas.height)) {
            yShip = 0;
        }

        xShip += xDrift;
        yShip += yDrift;
    }
}

function keyDownHandler(event) {
    event.preventDefault();
    switch (event.key) {
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
        case " ": {
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
    case "p": {
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
    switch (event.key) {
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
    asteroids = new Asteroid(randX(), randY(), randMinMax(0, 360));
    asteroids.addAsteroid(rockSize, asteroidCount);

    xShip = (ctx.canvas.width - 2) / 2;
    yShip = ((ctx.canvas.height) - 2) / 2;

    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function step() {
    draw();
    playGame = window.requestAnimationFrame(step);
}

function startGame() {
    (function (a, b) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) window.location = b
    })(navigator.userAgent || navigator.vendor || window.opera, 'http://detectmobilebrowser.com/mobile');

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        alert('you are on mobile!');
    }

    playGame = window.requestAnimationFrame(step);
    theme.play();
}

window.addEventListener("keydown", keyDownHandler, false);
window.addEventListener("keyup", keyUpHandler, false);

window.addEventListener('touchstart', keyDownHandler, false);
window.addEventListener('touchmove', keyDownHandler, false);
window.addEventListener('touchend', keyUpHandler, false);


window.addEventListener('resize', resizeTimer);

resizeTimer();