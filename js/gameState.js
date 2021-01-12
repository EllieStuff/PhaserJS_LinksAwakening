class gameState extends Phaser.Scene{
	constructor(){
		//Llamamos al constructor de la escena
	 	super({key: 'gameState'});
	}
	preload(){
        var rutaImgLink             = 'assets/img/link/';
        var rutaImgEnemies          = 'assets/img/enemies/';
        var rutaImgItems            = 'assets/img/items/';
        var rutaImgTiles            = 'assets/img/tiles/';
        var rutaImgInteractiveTiles = 'assets/img/InteractiveTiles/';
        var rutaImgHUD              = 'assets/img/UI/';
        var rutaFX                  = 'assets/au/FX/';
        var rutaOST                 = 'assets/au/OST/';
        
        // Load Images
        //Player
        this.load.spritesheet('playerMove'      ,rutaImgLink + 'WAnim.png'       ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('playerMoveShield',rutaImgLink + 'WShieldAnim.png' ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('playerShieldUp'  ,rutaImgLink + 'shieldAnim.png'  ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('playerSlash'     ,rutaImgLink + 'LinkSlash.png'   ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('playerJump'      ,rutaImgLink + 'jumpAnim.png'    ,{frameWidth: 16, frameHeight: 32});
        this.load.spritesheet('playerPlatformerJump' ,rutaImgLink + 'platformerJumpAnim.png' ,{frameWidth: 16, frameHeight: 16});
        
        //Enemies
        this.load.spritesheet('HardHat'      ,rutaImgEnemies + 'HardHatAnim.png'       ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('enemySkeleton',rutaImgEnemies + 'EsqueletoAnim.png'     ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('auxSkeleton'  ,rutaImgEnemies + 'EsqueletoJumpAnim.png' ,{frameWidth: 16, frameHeight: 32});
        this.load.spritesheet('spikedBeetle' ,rutaImgEnemies + 'SpikedBeetle.png'      ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('pokerEnemy'   ,rutaImgEnemies + 'PokerEnemy.png'        ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('BladeTrap', rutaImgEnemies    + 'BladeTrap.png'         ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('batEnemy', rutaImgEnemies     + 'KeeseAnim.png'         ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('goomba', rutaImgEnemies       + 'Goomba.png'            ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('sparkEnemy', rutaImgEnemies   + 'SparkAnim.png'         ,{frameWidth: 16, frameHeight: 16});
        
        this.load.spritesheet('moldormEnemy', rutaImgEnemies + 'MiniMoldorm.png'       ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('moldormEnemyBody1', rutaImgEnemies + 'MoldormBody1.png'       ,{frameWidth: 12, frameHeight: 12});
        this.load.spritesheet('moldormEnemyBody2', rutaImgEnemies + 'MoldormBody2.png'       ,{frameWidth: 10, frameHeight: 10});
        this.load.spritesheet('moldormBossEnemy', rutaImgEnemies + 'MoldormHeads.png'       ,{frameWidth: 28, frameHeight: 28});
        this.load.spritesheet('moldormBossEnemyBody', rutaImgEnemies + 'MoldormBodys.png'       ,{frameWidth: 16, frameHeight: 16});
        //Items
        this.load.spritesheet('atkPowerUp',rutaImgItems + 'PowerUp_Atk.png',{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('defPowerUp',rutaImgItems + 'PowerUp_Def.png',{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('key'       ,rutaImgItems + 'Key.png'        ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('masterKey' ,rutaImgItems + 'MasterKey.png'  ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('rocFeather',rutaImgItems + 'RocFeather.png' ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('blueRupee' ,rutaImgItems + 'BlueRupee.png'  ,{frameWidth: 8,  frameHeight: 16});
        this.load.spritesheet('redRupee'  ,rutaImgItems + 'RedRupee.png'   ,{frameWidth: 8,  frameHeight: 16});
        this.load.spritesheet('smallHeart',rutaImgItems + 'RocFeather.png' ,{frameWidth: 16, frameHeight: 16});
        
        //Interactive Tiles
        this.load.spritesheet('movableBlock',rutaImgInteractiveTiles        + 'Block.png'                  ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('keyDoor',rutaImgInteractiveTiles             + 'KeyDoorAnim.png'            ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('masterKeyDoor',rutaImgInteractiveTiles       + 'BossKeyDoor.png'            ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('eventDoor',rutaImgInteractiveTiles           + 'EventDoor.png'              ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('oneWayDoor',rutaImgInteractiveTiles          + 'OneWayDoorAnim.png'         ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('oneWayDoorBackwards',rutaImgInteractiveTiles + 'OneWayDoorBackwardsAnim.png',{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('tpStairs',rutaImgInteractiveTiles            + 'TP_Stairs.png'              ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('smallLadders',rutaImgInteractiveTiles        + 'SmallLadders.png'           ,{frameWidth: 16, frameHeight: 56});
        this.load.spritesheet('largeLadders',rutaImgInteractiveTiles        + 'LargeLadders.png'           ,{frameWidth: 16, frameHeight: 112});
        this.load.spritesheet('keyBlock',rutaImgInteractiveTiles            + 'KeyBlock.png'               ,{frameWidth: 16, frameHeight: 16});
        
        //HUD
        this.load.image('bgHUD',rutaImgHUD + 'HUD_bg.png');
        this.load.image('rupieHUD',rutaImgHUD + 'Rupie_UI.png');
        this.load.spritesheet('heartsUI',rutaImgHUD + 'Hearts_UI.png',{frameWidth: 8, frameHeight: 8});
        this.load.spritesheet('numbersUI',rutaImgHUD + 'Numbers_UI.png',{frameWidth: 8, frameHeight: 8});
        this.load.spritesheet('ObjectHUD',rutaImgHUD + 'Objects_HUD.png',{frameWidth: 24, frameHeight: 16});
        
        //Others
        this.load.spritesheet('emptySprite', 'assets/img/Empty_Sprite.png', {frameWidth: 16, frameHeight: 16});
        this.load.image('hitbox', rutaImgLink + 'HitboxLink.png');
        
        
        // Dungeon
        this.load.image('blocks', rutaImgTiles + 'DungeonBlockSheet.png');
        this.load.image('objects', rutaImgTiles + 'dungeonTiles1.png');
        this.load.image('fences', rutaImgTiles + 'vallas.png');
        this.load.image('Blocks', rutaImgTiles + 'DungeonBlockSheet - copia.png');
        this.load.image('torches', 'assets/img/objAnims/' + 'LitAnim.png');
        this.load.tilemapTiledJSON('dungeon', 'maps/insideMap.json');
        this.load.tilemapTiledJSON('platformerDungeon', 'maps/2dVerticalMap.json');
        
        
        // Load Audios
        //FX
            //Bosses - ToDo
        this.load.audio('bossBursting_FX', rutaFX           + 'LA_Boss_Bursting.wav');
        this.load.audio('bossBurstingFast1_FX', rutaFX      + 'LA_Boss_Bursting_Fast1.wav');
        this.load.audio('bossBurstingFast2_FX', rutaFX      + 'LA_Boss_Bursting_Fast2.wav');
        this.load.audio('bossDying_FX', rutaFX              + 'LA_Boss_Die.wav');
        this.load.audio('bossExploding_FX', rutaFX          + 'LA_Boss_Explode.wav');
        this.load.audio('bossHit_FX', rutaFX                + 'LA_Boss_Hit.wav');
        this.load.audio('bossSegmentExplode_FX', rutaFX     + 'LA_Moldorm_SegmentExplode.wav');
        this.load.audio('bossSpeedy_FX', rutaFX             + 'LA_Moldorm_Speedy.wav');
        this.load.audio('miniBossRoller_FX', rutaFX         + 'LA_RollingBones_Roller.wav');
            //Enemies
        this.load.audio('bladeTrap_FX', rutaFX              + 'LA_BladeTrap.wav');
        this.load.audio('enemyDying_FX', rutaFX             + 'LA_Enemy_Die.wav'); //---
        this.load.audio('enemyDyingPowerUp_FX', rutaFX      + 'LA_Enemy_Die_Power.wav'); //---
        this.load.audio('enemyFalling_FX', rutaFX           + 'LA_Enemy_Fall.wav'); //---
        this.load.audio('enemyHit_FX', rutaFX               + 'LA_Enemy_Hit.wav'); //---
        this.load.audio('enemyHitPowerUp_FX', rutaFX        + 'LA_Enemy_Hit_Power.wav'); //---
        this.load.audio('enemyJumping_FX', rutaFX           + 'LA_Enemy_Jump.wav'); //---
            //items
        this.load.audio('compassSignal_FX', rutaFX          + 'LA_Dungeon_Signal.wav'); //---
            //Tilemap
        this.load.audio('openChest_FX', rutaFX              + 'LA_Chest_Open.wav'); // - ToDo
        this.load.audio('doorSlam_FX', rutaFX               + 'LA_Dungeon_DoorSlam.wav'); // - Testing
        this.load.audio('oneWayDoor_FX', rutaFX             + 'LA_Dungeon_OneWayDoor.wav'); // - Testing
        this.load.audio('triggerSwitch_FX', rutaFX          + 'LA_Dungeon_Switch.wav'); //---
        this.load.audio('teleport_FX', rutaFX               + 'LA_Dungeon_Teleport.wav'); //---
        this.load.audio('teleportAppear_FX', rutaFX         + 'LA_Dungeon_Teleport_Appear.wav'); //---
            //Events
        this.load.audio('transportOut_FX', rutaFX           + 'LA_Dungeon_TransportOut.wav'); //--- //Quan agafes l'instrument i et fa fora de la dungeon
        
        //OST
        
        
	}
	create(){
        //Load Map
        this.LoadMap();
        this.LoadPlatformerMap();
        //this.LoadMap();
        
        //SetOrigin
        
        
        
        //add.sprite & anims.create
        
        //Inputs
        this.inputs = new InputManager(this);
       
        //Variables
        this.DrawDepths = { DEFAULT: 0, INTERACTIVE_TILES: 1, ITEMS: 2, ENEMIES: 3, PLAYER: 4 };
        this.Directions = { RIGHT: 'right', LEFT: 'left', UP: 'up', DOWN: 'down', UP_RIGHT: 'up-right', DOWN_RIGHT: 'down-right', UP_LEFT: 'up-left', DOWN_LEFT: 'down-left', NONE: 'none' };
        this.PhysicTypes = { TOP_DOWN_VIEW: 0, FRONT_VIEW: 1 };
        
        //Player
        this.CreatePlayer();
        
        //LoadGroups
        //this.movableBlock = new MovableBlock(this, config.width/2 - 24,config.height/2 + 48);
        this.CreateInteractiveTiles();
        
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
        
        //Texts
        this.owlString = "HOLA MUNDO";
        this.owlText = this.add.text(config.width, config.height, this.owlString, { fontFamily: 'Arial', fontSize: '25px',   color:'#fff' }).setOrigin(1);
        this.counter = 0;
	}
    
    CreatePlayer()
    {
        //this.player = this.physics.add;
        this.player = new PlayerPrefab(this,config.width/2,config.height/2);
        //this.player = this.physics.add.sprite(config.width/2,config.height/2,'playerMove').setOrigin(0,5).setScale(1);
        
    }
    
    CreateInteractiveTiles(){
        //TP Stairs
        this.tpStairsPair1 = new TPStairsPair(this, 72, 592, 40, 0);
        this.tpStairsPair2 = new TPStairsPair(this, 296, 144, 280, 0);
        this.tpStairsPair3 = new TPStairsPair(this, 1048, 304, 600, 0);
        
        //Platformer Ladders
        this.platLadders = this.physics.add.group();
        this.platLadders.add(new Ladders(this, 40, 0,'largeLadders'));
        this.platLadders.add(new Ladders(this, 136, 56,'smallLadders'));
        this.platLadders.add(new Ladders(this, 184, 56,'smallLadders'));
        this.platLadders.add(new Ladders(this, 280, 0,'largeLadders'));
        this.platLadders.add(new Ladders(this, 600, 0,'largeLadders'));
        
        //Key Block
        this.keyBlock = new KeyBlock(this, 680,336);
        
        // Doors
        this.doors = this.physics.add.group();
        //Key Doors
        this.doors.add(new KeyDoor(this, 400, 256, this.Directions.DOWN));
        this.doors.add(new KeyDoor(this, 792, 440, this.Directions.LEFT));
        //Boss Doors
        this.doors.add(new MasterKeyDoor(this, 1040, 256));
        
    }
    
    CreateEnemies(){
        this.enemies = this.physics.add.group();
        
        //Afegir els enemics un per un aqui si no no es que ho hem de fer diferent per tema del tilemap
        this.CreateEnemy(SkeletonPrefab, config.width/4, config.height/4, true);
        this.CreateEnemy(HardHatPrefab , config.width/2, config.height/4, true);
        this.CreateEnemy(BladePrefab, config.width/3, config.height/4, true);
        this.CreateEnemy(BatPrefab, config.width/2, config.height/2, true);
        this.CreateEnemy(GoombaPrefab, 100, 90, true);
        this.CreateEnemy(GoombaPrefab, 200, 90, true);
        //this.CreateEnemy(BatPrefab, config.width/2, config.height/2, true);
        this.CreateEnemy(miniMoldormPrefab, config.width/2, config.height/2, true);
        this.CreateEnemy(SparkPrefab, config.width/2 + 40, config.height/2, true);
        this.CreateEnemy(MoldormBossPrefab, config.width-60, config.height/4, true);
        
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
        
        //Init HUD
        this.hudBG = this.add.image(config.width,config.height,'bgHUD').setOrigin(1).setScale(7);
        this.rupieHUD = this.add.image(config.width/2, config.height/1.17, 'rupieHUD').setOrigin(0).setScale(7);
        var posX = config.width/2 + (16*7);
        var posY = config.height - (16*3.5);
        this.unitDigit = this.add.sprite(posX, posY, 'numbersUI').setOrigin(0).setScale(7);
        var posX = config.width/2 + (16*3.5);
        var posY = config.height - (16*3.5);
        this.decimalDigit = this.add.sprite(posX, posY, 'numbersUI').setOrigin(0).setScale(7);
        var posX = config.width/2;
        var posY = config.height - (16*3.5);
        this.centDigit = this.add.sprite(posX, posY, 'numbersUI').setOrigin(0).setScale(7);
        
        
    }
    
    LoadPlatformerMap(){
        
        this.platformerMap = this.add.tilemap('platformerDungeon');
        this.platformerMap.addTilesetImage('Blocks');
        this.platformerMap.addTilesetImage('torches');
        
        //Init blocks
        //this.platformerMap.createStaticLayer('background', 'Blocks');
        
        this.platWalls = this.platformerMap.createStaticLayer('walls', 'Blocks');
        this.platformerMap.setCollisionBetween(62,76,true,false,'walls');
        
        this.platFloor = this.platformerMap.createStaticLayer('floor', 'Blocks');
        this.platformerMap.setCollisionBetween(38,75,true,false,'floor');
        
        
        //this.platLadders = this.platformerMap.createStaticLayer('ladders', 'Blocks');
        //this.platformerMap.setCollision(61,true,false,'ladders');
        
        //this.platformerMap.createStaticLayer('torchlights', 'torches');
        
        //this.platformerMap.createStaticLayer('decoration', 'Blocks');
        
        
    }
    ShowText(_text, lenght)
    {
        if(this.counter < lenght){
            if(_text[this.counter] != null){
                this.owlText.text = this.owlText.text + _text[this.counter];
                this.counter++; 
            } 
        }
        else{
            this.finishedText = true;
        }
    }
    
    ClearText(){
        this.owlText.text = "";
        this.counter = 0;
    }
    //
    
	update()
    {
        //MOVEMENT
        
            var sampleText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nQuisque aliquet consectetur malesuada.\nEtiam libero nisi, consequat a arcu a, commodo eleifend diam.";
            this.ShowText(sampleText, sampleText.length);
        
        
               
           
        //ATTACK
        

	}
    
}











