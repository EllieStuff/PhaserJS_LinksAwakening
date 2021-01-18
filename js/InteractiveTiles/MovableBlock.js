
//ToDo: Posar-li animacio i FX

class MovableBlock extends Phaser.GameObjects.Sprite{
    
    constructor(scene, positionX, positionY)
    {
		super(scene, positionX, positionY, 'movableBlock');
        //this.functionToTrigger = functionToTrigger;
		scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.events.on('update', this.Update, this);
        this.body.collideWorldBounds = true;
        this.setOrigin(0.5,0).setScale(1);
        this.setDepth(scene.DrawDepths.INTERACTIVE_TILES);
        this.body.setImmovable(true);
        
        this.moving = false;
        this.colBuffer = 0;
        this.delayOnMoving = 1000;
        
        this.target = new Phaser.Math.Vector2(this.body);
        this.speed = 70;
        this.margin = 1;
        
        this.colManager = new CollisionManager(scene);
        
        //this.initPositionX = positionX;
        //this.initPositionY = positionY;
        
        this.InitCollisions();
        
    }
    
    InitCollisions(){
        this.scene.physics.add.collider(this, this.scene.player, this.Trigger, null, this);
    }
    
    
    Update(){
        if(this.active){
            if(this.moving){
                //console.log("target: " + this.target.x + ", " + this.target.y);
                //console.log("this: " + this.body.x + ", " + this.body.y);
                
                //this.scene.physics.moveToObject(this, this.target, this.speed);
                
                if(this.target.distance(this.body) < this.margin){
                    this.body.x = this.target.x;
                    this.body.y = this.target.y;
                    this.body.stop();
                    
                    this.active = this.moving = false;
                }
            }
            
        }
    }
    
    
    Trigger(){
        if(this.active){
            this.colManager.UpdateOnTrigger();

            if(this.colManager.GetCollisionState() == this.colManager.CollisionState.ENTERED_COLLISION){
                console.log("in");
                this.colBuffer++;
                this.scene.time.addEvent({delay: this.delayOnMoving, callback: this.Move, callbackScope: this, repeat: 0});
            }
        }
    }
    
    
    Move(){
        if(this.active){
            this.colBuffer--;

            if(this.colManager.GetCollisionState() == this.colManager.CollisionState.COLLIDING && this.colBuffer == 0 && !this.moving){
                console.log(this.colManager.GetCollisionDirection(this, this.scene.player));

                switch(this.colManager.GetCollisionDirection(this, this.scene.player)){
                    case this.colManager.CollisionDirection.DOWN:
                        this.target = new Phaser.Math.Vector2(this.body.x, this.body.y - this.body.height);
                        this.body.velocity.x = 0;
                        this.body.velocity.y = -this.speed;
                        break;

                    case this.colManager.CollisionDirection.UP:
                        this.target = new Phaser.Math.Vector2(this.body.x, this.body.y + this.body.height);
                        this.body.velocity.x = 0;
                        this.body.velocity.y = this.speed;
                        break;

                    case this.colManager.CollisionDirection.LEFT:
                        this.target = new Phaser.Math.Vector2(this.body.x + this.body.width, this.body.y);
                        this.body.velocity.x = this.speed;
                        this.body.velocity.y = 0;
                        break;

                    case this.colManager.CollisionDirection.RIGHT:
                        this.target = new Phaser.Math.Vector2(this.body.x - this.body.width, this.body.y);
                        this.body.velocity.x = -this.speed;
                        this.body.velocity.y = 0;
                        break;

                    default:
                        break;
                }
                
                //console.log("target: " + this.target.x + ", " + this.target.y);
                //console.log("this: " + this.body.x + ", " + this.body.y);

                this.moving = true;
                this.scene.soundManager.PlayFX('rockPush_FX')
            }
            
        }
        
    }
    
    EndEffect(){}
    
}


