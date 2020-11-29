class gameState extends Phaser.Scene{
	constructor(){
		//Llamamos al constructor de la escena
	 	super({key: 'gameState'});
	}
	preload(){
        var rutaImgEnemies = 'assets/img/enemies/';
        var rutaImgLink = 'assets/img/link/';
        //Load Images
        this.load.spritesheet('playerMove'      ,rutaImgLink + 'WAnim.png'       ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('playerMoveShield',rutaImgLink + 'WShieldAnim.png' ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('playerShieldUp'  ,rutaImgLink + 'shieldAnim.png'  ,{frameWidth: 16, frameHeight: 16});
        
        this.load.spritesheet('HardHat',rutaImgEnemies + 'HardHatAnim.png',{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('enemySkeleton', rutaImgEnemies + 'EsqueletoAnim.png', {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('auxSkeleton', rutaImgEnemies + 'EsqueletoJumpAnim.png', {frameWidth: 16, frameHeight: 32});
        this.load.spritesheet('emptySprite', 'assets/img/Empty_Sprite.png', {frameWidth: 16, frameHeight: 16});
        //Load Audios
        
        
	}
	create(){
        //SetOrigin
        
        
		//hardhat =  new HardHatPrefab(this,0,0,'HardHat');
        this.player = this.physics.add.sprite(config.width/2,config.height/2,'playerMove').setOrigin(0.5).setScale(2);
        //this.hardhat = this.physics.add.sprite(config.width/2,config.height/2,'HardHat').setOrigin(0.5).setScale(1);
        //this.skeleton = new SkeletonPrefab(this, config.width/4, config.height/4, 'enemySkeleton', 'auxSkeleton');
        
        //add.sprite & anims.create
        //MOVEMENT WITHOUT SHIELD
        this.anims.create({
            key: 'idleDown',
            frames: this.anims.generateFrameNumbers('playerMove', { start: 0, end: 0 }),
            framerate: 1,
            repeat: 0
        });
        this.anims.create({
            key: 'walkDown',
            frames: this.anims.generateFrameNumbers('playerMove', { start: 0, end: 1 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'walkLeft',
            frames: this.anims.generateFrameNumbers('playerMove', { start: 2, end: 3 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'walkRight',
            frames: this.anims.generateFrameNumbers('playerMove', { start: 4, end: 5 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'walkUp',
            frames: this.anims.generateFrameNumbers('playerMove', { start: 6, end: 7 }),
            frameRate: 8,
            repeat: -1
        });
        //MOVEMENT WITH SHIELD
        this.anims.create({
            key: 'walkDownS',
            frames: this.anims.generateFrameNumbers('playerMoveShield', { start: 0, end: 1 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'walkLeftS',
            frames: this.anims.generateFrameNumbers('playerMoveShield', { start: 2, end: 3 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'walkRightS',
            frames: this.anims.generateFrameNumbers('playerMoveShield', { start: 4, end: 5 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'walkUpS',
            frames: this.anims.generateFrameNumbers('playerMoveShield', { start: 6, end: 7 }),
            frameRate: 8,
            repeat: -1
        });
        //MOVEMENT WITH SHIELD UP
        this.anims.create({
            key: 'walkDownSU',
            frames: this.anims.generateFrameNumbers('playerShieldUp', { start: 0, end: 1 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'walkLeftSU',
            frames: this.anims.generateFrameNumbers('playerShieldUp', { start: 2, end: 3 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'walkRightSU',
            frames: this.anims.generateFrameNumbers('playerShieldUp', { start: 4, end: 5 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'walkUpSU',
            frames: this.anims.generateFrameNumbers('playerShieldUp', { start: 6, end: 7 }),
            frameRate: 8,
            repeat: -1
        });
        //Variables
        this.inputs = new InputManager(this, 'emptySprite');
        
        
        //LoadGroups
        this.player.body.collideWorldBounds = true;
        //hardhat =  new HardHatPrefab(this,0,0,'HardHat');
        //this.hardhat = this.physics.add.sprite(config.width/2,config.height/2,'HardHat').setOrigin(0.5).setScale(1);
        //this.hardhat.anims.play('walk');
        
        this.createEnemies();
        
        
        //Colisiones
		//this.physics.add.collider(this.player, this.walls); //Prq choqui amb les parets
        //this.physics.add.collider(this.player, this.enemies, this.Player.GetDamaged, null, this); //Prq el player rebi mal, la quantitat dependra de la variable attack del enemy tocat
        //this.physics.add.collider(this.enemies, this.player.shield, this.EnemyBase.GetRepeled, null, this);   //Prq l'escut repeli una mica els enemics, l'impuls dependra d'una variable del enemy
        //this.physics.add.collider(this.enemies, this.player.sword, this.EnemyBase.GetDamaged, null, this);    //Prq l'espasa danyi els enemics, el mal dependra del attack del player i de si ha carregat l'atac giratori
		this.cursors = this.input.keyboard.createCursorKeys();
        this.shieldUp = false;
	}
    
    createEnemies(){
        this.enemies = this.physics.add.group();
        
        //Afegir els enemics un per un aqui si no no es que ho hem de fer diferent per tema del tilemap
        this.createEnemy(SkeletonPrefab, config.width/4, config.height/4, true);
        
        
    }
    
    createEnemy(_enemyType, _posX, _posY, _startActive){
        var enemy = new _enemyType(this, _posX, _posY);
        this.enemies.add(enemy);
        enemy.visible = enemy.active = _startActive;
        
		/*var enemy = this.enemies.getFirst(false);
        if(!enemy){
			//console.log('create enemy'); 
			enemy = new _enemyType(this, _posX, _posY);
            this.enemies.add(enemy);
		} else{
			//reset
            enemy.active = true;
            enemy.body.reset(_posX, _posY);
            enemy.health = 2;
		}*/
        
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
        
        if(this.inputs.GetKeyPressed(this.inputs.KeyCodes.L))   //MOVE WITH SHIELD UP
        {
            this.shieldUp = true;
            
            if(this.inputs.GetKeyPressed(this.inputs.KeyCodes.A))
            {
            
                this.player.anims.play('walkLeftSU',true);
                this.player.body.velocity.x = -64;
                this.player.body.velocity.y = 0;
            }
            else if(this.inputs.GetKeyPressed(this.inputs.KeyCodes.D))
            {
                this.player.anims.play('walkRightSU',true);
                this.player.body.velocity.x = 64;
                this.player.body.velocity.y = 0;
            }
            else if(this.inputs.GetKeyPressed(this.inputs.KeyCodes.S))
            {
                this.player.anims.play('walkDownSU',true);
                this.player.body.velocity.x = 0;
                this.player.body.velocity.y = 64;
            }
            else if(this.inputs.GetKeyPressed(this.inputs.KeyCodes.W))
            {
                this.player.anims.play('walkUpSU',true);
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
            
            this.shieldUp = false;
            
            if(this.inputs.GetKeyPressed(this.inputs.KeyCodes.A))
            {
            
                this.player.anims.play('walkLeftS',true);
                this.player.body.velocity.x = -64;
                this.player.body.velocity.y = 0;
            }
            else if(this.inputs.GetKeyPressed(this.inputs.KeyCodes.D))
            {
                this.player.anims.play('walkRightS',true);
                this.player.body.velocity.x = 64;
                this.player.body.velocity.y = 0;
            }
            else if(this.inputs.GetKeyPressed(this.inputs.KeyCodes.S))
            {
                this.player.anims.play('walkDownS',true);
                this.player.body.velocity.x = 0;
                this.player.body.velocity.y = 64;
                
            }
            else if(this.inputs.GetKeyPressed(this.inputs.KeyCodes.W))
            {
                this.player.anims.play('walkUpS',true);
                this.player.body.velocity.x = 0;
                this.player.body.velocity.y = -64;
            }
            else
            {
                //this.player.anims.play('idleDown');
                this.player.body.velocity.x = 0;
                this.player.body.velocity.y = 0;
            }
            
            //NOTA: Per acabar l'animacio i que es quedi mirant on vulguis crec que el millor seria algo aixi amb totes les direccions
            if(this.inputs.GetKeyUp(this.inputs.KeyCodes.S)){
                this.player.anims.play('idleDown');
            }
            
        }
        //ATTACK
        if(this.inputs.GetKeyDown(this.inputs.KeyCodes.K))
        {
            //Attack need animations
        }
        

	}
    
}











