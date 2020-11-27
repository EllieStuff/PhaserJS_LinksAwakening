//import {EnemyBase} from './js/Enemies/EnemyBasePrefab.js';
//module.exports = EnemyBase;

class SkeletonPrefab extends EnemyBase{
    
    constructor(scene, positionX, positionY, mainSprite, secondSprite)
    {
		super(scene, positionX, positionY, mainSprite);
        this.scene = scene;
        
        this.damage = 2;
        this.health = 2;
        this.isVulnerable = true;
        this.speed = 1;
        this.seeRange = 10;
        this.auxSkeleton = new AuxSkeleton(scene, positionX, positionY, secondSprite);
        this.auxSkeleton.active = false;
        
        //this.init();
    }
    
    create(){
        //this.setFrame(0);
        
        this.anims.create({
            key: 'walk',
            frames: scene.anims.generateFrameNumbers('enemySkeleton', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'jump',
            frames: scene.anims.generateFrameNumbers('enemySkeleton', { start: 3, end: 3 }),
            frameRate: 10,
            repeat: 0
        });
        
        this.anims.play("walk");
        
    }
    
    preUpdate()
    {
		/*if(this.y <= 0){
            this.active = false;
        }*/
	}
    
    Update()
    {
        if(/*this.body.distance(this.scene.player.body) > this.seeRange //Phaser.Types.Math.Vector2Like.BetweenPoints(scene.player.body, this.body) > this.seeRange
            &&*/ (this.input.keyboard.isDown(Phaser.Keyboard.K) || this.input.keyboard.isDown(Phaser.Keyboard.L))
            && this.isVulnerable)
        {
            this.isVulnerable = false;
            this.auxSkeleton.active = true;
            this.play('jump', true);
        }
        
        if(this.auxSkeleton.active){
            this.auxSkeleton.position = this.position;
        }
        else if(!this.auxSkeleton.active && !this.isVulnerable){
            this.isVulnerable=true;
            this.setFrame(0);
        }
        
    }
    
    
}

class AuxSkeleton extends Phaser.GameObjects.Sprite{
    constructor(scene, positionX, positionY, sprite)
    {
		super(scene, positionX, positionY, sprite);
        this.jumping = false;
    }
    
    create(){
        this.anims.create({
            key: 'auxSkeletonJump',
            frames: scene.anims.generateFrameNumbers('auxSkeleton', { start: 0, end: 3 }),
            frameRate: 20,
            repeat: 0,
            yoyo: true
        });
        /*this.anims.create({
            key: 'auxSkeletonFall',
            frames: scene.anims.generateFrameNumbers('auxSkeleton', { start: 3, end: 0 }),
            frameRate: 20,
            repeat: 0
        });*/
    }
    
    Update(){
        if(this.active){
            if(!jumping){
                jumping = true;
                this.anims.play('auxSkeletonJump');
            }
            else if(!this.anims.isPlaying){
                jumping = false;
                this.active = false;
            }
        }
        
    }
}




