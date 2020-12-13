class ItemsBase extends Phaser.GameObjects.Sprite{
    
    constructor(scene, positionX, positionY, sprite)
    {
		super(scene, positionX, positionY, sprite);
		scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.collideWorldBounds = true;
        this.setOrigin(0.5,0).setScale(1);
        //this.initPositionX = positionX;
        //this.initPositionY = positionY;
        
        this.CreateAnims();
    }
    
    InitCollisions(){
        this.scene.physics.add.overlap(this, this.scene.player, this.StartEffect, null, this);
    }
    
    //Make your anims on each powerUp type
    CreateAnims(){}
    
    StartEffect(){}
    
    EndEffect(){}
    
}


