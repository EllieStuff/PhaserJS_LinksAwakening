class Heart extends ItemsBase{
    constructor(scene, positionX, positionY){
        super(scene, positionX, positionY, 'smallHeart');
        
    }
    
    StartEffect(){
        if(this.scene.player.health < (this.scene.player.maxHearts * 4)
            this.scene.player.health + = 1;
        
        this.destroy();
        
    }
    
    
}