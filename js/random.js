const min = 10;

function randX(){
    let maxW = ctx.canvas.width;  
    return Math.floor(Math.random() * (maxW - min) + min);
}

function randXAsteroid(){
    let maxW = ctx.canvas.width;  

    for (let i = 0; i < 1; i++) {
        let upperLower = Math.floor((Math.random() * 2) + 1);
        if (upperLower === 1){
            return Math.floor(Math.random() * ((maxW/6) - min) + min);
        } else {
            return Math.floor(Math.random() * (maxW - (min + maxW * 1.2)) + min + maxW * 1.2);
        }
    }
}

function randY(){
    let maxH = ctx.canvas.height;  
    return Math.floor(Math.random() * (maxH - min) + min);
}

function randYAsteroid(){
    let maxH = ctx.canvas.height;  

    for (let i = 0; i < 1; i++) {
        let upperLower = Math.floor((Math.random() * 2) + 1);
        if (upperLower === 1){
            return Math.floor(Math.random() * ((maxH/6) - min) + min);
        } else {
            return Math.floor(Math.random() * (maxH - (min + maxH * 1.2)) + min + maxH * 1.2);
        }
    }
}

function randMinMax(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
