class gameState extends Phaser.Scene{
	constructor(){
		//Llamamos al constructor de la escena
	 	super({key: 'gameState'});
	}
	preload(){
        var rutaImgEnemies = 'assets/img/enemies/';
        var rutaImgLink = 'assets/img/link/';
        //Load Images
        this.load.spritesheet('player',rutaImgLink + 'Link_IdleWalking.png', {frameWidth: 16, frameHeight: 16});
        this.load.image('HardHat',rutaImgEnemies + 'HardHatAnim.png',{frameWidth: 67, frameHeight: 65});
        this.load.spritesheet('enemySkeleton', rutaImgEnemies + 'EsqueletoAnim.png', {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('auxSkeleton', rutaImgEnemies + 'EsqueletoJumpAnim.png', {frameWidth: 16, frameHeight: 32});
        this.load.spritesheet('emptySprite', 'assets/img/Empty_Sprite.png', {frameWidth: 16, frameHeight: 16});
        //Load Audios
        
        
	}
	create(){
        //Init Physics
        //juego.physics.startSystem(Phaser.Physics.ARCADE);
        
        //SetOrigin
        
        
        
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
        
        //Skeleton
        this.anims.create({
            key: 'skeletonWalk',
            frames: this.anims.generateFrameNumbers('enemySkeleton', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'skeletonJump',
            frames: this.anims.generateFrameNumbers('enemySkeleton', { start: 3, end: 3 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'auxSkeletonJump',
            frames: this.anims.generateFrameNumbers('auxSkeleton', { start: 0, end: 3 }),
            frameRate: 20,
            repeat: 0,
            yoyo: true
        });
        
        //ToDo: Agafar inputs be
        //Variables
        //this.InitInputs();
        this.inputs = new InputManager(this, 'emptySprite');
        
        
        //LoadGroups
        this.player = new Player(this, 10, 10);
        this.player.body.collideWorldBounds = true;
        //hardhat =  new HardHatPrefab(this,0,0,'HardHat');
        this.hardhat = this.physics.add.sprite(config.width/2,config.height/2,'HardHat').setOrigin(0.5).setScale(1);
        this.skeleton = new SkeletonPrefab(this, config.width/4, config.height/4, 'enemySkeleton', 'auxSkeleton');
        
        this.skeleton.anims.play('skeletonWalk', true);
        
		
        
        
        
        
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
        timeStep.step();
        
        this.skeleton.Update(this.player, this.inputs);
        
        
        /*
        if(this.inputs.GetKeyUp(this.inputs.KeyCodes.K)){
            console.log('in');
        }
        */
        
	}
}











