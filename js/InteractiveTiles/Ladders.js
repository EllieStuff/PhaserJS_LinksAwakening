

class Ladders extends Phaser.GameObjects.Sprite{
    
    constructor(scene, positionX, positionY, sprite)
    {
		super(scene, positionX, positionY, sprite);
        //this.functionToTrigger = functionToTrigger;
		scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.events.on('update', this.Update, this);
        this.body.collideWorldBounds = true;
        this.setOrigin(0.5,0).setScale(1);
        this.setDepth(scene.DrawDepths.INTERACTIVE_TILES);
        this.body.setImmovable(true);
        
        
        this.colManager = new CollisionManager(scene);
        
        //this.initPositionX = positionX;
        //this.initPositionY = positionY;
        
        this.InitCollisions();
        
    }
    
    InitCollisions(){
        this.scene.physics.add.overlap(this, this.scene.player, this.Trigger, null, this);
    }
    
    
    Update(){
        if(this.active){
            if(this.colManager.GetCollisionState() == this.colManager.CollisionState.ENTERED_COLLISION){
                this.scene.player.overlapsWithLadder = true;
            }
            else if(this.colManager.GetCollisionState() == this.colManager.CollisionState.EXIT_COLLISION){
                this.scene.player.onLadders = this.scene.player.overlapsWithLadder = false;
            }
        }
    }
    
    
    Trigger(){
        if(this.active){
            this.colManager.UpdateOnTrigger();
            
        }
    }
    
}


