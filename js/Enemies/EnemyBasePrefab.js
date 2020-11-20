class EnemyBase extends Phaser.GameObjects.Sprite{
    
    constructor(scene, positionX, positionY, sprite)
    {
		super(scene, positionX, positionY, sprite);
		scene.add.existing(this);
        this.setOrigin(0.5,0);
        this.damage = 1;
        this.health = 1;
        this.isVulnerable = TRUE;
        this.speed = 1;
    }  
    preUpdate(){
		/*if(this.y <= 0){
            this.active = false;
        }*/
	}
    
    GetDamaged(_dmg)
    {
        heatlh -= _dmg;
    }
    Update(){}
}
