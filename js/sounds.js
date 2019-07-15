var laser = new Howl({ src: ['../sounds/laser.wav'],
    preload: true
});

var asteroidBoom1 = new Howl({ 
    src: ['../sounds/asteroid_explode.wav'],
    preload: true
});

var asteroidBoom2 = new Howl({ 
    src: ['../sounds/asteroid_explode2.wav'],
    preload: true
});

var asteroidBoom3 = new Howl({ 
    src: ['../sounds/asteroid_explode3.wav'],
    preload: true
});

var shipBoom = new Howl({ 
    src: ['../sounds/ship_explode.mp3'],
    preload: true
});

var thruster = new Howl({ 
    src: ['../sounds/thruster.wav'],
    preload: true
});

var theme = new Howl({ 
    src: ['../sounds/theme.wav'],
    volume: 0.5,
    preload: true,
    loop: true
});

function mute(toMute) {
    if (toMute === 'music'){
        if (musicMute) {
            theme.mute(false);
            musicMute = false;
        } else {
            theme.mute(true);
            musicMute = true;
        }
    } else {
        if (soundMute) {
            laser.mute(false);
            asteroidBoom1.mute(false);
            asteroidBoom2.mute(false);
            asteroidBoom3.mute(false);
            shipBoom.mute(false);
            thruster.mute(false);
            soundMute = false;
        } else {
            laser.mute(true);
            asteroidBoom1.mute(true);
            asteroidBoom2.mute(true);
            asteroidBoom3.mute(true);
            shipBoom.mute(true);
            thruster.mute(true);
            soundMute = true;
        }
    }
}
