class gameState extends Phaser.Scene{
	constructor(){
		//Llamamos al constructor de la escena
	 	super({key: 'gameState'});
	}
	preload(){
        var rutaImg = 'assets/img/';
        //Load Images
        this.load.spritesheet('player',rutaImg+'Link_IdleWalking.png', {frameWidth: 16, frameHeight: 16});
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
            frames: this.anims.generateFrameNumbers('player', { start: 2, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idleUp',
            frames: this.anims.generateFrameNumbers('player', { start: 1, end: 1 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'idleDown',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: 0
        });
        
        
        //Variables
        
        
        //LoadGroups
        this.player = new Player(this, 10, 10);
        this.player.body.collideWorldBounds = true;
        
		
        
        //time.addEvent
        
        
        //Colisiones
		//this.physics.add.collider(this.player, this.walls); //Prq choqui amb les parets
        //this.physics.add.collider(this.player, this.enemies, this.Player.GetDamaged, null, this); //Prq el player rebi mal, la quantitat dependra de la variable attack del enemy tocat
        //this.physics.add.collider(this.enemies, this.player.shield, this.EnemyBase.GetRepeled, null, this);   //Prq l'escut repeli una mica els enemics, l'impuls dependra d'una variable del enemy
        //this.physics.add.collider(this.enemies, this.player.sword, this.EnemyBase.GetDamaged, null, this);    //Prq l'espasa danyi els enemics, el mal dependra del attack del player i de si ha carregat l'atac giratori
        
	}
    
    
    //Functions
    LoadMap(){
        //Llegir el mapa i assignar parets
        //...
        //...
        
    }
    
    
    //
    
	update(){
        
        
	}
}
