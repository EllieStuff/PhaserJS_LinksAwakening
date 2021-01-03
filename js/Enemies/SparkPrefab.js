

class SparkPrefab extends EnemyBase{
    
    constructor(scene, positionX, positionY)
    {
		super(scene, positionX, positionY, 'sparkEnemy');
        
        this.damage = 2;
        this.health = 1;
        this.isVulnerable = false;
        this.speed = 30;
        this.moveDir = scene.Directions.NONE;
        
        this.wallsColManager = new CollisionManager(scene);
        
    }
    
    InitCollisions(){
        this.scene.physics.add.overlap(this, this.scene.player, this.DamagePlayer, null, this);
        this.scene.physics.add.collider(this, this.scene.walls, this.ChangeMoveDir, null, this);
    }
    
    CreateAnims(){
        this.scene.anims.create({
            key: 'sparkMove',
            frames: this.scene.anims.generateFrameNumbers('sparkEnemy', { start: 0, end: 1 }),
            frameRate: 20,
            repeat: -1
        });
        
    }
    
    ChangeMoveDir(){
        
        if(this.active){
            this.wallsColManager.UpdateOnTrigger();
            
            this.moveDir = this.ChooseMoveDir()
            this.SetMoveDir();
            
        }
        
        
    }
    
    ChooseMoveDir(){
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
        
    }
    
    SetMoveDir(){
        switch(this.moveDir){
            case this.scene.Directions.UP:
                this.body.velocity.x = 0;
                this.body.velocity.y = -this.speed;
                break;
                
            case this.scene.Directions.DOWN:
                this.body.velocity.x = 0;
                this.body.velocity.y = this.speed;
                break;
                
            case this.scene.Directions.RIGHT:
                this.body.velocity.x = this.speed;
                this.body.velocity.y = 0;
                break;
                
            case this.scene.Directions.LEFT:
                this.body.velocity.x = -this.speed;
                this.body.velocity.y = 0;
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
            
            
            
        }
        
    }
    
    
}

