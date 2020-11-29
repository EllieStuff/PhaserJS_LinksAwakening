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
        //SetOrigin
        
        
        //anims.create
        this.anims.create(config);
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
        this.inputs = new InputManager(this, 'emptySprite');
        
        
        //LoadGroups
        this.player = new Player(this, 10, 10);
        this.player.body.collideWorldBounds = true;
        //hardhat =  new HardHatPrefab(this,0,0,'HardHat');
        this.hardhat = this.physics.add.sprite(config.width/2,config.height/2,'HardHat').setOrigin(0.5).setScale(1);
        //this.hardhat.anims.play('walk');
        
        this.createEnemies();
        
        
        //Colisiones
		//this.physics.add.collider(this.player, this.walls); //Prq choqui amb les parets
        //this.physics.add.collider(this.player, this.enemies, this.Player.GetDamaged, null, this); //Prq el player rebi mal, la quantitat dependra de la variable attack del enemy tocat
        //this.physics.add.collider(this.enemies, this.player.shield, this.EnemyBase.GetRepeled, null, this);   //Prq l'escut repeli una mica els enemics, l'impuls dependra d'una variable del enemy
        //this.physics.add.collider(this.enemies, this.player.sword, this.EnemyBase.GetDamaged, null, this);    //Prq l'espasa danyi els enemics, el mal dependra del attack del player i de si ha carregat l'atac giratori
        
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
    
    UpdateEnemies(){
        for (var i = 0; i < this.enemies.getLength(); i++) {
            //Mirar com funciona el getChildren()
            this.enemies.get(i).getChildren().Update(this.player, this.inputs);
        }
        
        /*this.enemies.forEach(function(item){
            item.Update(this.player, this.inputs);
        }.bind(this));*/
        
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











