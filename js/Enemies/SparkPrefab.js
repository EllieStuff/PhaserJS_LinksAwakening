
// TODO: 
//  Ara el problema es que detecta que surt de la colisió quan passa per una paret diferent

class SparkPrefab extends EnemyBase{
    
    constructor(scene, positionX, positionY)
    {
		super(scene, positionX, positionY, 'hitbox');
        
        this.damage = 2;
        this.health = 1;
        this.isVulnerable = false;
        this.speed = 30;
        this.moveDir = scene.Directions.NONE;
        this.diagonalMoveDir = scene.Directions.NONE;
        this.lastBlocked = scene.Directions.NONE;
        this.currentlyBlocked = false
        this.touchedFirstWall = false
        //this.wallReached = false;
        //this.framesSinceWallTouched = 0
        //this.MAX_FRAMES_SINCE_WALL_TOUCHED = 20
        //this.MAX_WALL_DISTANCE = 22.5
        
        this.currentWallPos = new Phaser.Math.Vector2(positionX, positionY)
        
        this.sparkAnimator = new SparkAnimator(scene, positionX, positionY)
        
        var margins = new Phaser.Math.Vector2(this.body.width / 2, this.body.height / 2)
        this.sparkAuxsLength = 4
        this.sparkAuxs = [
            new SparkAux(scene, positionX, positionY, -margins.x, -margins.y, this.scene.Directions.UP_LEFT),
            new SparkAux(scene, positionX, positionY, margins.x, -margins.y, this.scene.Directions.UP_RIGHT),
            new SparkAux(scene, positionX, positionY, -margins.x, margins.y, this.scene.Directions.DOWN_LEFT),
            new SparkAux(scene, positionX, positionY, margins.x, margins.y, this.scene.Directions.DOWN_RIGHT)
        ];
        
        this.wallsColManager = new CollisionManager(scene);
        
        
    }
    
    InitCollisions(){
        this.scene.physics.add.overlap(this, this.scene.player, this.DamagePlayer, null, this);
        this.scene.physics.add.collider(this, this.scene.walls, this.ChangeMoveDir, null, this);
    }
    
    ChangeMoveDir(){
        if(this.active){
            this.wallsColManager.UpdateOnTrigger();
            
        }
        
        
    }
    
    GetLastBlockedDir(){
        var _lastBlocked = this.lastBlocked
        
        if(this.body.blocked.up){
            this.currentlyBlocked = true
            _lastBlocked = this.scene.Directions.UP
        }
        else if(this.body.blocked.down){
            this.currentlyBlocked = true
            _lastBlocked = this.scene.Directions.DOWN
        }
        else if(this.body.blocked.right){
            this.currentlyBlocked = true
            _lastBlocked = this.scene.Directions.RIGHT
        }
        else if(this.body.blocked.left){
            this.currentlyBlocked = true
            _lastBlocked = this.scene.Directions.LEFT
        }
        else {
            this.currentlyBlocked = false
            //_lastBlocked = this.scene.Directions.NONE
            _lastBlocked = this.lastBlocked
        }
        
        if(!this.touchedFirstWall && this.currentlyBlocked){
            this.touchedFirstWall = true;
        }
        
        console.log('curr blocked: ' + this.currentlyBlocked)
        
        return _lastBlocked
    }
    
