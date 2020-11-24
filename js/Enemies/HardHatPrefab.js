//import EnemyBase from './js/Enemies/EnemyBasePrefab.js';

class HardHatPrefab extends EnemyBase{
    
    constructor(scene, positionX, positionY, sprite)
    {
		super(scene, positionX, positionY, sprite);
        this.health = 0;
        this.isVulnerable = false;
        this.damage = 4;
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