class HContainer extends ItemsBase{
    constructor(scene, positionX, positionY){
        super(scene, positionX, positionY, 'HeartContainer');
        
    }
    
    StartEffect(){
        this.scene.player.Heal()
        this.scene.player.AddMaxHeart()
        this.scene.soundManager.PlayFX('getHeartContainer_FX')
        
        this.destroy(); 
    }
}