    /*ChooseMoveDir(){
        switch(this.moveDir){
            case this.scene.Directions.UP:
                if(this.body.blocked.up){
                    if(!this.body.blocked.right){
                        return this.scene.Directions.RIGHT
                    }
                    else if(!this.body.blocked.left){
                        return this.scene.Directions.LEFT
                    }
                    else if(!this.body.blocked.down){
                        return this.scene.Directions.DOWN
                    }
                    else{
                        return this.scene.Directions.NONE
                    }
                }
                else{
                    
                    return this.scene.Directions.UP
                }
                
                break;
                
            case this.scene.Directions.DOWN:
                if(this.body.blocked.down){
                    if(!this.body.blocked.left){
                        return this.scene.Directions.LEFT
                    }
                    else if(!this.body.blocked.right){
                        return this.scene.Directions.RIGHT
                    }
                    else if(!this.body.blocked.up){
                        return this.scene.Directions.UP
                    }
                    else{
                        return this.scene.Directions.NONE
                    }
                }
                else{
                    
                    return this.scene.Directions.DOWN
                }
                
                break;
                
            case this.scene.Directions.RIGHT:
                if(this.body.blocked.right){
                    if(!this.body.blocked.down){
                        return this.scene.Directions.DOWN
                    }
                    else if(!this.body.blocked.up){
                        return this.scene.Directions.UP
                    }
                    else if(!this.body.blocked.left){
                        return this.scene.Directions.LEFT
                    }
                    else{
                        return this.scene.Directions.NONE
                    }
                }
                else{
                    
                    return this.scene.Directions.RIGHT
                }
                
                break;
                
            case this.scene.Directions.LEFT:
                if(this.body.blocked.left){
                    if(!this.body.blocked.up){
                        return this.scene.Directions.UP
                    }
                    else if(!this.body.blocked.down){
                        return this.scene.Directions.DOWN
                    }
                    else if(!this.body.blocked.right){
                        return this.scene.Directions.RIGHT
                    }
                    else{
                        return this.scene.Directions.NONE
                    }
                }
                else{
                    
                    return this.scene.Directions.LEFT
                }
                
                break;
                
            case this.scene.Directions.NONE:
                if(!this.body.blocked.up){
                    return this.scene.Directions.UP
                }
                else if(!this.body.blocked.down){
                    return this.scene.Directions.DOWN
                }
                else if(!this.body.blocked.right){
                    return this.scene.Directions.RIGHT
                }
                else if(!this.body.blocked.left){
                    return this.scene.Directions.LEFT
                }
                else{
                    return this.scene.Directions.NONE
                }
                
                break;
                
            default:
                console.log("smth is wrong")
                break;
        }
        
    }*/
    
