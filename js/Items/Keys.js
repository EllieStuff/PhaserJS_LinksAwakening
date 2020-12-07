class Key extends ItemsBase{
    constructor(scene, positionX, positionY){
        super(scene, positionX, positionY, 'key');
        
    }
    
    StartEffect(){
        this.scene.player.keyAmmount++;
        
        this.destroy();
        
    }
    
    
}

class MasterKey extends ItemsBase{
    constructor(scene, positionX, positionY){
        super(scene, positionX, positionY, 'masterKey');
        
    }
    
    StartEffect(){
        this.scene.player.hasMasterKey = true;
        
        this.destroy();
    }
    
    
}