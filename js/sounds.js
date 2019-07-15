let laser = new Audio('../sounds/laser.wav');
let asteroidBoom1 = new Audio('../sounds/asteroid_explode.wav');
let asteroidBoom2 = new Audio('../sounds/asteroid_explode2.wav');
let asteroidBoom3 = new Audio('../sounds/asteroid_explode3.wav');
let shipBoom = new Audio('../sounds/ship_explode.mp3');
let thruster = new Audio('../sounds/thruster.wav');
let theme = new Audio('../sounds/theme.wav');

////////////// Use /javastroids/sounds/ for BCIT server ////////////////////

thruster.loop = true;
theme.loop = true;

function mute(toMute) {
    if (toMute === 'music'){
        if (musicMute) {
            theme.muted = false;
            musicMute = false;
        } else {
            theme.muted = true;
            musicMute = true;
        }
    } else {
        if (soundMute) {
            laser.muted = false;
            asteroidBoom1.muted = false;
            asteroidBoom2.muted = false;
            asteroidBoom3.muted = false;
            shipBoom.muted = false;
            thruster.muted = false;
            soundMute = false;
        } else {
            laser.muted = true;
            asteroidBoom1.muted = true;
            asteroidBoom2.muted = true;
            asteroidBoom3.muted = true;
            shipBoom.muted = true;
            thruster.muted = true;
            soundMute = true;
        }
    }
}

// var laser = new Howl({ 
//     src: ['../sounds/laser.wav']
// });

// var asteroidBoom1 = new Howl({ 
//     src: ['../sounds/asteroid_explode.wav']
// });

// var asteroidBoom2 = new Howl({ 
//     src: ['../sounds/asteroid_explode2.wav']
// });

// var asteroidBoom3 = new Howl({ 
//     src: ['../sounds/asteroid_explode3.wav']
// });

// var shipBoom = new Howl({ 
//     src: ['../sounds/ship_explode.mp3']
// });

// var thruster = new Howl({ 
//     src: ['../sounds/thruster.wav']
// });

// var theme = new Howl({ 
//     src: ['../sounds/theme.wav'],
//     volume: 0.5,
//     loop: true
// });

// function mute(toMute) {
//     if (toMute === 'music'){
//         if (musicMute) {
//             theme.mute(false);
//             musicMute = false;
//         } else {
//             theme.mute(true);
//             musicMute = true;
//         }
//     } else {
//         if (soundMute) {
//             laser.mute(false);
//             asteroidBoom1.mute(false);
//             asteroidBoom2.mute(false);
//             asteroidBoom3.mute(false);
//             shipBoom.mute(false);
//             thruster.mute(false);
//             soundMute = false;
//         } else {
//             laser.mute(true);
//             asteroidBoom1.mute(true);
//             asteroidBoom2.mute(true);
//             asteroidBoom3.mute(true);
//             shipBoom.mute(true);
//             thruster.mute(true);
//             soundMute = true;
//         }
//     }
// }