    ChooseMoveDir(){
        switch(this.diagonalMoveDir){
            case this.scene.Directions.UP_RIGHT:
                if(this.body.blocked.up && this.body.blocked.right){
                    if(this.moveDir == this.scene.Directions.RIGHT){
                        this.diagonalMoveDir = this.scene.Directions.DOWN_RIGHT
                        this.moveDir = this.scene.Directions.DOWN
                    }
                    else if(this.moveDir == this.scene.Directions.UP){
                        this.diagonalMoveDir = this.scene.Directions.UP_LEFT
                        this.moveDir = this.scene.Directions.LEFT
                    }
                    else{
                        console.log("smth went wrong")
                    }
                        
                    
                    /*else if(this.body.blocked.right){
                        return this.scene.Directions.DOWN_RIGHT
                    }
                    else if(!this.body.blocked.left){
                        return this.scene.Directions.UP_LEFT
                    }
                    else if(!this.body.blocked.down){
                        return this.scene.Directions.DOWN
                    }
                    else{
                        return this.scene.Directions.NONE
                    }*/
                }
                else{
                    
                    this.diagonalMoveDir = this.scene.Directions.UP_RIGHT
                }
                
                break;
                
            case this.scene.Directions.UP_LEFT:
                if(this.body.blocked.up && this.body.blocked.left){
                    if(this.moveDir == this.scene.Directions.LEFT){
                        this.diagonalMoveDir = this.scene.Directions.DOWN_LEFT
                        this.moveDir = this.scene.Directions.DOWN
                    }
                    else if(this.moveDir == this.scene.Directions.UP){
                        this.diagonalMoveDir = this.scene.Directions.UP_RIGHT
                        this.moveDir = this.scene.Directions.RIGHT
                    }
                    else{
                        console.log("smth went wrong")
                    }
                }
                else{
                    
                    this.diagonalMoveDir = this.scene.Directions.UP_LEFT
                }
                
                break;
                
            case this.scene.Directions.DOWN_RIGHT:
                if(this.body.blocked.down && this.body.blocked.right){
                    if(this.moveDir == this.scene.Directions.RIGHT){
                        this.diagonalMoveDir = this.scene.Directions.UP_RIGHT
                        this.moveDir = this.scene.Directions.UP
                    }
                    else if(this.moveDir == this.scene.Directions.DOWN){
                        this.diagonalMoveDir = this.scene.Directions.DOWN_LEFT
                        this.moveDir = this.scene.Directions.LEFT
                    }
                    else{
                        console.log("smth went wrong")
                    }
                }
                else{
                    
                    this.diagonalMoveDir = this.scene.Directions.DOWN_RIGHT
                }
                
                break;
                
            case this.scene.Directions.DOWN_LEFT:
                if(this.body.blocked.down && this.body.blocked.left){
                    if(this.moveDir == this.scene.Directions.LEFT){
                        this.diagonalMoveDir = this.scene.Directions.UP_LEFT
                        this.moveDir = this.scene.Directions.UP
                    }
                    else if(this.moveDir == this.scene.Directions.DOWN){
                        this.diagonalMoveDir = this.scene.Directions.DOWN_RIGHT
                        this.moveDir = this.scene.Directions.RIGHT
                    }
                    else{
                        console.log("smth went wrong")
                    }
                }
                else{
                    
                    this.diagonalMoveDir = this.scene.Directions.DOWN_LEFT
                }
                
                break;
                
            case this.scene.Directions.NONE:
                if(!this.body.blocked.up){
                    this.diagonalMoveDir = this.scene.Directions.UP_RIGHT
                    this.moveDir = this.scene.Directions.UP
                }
                else if(!this.body.blocked.down){
                    this.diagonalMoveDir = this.scene.Directions.DOWN_LEFT
                    this.moveDir = this.scene.Directions.DOWN
                }
                else if(!this.body.blocked.right){
                    this.diagonalMoveDir = this.scene.Directions.DOWN_RIGHT
                    this.moveDir = this.scene.Directions.RIGHT
                }
                else if(!this.body.blocked.left){
                    this.diagonalMoveDir = this.scene.Directions.UP_LEFT
                    this.moveDir = this.scene.Directions.LEFT
                }
                else{
                    this.diagonalMoveDir = this.scene.Directions.NONE
                    this.moveDir = this.scene.Directions.NONE
                }
                
                break;
                
            default:
                console.log("smth is wrong")
                break;
        }
    }
    
    
    SetMoveDir(){
        switch(this.diagonalMoveDir){
            case this.scene.Directions.UP_RIGHT:
                this.body.velocity.x = this.speed;
                this.body.velocity.y = -this.speed;
                break;
                
            case this.scene.Directions.UP_LEFT:
                this.body.velocity.x = -this.speed;
                this.body.velocity.y = -this.speed;
                break;
                
            case this.scene.Directions.DOWN_RIGHT:
                this.body.velocity.x = this.speed;
                this.body.velocity.y = this.speed;
                break;
                
            case this.scene.Directions.DOWN_LEFT:
                this.body.velocity.x = -this.speed;
                this.body.velocity.y = this.speed;
                break;
                
            case this.scene.Directions.NONE:
                this.body.velocity.x = 0;
                this.body.velocity.y = 0;
                break;
                
            default:
                console.log("smth is wrong")
                break;
        }
    }
    
    
    Update()
    {
        if(this.active){
            //console.log(this.wallsColManager.GetCollisionState())
            //console.log(this.framesSinceWallTouched)
            
            this.lastBlocked = this.GetLastBlockedDir()
            
            if(this.currentlyBlocked || !this.touchedFirstWall){
                
                //this.lastBlocked = this.GetLastBlockedDir()
                
                this.ChooseMoveDir()
                
                
                /*if(this.wallsColManager.GetCollisionState() == this.wallsColManager.CollisionState.COLLIDING){
                    this.framesSinceWallTouched = 0
                }
                else if(this.wallsColManager.GetCollisionState() == this.wallsColManager.CollisionState.NOT_COLLIDING){
                    this.framesSinceWallTouched++
                }*/
                
                //this.wallReached = true;
                console.log('1')
            }
            else {
                //this.lastBlocked = this.GetLastBlockedDir()
                
                //this.framesSinceWallTouched = 0
                
                /*
                var choosenAux = 0;
                for(var i = 0; i < this.sparkAuxsLength; i++)
                {
                    this.sparkAuxs[i].Update(this)
                    
                    if(this.sparkAuxs[i].triggered)
                        choosenAux = i
                }
                
                this.moveDir = this.sparkAuxs[choosenAux].ChooseMoveDir(this.moveDir)
                */
                
                
                for(var i = 0; i < this.sparkAuxsLength; i++)
                {
                    this.sparkAuxs[i].Update(this)
                    
                    if(this.sparkAuxs[i].triggered){
                        this.diagonalMoveDir = this.sparkAuxs[i].GetDiagonalMoveDir()
                        this.moveDir = this.sparkAuxs[i].GetMoveDir(this.moveDir)
                        break;
                    }
                }
                
                
                //this.moveDir = this.sparkAnimator.ChooseMoveDir(this.moveDir)
                
                
                
                /*var triggeredPos = 0
                var triggeredAuxNum = 0
                for(var i = 0; i < this.sparkAuxsLength; i++)
                {
                    this.sparkAuxs[i].Update(this)
                    
                    if(this.sparkAuxs[i].triggered){
                        triggeredAuxNum++
                        
                        if(triggeredAuxNum == 1){
                            triggeredPos = i
                        }
                        else{
                            break;
                        }
                    }
                }
                
                if(triggeredAuxNum == 1){
                    this.diagonalMoveDir = this.sparkAuxs[i].GetDiagonalMoveDir()
                    this.moveDir = this.sparkAuxs[i].GetMoveDir(this.moveDir)
                }
                else{
                    this.ChooseMoveDir()
                }*/
                
                console.log('2')
            }
            
            this.SetMoveDir()
            
            this.sparkAnimator.Update(this.x, this.y)
            
        }
        
    }
    
    
}

