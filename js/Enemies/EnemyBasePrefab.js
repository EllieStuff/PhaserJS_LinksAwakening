class EnemyBase extends Phaser.GameObjects.Sprite{
    
    constructor(scene, positionX, positionY, sprite)
    {
		super(scene, positionX, positionY, sprite);
		scene.add.existing(this);
        //this.physics.add.sprite(config.width/2,config.height/2,'HardHat').setOrigin(0.5).setScale(1);
        scene.physics.add.existing(this);
        this.body.collideWorldBounds = true;
        scene.events.on('update', this.Update, this);
        //this.ourKeyCodes = scene.ourKeyCodes;
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
    
    
    
    GetRepeled(_enemy, _shield){
        /*var dir = new Vector2(_enemy.body.x - scene.player.body.x, _enemy.body.y - scene.player.body.y).Normalize();
        dir *= repulsionForce;
        
        _enemy.body.velocity.x += dir.x;
        _enemy.body.velocity.y += dir.y;*/
    }
    
    GetDamaged(_enemy, _sword)
    {
        heatlh -= _dmg;
    }
    
    Update(){}
}


