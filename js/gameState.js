class gameState extends Phaser.Scene{
	constructor(){
		//Llamamos al constructor de la escena
	 	super({key: 'gameState'});
	}
	preload(){
        var rutaImgEnemies = 'assets/img/enemies/';
        var rutaImgLink = 'assets/img/link/';
        //Load Images
        this.load.spritesheet('playerMove'      ,'assets/img/Link/WAnim.png'       ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('playerMoveShield','assets/img/Link/WShieldAnim.png' ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('playerShieldUp'  ,'assets/img/Link/shieldAnim.png'  ,{frameWidth: 16, frameHeight: 16});
       // this.load.image('HardHat','assets/img/Enemy/HardHatAnim.png');//,{frameWidth: 67, frameHeight: 65});
        this.load.spritesheet('player',rutaImgLink + 'Link_IdleWalking.png', {frameWidth: 16, frameHeight: 16});
        this.load.image('HardHat',rutaImgEnemies + 'HardHatAnim.png',{frameWidth: 67, frameHeight: 65});
        this.load.spritesheet('enemySkeleton', rutaImgEnemies + 'EsqueletoAnim.png', {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('auxSkeleton', rutaImgEnemies + 'EsqueletoJumpAnim.png', {frameWidth: 16, frameHeight: 16});
        //Load Audios
        
        
	}
	create(){
        //SetOrigin
        
        
		//hardhat =  new HardHatPrefab(this,0,0,'HardHat');
        // this.hardhat = this.physics.add.sprite(config.width/2,config.height/2,'HardHat').setOrigin(0.5).setScale(1);
        this.player = this.physics.add.sprite(config.width/2,config.height/2,'playerMove').setOrigin(0.5).setScale(2);
        this.hardhat = this.physics.add.sprite(config.width/2,config.height/2,'HardHat').setOrigin(0.5).setScale(1);
        this.skeleton = new SkeletonPrefab(this, config.width/4, config.height/4, 'enemySkeleton', 'auxSkeleton');
        
        //add.sprite & anims.create
        //MOVEMENT WITHOUT SHIELD
        this.anims.create({
            key: 'walkdown',
            frames: this.anims.generateFrameNumbers('playerMove', { start: 0, end: 1 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'walkleft',
            frames: this.anims.generateFrameNumbers('playerMove', { start: 2, end: 3 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'walkright',
            frames: this.anims.generateFrameNumbers('playerMove', { start: 4, end: 5 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'walkup',
            frames: this.anims.generateFrameNumbers('playerMove', { start: 6, end: 7 }),
            frameRate: 8,
            repeat: -1
        });
        //MOVEMENT WITH SIELD
        this.anims.create({
            key: 'walkdownS',
            frames: this.anims.generateFrameNumbers('playerMoveShield', { start: 0, end: 1 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'walkleftS',
            frames: this.anims.generateFrameNumbers('playerMoveShield', { start: 2, end: 3 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'walkrightS',
            frames: this.anims.generateFrameNumbers('playerMoveShield', { start: 4, end: 5 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'walkupS',
            frames: this.anims.generateFrameNumbers('playerMoveShield', { start: 6, end: 7 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'walkdownSU',
            frames: this.anims.generateFrameNumbers('playerShieldUp', { start: 0, end: 1 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'walkleftSU',
            frames: this.anims.generateFrameNumbers('playerShieldUp', { start: 2, end: 3 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'walkrightSU',
            frames: this.anims.generateFrameNumbers('playerShieldUp', { start: 4, end: 5 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'walkupSU',
            frames: this.anims.generateFrameNumbers('playerShieldUp', { start: 6, end: 7 }),
            frameRate: 8,
            repeat: -1
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
		this.cursors = this.input.keyboard.createCursorKeys();
        
	}
    
    
    //Functions
    LoadMap(){
        //Llegir el mapa i assignar parets
        //...
        //...
        
    }
    
    
    //
    
	update()
    {
        //MOVEMENT
        if(this.cursors.shift.isDown)   //MOVE WITH SHIELD UP
        {
            if(this.cursors.left.isDown)
            {
            
                this.player.anims.play('walkleftSU',true);
                this.player.body.velocity.x = -64;
                this.player.body.velocity.y = 0;
            }
            else if(this.cursors.right.isDown)
            {
                this.player.anims.play('walkrightSU',true);
                this.player.body.velocity.x = 64;
                this.player.body.velocity.y = 0;
            }
            else if(this.cursors.down.isDown)
            {
                this.player.anims.play('walkdownSU',true);
                this.player.body.velocity.x = 0;
                this.player.body.velocity.y = 64;
            }
            else if(this.cursors.up.isDown)
            {
                this.player.anims.play('walkupSU',true);
                this.player.body.velocity.x = 0;
                this.player.body.velocity.y = -64;
            }
            else
            {
                this.player.anims.play();
                this.player.body.velocity.x = 0;
                this.player.body.velocity.y = 0;
            }
        }
        else                            //MOVE WITH SHIELD DOWN
        {
            if(this.cursors.left.isDown)
            {
            
                this.player.anims.play('walkleftS',true);
                this.player.body.velocity.x = -64;
                this.player.body.velocity.y = 0;
            }
            else if(this.cursors.right.isDown)
            {
                this.player.anims.play('walkrightS',true);
                this.player.body.velocity.x = 64;
                this.player.body.velocity.y = 0;
            }
            else if(this.cursors.down.isDown)
            {
                this.player.anims.play('walkdownS',true);
                this.player.body.velocity.x = 0;
                this.player.body.velocity.y = 64;
            }
            else if(this.cursors.up.isDown)
            {
                this.player.anims.play('walkupS',true);
                this.player.body.velocity.x = 0;
                this.player.body.velocity.y = -64;
            }
            else
            {
                this.player.anims.play();
                this.player.body.velocity.x = 0;
                this.player.body.velocity.y = 0;
            }
        }
        //ATTACK
        if(this.cursors.space.isDown)
        {
            //Attack need animations
        }

	}
}
