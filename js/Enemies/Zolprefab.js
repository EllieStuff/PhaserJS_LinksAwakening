class GreenZolPrefab extends EnemyBase{
    
    constructor(scene, positionX, positionY)
    {
		super(scene, positionX, positionY, 'greenZol');
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
            if(this.hiding)
                this.anims.play('GreenZolHid');
            if(currentPos.distance(this.scene.player.body) < this.seeRange && this.hiding)
            {
                this.hiding = false;
                this.anims.play('GreenZolAppear');
                
            }
    
            if((this.scene.inputs.GetKeyDown(this.scene.inputs.KeyCodes.K) || this.scene.inputs.GetKeyDown(this.scene.inputs.KeyCodes.L)) && !this.hiding)
            {
                this.GetRepeled();
            }
        
        if(!this.hiding && !this.charging)
        {
            this.charging = true;
            this.scene.time.addEvent({delay: 2000, callback: this.DashToPlayer(), callbackScope: this, repeat: 0});
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
            frameRate: 2,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'GreenZolHid',
            frames: this.scene.anims.generateFrameNumbers('greenZol', { start: 5, end: 5 }),
            frameRate: 1,
            repeat: 0
        });

    }
    
    GetRepeled()
    {
        
       this.collided = true;
       this.MoveTowards(this.scene.player, -this.speed*2);
       this.scene.time.addEvent({delay: 350, callback: function(){this.body.stop(); this.collided = false;}, callbackScope: this, repeat: 0});
    }
    DashToPlayer()
    {
        this.anims.play('GreenZolApproach');
        this.body.stop();
        this.MoveTowards(this.scene.player, this.speed * 1.5);
        this.scene.time.addEvent({delay: 450, callback: function(){this.body.stop();}, callbackScope: this, repeat: 0});
        this.scene.time.addEvent({delay: 2000, callback: function(){this.charging = false;}, callbackScope: this, repeat: 0});
    }
    
}


class RedZolPrefab extends EnemyBase{
    
    constructor(scene, positionX, positionY)
    {
		super(scene, positionX, positionY, 'redZol');
        this.health = 0;
        this.isVulnerable = false;
        this.damage = 4;
        this.seeRange = 75;
        this.speed = 30;
        this.collided = false;
        this.hiding = true;
        this.anims.play('RedZolBasic', true);
    }  
    
    
    Update()
    {
        var currentPos = new Phaser.Math.Vector2(this.body);
    
            if((this.scene.inputs.GetKeyDown(this.scene.inputs.KeyCodes.K) || this.scene.inputs.GetKeyDown(this.scene.inputs.KeyCodes.L)) && !this.hiding)
            {
                this.GetRepeled();
            }
        if(currentPos.distance(this.scene.player.body) < this.seeRange && this.hiding)
            this.MoveTowards(this.scene.player, this.speed * 0.3);

    }
    
    CreateAnims()
    {
        this.scene.anims.create({
            key: 'RedZolBasic',
            frames: this.scene.anims.generateFrameNumbers('redZol', { start: 0, end: 0 }),
            frameRate: 2,
            repeat: 0
        });
    }
    
    GetRepeled()
    {
        
       this.collided = true;
       this.MoveTowards(this.scene.player, -this.speed*4);
       this.scene.time.addEvent({delay: 150, callback: function(){this.body.stop(); this.collided = false;}, callbackScope: this, repeat: 0});
    }
}