//import {EnemyBase} from './js/Enemies/EnemyBasePrefab.js';
//module.exports = EnemyBase;

class SkeletonPrefab extends EnemyBase{
    
    constructor(scene, positionX, positionY, sprite)
    {
		super(scene, positionX, positionY, sprite);
        this.isVulnerable = true;
        this.damage = 2;
        this.health = 2;
        this.isVulnerable = true;
        this.speed = 1;
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