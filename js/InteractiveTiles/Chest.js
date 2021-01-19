// En el tilemap es el número 95, layer 15, tileset 2

class ChestPrefab extends Phaser.GameObjects.Sprite{
    
    constructor(scene, positionX, positionY, _item)
    {
        super(scene, positionX, positionY, 'chest');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0).setScale(1);
        this.setDepth(scene.DrawDepths.INTERACTIVE_TILES);
        this.body.setImmovable(true);
        this.InitCollisions();
        switch(_item){
            case "BlueRupee":
                this.item = new BlueRupee(scene,positionX, positionY + 16);
                break;
            case "RedRupee":
                this.item = new RedRupee(scene, positionX, positionY + 16);
                break;
            case "Key":
                this.item = new Key(scene, positionX, positionY + 16);
                break;
            case "BossKey":
                this.item = new MasterKey(scene, positionX, positionY + 16);
                break;
            case "Pluma":
                this.item = "Pluma";
                break;
            case "Container":
                this.item = new HContainer(scene, positionX, positionY + 16);
                break;
            default:
                break;
        }
    }
    
    InitCollisions(){
        this.scene.physics.add.collider(this, this.scene.player, this.Trigger, null, this);
    }
    
    
    Trigger(chest,player){
        if(chest.body.touching.down && player.body.touching.up){
            if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.K)){
                this.setFrame(1);
                //Animacoin
                //Effect
                if(this.item == "Pluma"){
                    // Se puede saltar
                }
                else{
                    this.item.enabled = true;
                    this.item.StartEffect();
                }
            }
        }
    }
    
}
