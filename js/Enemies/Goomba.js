//import EnemyBase from './js/Enemies/EnemyBasePrefab.js';

class GoombaPrefab extends EnemyBase{
    
    constructor(scene, positionX, positionY)
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
        
        this.body.velocity.x = this.speed;
        
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
            console.log("1");
            this.anims.play('goombaStomped');
            this.scene.player.PlatformerJump();

            this.scene.time.addEvent({delay: 300, callback: this.Die, callbackScope: this, repeat: 0});
            this.active = false;
        }
        else{
            console.log("2");
            this.playerColManager.UpdateOnTrigger();

            if(this.playerColManager.colState == this.playerColManager.CollisionState.ENTERED_COLLISION)
                this.scene.player.GetDamaged(this.attack);
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
        
        /*if(this.body.blocked.up){
            this.anims.play('goombaStomped');
            this.scene.player.PlatformerJump();

            this.scene.time.addEvent({delay: 500, callback: this.GetDamaged, callbackScope: this, repeat: 0});
        }*/
        
    }
    
    
}