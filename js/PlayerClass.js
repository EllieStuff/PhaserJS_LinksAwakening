class Player extends Phaser.GameObjects.Sprite{
    
    constructor(scene, positionX, positionY){
		super(scene, positionX, positionY, 'player');
		scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.events.on('updatePlayer', this.Update, this);
        this.setOrigin(0.5,0);
        this.maxHearts = 3;
        this.health = this.maxHearts*4;
        this.defense = 1;
        this.attack = 1;
        this.speed = 1;
        this.rupies = 0;
        this.assignA = "";
        this.assignB = "";
        this.isJumping = false;
        this.atkCharged = false;
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
    
    GetDamaged(_player, _enemy)
    {
        if(!_player.isJumping){
            _player.health -= _enemy.attack/this.defense;       //Add death          
        }
        
    }
    
    AddMaxHeart()
    {
        this.maxHearts++;
        this.health = this.maxHearts * 4;
    }
    
    Heal()
    {
        this.health+=4;
        if(this.health > this.maxHearts*4)
            this.health = this.maxHearts * 4;
    }
    
    
    UpdateMovement(){}
    
    
    Update(){
        
    }
    
    
}
