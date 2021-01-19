class RedRupee extends ItemsBase{
    constructor(scene, positionX, positionY){
        super(scene, positionX, positionY, 'redRupee');
        
    }
    
    StartEffect(){
        this.scene.player.rupies += 30;
        this.scene.hudBG.setRupies(this.scene.player.rupies);
        this.scene.soundManager.PlayFX('getRupee_FX')
        
        this.destroy();
        
    }
    
    
}

class BlueRupee extends ItemsBase{
    constructor(scene, positionX, positionY){
        super(scene, positionX, positionY, 'blueRupee');
        
    }
    
    StartEffect(){
        this.scene.player.rupies += 1;
        this.scene.hudBG.setRupies(this.scene.player.rupies);
        this.scene.soundManager.PlayFX('getRupee_FX')
        
        this.destroy();
        
    }
    
    
}