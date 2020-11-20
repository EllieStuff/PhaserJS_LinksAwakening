class gameState extends Phaser.Scene{
	constructor(){
		//Llamamos al constructor de la escena
	 	super({key: 'gameState'});
	}
	preload(){
        var rutaImg = 'assets/img/';
        //Load Images
        this.load.spritesheet('link',rutaImg+'Link_IdleWalking.png', {frameWidth: 16, frameHeight: 16});
        this.load.image('HardHat',rutaImg+'HardHatAnim.png');//,{frameWidth: 67, frameHeight: 65});
        //Load Audios
        
        
	}
	create(){
        //SetOrigin
		//hardhat =  new HardHatPrefab(this,0,0,'HardHat');
        this.hardhat = this.physics.add.sprite(config.width/2,config.height/2,'HardHat').setOrigin(0.5).setScale(1);
        
        
        //add.sprite & anims.create
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('link', { start: 2, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idleUp',
            frames: this.anims.generateFrameNumbers('link', { start: 1, end: 1 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'idleDown',
            frames: this.anims.generateFrameNumbers('link', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: 0
        });
        
        
        //Variables
        
        
        //LoadGroups
		
        
        //time.addEvent
        
        
        //Colisiones
		
        
	}
    
    
    //Functions
    
    
    
    //
    
	update(){
        
        
	}
}
