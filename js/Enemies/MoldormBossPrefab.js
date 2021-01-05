
//TODO: Fer que el punt que agafi del jugador sigui fixe (pillar-lo al IdleUpdate()) i manejar les colisions

class MoldormBossPrefab extends EnemyBase{
    
    constructor(scene, positionX, positionY)
    {
		super(scene, positionX, positionY, 'moldormBossEnemy');
        
        this.damage = 2;
        this.health = 1;
        this.isVulnerable = true;
        this.speed = 40;
        this.seeRange = 50;  
        this.updating = true;
        this.body.velocity.x = this.speed;
        this.setFrame(2);
        this.body.collideWordBounds = true;
        this.angleDelta = 0;
        this.isWaiting = false;
        this.waitingDelay = 750;
        this.tail1 = new MoldormBossBodyPrefab(scene, positionX + 20, positionY, 'moldormBossEnemyBody', 3);
        this.tail2 = new MoldormBossBodyPrefab(scene, positionX + 30, positionY, 'moldormBossEnemyBody', 3);
        this.tail3 = new MoldormBossBodyPrefab(scene, positionX + 40, positionY, 'moldormBossEnemyBody', 3);
        this.tail4 = new MoldormBossBodyPrefab(scene, positionX + 50, positionY, 'moldormBossEnemyBody', 1);
        
    }
    
    InitCollisions(){
        this.scene.physics.add.overlap(this, this.scene.player, this.DamagePlayer, null, this);
        this.scene.physics.add.collider(this, this.scene.walls, this.BounceWithWalls, null, this);
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
        this.tail2.UpdateFollow2(this.tail1, this.body, 3);
        this.tail3.UpdateFollow2(this.tail2, this.body, 3);
        this.tail4.UpdateFollow2(this.tail3, this.body, 3);
        
    }
    
    Activate(){
        this.tail1.active = this.tail2.active = false;
        this.active = false;
    }
    
    Deactivate(){
        this.active = true;
        this.tail1.active = this.tail2.active = true;
        this.isWaiting = false;
    }
    
    
    
}


class MoldormBossBodyPrefab extends Phaser.GameObjects.Sprite{
    constructor(scene, positionX, positionY, sprite, frame){
        super(scene, positionX, positionY, sprite);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setDepth(scene.DrawDepths.ITEMS);
        this.setFrame(frame);
        
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

