let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

ctx.canvas.width  = window.innerWidth - 2;
ctx.canvas.height = window.innerHeight - 2;

let xShip = ( (ctx.canvas.width - 100) - 2) / 2;
let yShip = ( (ctx.canvas.height - 100) - 2 ) / 2;

let scorePositionX = (ctx.canvas.width - (ctx.canvas.width / 6));

const resizeTimer = () => { 
    let resizeId;

    clearTimeout(resizeId);
    resizeId = setTimeout(finishResize, 50);
}

const finishResize = () => {
    ctx.canvas.width  = window.innerWidth - 2;
    ctx.canvas.height = window.innerHeight - 2;

    xShip = (ctx.canvas.width - 2) / 2;
    yShip = (ctx.canvas.height - 102 ) / 2;

    scorePositionX = (ctx.canvas.width - (ctx.canvas.width / 6));
}