
class CollisionManager{
    
    //NOTA 1: 
    //  El collision Manager hauria de funcionar sempre que la classe es declari a sota el "super(,,,)" i del "scene.events.on('update',,)" (si es que en te) de la classe 
    //  pare, pero, en cas de no funcionar, pot ser bona idea cridar la funcio Update() del CollisionManager directament al final de l'Update() de la classe pare.
    
    //NOTA 2:
    //  Es important recordar que el "UpdateOnTrigger()" s'ha de cridar al principi de la/les funcions cridades al colisionar de la seva clase pare.
    
    constructor(scene)
    {
		//super(scene, 0, 0, 'emptySprite');
        this.scene = scene;
		//this.scene.add.existing(this);
        //this.scene.physics.add.existing(this);
        //this.body.collideWorldBounds = true;
        //this.setOrigin(0.5,0).setScale(1);
        
        scene.events.on('update', this.Update, this);
        
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
    
    GetRelativeDistanceOnOverlap(_father, _overlapObject){
        //Aproximacio d'on estaria la posicio del pare si el body es comptes des del centre del gameObject
        var centeredFather = new Phaser.Math.Vector2(_father.body.x + _father.width / 4, _father.body.y + _father.height / 4);
        
        //Vectors necessaris per a fer projeccio ortogonal
        var fatherToObject = new Phaser.Math.Vector2(_overlapObject.body.x - centeredFather.x, _overlapObject.body.y - centeredFather.y);
        var xVector = new Phaser.Math.Vector2(centeredFather.x + 1, centeredFather.y + 0);
        var yVector = new Phaser.Math.Vector2(centeredFather.x + 0, centeredFather.y + 1);
        
        //Projeccio ortogonal en l'eix de la "x" i de la "y"
        var xProj = new Phaser.Math.Vector2(
            ( ((fatherToObject.x * xVector.x) / xVector.lengthSq()) * xVector.x ),
            ( ((fatherToObject.y * xVector.y) / xVector.lengthSq()) * xVector.y ));
        var yProj = new Phaser.Math.Vector2(
            ( ((fatherToObject.x * yVector.x) / yVector.lengthSq()) * yVector.x ),
            ( ((fatherToObject.y * yVector.y) / yVector.lengthSq()) * yVector.y ));
        
        
        var relativeDistance = (xProj.length() + yProj.length()) / 2;
        
        return relativeDistance;
    }
    
    ObjectOverlappingInside(_father, _overlapObject, _inPercentage = 0.8){
        if(this.GetCollisionState() != this.CollisionState.COLLIDING){
            return false;
        }
        else{
            var outPercentage = 1 - _inPercentage;   //Significa que un 20% del personatge estara fora del father
            outPercentage = Phaser.Math.Clamp(outPercentage, 0.1, 1);
            var relativeDistance = this.GetRelativeDistanceOnOverlap(_father, _overlapObject);
            var maxRelativeDistance = (_overlapObject.width / 2 + _father.width / 2 + _overlapObject.height / 2 + _father.height / 2) / 2;

            //return fatherToObjectDistance <= relativeDistance;
            return relativeDistance <= maxRelativeDistance * outPercentage;
        }
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