class SparkAnimator extends Phaser.GameObjects.Sprite{
    constructor(scene, positionX, positionY)
    {
		super(scene, positionX, positionY, 'sparkEnemy');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.CreateAnims()
        this.anims.play('sparkMove')
        
        
        //this.wallsColManager = new CollisionManager(scene);
        
        //this.ChangeMoveDir()
        
    }
    
    CreateAnims(){
        this.scene.anims.create({
            key: 'sparkMove',
            frames: this.scene.anims.generateFrameNumbers('sparkEnemy', { start: 0, end: 1 }),
            frameRate: 15,
            repeat: -1
        });
        
    }
    
    Update(_fatherX, _fatherY){
        this.x = _fatherX
        this.y = _fatherY + 3
        
    }
    
    
    
}

class SparkAux extends Phaser.GameObjects.Sprite{
    constructor(scene, positionX, positionY, marginX, marginY, dirFromFather)
    {
		super(scene, positionX + marginX, positionY + marginY, 'sparkEnemy');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.margins = new Phaser.Math.Vector2(marginX, marginY)
        this.triggered = false;
        this.dirFromFather = dirFromFather
        this.distFromCenter = -1;
        
        //this.fatherMoveDir = scene.Directions.NONE
        //this.fatherDiagonalMoveDir = scene.Directions.NONE
        
        this.scene.physics.add.overlap(this, this.scene.walls, this.UpdateColState, null, this);
        this.colManager = new CollisionManager(scene);
        
    }
    
    UpdateColState(){
        if(this.active){
            this.colManager.UpdateOnTrigger()
            
        }
        
    }
    
