function stats() {
    ctx.save();
    ctx.font = "30px Lucida Console";
    ctx.fillStyle = "#00ffff";
    ctx.textAlign = "center";
    ctx.fillText("SCORE " + points, scorePositionX, 40);
    ctx.fillText("LIVES " + lives, 70, 40);
    ctx.restore();
}

function livesAdjust(loss = true) {
    if (loss) {
        lives--;
        alive = false;
        if (lives < 1) {
            gameOver = true;
        }
    } else {
        lives++;
    }
}