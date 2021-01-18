

class SimpleVoid extends Phaser.GameObjects.Sprite{
    
    constructor(scene, positionX, positionY)
    {
		super(scene, positionX, positionY, 'simpleVoid');
        //this.functionToTrigger = functionToTrigger;
		scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0.5,0).setScale(1);
        this.setDepth(scene.DrawDepths.INTERACTIVE_TILES);
        this.body.setImmovable(true);
        
        this.body.immovable = true;
        this.body.moves = false;
        
        this.playerColManager = new CollisionManager(scene);
        //this.enemiesColManager = new CollisionManager(scene);
        
        //this.initPositionX = positionX;
        //this.initPositionY = positionY;
        
        this.InitCollisions();
        
    }
    
    InitCollisions(){
        this.scene.physics.add.overlap(this, this.scene.player, this.TriggerWithPlayer, null, this);
        //this.scene.physics.add.overlap(this, this.scene.enemies, this.TriggerWithEnemies, null, this);
    }
    
    
    TriggerWithPlayer(){
        if(this.active){
            this.playerColManager.UpdateOnTrigger();
            
            if(this.playerColManager.ObjectOverlappingInside(this, this.scene.player, 0.5)){
                if(!this.scene.player.isJumping){
                    this.scene.player.x = this.x
                    this.scene.player.y = this.y
                    this.scene.player.Fall()
                }
            }
        }
    }
    
    /*TriggerWithEnemies(_this, _enemy){
        if(this.active){
            this.enemiesColManager.UpdateOnTrigger();
            console.log('1')
            
            if(this.playerColManager.ObjectOverlappingInside(_this, _enemy)){
                console.log('enemy in 2')
                _enemy.Fall()
            }
        }
    }*/
    
}

class BossVoid extends Phaser.GameObjects.Sprite{
    
    constructor(scene, positionX, positionY)
    {
		super(scene, positionX, positionY, 'bossVoid');
        //this.functionToTrigger = functionToTrigger;
		scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0.5,0).setScale(1);
        this.setDepth(scene.DrawDepths.INTERACTIVE_TILES);
        this.body.setImmovable(true);
        
        this.body.immovable = true;
        this.body.moves = false;
        
        
        this.playerColManager = new CollisionManager(scene);
        this.enemiesColManager = new CollisionManager(scene);
        
        this.InitCollisions();
        
    }
    
    InitCollisions(){
        this.scene.physics.add.overlap(this, this.scene.player, this.TriggerWithPlayer, null, this);
    }
    
    
    TriggerWithPlayer(){
        if(this.active){
            this.playerColManager.UpdateOnTrigger();
            
            if(this.playerColManager.ObjectOverlappingInside(this, this.scene.player, 0.5)){
                if(!this.scene.player.isJumping){
                    this.scene.player.x = this.x
                    this.scene.player.y = this.y
                    this.scene.player.FallToPlatformerRoom(1, 1); //ToDo: Posar les id reals
                }
            }
        }
    }
    
}

class BreakableFloor extends Phaser.GameObjects.Sprite{
    
    constructor(scene, positionX, positionY)
    {
		super(scene, positionX, positionY, 'breakableFloor');
        //this.functionToTrigger = functionToTrigger;
		scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0.5,0).setScale(1);
        this.setDepth(scene.DrawDepths.INTERACTIVE_TILES);
        this.body.setImmovable(true);
        
        this.body.immovable = true;
        this.body.moves = false;
        
        this.broke = false
        this.breaking = false
        
        this.playerColManager = new CollisionManager(scene);
        this.enemiesColManager = new CollisionManager(scene);
        
        this.InitCollisions();
        
    }
    
    InitCollisions(){
        this.scene.physics.add.overlap(this, this.scene.player, this.TriggerWithPlayer, null, this);
    }
    
    
    TriggerWithPlayer(){
        if(this.active){
            this.playerColManager.UpdateOnTrigger();
            
            if(!this.broke && !this.breaking){
                this.breaking = true
                this.scene.time.addEvent({delay: 2500, callback: function(){ this.broke = true; this.setFrame(1); this.scene.soundManager.PlayFX('groundCrumbling_FX'); }, callbackScope: this, repeat: 0});
            }
            else if(this.broke && this.playerColManager.ObjectOverlappingInside(this, this.scene.player, 0.5)){
                if(!this.scene.player.isJumping){
                    this.scene.player.x = this.x
                    this.scene.player.y = this.y
                    this.scene.player.Fall()
                }
            }
        }
    }
    
}


