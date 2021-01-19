class EnemyBase extends Phaser.GameObjects.Sprite{
    
    constructor(scene, positionX, positionY, sprite)
    {
		super(scene, positionX, positionY, sprite);
		scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.collideWorldBounds = true;
        scene.events.on('update', this.Update, this);
        this.setOrigin(0,-0.5).setScale(1);
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
        this.canBeRepeled = true
        this.alive = true
        this.isJumping = false
        
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
        this.scene.physics.add.overlap(this, this.scene.player.shield, this.GetRepeled, null, this);   //Prq l'escut repeli una mica els enemics, l'impuls dependra d'una variable del enemy
        this.scene.physics.add.overlap(this, this.scene.player.sword, this.GetDamaged, null, this);    //Prq l'espasa danyi els enemics, el mal dependra del attack del player i de si ha carregat l'atac giratori
    }
    
    CreateGlobalAnims(){
        this.scene.anims.create({
            key: 'enemyFalling',
            frames: this.scene.anims.generateFrameNumbers('enemyFallingAnim', { start: 0, end: 3 }),
            frameRate: 4,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'enemyDeath',
            frames: this.scene.anims.generateFrameNumbers('EnemyDeath', { start: 0, end: 1 }),
            frameRate: 8,
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
        console.log('aa')
        if(!this.falling && !this.isJumping){
            console.log('ab')
            this.falling = true
            //this.active = false
            //this.body.stop()
            this.anims.play('enemyFalling')
            this.scene.soundManager.PlayFX('enemyFalling_FX')
            this.scene.player.enemiesKilled++;
            this.alive = false
            
            this.scene.time.addEvent({delay: 800, callback: function(){ this.body.stop(); }, callbackScope: this, repeat: 0});
            this.scene.time.addEvent({delay: 1000, callback: function(){this.Deactivate(); }, callbackScope: this, repeat: 0});
            
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
        
        if(this.playerColManager.colState == this.playerColManager.CollisionState.ENTERED_COLLISION
          && this.scene.player.isVulnerable && !this.scene.player.isJumping){
            this.scene.player.GetDamaged(this.attack);
            this.scene.soundManager.PlayFX(this.dmgSoundEffect)
            
            var dir = new Phaser.Math.Vector2(this.scene.player.x - this.x, this.scene.player.y - this.y).normalize()
            var impulse = 70
            this.scene.player.body.velocity = new Phaser.Math.Vector2(dir.x * impulse, dir.y * impulse)
            this.scene.player.canMove = false
            this.scene.player.isVulnerable = false
            this.scene.player.currentAnim = 'playerHit'
            
            this.scene.time.addEvent({delay: 300, callback: function(){this.body.stop(); this.scene.player.canMove = true; this.scene.player.isVulnerable = true; }, callbackScope: this, repeat: 0});
        }
    }
    
    GetRepeled()
    {
        this.shieldColManager.UpdateOnTrigger();
        
        if(this.shieldColManager.colState == this.shieldColManager.CollisionState.ENTERED_COLLISION
          && this.canBeRepeled){
            this.scene.soundManager.PlayFX('shieldDeflect_FX')
            
            var dir = new Phaser.Math.Vector2(this.x - this.scene.player.x, this.y - this.scene.player.y).normalize()
            var impulse = 100
            this.body.velocity = new Phaser.Math.Vector2(dir.x * impulse, dir.y * impulse)
            this.active = false
            
            this.scene.time.addEvent({delay: 200, callback: function(){this.body.stop(); this.collided = false; this.active = true}, callbackScope: this, repeat: 0});
        }
    }
    
    GetDamaged()
    {
        this.swordColManager.UpdateOnTrigger();
        
        if(this.swordColManager.colState == this.swordColManager.CollisionState.ENTERED_COLLISION
          && this.isVulnerable && this.active){
            this.health -= this.scene.player.attack;
            var dir = new Phaser.Math.Vector2(this.x - this.scene.player.x, this.y - this.scene.player.y).normalize()
            var impulse = 200
            this.body.velocity = new Phaser.Math.Vector2(dir.x * impulse, dir.y * impulse)
            this.active = false
            
            this.scene.time.addEvent({delay: 100, callback: function(){this.body.stop(); this.collided = false; this.active = true}, callbackScope: this, repeat: 0});
            
            if(this.scene.player.enemiesKilled % 30 == 0 || this.scene.player.enemiesKilled % 12 == 0){
                this.scene.soundManager.PlayFX('enemyHitPowerUp_FX')
            }
            else{
                this.scene.soundManager.PlayFX('enemyHit_FX')
            }
            
            if(this.health <= 0)
            {
                this.anims.stop();
                this.anims.play('enemyDeath');
                this.Die();
                
                
            }
        }
    
    }
    
    RoomManagement(){
        if(this.scene.cameraManager.TileX == this.IDx && this.scene.cameraManager.TileY == this.IDy && !this.active && this.alive)
        {
            this.Activate();
        }
        else if ((this.scene.cameraManager.TileX != this.IDx || this.scene.cameraManager.TileY != this.IDy) && (this.active || !this.alive)) 
        {
            this.Deactivate();
            this.alive = true
        }
    }
    
    Die(){
        
        this.scene.player.enemiesKilled++;
        this.alive = false
        this.scene.time.addEvent({delay: 300, callback: function(){ this.Deactivate() }, callbackScope: this, repeat: 0});
        this.SpawnItem();
        //this.x = this.y = 0;
       // this.active = this.visible = false;
        
    }
    
    //ToDo: Mirar si funciona aqui i, si no, passar-ho al gameState que alla segur que si
    SpawnItem(){
        if(this.active){
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
        
    }
    
    Activate()
    {
        if(this.scene.cameraManager != null)
            this.scene.cameraManager.enemiesAlive++;
        this.active = this.visible = true;
        this.health = this.initHealth;
        this.x = this.initPositionX;
        this.y = this.initPositionY;
        this.alive = true
    }
    
    Deactivate()
    {
        if(this.scene.cameraManager != null)
            this.scene.cameraManager.enemiesAlive--;
        this.active = this.visible = false;
        this.x = this.y = 0;
    }
    
    
    CollideWithPlayer(){}
    
    Update(){}
}


