class SpikedPrefab extends EnemyBase{
    
    constructor(scene, positionX, positionY)
    {
		super(scene, positionX, positionY, 'spikedBeetle');
        this.health = 1;
        this.isVulnerable = false;
        this.damage = 4;
        this.seeRange = 100;
        this.speed = 30;
        this.collided = false;
        this.charging = false;
        
    }  
    
    
    Update()
    {
            var currentPos = new Phaser.Math.Vector2(this.body);

            if(this.isVulnerable)
            {
                this.anims.play('SpikedDown', true);
            }
            else
            {
                if(currentPos.distance(this.scene.player.body) < this.seeRange && !this.collided)
                {
                    if(!this.charging)
                    {
                        this.MoveTowards(this.scene.player, this.speed * 0.5);                    
                        this.anims.play('SpikedWalk', true); 
                    }
                    
                }
                else if (!this.collided)
                {
                    this.body.stop();
                }
            }
    }
    
    CreateAnims()
    {
        this.scene.anims.create({
            key: 'SpikedWalk',
            frames: this.scene.anims.generateFrameNumbers('spikedBeetle', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'SpikedDown',
            frames: this.scene.anims.generateFrameNumbers('spikedBeetle', { start: 2, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
    }
    
    GetDamaged(){
        this.swordColManager.UpdateOnTrigger();
        
        if(this.swordColManager.colState == this.swordColManager.CollisionState.ENTERED_COLLISION
          && this.isVulnerable){
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
        }
    }
    
    GetRepeled()
    {
        this.shieldColManager.UpdateOnTrigger();
        
        if(this.shieldColManager.colState == this.shieldColManager.CollisionState.ENTERED_COLLISION){
            this.isVulnerable = true;
            this.scene.soundManager.PlayFX('shieldDeflect_FX')
            
            var dir = new Phaser.Math.Vector2(this.x - this.scene.player.x, this.y - this.scene.player.y).normalize()
            var impulse = 100
            this.body.velocity = new Phaser.Math.Vector2(dir.x * impulse, dir.y * impulse)
            this.active = false
            
            this.scene.time.addEvent({delay: 200, callback: function(){this.body.stop(); this.collided = false; this.active = true}, callbackScope: this, repeat: 0});
        }
    }
    DashToPlayer()
    {
        this.charging = true;
        this.body.stop();
        this.MoveTowards(this.scene.player, this.speed * 2.5);
        this.scene.time.addEvent({delay: 450, callback: function(){this.body.stop(); this.charging = false;}, callbackScope: this, repeat: 0});
    }
    
}