class gameState extends Phaser.Scene{
	constructor(){
		//Llamamos al constructor de la escena
	 	super({key: 'gameState'});
	}
	preload(){
        var rutaImgLink = 'assets/img/link/';
        var rutaImgEnemies = 'assets/img/enemies/';
        var rutaImgItems = 'assets/img/items/';
        var rutaImgTiles = 'assets/img/tiles/';
        var rutaImgInteractiveTiles = 'assets/img/InteractiveTiles/';
        
        // Load Images
        //Player
        this.load.spritesheet('playerMove'      ,rutaImgLink + 'WAnim.png'       ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('playerMoveShield',rutaImgLink + 'WShieldAnim.png' ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('playerShieldUp'  ,rutaImgLink + 'shieldAnim.png'  ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('playerSlash'  ,rutaImgLink + 'LinkSlash.png'  ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('playerJump'  ,rutaImgLink + 'jumpAnim.png'  ,{frameWidth: 16, frameHeight: 32});
        //Enemies
        this.load.spritesheet('HardHat',rutaImgEnemies + 'HardHatAnim.png',{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('BladeTrap', rutaImgEnemies + 'BladeTrap.png', {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('enemySkeleton', rutaImgEnemies + 'EsqueletoAnim.png', {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('auxSkeleton', rutaImgEnemies + 'EsqueletoJumpAnim.png', {frameWidth: 16, frameHeight: 32});
        this.load.spritesheet('batEnemy', rutaImgEnemies + 'KeeseAnim.png', {frameWidth: 16, frameHeight: 16});
        //Items
        this.load.spritesheet('atkPowerUp',rutaImgItems + 'PowerUp_Atk.png',{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('defPowerUp',rutaImgItems + 'PowerUp_Def.png',{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('key',rutaImgItems + 'Key.png',{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('masterKey',rutaImgItems + 'MasterKey.png',{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('rocFeather',rutaImgItems + 'RocFeather.png',{frameWidth: 16, frameHeight: 16});
        //Interactive Tiles
        this.load.spritesheet('movableBlock',rutaImgInteractiveTiles + 'Block.png',{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('keyDoor',rutaImgInteractiveTiles + 'KeyDoorAnim.png',{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('bossKeyDoor',rutaImgInteractiveTiles + 'BossKeyDoor.png',{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('eventDoor',rutaImgInteractiveTiles + 'EventDoor.png',{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('oneWayDoor',rutaImgInteractiveTiles + 'OneWayDoorAnim.png',{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('oneWayDoorBackwards',rutaImgInteractiveTiles + 'OneWayDoorBackwardsAnim.png',{frameWidth: 16, frameHeight: 16});
        //Others
        this.load.spritesheet('emptySprite', 'assets/img/Empty_Sprite.png', {frameWidth: 16, frameHeight: 16});
        this.load.image('hitbox', rutaImgLink + 'HitboxLink.png');
        
        // Dungeon
        this.load.image('blocks', rutaImgTiles + 'DungeonBlockSheet.png');
        this.load.image('objects', rutaImgTiles + 'dungeonTiles1.png');
        this.load.image('fences', rutaImgTiles + 'vallas.png');
        this.load.tilemapTiledJSON('dungeon', 'maps/insideMap.json');
        
        // Load Audios
        
        
	}
	create(){
        //Load Map
        this.LoadMap();
        
        //SetOrigin
        
        
        
        //add.sprite & anims.create
        
        //Inputs
        this.inputs = new InputManager(this);
       
        //Variables
        this.Directions = { RIGHT: 0, LEFT: 1, UP: 2, DOWN: 3 };
        
        //Player
        this.CreatePlayer();
        
        //LoadGroups
        //this.player.body.collideWorldBounds = true;
        this.CreateEnemies();
        
        
        this.items = this.physics.add.group();
        this.items.add(new PowerUpAtk(this,config.width/2 - 20,config.height/2 - 20));
        this.items.add(new PowerUpDef(this,config.width/2 + 10,config.height/2 + 10));
        this.items.add(new Key(this,config.width/2 - 20,config.height/2 + 10));
        this.items.add(new MasterKey(this,config.width/2 + 10,config.height/2 -20));
        
        
        //this.atkPU = new PowerUpsBase(this,config.width/2 - 10,config.height/2 - 10, 'atkPowerUp');
        
        
        // COLISIONES
        //Colliders And Overlaps will init on each enemy, item, etc. or wathever is needed.
        
        //Colliders
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
        
    }
    
    CreateEnemies(){
        this.enemies = this.physics.add.group();
        
        //Afegir els enemics un per un aqui si no no es que ho hem de fer diferent per tema del tilemap
        this.CreateEnemy(SkeletonPrefab, config.width/4, config.height/4, true);
        this.CreateEnemy(HardHatPrefab , config.width/2, config.height/4, true);
        this.CreateEnemy(BladePrefab, config.width/3, config.height/4, true);
        this.CreateEnemy(BatPrefab, config.width/2, config.height/2, true);
        
    }
    
    CreateEnemy(_enemyType, _posX, _posY, _startActive){
        var enemy = new _enemyType(this, _posX, _posY);
        this.enemies.add(enemy);
        enemy.visible = enemy.active = _startActive;    
	}
    
    StartItemEffect(_player, _item){
        _item.StartEffect();
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











