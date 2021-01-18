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
        var rutaImgMenus            = 'assets/img/MapUI/';
        var rutaFX                  = 'assets/au/FX/';
        var rutaOST                 = 'assets/au/OST/';
        
        // Load Images
        //Player
        this.load.setPath(rutaImgLink);
        this.load.spritesheet('playerMove'          ,'WAnim.png'              ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('playerMoveShield'    ,'WShieldAnim.png'        ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('playerShieldUp'      ,'shieldAnim.png'         ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('playerJump'          ,'jumpAnim.png'           ,{frameWidth: 16, frameHeight: 32});
        this.load.spritesheet('playerPlatformerJump','platformerJumpAnim.png' ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('playerAttack'        ,'LinkAttack.png'         ,{frameWidth: 48, frameHeight: 48});
        this.load.spritesheet('playerSpin'          ,'LinkSpinA.png'          ,{frameWidth: 48, frameHeight: 48});
        this.load.spritesheet('playerCharge'        ,'LinkCharge.png'         ,{frameWidth: 48, frameHeight: 48});
        this.load.spritesheet('playerSlash'     ,'LinkSlash.png'   ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('playerFall'      ,'fallAnim.png'    ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('playerPush'          ,'pushAnim.png'           ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('playerHitAnim'           ,'hitAnim.png'            ,{frameWidth: 16, frameHeight: 16});
        //Enemies
        this.load.setPath(rutaImgEnemies);
        this.load.spritesheet('HardHat'      ,'HardHatAnim.png'       ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('enemySkeleton','EsqueletoAnim.png'     ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('auxSkeleton'  ,'EsqueletoJumpAnim.png' ,{frameWidth: 16, frameHeight: 32});
        this.load.spritesheet('spikedBeetle' ,'SpikedBeetle.png'      ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('pokerEnemy'   ,'PokerEnemy.png'        ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('BladeTrap','BladeTrap.png'         ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('batEnemy','KeeseAnim.png'         ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('goomba','Goomba.png'            ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('redZol','RedZol.png'            ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('greenZol','GreenZol.png'            ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('sparkEnemy','SparkAnim.png'         ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('enemyFallingAnim','EnemyFallingAnim.png'       ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('moldormEnemy','MiniMoldorm.png'       ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('moldormEnemyBody1','MoldormBody1.png'       ,{frameWidth: 12, frameHeight: 12});
        this.load.spritesheet('moldormEnemyBody2','MoldormBody2.png'       ,{frameWidth: 10, frameHeight: 10});
        this.load.spritesheet('moldormBossEnemy','MoldormHeads.png'       ,{frameWidth: 28, frameHeight: 28});
        this.load.spritesheet('moldormBossEnemyBody','MoldormBodys.png'       ,{frameWidth: 16, frameHeight: 16});
        
        //Items
        this.load.setPath(rutaImgItems);
        this.load.spritesheet('atkPowerUp','PowerUp_Atk.png',{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('defPowerUp','PowerUp_Def.png',{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('key'       ,'Key.png'        ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('masterKey' ,'MasterKey.png'  ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('rocFeather','RocFeather.png' ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('blueRupee' ,'BlueRupee.png'  ,{frameWidth: 8,  frameHeight: 16});
        this.load.spritesheet('redRupee'  ,'RedRupee.png'   ,{frameWidth: 8,  frameHeight: 16});
        this.load.spritesheet('smallHeart','SmallHeart.png' ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('HeartContainer','HeartContainer.png' ,{frameWidth: 16, frameHeight: 16});
        
        //Interactive Tiles
        this.load.setPath(rutaImgInteractiveTiles);
        this.load.spritesheet('movableBlock','Block.png'                  ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('keyDoor','KeyDoorAnim.png'            ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('masterKeyDoor','BossKeyDoor.png'            ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('eventDoor','EventDoor.png'              ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('oneWayDoor','OneWayDoorAnim.png'         ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('oneWayDoorBackwards','OneWayDoorBackwardsAnim.png',{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('tpStairs','TP_Stairs.png'              ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('smallLadders','SmallLadders.png'           ,{frameWidth: 16, frameHeight: 56});
        this.load.spritesheet('largeLadders','LargeLadders.png'           ,{frameWidth: 16, frameHeight: 112});
        this.load.spritesheet('keyBlock','KeyBlock.png'               ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('simpleVoid','SimpleVoid.png'             ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('bossVoid','BossVoid.png'               ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('breakableFloor','BreakableFloor.png'         ,{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('chest','Chest.png'                  ,{frameWidth: 16, frameHeight: 16});
        
        //HUD
        this.load.setPath(rutaImgHUD);
        this.load.image('bgHUD','HUD_bg.png');
        this.load.image('rupieHUD','Rupie_UI.png');
        this.load.spritesheet('heartsUI','Hearts_UI.png',{frameWidth: 8, frameHeight: 8});
        this.load.spritesheet('numbersUI','Numbers_UI.png',{frameWidth: 8, frameHeight: 8});
        this.load.spritesheet('ObjectHUD','Objects_HUD.png',{frameWidth: 24, frameHeight: 16});
        
        //Others
        this.load.setPath("assets/img/");
        this.load.spritesheet('emptySprite', 'Empty_Sprite.png', {frameWidth: 16, frameHeight: 16});
        this.load.setPath(rutaImgLink);
        this.load.image('hitbox','HitboxLink.png');
        this.load.image('hitboxAttack','LinkAttackHit.png');
        this.load.image('hitboxShield','ShieldHitbox.png');
        this.load.setPath(rutaImgMenus);
        this.load.image('startMenu','Intro Links Awakening.png');
        
        
        // Dungeon
        this.load.setPath(rutaImgTiles);
        this.load.image('blocks','DungeonBlockSheet.png');
        this.load.image('objects','dungeonTiles1.png');
        this.load.image('fences','vallas.png');
        this.load.image('Blocks','DungeonBlockSheet - copia.png');
        this.load.setPath("assets/img/objAnims/");
        this.load.image('torches','LitAnim.png');
        this.load.setPath("maps/");
        this.load.tilemapTiledJSON('dungeon', 'insideMap.json');
        this.load.json('json', 'insideMap.json');
        this.load.tilemapTiledJSON('platformerDungeon', '2dVerticalMap.json');
        
        
        // Load Audios
        //FX
            //Bosses - ToDo
        this.load.setPath(rutaFX);
        this.load.audio('bossBursting_FX','LA_Boss_Bursting.wav');
        this.load.audio('bossBurstingFast1_FX','LA_Boss_Bursting_Fast1.wav');
        this.load.audio('bossBurstingFast2_FX','LA_Boss_Bursting_Fast2.wav');
        this.load.audio('bossDying_FX','LA_Boss_Die.wav');
        this.load.audio('bossExploding_FX','LA_Boss_Explode.wav');
        this.load.audio('bossHit_FX','LA_Boss_Hit.wav');
        this.load.audio('bossSegmentExplode_FX','LA_Moldorm_SegmentExplode.wav');
        this.load.audio('bossSpeedy_FX','LA_Moldorm_Speedy.wav');
        this.load.audio('miniBossRoller_FX','LA_RollingBones_Roller.wav');
            //Enemies
        this.load.audio('bladeTrap_FX','LA_BladeTrap.wav');
        this.load.audio('enemyDying_FX','LA_Enemy_Die.wav'); // - Testing
        this.load.audio('enemyDyingPowerUp_FX','LA_Enemy_Die_Power.wav'); // - Testing
        this.load.audio('enemyFalling_FX','LA_Enemy_Fall.wav');
        this.load.audio('enemyHit_FX','LA_Enemy_Hit.wav'); // - Testing
        this.load.audio('enemyHitPowerUp_FX','LA_Enemy_Hit_Power.wav'); // - Testing
        this.load.audio('enemyJumping_FX','LA_Enemy_Jump.wav'); // - ToDo: esta en esquelet, falta en miniboss
            //Player
        this.load.audio('linkBounce_FX','LA_Link_Bounce.wav'); //---
        this.load.audio('linkDying_FX','LA_Link_Dying.wav');
        this.load.audio('linkHurt_FX','LA_Link_Hurt.wav');
        this.load.audio('linkJump_FX','LA_Link_Jump.wav');
        this.load.audio('linkPickUp_FX','LA_Link_PickUp.wav');
        //this.load.audio('linkRebound_FX', rutaFX            + 'LA_Link_Rebound.wav'); // No se on ha d'anar
        //this.load.audio('linkRun_FX', rutaFX                + 'LA_Link_Run.wav'); // Crec que no s'ha de posar, que es per les botes pegas
        this.load.audio('linkHurt_FX','LA_Link_Hurt.wav');
        this.load.audio('linkShock_FX','LA_Link_Shock.wav');
        //this.load.audio('linkThrow_FX', rutaFX              + 'LA_Link_Throw.wav'); // Crec que no s'ha de posar
        this.load.audio('shield_FX',                  'LA_Shield.wav');
        this.load.audio('shieldDeflect_FX',           'LA_Shield_Deflect.wav'); //---
        this.load.audio('swordCharge_FX',             'LA_Sword_Charge.wav'); //---
        this.load.audio('swordSlash1_FX',             'LA_Sword_Slash1.wav');
        this.load.audio('swordSlash2_FX',             'LA_Sword_Slash2.wav');
        this.load.audio('swordSlash3_FX',             'LA_Sword_Slash3.wav');
        this.load.audio('swordSlash4_FX',             'LA_Sword_Slash4.wav');
        this.load.audio('swordSpin_FX',               'LA_Sword_Spin.wav'); //---
        this.load.audio('swordTap_FX',                'LA_Sword_Tap.wav'); //---
        this.load.audio('linkFall_FX','LA_Link_Fall.wav');
        this.load.audio('linkLowHealth_FX','LA_LowHealth.wav');
            //items
        this.load.audio('compassSignal_FX','LA_Dungeon_Signal.wav'); // - ToDo: averiguar com va aixo
        this.load.audio('getHeartContainer_FX','LA_Fanfare_HeartContainer.wav');
        this.load.audio('getFanfareItem_FX','LA_Fanfare_Item.wav'); //---
        this.load.audio('getFanfareItemExtended_FX','LA_Fanfare_Item_Extended.wav'); //---
        this.load.audio('getItem1_FX','LA_Get_Item.wav'); //--- Crec que aquest i el d'abaix son per agafar items secundaris de cofres
        this.load.audio('getItem2_FX','LA_Get_Item2.wav'); //---
        this.load.audio('getPowerUp_FX','LA_Get_PowerUp.wav');
        this.load.audio('getRupee_FX','LA_Get_Rupee.wav');
        this.load.audio('getSirenInstrument_FX','LA_Get_SirenInstrument.wav'); //---
        this.load.audio('getSword_FX','LA_Get_Sword.wav'); //---
        this.load.audio('getFullMoonCello_FX','LA_SirensInstrument_FullMoonCello.wav'); //---
            //Tilemap
        this.load.audio('openChest_FX','LA_Chest_Open.wav'); // - ToDo
        this.load.audio('doorSlam_FX','LA_Dungeon_DoorSlam.wav'); // - Testing
        this.load.audio('oneWayDoor_FX','LA_Dungeon_OneWayDoor.wav'); // - Testing
        this.load.audio('triggerSwitch_FX','LA_Dungeon_Switch.wav'); // - ToDo
        this.load.audio('teleport_FX','LA_Dungeon_Teleport.wav'); // - ToDo: mirar si posarem el tp al final
        this.load.audio('teleportAppear_FX','LA_Dungeon_Teleport_Appear.wav'); // - ToDo: ""
        this.load.audio('groundCrumbling_FX','LA_Ground_Crumble.wav');
        this.load.audio('rockPush_FX',                'LA_Rock_Push.wav'); // - Testing
        this.load.audio('stairs_FX',                  'LA_Stairs.wav'); //---
            //Events
        this.load.audio('secret1_FX',                 'LA_Secret1.wav'); //---
        this.load.audio('secret2_FX',                 'LA_Secret2.wav'); //---
        this.load.audio('textDone_FX',                'LA_Text_Done.wav'); //---
        this.load.audio('textLetter_FX',              'LA_Text_Letter.wav'); //---
            //Menus
        this.load.audio('menuCursor_FX',              'LA_Menu_Cursor.wav'); //---
        this.load.audio('menuSelect_FX',              'LA_Menu_Select.wav'); //---
        this.load.audio('pauseMenuOpen_FX',           'LA_PauseMenu_Open.wav'); //---
        this.load.audio('pauseMenuClose_FX',          'LA_PauseMenu_Close.wav'); //---
        this.load.audio('menuCursor_FX',              'LA_Menu_Cursor.wav'); //---
        this.load.audio('transportOut_FX','LA_Dungeon_TransportOut.wav'); //--- //Quan agafes l'instrument i et fa fora de la dungeon
        this.load.audio('error_FX','LA_Error.wav'); //---
        this.load.audio('titleAppear_FX','LA_TitleAppear.wav');
        
        
        //OST
        this.load.setPath(rutaOST);
        this.load.audio('intro_OST','01. Intro.mp3');
        this.load.audio('title_OST','02. Title.mp3');
        this.load.audio('playerSelect_OST','03. Player Select.mp3');
        this.load.audio('playerSelectZelda_OST','04. Player Select ZELDA.mp3');
        this.load.audio('overworld_OST','10. Overworld.mp3');
        this.load.audio('powerUp_OST','17. Piece Of Power _ Guardian Acorn.mp3');
        this.load.audio('tailCave_OST','19. Level 1 - Tail Cave.mp3');
        this.load.audio('sideScrolling_OST','20. Sidescrolling.mp3');
        this.load.audio('miniBoss_OST','21. Mini Boss Battle.mp3');
        this.load.audio('boss_OST','22. Boss Battle.mp3');
        this.load.audio('bossDefeated_OST','23. Boss Defeated.mp3');
        this.load.audio('instrumentsOfTheSirens_OST','24. Instrument Of The Sirens.mp3');
        this.load.audio('fullMoonCello_OST','25. The Full Moon Cello.mp3');
        
	}
	create(){
        //Variables
        this.DrawDepths = { DEFAULT: 0, INTERACTIVE_TILES: 1, ITEMS: 2, ENEMIES: 3, PLAYER: 4, MENU: 7 };
        this.Directions = { RIGHT: 'right', LEFT: 'left', UP: 'up', DOWN: 'down', UP_RIGHT: 'up-right', DOWN_RIGHT: 'down-right', UP_LEFT: 'up-left', DOWN_LEFT: 'down-left', NONE: 'none' };
        this.PhysicTypes = { TOP_DOWN_VIEW: 0, FRONT_VIEW: 1 };
        //Load Map
        this.LoadMap();
        this.LoadPlatformerMap();
        //Player
        this.CreatePlayer();
        //Enemies
        this.CreateEnemies();
        //Set up camera
        this.cameras.main.setBounds(0, 0, this.width, this.height);
        //this.cameras.main.startFollow(this.player);
        this.cameraManager = new CameraManager(this);
        this.cameras.main.centerOn(this.cameraManager.camPosX + config.width/2,this.cameraManager.camPosY + config.height/2);
        
        this.data = this.cache.json.get('json');
        
        this.soundManager = new SoundManager(this)
        
        //this.LoadMap();
        
        //SetOrigin
        
        
        
        //add.sprite & anims.create
        
        //Inputs
        this.inputs = new InputManager(this);
        
        //LoadGroups
        //this.movableBlock = new MovableBlock(this, config.width/2 - 24,config.height/2 + 48);
        this.CreateInteractiveTiles();
        
        
        
        
        this.items = this.physics.add.group();
        this.items.add(new PowerUpAtk(this,config.width/2 - 20,config.height/2 - 20));
        this.items.add(new PowerUpDef(this,config.width/2 + 10,config.height/2 + 10));
        this.items.add(new Key(this,config.width/2 - 20,config.height/2 + 10));
        this.items.add(new MasterKey(this,config.width/2 + 10,config.height/2 -20));
        this.items.add(new HContainer(this, 160*3 + 16, 128*5+16));
        
        
        
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
        
        //Init HUD
        this.LoadHud();
        //Init Start Menu
        this.startMenu = this.add.image(this.cameraManager.camPosX , this.cameraManager.camPosY, 'startMenu').setOrigin(0).setScale(1, 1.06).setDepth(this.DrawDepths.MENU)
        this.inStartMenu = true;
        
	}
    
    CreatePlayer()
    {
        //this.player = this.physics.add;
        this.player = new PlayerPrefab(this,555,725);
        this.player.active = false;
        //this.player = this.physics.add.sprite(config.width/2,config.height/2,'playerMove').setOrigin(0,5).setScale(1);   
    }
    
    loadChests() {
        var posX, posY, chest;
        var j = 0;
        for(var i = 0; i < this.data.layers[15].data.length; i++){
            if(this.data.layers[15].data[i] == 95){
                posX = ((i+1) - (70*j) - 1) * 16;
                posY = (j*16);
                console.log(posY);
                console.log(posX);
                chest = new ChestPrefab(this, posX, posY);
            }
            if((i + 1)%this.data.layers[15].width == 0 && i > 0) j++;
        }
    }
    
    loadVoids() {
        var posX, posY, chest;
        var j = 0;
        for(var i = 0; i < this.data.layers[15].data.length; i++){
            if(this.data.layers[15].data[i] == 95){
                posX = ((i+1) - (70*j) - 1) * 16;
                posY = (j*16);
                console.log(posY);
                console.log(posX);
                chest = new ChestPrefab(this, posX, posY);
            }
            if((i + 1)%this.data.layers[15].width == 0 && i > 0) j++;
        }
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
        
        //Voids
        this.voids = this.add.group()
        this.voids.add(new BossVoid(this, config.width / 2 + 8, config.height / 2 + 48))
        this.voids.add(new SimpleVoid(this, config.width / 2 - 8, config.height / 2 + 48))
        this.voids.add(new BreakableFloor(this, config.width / 2 - 24, config.height / 2 + 48))
        
        // Chests
        this.loadChests();
        
    }
    
    CreateEnemies()
    {
        this.enemies = this.physics.add.group();
        //Afegir els enemics un per un aqui si no no es que ho hem de fer diferent per tema del tilemap
        /*
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
        */
        
    }
    
    CreateEnemy(_enemyType, _posX, _posY, _startActive)
    {
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
        
        //this.voids = this.add.group();
        //this.voids = this.map.createStaticLayer('void2', 'blocks')
        //this.voids.add(this.map.createStaticLayer('void', 'blocks'));
        //this.map.setCollision(40, false, false, 'void2');
        /*this.voids.add(this.map.createStaticLayer('void2', 'blocks'));
        this.map.setCollision(40,false,false,'void2');
        this.map.createStaticLayer('cliff', 'blocks');
        //ToDo: Afegir els brakableBlocks als void nomes quan es trenquin
        this.voids.add(this.map.createStaticLayer('breakblefloor', 'blocks'));
        this.map.setCollision(107,false,false,'breakblefloor');*/
        
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
        
        //Init Start Menu
        //this.startMenu = this.add.image(0, 0,'startMenu')//.setOrigin(1).setScale(7);    
    }
    
    LoadHud(){
        //Init HUD
        this.hudBG = new HudManager(this,this.cameraManager.camPosX,this.cameraManager.camPosY + 128);
        this.hudBG.setMaxHearts(this.player.maxHearts);
        this.hudBG.setObjects("Espada", "Escudo");
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
    
	update()
    {
        if(this.player.body.position.x < this.cameraManager.camPosX)
        {
            this.cameraManager.directionChange =  this.Directions.LEFT;
            this.cameraManager.changeTile = true;
        }
        else if(this.player.body.position.x > this.cameraManager.camPosX + 160)
        {
           this.cameraManager.directionChange =  this.Directions.RIGHT;
           this.cameraManager.changeTile = true;
        }
        else if(this.player.body.position.y < this.cameraManager.camPosY)
        {
            this.cameraManager.directionChange =  this.Directions.UP;
            this.cameraManager.changeTile = true;
        }
        else if(this.player.body.position.y > this.cameraManager.camPosY + 128)
        {
            this.cameraManager.directionChange =  this.Directions.DOWN;
            this.cameraManager.changeTile = true;
        }  
        //this.hudBG.setPosition(this.camPosX,this.camPosY + 128);
        var sampleText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nQuisque aliquet consectetur malesuada.\nEtiam libero nisi, consequat a arcu a, commodo eleifend diam.";
        this.ShowText(sampleText, sampleText.length);
        
        
        if(this.startMenu.visible && this.inputs.GetAnyKey()){
            this.startMenu.visible = false
            this.player.active = true
            
            this.cameras.main.flash(5000, 0xffffff)
            this.soundManager.PlayFX('titleAppear_FX')
            this.soundManager.PlayOST('tailCave_OST')
        }

	}
    
}











