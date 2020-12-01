

class SkeletonPrefab extends EnemyBase{
    
    constructor(scene, positionX, positionY)
    {
		super(scene, positionX, positionY, 'enemySkeleton');
        
        this.damage = 2;
        this.health = 2;
        this.isVulnerable = true;
        this.canJump = true;
        this.speed = 30;
        this.fleeSpeed = -this.speed * 4;
        this.seeRange = 100;
        this.auxSkeleton = new AuxSkeleton(scene, positionX, positionY);
        this.auxSkeleton.visible = false;
        this.auxSkeleton.active = false;
        
    }
    
    CreateAnims(){
        this.scene.anims.create({
            key: 'skeletonWalk',
            frames: this.scene.anims.generateFrameNumbers('enemySkeleton', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'skeletonJump',
            frames: this.scene.anims.generateFrameNumbers('enemySkeleton', { start: 3, end: 3 }),
            frameRate: 10,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'auxSkeletonJump',
            frames: this.scene.anims.generateFrameNumbers('auxSkeleton', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 0,
            yoyo: true
        });
        
    }
    
    Update()
    {
        if(this.active){
            var currentPos = new Phaser.Math.Vector2(this.body);

            if(currentPos.distance(this.scene.player.body) < this.seeRange
               && this.canJump && this.isVulnerable)
            {
                this.MoveTowards(this.scene.player, this.speed);
                this.anims.play('skeletonWalk', true);
                
                if(this.scene.inputs.GetKeyDown(this.scene.inputs.KeyCodes.K) || this.scene.inputs.GetKeyDown(this.scene.inputs.KeyCodes.L))
                {
                    this.body.stop();
                    this.isVulnerable = false;
                    this.canJump = false;
                    this.auxSkeleton.active = true;
                    this.anims.play('skeletonJump');
                    
                    this.auxSkeleton.Init(this);
                }
            }
            else
            {
                this.body.stop();
            }
            
            if(this.auxSkeleton.active){
                //this.MoveTowards(_player, this.fleeSpeed);
                //this.auxSkeleton.position = this.position;
                this.auxSkeleton.Update(this, this.scene.player);
                //this.body.getBounds(this.auxSkeleton);
                this.body.x = this.auxSkeleton.body.x;
                this.body.y = this.auxSkeleton.body.y + this.body.height;
            }
            else if(!this.auxSkeleton.active && !this.isVulnerable && !this.canJump){
                //this.scene.physics.pause();
                this.body.stop();
                this.isVulnerable = true;
                this.setFrame(0);
                this.scene.time.addEvent({delay: 1000, callback: function(){this.canJump=true;}, callbackScope: this, repeat: 0});
            }
            
        }
        
    }
    
    
}

class AuxSkeleton extends Phaser.GameObjects.Sprite{
    constructor(scene, positionX, positionY)
    {
		super(scene, positionX, positionY, 'auxSkeleton');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.collideWorldBounds = true;
        
        //this.physics.add.collider(this, this.scene.walls); //Prq colisioni amb les parets, necessito el mapa per a posar-ho
        
    }
    
    Init(_father){
        this.body.x = _father.body.x;
        this.body.y = _father.body.y - _father.body.height;
        this.visible = true;
        this.anims.play('auxSkeletonJump');
        
        this.scene.time.addEvent({delay: 700, callback: function(){this.body.stop(); this.visible = false; this.active = false;}, callbackScope: this, repeat: 0});
        
    }
    
    Update(_father, _player){
        this.scene.physics.moveToObject(this, _player, _father.fleeSpeed);
        
    }
}




