
class CollisionManager extends Phaser.GameObjects.Sprite{
    
    //NOTA 1: 
    //  El collision Manager hauria de funcionar sempre que la classe es declari a sota el "super(,,,)" i del "scene.events.on('update',,)" (si es que en te) de la classe 
    //  pare, pero, en cas de no funcionar, pot ser bona idea cridar la funcio Update() del CollisionManager directament al final de l'Update() de la classe pare.
    
    //NOTA 2:
    //  Es important recordar que el "UpdateOnTrigger()" s'ha de cridar al principi de la/les funcions cridades al colisionar de la seva clase pare.
    
    constructor(scene)
    {
		super(scene, 0, 0, 'emptySprite');
		scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.events.on('update', this.Update, this);
        this.body.collideWorldBounds = true;
        this.setOrigin(0.5,0).setScale(1);
        
        //this.collisionFlag2 = this.collisionFlag1 = false;
        //this.collisionStarted = this.onCollision = this.collisionEnded = false;
        this.updatingCollision = false;
        this.delayOnUpdate = false;
        this.canExitUpdate = true;
        this.initialExitCount = this.exitCount = 4;
        
        
        this.CollisionState = { NOT_COLLIDING: 'Not_Colliding', COLLIDING: 'Colliding', ENTERED_COLLISION: 'Collision_Entered', EXIT_COLLISION: 'Collision_Exit' };  //Indica el estado de la colision
        this.colState = this.CollisionState.NOT_COLLIDING;
        
        this.CollisionDirection = { RIGHT: 'From_Right', LEFT: 'From_Left', UP: 'From_Up', DOWN: 'From_Down', NONE: 'No_Collision' };   //Indica desde que direccion viene el objeto que esta colisionando
        this.colDir = this.CollisionDirection.NONE;
        
        //this.initPositionX = positionX;
        //this.initPositionY = positionY;
        
        
    }
    
    GetCollisionState(){
        
        return this.colState;
    }
    
    GetCollisionDirection(_father, _collidedObject){
        if(this.GetCollisionState() == this.CollisionState.NOT_COLLIDING){
            this.colDir = this.CollisionDirection.NONE;
        }
        else{
            if(_collidedObject.body.x < _father.body.x && _collidedObject.body.facing == Phaser.Physics.Arcade.FACING_RIGHT){
                this.colDir = this.CollisionDirection.LEFT;
            }
            else if(_collidedObject.body.x > _father.body.x && _collidedObject.body.facing == Phaser.Physics.Arcade.FACING_LEFT){
                this.colDir = this.CollisionDirection.RIGHT;
            }
            else if(_collidedObject.body.y < _father.body.y && _collidedObject.body.facing == Phaser.Physics.Arcade.FACING_DOWN){
                this.colDir = this.CollisionDirection.UP;
            }
            else if(_collidedObject.body.y > _father.body.y && _collidedObject.body.facing == Phaser.Physics.Arcade.FACING_UP){
                this.colDir = this.CollisionDirection.DOWN;
            }
            else{
                this.colDir = this.CollisionDirection.NONE;
            }
            
        }
        
        return this.colDir;
    }
    
    
    //En cas de fallar, cridar la funcio directament des del final de l'Update() de la classe pare.
    Update(){
        if(this.updatingCollision == true){
            this.exitCount--;
            
            if(this.delayOnUpdate == true || this.exitCount <= 0){
                this.delayOnUpdate = false;
                if(this.colState == this.CollisionState.ENTERED_COLLISION){
                    this.colState = this.CollisionState.COLLIDING;
                }
                else if(this.canExitUpdate == false && this.colState == this.CollisionState.COLLIDING){
                    this.canExitUpdate = true;
                    //this.colState = this.CollisionState.NOT_COLLIDING;
                }
                else if(this.canExitUpdate == true && this.colState != this.CollisionState.EXIT_COLLISION){
                    this.colState = this.CollisionState.EXIT_COLLISION;
                    this.exitCount = this.initialExitCount;
                }
            }
            else if(this.canExitUpdate == true && this.colState == this.CollisionState.EXIT_COLLISION){
                this.updatingCollision = false;
                this.colState = this.CollisionState.NOT_COLLIDING;
            }
            
        }
        
    }
    
    
    //Cridar la funcio al principi de la/les funcions cridades al colisionar de la seva clase pare.
    UpdateOnTrigger(){
        this.delayOnUpdate = true;
        
        if(this.updatingCollision == false && this.colState == this.CollisionState.NOT_COLLIDING){
            this.updatingCollision = true;
            this.exitCount = this.initialExitCount;
            //this.delayOnUpdate = false;
            this.colState = this.CollisionState.ENTERED_COLLISION;
        }
        else if(this.updatingCollision == true){
            this.canExitUpdate = false;
            this.exitCount = this.initialExitCount;
            this.colState = this.CollisionState.COLLIDING;
        }
        
    }
    
    
    
}


