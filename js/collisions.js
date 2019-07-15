function collideBoltAsteroid() {
    for (let i = 0; i < activeBolt.length; i++)
        {
        for (let iter = 0; iter < arrayAsteroids.length; iter++) {
            let dx = arrayAsteroids[iter].x - activeBolt[i].x;
            let dy = arrayAsteroids[iter].y - activeBolt[i].y;
            let collision = Math.sqrt(dx * dx + dy * dy);

            if (collision < (1 + arrayAsteroids[iter].rockSize)){
                let sound = Math.floor(Math.random() * 3) + 1;

                switch (sound) {
                    case 1:
                        asteroidBoom1.play();
                        break;
                    case 2:
                        asteroidBoom2.play();
                        break;
                    case 3:
                        asteroidBoom3.play();
                        break;
                }

                if ((arrayAsteroids[iter].rockSize / 2) > 10) {
                    asteroids.addAsteroid((arrayAsteroids[iter].rockSize / 2), 2, true, arrayAsteroids[iter].x, arrayAsteroids[iter].y);
                }
                scoreAdd(arrayAsteroids[iter].rockSize);
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
            if (alive) {
                shipBoom.play();
                alive = false;
                livesAdjust();
                boom.addRemnant(xShip, yShip, angle); 
            }
            boom.drawShipPop();
        }
    }
}