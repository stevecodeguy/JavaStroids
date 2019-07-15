function asteroidPolyPoints(polyPoints){
    let points = [];
    for (let i = 0; i < randPop(); i++) {
        degreePosition = randA();
        points.push(degreePosition);
    }

    function compareNumbers(a, b)
    {
        return a - b;
    }

    return points.sort(compareNumbers);
    // console.log (points)
};

class Asteroid {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.rockSize = rockSize;
        this.polygonPoints = asteroidPolyPoints(randPop());
    }
    

    addAsteroid(rockSize, number, splitAsteroid = false, newX, newY){
        let temp = {};

        for (let i = 0; i < number; i++)
        {
            if (splitAsteroid) {
                temp = {
                    id : arrayAsteroids.length,
                    x : newX,   
                    y : newY,
                    angle : randA(),
                    rockSize : rockSize,
                    polygonPoints : asteroidPolyPoints(randPop())
                };
            } else {
                temp = {
                    id : arrayAsteroids.length,
                    x : randXAsteroid(),   
                    y : randYAsteroid(),
                    angle : randA(),
                    rockSize : rockSize,
                    polygonPoints : asteroidPolyPoints(randPop())
                };
            }
            arrayAsteroids.push(temp);
        }
    };

    drawAsteroids() {
        for (let i = 0; i < arrayAsteroids.length; i++)
        {
            let x = arrayAsteroids[i].x;
            let y = arrayAsteroids[i].y;
            let angle = arrayAsteroids[i].angle;
            let rockSize = arrayAsteroids[i].rockSize;
            let polygonPoints = arrayAsteroids[i].polygonPoints;

            x += Math.cos( (angle - 90) * Math.PI / 180);
            y += Math.sin( (angle - 90) * Math.PI / 180);


            ctx.save();
            ctx.translate(x, y + 15);
            ctx.rotate(angle * Math.PI / 180);
            ctx.translate(-x, -(y + 15));
            
            ctx.beginPath(); 

            ctx.lineWidth = 1;
            ctx.shadowBlur = rockSize * 2;
            ctx.shadowColor = "black";
            ctx.arc(x, y, rockSize, 0, 2 * Math.PI);
            ctx.fillStyle = "rgba(71, 66, 13) ";
            ctx.fill();
            ctx.restore(); 


            if (x < -rockSize - 10) {
                x = ctx.canvas.width;
            } else if (x > ctx.canvas.width + rockSize + 10) {
                x = -rockSize - 10;
            }
        
            if (y < -rockSize - 10) {
                y = ctx.canvas.height;
            } else if (y > ctx.canvas.height + rockSize + 10) {
                y = -rockSize - 10;
            }

            arrayAsteroids[i].x = x;
            arrayAsteroids[i].y = y;
            arrayAsteroids[i].angle = angle;
            arrayAsteroids[i].rockSize = rockSize;
        };
    }
}

