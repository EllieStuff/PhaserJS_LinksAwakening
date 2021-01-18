class SpikedPrefab extends EnemyBase{
    
    constructor(scene, positionX, positionY)
    {
		super(scene, positionX, positionY, 'HardHat');
        this.health = 0;
        this.isVulnerable = false;
        this.damage = 4;
        this.seeRange = 100;
        this.speed = 30;
        this.collided = false;
        this.charging = false;
        
    }  
    
    
    Update()
    {
        if(this.active && !this.falling){
            var currentPos = new Phaser.Math.Vector2(this.body);

            if(this.isVulnerable)
            {
                this.anims.play('SpikedDown', true);

                if((this.scene.inputs.GetKeyDown(this.scene.inputs.KeyCodes.K) || this.scene.inputs.GetKeyDown(this.scene.inputs.KeyCodes.L)) && !this.collided)
                {
                        //KILL
                }
            }
            else
            {
                if(currentPos.distance(this.scene.player.body) < this.seeRange && !this.collided)
                {
                    if(!this.charging)
                        this.MoveTowards(this.scene.player, this.speed * 0.5);                    
                        this.scene.time.addEvent({delay: 3000, callback: this.GetRepeled(), callbackScope: this, repeat: 0});
                    this.anims.play('SpikedWalk', true);
                }
                else if (!this.collided)
                {
                    this.body.stop();
                }


                if((this.scene.inputs.GetKeyDown(this.scene.inputs.KeyCodes.K) || this.scene.inputs.GetKeyDown(this.scene.inputs.KeyCodes.L)) && !this.collided && this.charging)
                {
                    this.isVulnerable = true;
                    this.GetRepeled();
                }
            }
        }
    }
    
    CreateAnims()
    {
        this.scene.anims.create({
            key: 'SpikedWalk',
            frames: this.scene.anims.generateFrameNumbers('spikedBeetle', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'SpikedDown',
            frames: this.scene.anims.generateFrameNumbers('spikedBeetle', { start: 2, end: 3 }),
            frameRate: 5,
            repeat: -1
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