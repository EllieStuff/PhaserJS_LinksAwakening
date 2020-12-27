

class KeyBlock extends Phaser.GameObjects.Sprite{
    
    constructor(scene, positionX, positionY)
    {
        super(scene, positionX, positionY, 'keyBlock');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0.5,0).setScale(1);
        this.setDepth(scene.DrawDepths.INTERACTIVE_TILES);
        this.body.setImmovable(true);
        
        this.InitCollisions();
        
    }
    
    InitCollisions(){
        this.scene.physics.add.collider(this, this.scene.player, this.Trigger, null, this);
    }
    
    
    Trigger(){
        if(this.active){
            if(this.scene.player.keyAmmount > 0){
                this.scene.player.keyAmmount--;
                
                this.destroy();
                
            }
        }
        
    }
    
}
