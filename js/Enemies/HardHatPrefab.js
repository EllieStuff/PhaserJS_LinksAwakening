//import EnemyBase from './js/Enemies/EnemyBasePrefab.js';

class HardHatPrefab extends EnemyBase{
    
    constructor(scene, positionX, positionY)
    {
		super(scene, positionX, positionY, 'HardHat');
        this.health = 0;
        this.isVulnerable = false;
        this.damage = 4;
        this.seeRange = 100;
        this.speed = 30;
        this.collided = false;
    }  
    
    
    Update()
    {
        var currentPos = new Phaser.Math.Vector2(this.body);
        
        if(currentPos.distance(this.scene.player.body) < this.seeRange && !this.collided)
        {
            this.MoveTowards(this.scene.player, this.speed);
            this.anims.play('hardhatWalk', true);
            
        }
        else if (!this.collided)
        {
            this.body.stop();
        }
        
        if((this.scene.inputs.GetKeyDown(this.scene.inputs.KeyCodes.K) || this.scene.inputs.GetKeyDown(this.scene.inputs.KeyCodes.L)) && !this.collided)
        {
            this.GetRepeled();
        }
    }
    
    CreateAnims()
    {
        this.scene.anims.create({
            key: 'hardhatWalk',
            frames: this.scene.anims.generateFrameNumbers('HardHat', { start: 0, end: 1 }),
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
    
}