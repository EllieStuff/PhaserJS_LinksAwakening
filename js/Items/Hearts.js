class Heart extends ItemsBase{
    constructor(scene, positionX, positionY){
        super(scene, positionX, positionY, 'smallHeart');
        
    }
    
    StartEffect(){
        this.scene.player.Heal()
        this.scene.soundManager.PlayFX('linkPickUp_FX')
        
        this.destroy();
        
    }
    
    
}