

class Ladders extends Phaser.GameObjects.Sprite{
    
    constructor(scene, positionX, positionY, sprite)
    {
		super(scene, positionX, positionY, sprite);
        //this.functionToTrigger = functionToTrigger;
		scene.add.existing(this);
        scene.physics.add.existing(this);
        //scene.events.on('update', this.Update, this);
        this.body.collideWorldBounds = true;
        this.setOrigin(0.5,0).setScale(1);
        this.setDepth(scene.DrawDepths.INTERACTIVE_TILES);
        this.body.setImmovable(true);
        
        
        this.playerColManager = new CollisionManager(scene);
        this.enemiesColManager = new CollisionManager(scene);
        
        //this.initPositionX = positionX;
        //this.initPositionY = positionY;
        
        this.InitCollisions();
        
    }
    
    InitCollisions(){
        this.scene.physics.add.overlap(this, this.scene.player, this.TriggerWithPlayer, null, this);
        this.scene.physics.add.overlap(this, this.scene.enemies, this.TriggerWithEnemies, null, this);
    }
    
    
    TriggerWithPlayer(){
        if(this.active){
            this.playerColManager.UpdateOnTrigger();
            
            if(this.playerColManager.ObjectOverlappingInside(this, this.scene.player))
                this.scene.player.Fall()
        }
    }
    
    TriggerWithEnemies(_this, _enemy){
        if(this.active){
            this.enemiesColManager.UpdateOnTrigger();
            
            if(this.playerColManager.ObjectOverlappingInside(this, _enemy))
                _enemy.Fall()
        }
    }
    
}


