
//TODO: Fer que el punt que agafi del jugador sigui fixe (pillar-lo al IdleUpdate()) i manejar les colisions

class miniMoldormPrefab extends EnemyBase{
    
    constructor(scene, positionX, positionY, idX, idY)
    {
		super(scene, positionX, positionY, 'moldormEnemy');
        
        this.damage = 2;
        this.health = 1;
        this.isVulnerable = true;
        this.speed = 40;
        this.seeRange = 50;  
        this.updating = true;
        this.IDx = idX;
        this.IDy = idY;
        this.body.velocity.x = this.speed;
        this.setFrame(0);
        this.body.collideWordBounds = true;
        this.angleDelta = 0;
        this.isWaiting = false;
        this.waitingDelay = 750;
        this.canFall = false
        this.tail1 = new miniMoldormBodyPrefab(scene, positionX + 20, positionY, 'moldormEnemyBody1');
        this.tail2 = new miniMoldormBodyPrefab(scene, positionX + 30, positionY, 'moldormEnemyBody2');
        
    }
    
    InitCollisions(){
        this.scene.physics.add.overlap(this, this.scene.player, this.DamagePlayer, null, this);
        this.scene.physics.add.collider(this, this.scene.walls, this.BounceWithWalls, null, this);
        this.scene.physics.add.collider(this, this.scene.voids, this.BounceWithWalls, null, this);
    }
    
    BounceWithWalls(){
        //this.body.velocity = this.body.velocity;
        this.angleDelta += 90;
        this.setOrigin(0.5);
        this.body.velocity.x = this.speed;
        this.body.velocity.rotate(this.angleDelta);
        this.angle = (this.body.velocity.angle() * (180/Math.PI)) + 180;
        this.body.velocity = new Phaser.Math.Vector2(this.body.velocity.normalize().x * this.speed, this.body.velocity.normalize().y * this.speed);
        
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
    }
    
    Update()
    {
        if(!this.isWaiting)
        {
            this.isWaiting =  true;
            this.scene.time.addEvent({delay: this.waitingDelay, callback: this.UpdateOnTime, callbackScope: this, repeat: 0});
        }
        this.tail1.UpdateFollow(this.body, 9);
        this.tail2.UpdateFollow2(this.tail1, this.body, 1);
        
        if(this.scene.cameraManager.TileX == this.IDx && this.scene.cameraManager.TileY == this.IDy && !this.active && !this.beenHere)
        {
            this.Activate();
            this.beenHere = true;
        }
        else if ((this.scene.cameraManager.TileX != this.IDx || this.scene.cameraManager.TileY != this.IDy) && this.active && this.beenHere) 
        {
            this.Deactivate();
            this.beenHere = false;
        }
        
    }
    
    
    Activate()
    {
        this.active = this.visible = true;
        this.health = this.initHealth;
        this.x = this.initPositionX;
        this.y = this.initPositionY;
        this.tail1.visible = this.tail2.visible = true;
    }
    
    Deactivate()
    {
        this.active = this.visible = false;
        this.x = this.y = 0;
        this.tail1.visible = this.tail2.visible = false;
    }
    
}


class miniMoldormBodyPrefab extends Phaser.GameObjects.Sprite{
    constructor(scene, positionX, positionY, sprite){
        super(scene, positionX, positionY, sprite);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setDepth(scene.DrawDepths.ITEMS);
        
    }
    
    UpdateFollow(_target, _dist)
    {        
        //console.log(_target);
        var dir = new Phaser.Math.Vector2(this.body.position.x - _target.x, this.body.position.y - _target.y).normalize();
        this.body.position = new Phaser.Math.Vector2(_target.x + dir.x * _dist, _target.y + dir.y * _dist);
    }
    
    UpdateFollow2(_target, _head, _dist)
    {        
        //console.log(_target);
        var dir1 = new Phaser.Math.Vector2(this.body.position.x - _target.x, this.body.position.y - _target.y).normalize();
        var dir2 = new Phaser.Math.Vector2(_target.x - _head.x, _target.y - _head.y).normalize();
        var dir = new Phaser.Math.Vector2(dir1.x + dir2.x, dir1.y + dir2.y).normalize();
        this.body.position = new Phaser.Math.Vector2(_target.x + dir.x * _dist, _target.y + dir.y * _dist);
    }
    
    Update(){}
}

