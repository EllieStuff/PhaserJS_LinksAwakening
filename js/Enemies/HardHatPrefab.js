//import EnemyBase from './js/Enemies/EnemyBasePrefab.js';

class HardHatPrefab extends EnemyBase{
    
    constructor(scene, positionX, positionY, idX, idY)
    {
		super(scene, positionX, positionY, 'HardHat');
        this.health = 1;
        this.isVulnerable = false;
        this.damage = 4;
        this.seeRange = 100;
        this.speed = 30;
        this.collided = false;
        this.IDx = idX;
        this.IDy = idY;
        this.Deactivate()
    }  
    
    
    Update()
    {
        if(this.active && !this.falling)
        {
            var currentPos = new Phaser.Math.Vector2(this.body);

            if(currentPos.distance(this.scene.player.body) < this.seeRange && !this.collided)
            {
                this.MoveTowards(this.scene.player, this.speed);
                this.anims.play('hardhatWalk', true);

            }
            else if (!this.collided)
            {
                this.body.stop();
            }
            
        }
        
        this.RoomManagement()
    }
    
    CreateAnims()
    {
        this.scene.anims.create({
            key: 'hardhatWalk',
            frames: this.scene.anims.generateFrameNumbers('HardHat', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1
        });
    }
    
    GetDamaged(){
        this.swordColManager.UpdateOnTrigger();
        
        if(this.swordColManager.colState == this.swordColManager.CollisionState.ENTERED_COLLISION){
            var dir = new Phaser.Math.Vector2(this.x - this.scene.player.x, this.y - this.scene.player.y).normalize()
            var impulse = 300
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
    
    /*GetRepeled()
    {
        
       this.collided = true;
       this.MoveTowards(this.scene.player, -this.speed*4);
       this.scene.time.addEvent({delay: 250, callback: function(){this.body.stop(); this.collided = false;}, callbackScope: this, repeat: 0});
    }*/
    
}