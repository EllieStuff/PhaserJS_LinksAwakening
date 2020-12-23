
//TODO: Fer que el punt que agafi del jugador sigui fixe (pillar-lo al IdleUpdate()) i manejar les colisions

class miniMoldormPrefab extends EnemyBase{
    
    constructor(scene, positionX, positionY)
    {
		super(scene, positionX, positionY, 'moldormEnemy');
        
        this.damage = 2;
        this.health = 1;
        this.isVulnerable = true;
        this.speed = 40;
        this.seeRange = 50;  
        this.updating = true;
        this.body.velocity.x = this.speed;
        this.setFrame(0);
        this.body.collideWordBounds = true;
        this.angleDelta = 0;
        this.isWaiting = false;
        this.waitingDelay = 750;
        this.tail1 = new miniMoldormBodyPrefab(scene, positionX + 20, positionY, 1);
        this.tail2 = new miniMoldormBodyPrefab(scene, positionX + 30, positionY, 2);
        this.target1 = new Phaser.Math.Vector2(positionX,positionY);
        this.target2 = new Phaser.Math.Vector2(positionX,positionY);
    }
        
    /*IdleUpdate(){
        this.updating = true;
        this.scene.time.addEvent({delay: this.waitingDelay, callback: this.StartFlying, callbackScope: this, repeat: 0});
        
    }*/
    
    CollideWithPlayer(){
        /*if(this.updating){
            this.updating = false;
            this.scene.time.addEvent({delay: this.waitingDelay, callback: this.StopFlying, callbackScope: this, repeat: 0});
        }*/
    }
    
    DamagePlayer(){
        this.playerColManager.UpdateOnTrigger();
        
        if(this.playerColManager.colState == this.playerColManager.CollisionState.ENTERED_COLLISION){
            this.scene.player.GetDamaged(this.attack);
            this.updating = false;
            this.scene.time.addEvent({delay: this.waitingDelay, callback: this.StopFlying, callbackScope: this, repeat: 0});
        }
    }
    
    UpdateOnTime()
    {
        var randomNum = Phaser.Math.Between(-0.5,0.5);
        this.isWaiting = false;
        this.body.allowRotation = true;
        this.angleDelta += randomNum;
        this.setOrigin(0.5);
        this.body.velocity.x = this.speed;
        this.body.velocity.rotate(this.angleDelta);
        this.angle = (this.body.velocity.angle() * (180/Math.PI)) + 180;
        this.body.velocity = new Phaser.Math.Vector2(this.body.velocity.normalize().x * this.speed, this.body.velocity.normalize().y * this.speed);
        this.target2 = this.target1;
        this.target1 = this.body.position;
    }
    
    Update()
    {
        if(!this.isWaiting)
        {
            this.isWaiting =  true;
            this.scene.time.addEvent({delay: this.waitingDelay, callback: this.UpdateOnTime, callbackScope: this, repeat: 0});
        }
        this.tail1.UpdateFollow(this.target1);
        this.tail2.UpdateFollow(this.target2);
    }
    
    
    
    
}


class miniMoldormBodyPrefab extends EnemyBase{
    constructor(scene, positionX, positionY, spriteFrame){
        super(scene, positionX, positionY, 'moldormEnemy');
        this.setFrame(spriteFrame);
        this.speed = 50;
    }
    
    UpdateFollow(target)
    {
        var dir = new Phaser.Math.Vector2(target.x - this.body.position.x, target.y - this.body.position.y).normalize();
        this.body.velocity = new Phaser.Math.Vector2(dir.x * this.speed, dir.y * this.speed);
    }
    
    Update(){}
}

