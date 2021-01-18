// En el tilemap es el número 95, layer 15, tileset 2

class ChestPrefab extends Phaser.GameObjects.Sprite{
    
    constructor(scene, positionX, positionY)
    {
        super(scene, positionX, positionY, 'chest');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0).setScale(1);
        this.setDepth(scene.DrawDepths.INTERACTIVE_TILES);
        this.body.setImmovable(true);
        
        this.InitCollisions();
        
    }
    
    InitCollisions(){
        this.scene.physics.add.collider(this, this.scene.player, this.Trigger, null, this);
    }
    
    
    Trigger(chest,player){
        if(chest.body.touching.down && player.body.touching.up){
            if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.K)){
                this.setFrame(1);
            }
        }
    }
    
}
