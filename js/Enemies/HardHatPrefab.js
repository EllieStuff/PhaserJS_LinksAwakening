class HardHatPrefab extends EnemyBase{
    
    constructor(scene, positionX, positionY, sprite)
    {
		super(scene, positionX, positionY, sprite);
        this.health = 0;
        this.isVulnerable = FALSE;
    }  
    
    preUpdate()
    {
		/*if(this.y <= 0){
            this.active = false;
        }*/
	}
    
    Update()
    {
        
    }
    
    
}