    IsTriggered(_father){
        if(this.colManager.GetCollisionState() == this.colManager.CollisionState.COLLIDING || this.colManager.GetCollisionState() == this.colManager.CollisionState.ENTERED_COLLISION){
            switch(this.dirFromFather){
                case this.scene.Directions.UP_RIGHT:
                    return (_father.diagonalMoveDir == this.scene.Directions.DOWN_RIGHT && _father.moveDir == this.scene.Directions.DOWN)
                        || (_father.diagonalMoveDir == this.scene.Directions.UP_LEFT && _father.moveDir == this.scene.Directions.LEFT)
                    
                    break;
                    
                case this.scene.Directions.UP_LEFT:
                    return (_father.diagonalMoveDir == this.scene.Directions.DOWN_LEFT && _father.moveDir == this.scene.Directions.DOWN)
                        || (_father.diagonalMoveDir == this.scene.Directions.UP_RIGHT && _father.moveDir == this.scene.Directions.RIGHT)
                    
                    break;

                case this.scene.Directions.DOWN_RIGHT:
                    return (_father.diagonalMoveDir == this.scene.Directions.UP_RIGHT && _father.moveDir == this.scene.Directions.UP)
                        || (_father.diagonalMoveDir == this.scene.Directions.DOWN_LEFT && _father.moveDir == this.scene.Directions.LEFT)
                    
                    break;

                case this.scene.Directions.DOWN_LEFT:
                    return (_father.diagonalMoveDir == this.scene.Directions.UP_RIGHT && _father.moveDir == this.scene.Directions.UP)
                        || (_father.diagonalMoveDir == this.scene.Directions.DOWN_RIGHT && _father.moveDir == this.scene.Directions.RIGHT)
                    
                    break;

                default:
                    console.log("smth may be wrong")
                    break;
                    
            }
        }
        
        return false
        
        /*
        // TODO: Implementar lastBlocked i tenir en compte els lastBlocked del pare a part de la seva dir per a decidir a quin aux fer-li cas
        if(this.colManager.GetCollisionState() == this.colManager.CollisionState.COLLIDING || this.colManager.GetCollisionState() == this.colManager.CollisionState.ENTERED_COLLISION){
            switch(this.dirFromFather){
                case this.scene.Directions.UP_LEFT:
                    return (_father.moveDir == this.scene.Directions.DOWN && _father.lastBlocked == this.scene.Directions.LEFT)
                        || (_father.moveDir == this.scene.Directions.RIGHT && _father.lastBlocked == this.scene.Directions.UP)
                    
                    break;

                case this.scene.Directions.UP_RIGHT:
                    return (_father.moveDir == this.scene.Directions.DOWN && _father.lastBlocked == this.scene.Directions.RIGHT)
                        || (_father.moveDir == this.scene.Directions.LEFT && _father.lastBlocked == this.scene.Directions.UP)
                    
                    break;

                case this.scene.Directions.DOWN_LEFT:
                    return (_father.moveDir == this.scene.Directions.UP && _father.lastBlocked == this.scene.Directions.RIGHT)
                        || (_father.moveDir == this.scene.Directions.RIGHT && _father.lastBlocked == this.scene.Directions.DOWN)
                    
                    break;

                case this.scene.Directions.DOWN_RIGHT:
                    return (_father.moveDir == this.scene.Directions.UP && _father.lastBlocked == this.scene.Directions.RIGHT)
                        || (_father.moveDir == this.scene.Directions.LEFT && _father.lastBlocked == this.scene.Directions.DOWN)
                    
                    break;

                default:
                    console.log("smth is wrong")
                    break;
            }
        }
        
        return false
        */
        
    }
    
    GetDiagonalMoveDir(){
        return this.dirFromFather
    }
    
