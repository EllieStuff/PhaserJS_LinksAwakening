

class SimpleVoid extends Phaser.GameObjects.Sprite{
    
    constructor(scene, positionX, positionY)
    {
		super(scene, positionX, positionY, 'simpleVoid');
        //this.functionToTrigger = functionToTrigger;
		scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0.5,0).setScale(1);
        this.setDepth(scene.DrawDepths.INTERACTIVE_TILES);
        
        
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
            
            if(this.playerColManager.ObjectOverlappingInside(this, this.scene.player, 0.5)){
                this.scene.player.x = this.x
                this.scene.player.y = this.y
                this.scene.player.Fall()
            }
        }
    }
    
    TriggerWithEnemies(_this, _enemy){
        if(this.active){
            this.enemiesColManager.UpdateOnTrigger();
            
            if(this.playerColManager.ObjectOverlappingInside(this, _enemy)){
                console.log('enemy in')
                _enemy.Fall()
            }
        }
    }
    
}


