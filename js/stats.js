function stats() {
    ctx.save();
    ctx.font = "30px Lucida Console";
    ctx.fillStyle = "#00ffff";
    ctx.textAlign = "center";
    ctx.fillText("SCORE " + score, scorePositionX, 40);
    ctx.fillText("LIVES " + lives, 70, 40);
    ctx.restore();
}

function livesAdjust(loss = true) {
    if (loss) {
        lives--;
        if (lives < 1) {
            gameOver = true;
        }
    } else {
        lives++;
    }
}

function scoreAdd(asteroidSize) {
    let points = 0;
    switch (asteroidSize) {
        case 50:
            points = 10;
            break;
        case 25:
            points = 25;
            break;
        case 12.5:
            points = 50;
            break;
        default:
            break;
    }
    score = score + points;
    if (score >= nextLife) {
        nextLife = nextLife + 5000;
        livesAdjust(false);
    }
}