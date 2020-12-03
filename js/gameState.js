class gameState extends Phaser.Scene{
	constructor(){
		//Llamamos al constructor de la escena
	 	super({key: 'gameState'});
	}
	preload(){
        var rutaImgEnemies = 'assets/img/enemies/';
        var rutaImgLink = 'assets/img/link/';
        var rutaImgTiles = 'assets/img/tiles/';
        //Load Images
        this.load.spritesheet('playerMove'      ,rutaImgLink + 'WAnim.png'       ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('playerMoveShield',rutaImgLink + 'WShieldAnim.png' ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('playerShieldUp'  ,rutaImgLink + 'shieldAnim.png'  ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('playerSlash'  ,rutaImgLink + 'LinkSlash.png'  ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('HardHat',rutaImgEnemies + 'HardHatAnim.png',{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('enemySkeleton', rutaImgEnemies + 'EsqueletoAnim.png', {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('auxSkeleton', rutaImgEnemies + 'EsqueletoJumpAnim.png', {frameWidth: 16, frameHeight: 32});
        this.load.spritesheet('emptySprite', 'assets/img/Empty_Sprite.png', {frameWidth: 16, frameHeight: 16});
        this.load.image('hitbox', rutaImgLink + 'HitboxLink.png');
        //Dungeon
        this.load.image('blocks', rutaImgTiles + 'DungeonBlockSheet.png');
        this.load.image('objects', rutaImgTiles + 'dungeonTiles1.png');
        this.load.image('fences', rutaImgTiles + 'vallas.png');
        this.load.tilemapTiledJSON('dungeon', 'maps/insideMap.json');
        
        //Load Audios
        
        
	}
	create(){
        //Load Map
        this.LoadMap();
        
        //SetOrigin
        this.CreatePlayer();
        
        
        //add.sprite & anims.create
       
        //Variables
        this.inputs = new InputManager(this, 'emptySprite');
        
        
        //LoadGroups
        //this.player.body.collideWorldBounds = true;
        this.CreateEnemies();
        
        
        // COLISIONES
        //Colliders
		this.physics.add.collider(this.hitboxPlayer, this.walls);
        //this.physics.add.collider(this.player, this.enemies, this.Player.GetDamaged, null, this); //Prq el player rebi mal, la quantitat dependra de la variable attack del enemy tocat
        //this.physics.add.collider(this.enemies, this.player.shield, this.enemies.GetRepeled, null, this);   //Prq l'escut repeli una mica els enemics, l'impuls dependra d'una variable del enemy
        //this.physics.add.collider(this.enemies, this.player.sword, this.EnemyBase.GetDamaged, null, this);    //Prq l'espasa danyi els enemics, el mal dependra del attack del player i de si ha carregat l'atac giratori
		//this.physics.add.collider(this.player, this.movableBlock, this.movableBlock.Move, null, this);
        //this.physics.add.collider(this.player, this.doors, this.doors.Open, null, this);
        //this.physics.add.collider(this.player, this.bonfires);
        //this.physics.add.collider(this.player, this.chests, this.chests.Open, null, this);
        //this.physics.add.collider(this.player.sword, this.crystals, this.crystals.Break, null, this);
        //this.physics.add.collider(this.player, this.fences);
        
        //Overlaps
        //this.physics.add.overlap(this.player, this.voids, this.player.Fall, null, this);
        //this.physics.add.overlap(this.player, this.stairs, this.player.WalkStairs, null, this);
        //this.physics.add.overlap(this.player, this.tpStairs, this.tpStairs.ChangePlayerLocation, null, this);
        //this.physics.add.overlap(this.player, this.floorButton, this.floorButton.Trigger, null, this);
        
	}
    
    CreatePlayer()
    {
        //this.player = this.physics.add;
        this.player = new PlayerPrefab(this,config.width/2,config.height/2);
        //this.player = this.physics.add.sprite(config.width/2,config.height/2,'playerMove').setOrigin(0,5).setScale(1);
        this.hitboxPlayer = this.physics.add.sprite(config.width/2,config.height/2,'hitbox').setOrigin(0.5).setScale(1);
        
    }
    
    CreateEnemies(){
        this.enemies = this.physics.add.group();
        
        //Afegir els enemics un per un aqui si no no es que ho hem de fer diferent per tema del tilemap
        this.CreateEnemy(SkeletonPrefab, config.width/4, config.height/4, true);
        this.CreateEnemy(HardHatPrefab , config.width/2, config.height/4, true);
        
    }
    
    CreateEnemy(_enemyType, _posX, _posY, _startActive){
        var enemy = new _enemyType(this, _posX, _posY);
        this.enemies.add(enemy);
        enemy.visible = enemy.active = _startActive;
        
	}
    
    
    //Functions
    LoadMap(){
        //TODO: Treure el bloc amb candau de doors ja que al provenir d'un sprite sheet diferent dona problemes
        
        this.map = this.add.tilemap('dungeon');
        this.map.addTilesetImage('blocks');
        this.map.addTilesetImage('objects');
        this.map.addTilesetImage('fences');
        
        //Init blocks
        this.walls = this.add.group();
        this.walls.add(this.map.createStaticLayer('walls', 'blocks'));
        this.map.setCollisionBetween(1,57,true,false,'walls');
        this.walls.add(this.map.createStaticLayer('walls2', 'blocks'));
        this.map.setCollisionBetween(32,58,true,false,'walls2');
        
        this.map.createStaticLayer('floor', 'blocks');
        
        this.movableBlock = this.map.createStaticLayer('movableobject', 'blocks');
        this.map.setCollision(20,true,false,'movableobject');
        
        this.stairs = this.map.createStaticLayer('stairs', 'blocks');
        this.map.setCollision(31,false,false,'stairs');
        
        this.voids = this.add.group();
        this.voids.add(this.map.createStaticLayer('void', 'blocks'));
        this.map.setCollision(22,false,false,'void');
        this.voids.add(this.map.createStaticLayer('void2', 'blocks'));
        this.map.setCollision(40,false,false,'void2');
        this.map.createStaticLayer('cliff', 'blocks');
        this.voids.add(this.map.createStaticLayer('breakblefloor', 'blocks'));
        this.map.setCollision(107,false,false,'breakblefloor');
        
        this.tpStairs = this.map.createStaticLayer('stairstp', 'blocks');
        this.map.setCollision(34,false,false,'stairstp');
        
        this.doors = this.map.createStaticLayer('doors', 'blocks');
        this.map.setCollisionBetween(6,106,true,false,'doors');
        
        
        //Init objects
        this.floorButton = this.map.createStaticLayer('button', 'objects');
        this.map.setCollision(110,false,false,'button');
        
        this.bonfires = this.map.createStaticLayer('hoguera', 'objects');
        this.map.setCollision(89,true,false,'hoguera');
        this.map.createStaticLayer('antorchas', 'objects');
        
        this.chests = this.map.createStaticLayer('chests', 'objects');
        this.map.setCollision(95,true,false,'chests');
        
        this.crystals = this.map.createStaticLayer('crystals', 'objects');
        this.map.setCollision(111,true,false,'crystals');
        
        //Aquest no esta fet prq una part dels sprites son de la capa de 'blocks', TODO: corregir-ho
        //this.blockDoors = this.map.createStaticLayer('doors', 'objects');
        
        
        //Init fences
        this.fences = this.map.createStaticLayer('fences', 'fences');
        this.map.setCollisionBetween(79,886,true,false,'fences');
        
    }
    
    
    //
    
	update()
    {
        //MOVEMENT
        
        
        //ATTACK
        

	}
    
}











