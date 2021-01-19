//import EnemyBase from './js/Enemies/EnemyBasePrefab.js';

class GoombaPrefab extends EnemyBase{
    
    constructor(scene, positionX, positionY, idX, idY)
    {
		super(scene, positionX, positionY, 'goomba');
        this.health = 0;
        this.isVulnerable = false;
        this.damage = 2;
        this.seeRange = 100;
        this.speed = 60;
        this.collided = false;
        this.health = this.initHealth = 1;
        this.canDieOnJump = true;
        this.IDx = idX;
        this.IDy = idY;
        this.body.velocity.x = this.speed;
        this.Deactivate()
        this.colManager = new CollisionManager(scene);
        
        this.anims.play('goombaWalk');
        
        this.InitExtraCollisions();
        
    }
    
    InitExtraCollisions(){
        this.scene.physics.add.collider(this, this.scene.platFloor);
        this.scene.physics.add.collider(this, this.scene.platWalls, this.CollideWithWall, null, this);
    }
    
    CreateAnims()
    {
        this.scene.anims.create({
            key: 'goombaWalk',
            frames: this.scene.anims.generateFrameNumbers('goomba', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'goombaStomped',
            frames: this.scene.anims.generateFrameNumbers('goomba', { start: 2, end: 2 }),
            frameRate: 5,
            repeat: 0
        });
    }
    
    CollideWithWall(){
        if(this.active){
            this.colManager.UpdateOnTrigger();
            
            if(this.colManager.GetCollisionState() == this.colManager.CollisionState.ENTERED_COLLISION){
                this.speed = -this.speed;
            }
        }
    }
    
    DamagePlayer(){
        if(this.scene.player.body.facing == Phaser.Physics.Arcade.FACING_DOWN){
            this.anims.play('goombaStomped');
            this.scene.player.PlatformerJump();

            this.scene.time.addEvent({delay: 300, callback: this.Die, callbackScope: this, repeat: 0});
            this.active = false;
        }
        else{
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
    }
    
    Update()
    {
        this.body.velocity.x = this.speed;
        if(!this.body.onFloor()){
            this.body.velocity.y += 30;
        }
        else{
            this.body.velocity.y = 0;
        }
        
        this.RoomManagement()
    }
    
    
}