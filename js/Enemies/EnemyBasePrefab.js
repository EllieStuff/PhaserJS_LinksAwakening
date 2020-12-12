class EnemyBase extends Phaser.GameObjects.Sprite{
    
    constructor(scene, positionX, positionY, sprite)
    {
		super(scene, positionX, positionY, sprite);
		scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.collideWorldBounds = true;
        scene.events.on('update', this.Update, this);
        this.setOrigin(0.5,0).setScale(1);
        this.initPositionX = this.body.x;
        this.initPositionY = this.body.y;
        this.damage = 1;
        this.repulsionForce = 1;
        this.initHealth = 1;
        this.health = this.initHealth;
        this.isVulnerable = true;
        this.speed = 1;
        
        this.CreateAnims();
    }  
    
    
    //IMPORTANT: He silenciat el preUpdate() prq sino a les animacions els hi pillen xungos
    /*preUpdate(){
		if(this.y <= 0){
            this.active = false;
        }
	}*/
    
    //Make your anims on each enemy type
    CreateAnims(){}
    
    MoveTowards(_target, _speed){
        this.scene.physics.moveToObject(this, _target, _speed);
    }
    
    IsMoving(){
        var v = this.body.velocity;
        
        return v.x > 1 || v.x < -1 || v.y > 1 || v.y < -1;
    }
    
    CheckDeath(){
        if(this.health <= 0){
            this.Reinit();
            
            this.visible = false;
            this.active = false;
        }
    }
    
    Reinit(){
        this.body.stop();
        this.body.x = this.initPositionX;
        this.body.y = this.initPositionY;
        this.health = this.initHealth;
        this.isVulnerable = true;
    }
    
    
    
    GetRepeled()
    {
       
    }
    
    GetDamaged()
    {
        this.health -= this.scene.player.attack;
        if(this.health <= 0)
            this.Die();
    }
    
    Die(){
        this.Reinit();
        this.active = this.visible = false;
        
    }
    
    CollideWithPlayer(){}
    
    Update(){}
}


