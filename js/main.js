var config = {
    type: Phaser.AUTO,
    width: 160, 
    height: 144, 
    scene: [gameState], //Array con los niveles   
	antialias: false,
	render:{pixelArt:true},
	scale: {
        //mode: Phaser.Scale.FIT,
        //autoCenter: Phaser.Scale.CENTER_BOTH
    },
	physics:{
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
			debug: false
        }
    }


};

var game = new Phaser.Game(config);

//var timeStep = new Phaser.Core.TimeStep(juego, config);
//var physics = new Phaser.Physics.Arcade.ArcadePhysics(this);