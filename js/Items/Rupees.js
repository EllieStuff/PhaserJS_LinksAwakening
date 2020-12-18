class RedRupee extends ItemsBase{
    constructor(scene, positionX, positionY){
        super(scene, positionX, positionY, 'redRupee');
        
    }
    
    StartEffect(){
        this.scene.player.rupies + = 30;
        
        this.destroy();
        
    }
    
    
}

class BlueRupee extends ItemsBase{
    constructor(scene, positionX, positionY){
        super(scene, positionX, positionY, 'blueRupee');
        
    }
    
    StartEffect(){
        this.scene.player.rupies + = 1;
        
        this.destroy();
        
    }
    
    
}