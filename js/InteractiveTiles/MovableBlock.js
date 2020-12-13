

class MovableBlock extends Phaser.GameObjects.Sprite{
    
    constructor(scene, positionX, positionY, functionToTrigger)
    {
		super(scene, positionX, positionY, 'movableBlock');
        this.functionToTrigger = functionToTrigger;
		scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.events.on('update', this.Update, this);
        this.body.collideWorldBounds = true;
        this.setOrigin(0.5,0).setScale(1);
        this.body.setImmovable(true);
        this.hasMoved = false;
        
        this.colManager = new CollisionManager(scene);
        
        //this.initPositionX = positionX;
        //this.initPositionY = positionY;
        
        this.InitCollisions();
        
    }
    
    InitCollisions(){
        this.scene.physics.add.collider(this, this.scene.player, this.Move, null, this);
    }
    
    
    Trigger(){
        this.colManager.UpdateOnTrigger();
        
        
        
    }
    
    
    Move(){}
    
    EndEffect(){}
    
}


