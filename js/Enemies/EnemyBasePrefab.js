class EnemyBase extends Phaser.GameObjects.Sprite{
    
    constructor(scene, positionX, positionY, sprite)
    {
		super(scene, positionX, positionY, sprite);
		scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.collideWorldBounds = true;
        scene.events.on('update', this.Update, this);
        this.setOrigin(0.5,0).setScale(1);
        this.setDepth(scene.DrawDepths.ENEMIES);
        
        this.initPositionX = this.body.x;
        this.initPositionY = this.body.y;
        this.attack = 1;
        this.repulsionForce = 1;
        this.initHealth = 1;
        this.health = this.initHealth;
        this.isVulnerable = true;
        this.speed = 1;
        this.canDieOnJump = false;
        
        this.playerColManager = new CollisionManager(scene);
        this.swordColManager = new CollisionManager(scene);
        this.shieldColManager = new CollisionManager(scene);
        
        
        this.InitCollisions();
        this.CreateAnims();
    }  
    
    
    //IMPORTANT: He silenciat el preUpdate() prq sino a les animacions els hi pillen xungos
    /*preUpdate(){
		if(this.y <= 0){
            this.active = false;
        }
	}*/
    
    InitCollisions(){
        this.scene.physics.add.overlap(this, this.scene.player, this.DamagePlayer, null, this);
        this.scene.physics.add.collider(this, this.scene.walls);
        //this.scene.physics.add.collider(this, this.scene.player.shield, this.GetRepeled, null, this);   //Prq l'escut repeli una mica els enemics, l'impuls dependra d'una variable del enemy
        //this.scene.physics.add.collider(this, this.scene.player.sword, this.GetDamaged, null, this);    //Prq l'espasa danyi els enemics, el mal dependra del attack del player i de si ha carregat l'atac giratori
    }
    
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
            this.scene.soundManager.PlayFX('enemyDying_FX')
            
            this.visible = false;
            this.active = false;
        }
    }
    
    Reinit(){
        this.body.stop();
        this.x = this.initPositionX;
        this.y = this.initPositionY;
        this.health = this.initHealth;
        this.isVulnerable = true;
    }
    
    DamagePlayer(){
        this.playerColManager.UpdateOnTrigger();
        
        if(this.playerColManager.colState == this.playerColManager.CollisionState.ENTERED_COLLISION)
            this.scene.player.GetDamaged(this.attack);
    }
    
    GetRepeled()
    {
        this.shieldColManager.UpdateOnTrigger();
        
        if(this.shieldColManager.colState == this.shieldColManager.CollisionState.ENTERED_COLLISION){
            //Do things
        }
    }
    
    GetDamaged()
    {
        this.swordColManager.UpdateOnTrigger();
        
        if(this.swordColManager.colState == this.swordColManager.CollisionState.ENTERED_COLLISION){
            this.health -= this.scene.player.attack;
            this.scene.soundManager.PlayFX('enemyHit_FX')
            
            if(this.health <= 0){
                this.Die();
            }
        }
    
    }
    
    Die(){
        this.x = this.y = 0;
        this.active = this.visible = false;
        
    }
    
    CollideWithPlayer(){}
    
    Update(){}
}