    GetMoveDir(_moveDir){
        //Nota: la dirFromFather es la posicio relativa del trigger des del pare, pel que quan s'activa el pare estara anant en una direccio contraria a aquest, si no ho entens fes-te un paint o algo
        switch(this.dirFromFather){
            case this.scene.Directions.UP_RIGHT:
                if(_moveDir == this.scene.Directions.DOWN){
                    
                    return this.scene.Directions.RIGHT
                }
                else if(_moveDir == this.scene.Directions.LEFT){
                    
                    return this.scene.Directions.UP
                }
                else{
                    
                    return _moveDir
                }
                
                break;
                
            case this.scene.Directions.UP_LEFT:
                if(_moveDir == this.scene.Directions.DOWN){
                    
                    return this.scene.Directions.LEFT
                }
                else if(_moveDir == this.scene.Directions.RIGHT){
                    
                    return this.scene.Directions.UP
                }
                else{
                    
                    return _moveDir
                }
                
                break;
                
            case this.scene.Directions.DOWN_RIGHT:
                if(_moveDir == this.scene.Directions.UP){
                    
                    return this.scene.Directions.RIGHT
                }
                else if(_moveDir == this.scene.Directions.LEFT){
                    
                    return this.scene.Directions.DOWN
                }
                else{
                    
                    return _moveDir
                }
                
                break;
                
            case this.scene.Directions.DOWN_LEFT:
                if(_moveDir == this.scene.Directions.UP){
                    
                    return this.scene.Directions.LEFT
                }
                else if(_moveDir == this.scene.Directions.RIGHT){
                    
                    return this.scene.Directions.DOWN
                }
                else{
                    
                    return _moveDir
                }
                
                break;
                
            default:
                console.log("smth went wrong")
                break;
        }
    }
    
    /*ChooseMoveDir(_moveDir){
        //Nota: la dirFromFather es la posicio relativa del trigger des del pare, pel que quan s'activa el pare estara anant en una direccio contraria a aquest, si no ho entens fes-te un paint o algo
        switch(this.dirFromFather){
            case this.scene.Directions.UP_LEFT:
                if(_moveDir == this.scene.Directions.DOWN){
                    this.fatherDiagonalMoveDir = this.scene.Directions.UP_LEFT
                }
                else if(_moveDir == this.scene.Directions.RIGHT){
                    this.fatherDiagonalMoveDir = this.scene.Directions.UP_RIGHT
                }
                
                break;
                
        }
                   
        
        switch(this.dirFromFather){
            case this.scene.Directions.UP_LEFT:
                if(_moveDir == this.scene.Directions.DOWN){
                    
                    return this.scene.Directions.LEFT
                }
                else if(_moveDir == this.scene.Directions.RIGHT){
                    
                    return this.scene.Directions.UP
                }
                else{
                    
                    return _moveDir
                }
                
                break;
                
            case this.scene.Directions.UP_RIGHT:
                if(_moveDir == this.scene.Directions.DOWN){
                    
                    return this.scene.Directions.RIGHT
                }
                else if(_moveDir == this.scene.Directions.LEFT){
                    
                    return this.scene.Directions.UP
                }
                else{
                    
                    return _moveDir
                }
                
                break;
                
            case this.scene.Directions.DOWN_LEFT:
                if(_moveDir == this.scene.Directions.UP){
                    
                    return this.scene.Directions.DOWN
                }
                else if(_moveDir == this.scene.Directions.RIGHT){
                    
                    return this.scene.Directions.LEFT
                }
                else{
                    
                    return _moveDir
                }
                
                break;
                
            case this.scene.Directions.DOWN_RIGHT:
                if(_moveDir == this.scene.Directions.UP){
                    
                    return this.scene.Directions.DOWN
                }
                else if(_moveDir == this.scene.Directions.LEFT){
                    
                    return this.scene.Directions.RIGHT
                }
                else{
                    
                    return _moveDir
                }
                
                break;
                
            default:
                console.log("smth is wrong")
                break;
        }
        
    }*/
    
    
    Update(_father){
        this.x = _father.x + this.margins.x
        this.y = _father.y + this.margins.y + 3
        
        this.triggered = this.IsTriggered(_father.moveDir)
        
        //if(this.triggered) this.ChooseMoveDir(_father.moveDir)
        
        
        /*if(this.triggered){
            
            //this.distFromCenter = this.colManager.GetRelativeDistanceOnOverlap()
        }*/
        
    }
    
    
    
}

