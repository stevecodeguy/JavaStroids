const polyPoint = {degree: 0, radius: 0};
let points = [];
let degreeRand = 0;
let radiusRand = 0;

function asteroidDegree(){
    return randMinMax(0, 360);
}

function asteroidRadius(){
    return randMinMax(-8, 5);
}

class AsteroidPoints {
    constructor(degree, radius) {
        this.degree = degree;
        this.radius = radius;
        
    }

    asteroidPolyPoints(rockSize){
        for (let i = 0; i < randMinMax(Math.round(rockSize / 10) + 2, Math.round(rockSize/10) + 5); i++) {
            let degree = asteroidDegree();
            let radius = rockSize + asteroidRadius();

            points = [...points, {degree, radius}];
        }
        points = points.sort((a, b) => Number(a.degree) - Number(b.degree));

        return points;
    };
};

// let test = new AsteroidPoints;

// test.asteroidPolyPoints(50);

class Asteroid {
    constructor(x, y, angle) {
        let polyPoints = new AsteroidPoints;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.rockSize = rockSize;
        this.polygonPoints = polyPoints.asteroidPolyPoints(rockSize);
    }

    addAsteroid(rockSize, number, splitAsteroid = false, newX, newY){
        let temp = {};
        
        for (let i = 0; i < number; i++)
        {
            let polyPoints = new AsteroidPoints;
            if (splitAsteroid) {
                temp = {
                    id : arrayAsteroids.length,
                    x : newX,   
                    y : newY,
                    angle : randMinMax(0, 360),
                    rockSize : rockSize,
                    polygonPoints :  polyPoints.asteroidPolyPoints(rockSize)
                };
            } else {
                temp = {
                    id : arrayAsteroids.length,
                    x : randXAsteroid(),   
                    y : randYAsteroid(),
                    angle : randMinMax(0, 360),
                    rockSize : rockSize,
                    polygonPoints : polyPoints.asteroidPolyPoints(rockSize)
                };
            }
            arrayAsteroids.push(temp);
        }
    };

    drawAsteroids() {
        for (let i = 0; i < arrayAsteroids.length; i++)
        {
            let speed = 0;
            let x = arrayAsteroids[i].x;
            let y = arrayAsteroids[i].y;
            let angle = arrayAsteroids[i].angle;
            let rockSize = arrayAsteroids[i].rockSize;
            let polygonPoints = arrayAsteroids[i].polygonPoints;

            switch (rockSize) {
                case 50:
                case 25:
                    speed = 1;
                    break;
                case 12.5:
                    speed = 2;
                    break;
            }

            for (let a = 0; a < speed; a++){
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
                
                // let pointAngle = ((Math.PI * 2) / polygonPoints.length - 1);
 
                // ctx.moveTo(rockSize, 0);
                for (let j = 1; j < polygonPoints.length; j++){
                    console.log(polygonPoints.length, polygonPoints.radius,             polygonPoints.degree, j );
                    ctx.lineTo(polygonPoints.radius*Math.cos(polygonPoints.degree),polygonPoints.radius*Math.sin(polygonPoints.degree));
                }

                ctx.closePath();
                ctx.fillStyle = "rgba(71, 66, 13) ";
                ctx.fill();
                ctx.restore(); 


                if (x < -rockSize - 10) {
                    x = ctx.canvas.width;
                } else if (x > ctx.canvas.width + rockSize + 10) {
                    x = -rockSize - 10;
                }
            
                if (y < -rockSize - 10) {
                    y = (ctx.canvas.height - 100);
                } else if (y > ctx.canvas.height + rockSize - 90) {
                    y = -rockSize - 10;
                }
            }

            arrayAsteroids[i].x = x;
            arrayAsteroids[i].y = y;
            arrayAsteroids[i].angle = angle;
            arrayAsteroids[i].rockSize = rockSize;
            arrayAsteroids[i].polygonPoints = polygonPoints;
        };
    }
}

