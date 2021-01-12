class GreenZolPrefab extends EnemyBase{
    
    constructor(scene, positionX, positionY)
    {
		super(scene, positionX, positionY, 'HardHat');
        this.health = 0;
        this.isVulnerable = false;
        this.damage = 4;
        this.seeRange = 75;
        this.speed = 30;
        this.collided = false;
        this.hiding = true;
        
    }  
    
    
    Update()
    {
        var currentPos = new Phaser.Math.Vector2(this.body);
        
            if(currentPos.distance(this.scene.player.body) < this.seeRange && this.hiding)
            {
                this.hiding = false;
                
            }
    
            if((this.scene.inputs.GetKeyDown(this.scene.inputs.KeyCodes.K) || this.scene.inputs.GetKeyDown(this.scene.inputs.KeyCodes.L)) && !this.hiding)
            {
                this.GetRepeled();
            }

    }
    
    CreateAnims()
    {
        this.scene.anims.create({
            key: 'GreenZolAppear',
            frames: this.scene.anims.generateFrameNumbers('greenZol', { start: 0, end: 2 }),
            frameRate: 2,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'GreenZolApproach',
            frames: this.scene.anims.generateFrameNumbers('greenZol', { start: 3, end: 4 }),
            frameRate: 1,
            repeat: 0
        });
    }
    
    GetRepeled()
    {
        
       this.collided = true;
       this.MoveTowards(this.scene.player, -this.speed*4);
       this.scene.time.addEvent({delay: 250, callback: function(){this.body.stop(); this.collided = false;}, callbackScope: this, repeat: 0});
    }
    DashToPlayer()
    {
        this.charging = true;
        this.body.stop();
        this.MoveTowards(this.scene.player, this.speed * 2.5);
        this.scene.time.addEvent({delay: 450, callback: function(){this.body.stop(); this.charging = false;}, callbackScope: this, repeat: 0});
    }
    
}


class RedZolPrefab extends EnemyBase{
    
    constructor(scene, positionX, positionY)
    {
		super(scene, positionX, positionY, 'HardHat');
        this.health = 0;
        this.isVulnerable = false;
        this.damage = 4;
        this.seeRange = 75;
        this.speed = 30;
        this.collided = false;
        this.hiding = true;
        
    }  
    
    
    Update()
    {
        var currentPos = new Phaser.Math.Vector2(this.body);
        
            if(currentPos.distance(this.scene.player.body) < this.seeRange && this.hiding)
            {
                this.hiding = false;
                
            }
    
            if((this.scene.inputs.GetKeyDown(this.scene.inputs.KeyCodes.K) || this.scene.inputs.GetKeyDown(this.scene.inputs.KeyCodes.L)) && !this.hiding)
            {
                this.GetRepeled();
            }

    }
    
    CreateAnims()
    {
        this.scene.anims.create({
            key: 'RedZolAppear',
            frames: this.scene.anims.generateFrameNumbers('redZol', { start: 0, end: 2 }),
            frameRate: 2,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'RedZolApproach',
            frames: this.scene.anims.generateFrameNumbers('redZol', { start: 3, end: 4 }),
            frameRate: 1,
            repeat: 0
        });
    }
    
    GetRepeled()
    {
        
       this.collided = true;
       this.MoveTowards(this.scene.player, -this.speed*4);
       this.scene.time.addEvent({delay: 250, callback: function(){this.body.stop(); this.collided = false;}, callbackScope: this, repeat: 0});
    }
    DashToPlayer()
    {
        this.charging = true;
        this.body.stop();
        this.MoveTowards(this.scene.player, this.speed * 2.5);
        this.scene.time.addEvent({delay: 450, callback: function(){this.body.stop(); this.charging = false;}, callbackScope: this, repeat: 0});
    }
    
}