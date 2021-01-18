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
        this.falling = false
        this.canFall = true
        this.dmgSoundEffect = 'linkHurt_FX'
        
        this.playerColManager = new CollisionManager(scene);
        this.swordColManager = new CollisionManager(scene);
        this.shieldColManager = new CollisionManager(scene);
        
        
        this.InitCollisions();
        this.CreateGlobalAnims();
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
        this.scene.physics.add.overlap(this, this.scene.voids, this.OverlapVoids, null, this);
        //this.scene.physics.add.collider(this, this.scene.player.shield, this.GetRepeled, null, this);   //Prq l'escut repeli una mica els enemics, l'impuls dependra d'una variable del enemy
        //this.scene.physics.add.collider(this, this.scene.player.sword, this.GetDamaged, null, this);    //Prq l'espasa danyi els enemics, el mal dependra del attack del player i de si ha carregat l'atac giratori
    }
    
    CreateGlobalAnims(){
        this.scene.anims.create({
            key: 'enemyFalling',
            frames: this.scene.anims.generateFrameNumbers('enemyFallingAnim', { start: 0, end: 3 }),
            frameRate: 4,
            repeat: 0
        });
    }
    
    //Make your anims on each enemy type
    CreateAnims(){}
    
    MoveTowards(_target, _speed){
        this.scene.physics.moveToObject(this, _target, _speed);
    }
    
    OverlapVoids(){
        if(this.canFall)
            this.Fall()
    }
    
    Fall(){
        if(!this.falling && this.isVulnerable){
            this.falling = true
            //this.active = false
            //this.body.stop()
            this.anims.play('enemyFalling')
            this.scene.soundManager.PlayFX('enemyFalling_FX')
            
            this.scene.time.addEvent({delay: 1000, callback: function(){ this.body.stop() }, callbackScope: this, repeat: 0});
            this.scene.time.addEvent({delay: 3000, callback: this.Die, callbackScope: this, repeat: 0});
            
        }
        
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
        
        if(this.playerColManager.colState == this.playerColManager.CollisionState.ENTERED_COLLISION){
            this.scene.player.GetDamaged(this.attack);
            this.scene.soundManager.PlayFX(this.dmgSoundEffect)
        }
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
            if(this.scene.player.enemiesKilled % 30 == 0 || this.scene.player.enemiesKilled % 12 == 0){
                this.scene.soundManager.PlayFX('enemyHitPowerUp_FX')
            }
            else{
                this.scene.soundManager.PlayFX('enemyHit_FX')
            }
            
            if(this.health <= 0){
                this.Die();
            }
        }
    
    }
    
    Die(){
        this.scene.player.enemiesKilled++;
        this.SpawnItem();
        
        this.x = this.y = 0;
        this.active = this.visible = false;
        
    }
    
    //ToDo: Mirar si funciona aqui i, si no, passar-ho al gameState que alla segur que si
    SpawnItem(){
        if(this.scene.player.enemiesKilled % 30 == 0){
            this.scene.items.add(new PowerUpAtk(this.scene, this.x, this.y))
            this.scene.soundManager.PlayFX('enemyDyingPowerUp_FX')
        }
        else if(this.scene.player.enemiesKilled % 12 == 0){
            this.scene.items.add(new PowerUpDef(this.scene, this.x, this.y))
            this.scene.soundManager.PlayFX('enemyDyingPowerUp_FX')
        }
        else{
            var rnd = Phaser.Math.Between(0, 11)
            if(rnd < 1){
                this.scene.items.add(new RedRupee(this.scene, this.x, this.y))
            }
            else if(rnd < 4){
                this.scene.items.add(new BlueRupee(this.scene, this.x, this.y))
            }
            else if(rnd < 7){
                this.scene.items.add(new Heart(this.scene, this.x, this.y))
            }
            this.scene.soundManager.PlayFX('enemyDying_FX')
        }
        
    }
    
    CollideWithPlayer(){}
    
    Update(){}
}


