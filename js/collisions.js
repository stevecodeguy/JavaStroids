function collideBoltAsteroid() {
    for (let i = 0; i < activeBolt.length; i++)
        {
        for (let iter = 0; iter < arrayAsteroids.length; iter++) {
            let dx = arrayAsteroids[iter].x - activeBolt[i].x;
            let dy = arrayAsteroids[iter].y - activeBolt[i].y;
            let collision = Math.sqrt(dx * dx + dy * dy);

            if (collision < (1 + arrayAsteroids[iter].rockSize)){
                if ((arrayAsteroids[iter].rockSize / 2) > 10) {
                    asteroids.addAsteroid((arrayAsteroids[iter].rockSize / 2), 2, true, arrayAsteroids[iter].x, arrayAsteroids[iter].y);
                }
                arrayAsteroids.splice(iter, 1);
                activeBolt.splice(i, 1); 

                if (arrayAsteroids.length === 0) {
                    asteroidCount++;
                    setTimeout(() => {asteroids.addAsteroid(rockSize, asteroidCount)}, 3000);
                }

                break;
            }
        }
    }
}

function collideShipAsteroid() {
    for (let iter = 0; iter < arrayAsteroids.length; iter++) {
        let dx = arrayAsteroids[iter].x - xShip;
        let dy = arrayAsteroids[iter].y - yShip;
        let collision = Math.sqrt(dx * dx + dy * dy);

        if (collision < (20 + arrayAsteroids[iter].rockSize)){
            boom.addRemnant(xShip, yShip, angle); 
            boom.drawShipPop();
            break;
        }
    }
}