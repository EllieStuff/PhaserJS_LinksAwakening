//import {EnemyBase} from './js/Enemies/EnemyBasePrefab.js';
//module.exports = EnemyBase;

class SkeletonPrefab extends EnemyBase{
    
    constructor(scene, positionX, positionY, mainSprite, secondSprite)
    {
		super(scene, positionX, positionY, mainSprite);
        this.anims.setTimeScale(0.3);
        
        this.damage = 2;
        this.health = 2;
        this.isVulnerable = true;
        this.canJump = true;
        this.speed = 30;
        this.fleeSpeed = -this.speed * 4;
        this.seeRange = 10;
        this.auxSkeleton = new AuxSkeleton(scene, positionX, positionY, secondSprite);
        this.auxSkeleton.visible = false;
        this.auxSkeleton.active = false;
        this.started = false;
        
        
        
        //this.init();
    }
    
    
    preUpdate()
    {
		/*if(this.y <= 0){
            this.active = false;
        }*/
	}
    
    Update(_player, _inputs)
    {
        var currentPos = new Phaser.Math.Vector2(this.body);
        
        if(currentPos.distance(_player.body) > this.seeRange){
            if(this.canJump && this.isVulnerable){
                this.MoveTowards(_player, this.speed);
                //this.anims.play('skeletonWalk', true);
                if(!this.started){
                    this.started = true;
                    this.anims.play('skeletonWalk', true);
                }
                
                if(_inputs.GetKeyDown(_inputs.KeyCodes.K) || _inputs.GetKeyDown(_inputs.KeyCodes.L))
                {
                    this.isVulnerable = false;
                    this.canJump = false;
                    this.auxSkeleton.active = true;
                    this.anims.play('skeletonJump');
                }
                
            }

            if(this.auxSkeleton.active){
                //this.MoveTowards(_player, this.fleeSpeed);
                //this.auxSkeleton.position = this.position;
                this.auxSkeleton.Update(this, _player);
                //this.body.getBounds(this.auxSkeleton);
                this.body.x = this.auxSkeleton.body.x;
                this.body.y = this.auxSkeleton.body.y + this.body.height;
            }
            else if(!this.auxSkeleton.active && !this.isVulnerable){
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
    constructor(scene, positionX, positionY, sprite)
    {
		super(scene, positionX, positionY, sprite);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.anims.setTimeScale(0.5);
        
        //this.physics.add.collider(this, this.scene.walls); //Prq colisioni amb les parets, necessito el mapa per a posar-ho
        
        this.jumping = false;
    }
    
    
    Update(_father, _player){
        if(this.active){
            if(!this.jumping){
                this.jumping = true;
                this.body.x = _father.body.x;
                this.body.y = _father.body.y - _father.body.height;
                this.visible = true;
                this.anims.play('auxSkeletonJump');
                
                //Mirar si aixo funciona o el this.scene ja esta tara, tb mirar com fer que les animacions vagin mes lentes
                this.scene.time.addEvent({delay: 800, callback: function(){this.jumping = false; this.body.stop(); this.visible = false; this.active = false;}, callbackScope: this, repeat: 0});
            }
            
            this.scene.physics.moveToObject(this, _player, _father.fleeSpeed);
            //_father.position = this.position;
            
        }
        
    }
}




