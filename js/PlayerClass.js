class Player extends Phaser.GameObjects.Sprite{
    
    constructor(scene, positionX, positionY){
		super(scene, positionX, positionY, 'player');
		scene.add.existing(this);
        this.setOrigin(0.5,0);
        this.maxHearts = 3;
        this.hearts = this.maxHearts*4;
        this.defense = 1;
        this.attack = 1;
        this.speed = 1;
        this.rupies = 0;
        this.assignA = "";
        this.assignB = "";
        this.isJumping = false;
        //this.nave.anims.play('stand');
        //this.anims.play('standEnemy');
        //this.checkWorldBounds = true;
        //this.outOfBoundsKill = true;
    }  
    preUpdate(){
		/*if(this.y <= 0){
            this.active = false;
        }*/
	}
    
    GetDamaged(_dmg)
    {
        this.hearts -= _dmg/this.defense;       //Add death
    }
    
    AddMaxHeart()
    {
        this.maxHearts++;
        this.hearts = this.maxHearts * 4;
    }
    
    Heal()
    {
        this.hearts+=4;
        if(this.hearts > this.maxHearts*4)
            this.hearts = this.maxHearts * 4;
    }
    UpdateMovement(){}
    
    
    
}
