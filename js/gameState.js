class gameState extends Phaser.Scene{
	constructor(){
		//Llamamos al constructor de la escena
	 	super({key: 'gameState'});
	}
	preload(){
        var rutaImg = 'assets/img/';
        //Load Images
        this.load.image('HardHat','assets/HardHatAnim.png');//,{frameWidth: 67, frameHeight: 65});
        //Load Audios
        
        
	}
	create(){
        //SetOrigin
		//hardhat =  new HardHatPrefab(this,0,0,'HardHat');
        this.hardhat = this.physics.add.sprite(config.width/2,config.height/2,'HardHat').setOrigin(0.5).setScale(1);
        //add.sprite & anims.create
        
        
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
