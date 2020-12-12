
//TODO: Fer que el punt que agafi del jugador sigui fixe (pillar-lo al IdleUpdate()) i manejar les colisions

class BatPrefab extends EnemyBase{
    
    constructor(scene, positionX, positionY)
    {
		super(scene, positionX, positionY, 'batEnemy');
        
        this.damage = 2;
        this.health = 1;
        this.isVulnerable = true;
        this.speed = 30;
        //this.fleeSpeed = -this.speed * 4;
        this.seeRange = 70;
        this.waitingDelay = 1500;
        //this.onSlowStart = false;
        
        this.setFrame(1);
        
        this.BatStates = { IDLE: 0, WAITING: 1, FLYING_AROUND: 2 };
        this.currState = this.BatStates.IDLE;
        this.updating = true;
        
    }
    
    CreateAnims(){
        this.scene.anims.create({
            key: 'batFlying',
            frames: this.scene.anims.generateFrameNumbers('batEnemy', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'batIdle',
            frames: this.scene.anims.generateFrameNumbers('batEnemy', { start: 1, end: 1 }),
            frameRate: 1,
            repeat: 0,
        });
        
    }
    
    IdleUpdate(){
        this.updating = true;
        this.body.stop();
        this.currState = this.BatStates.WAITING;
        this.scene.time.addEvent({delay: this.waitingDelay, callback: this.StartFlying, callbackScope: this, repeat: 0});
        
    }
    
    WaitingUpdate(){
        //Waits until a time event triggers
    }
    
    FlyingAroundUpdate(){
        var targetDir = new Phaser.Math.Vector2(this.body.x - this.scene.player.body.x, this.body.y - this.scene.player.body.y);    //Gets the direction from the player to this enemy
        targetDir = new Phaser.Math.Vector2(-targetDir.y, targetDir.x);     //Gets the normal of the previous direction
        targetDir = new Phaser.Math.Vector2(targetDir.x + this.body.x, targetDir.y + this.body.y);  //Makes the normal pass by this enemy position
        
        //var targetPos = targetDir
        
        this.MoveTowards(targetDir, this.speed);
    }
    
    CollideWithPlayer(){
        if(this.updating){
            this.updating = false;
            this.scene.time.addEvent({delay: this.waitingDelay, callback: this.StopFlying, callbackScope: this, repeat: 0});
        }
    }
    
    StartFlying(){
        this.currState = this.BatStates.FLYING_AROUND;
        this.anims.play('batFlying');
    }
    
    StopFlying(){
        this.currState = this.BatStates.IDLE;
        this.anims.play('batIdle');
    }
    
    
    Update()
    {
        if(this.active){
            var currentPos = new Phaser.Math.Vector2(this.body);
        
            if(currentPos.distance(this.scene.player.body) < this.seeRange){
                switch(this.currState){
                    case this.BatStates.IDLE:
                        this.IdleUpdate();

                        break;
                        
                    case this.BatStates.WAITING:
                        this.WaitingUpdate();
                        
                        break;

                    case this.BatStates.FLYING_AROUND:
                        this.FlyingAroundUpdate();

                        break;

                    default:
                        break;
                }
                
            }
            else{
                if(this.updating){
                    this.updating = false;
                    this.body.stop();
                    this.currState = this.BatStates.IDLE;
                    this.anims.play('batIdle', true);
                }
            }
        }
        
    }
    
    
}


