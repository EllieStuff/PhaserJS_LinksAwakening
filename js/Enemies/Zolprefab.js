class GreenZolPrefab extends EnemyBase{
    
    constructor(scene, positionX, positionY, idX, idY)
    {
		super(scene, positionX, positionY, 'greenZol');
        this.health = 2;
        this.isVulnerable = true;
        this.damage = 3;
        this.IDx = idX;
        this.IDy = idY;
        this.seeRange = 75;
        this.speed = 30;
        this.collided = false;
        this.hiding = true;
        
        this.Deactivate()
        
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
        if(!this.hiding && !this.charging)
        {
            this.charging = true;
            this.DashToPlayer();
            //this.scene.time.addEvent({delay: 2000, callback: this.DashToPlayer(), callbackScope: this, repeat: 0});
        }
        
        this.RoomManagement()

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
    
    DashToPlayer()
    {
        this.anims.play('GreenZolApproach');
        this.body.stop();
       
        this.scene.time.addEvent({delay: 2000, callback: function(){this.charging = false;}, callbackScope: this, repeat: 0});
        this.MoveTowards(this.scene.player, this.speed * 1.5);
        this.scene.time.addEvent({delay: 450, callback: function(){this.body.stop();}, callbackScope: this, repeat: 0});
       
    }
    
}


class RedZolPrefab extends EnemyBase{
    
    constructor(scene, positionX, positionY, idX, idY)
    {
		super(scene, positionX, positionY, 'redZol');
        this.health = 1;
        this.isVulnerable = true;
        this.damage = 1;
        this.seeRange = 75;
        this.speed = 30;
        this.IDx = idX;
        this.IDy = idY;
        this.collided = false;
        this.hiding = true;
        this.anims.play('RedZolBasic', true);
        this.Deactivate();
    }  
    
    
    Update()
    {
        if(this.health > 0)
        {
            this.anims.play('RedZolBasic',true);
        }
        var currentPos = new Phaser.Math.Vector2(this.body);
        
        this.MoveTowards(this.scene.player, this.speed * 0.3);

        this.RoomManagement();
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
    
}