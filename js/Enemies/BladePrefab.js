class BladePrefab extends EnemyBase{
    
    constructor(scene, positionX, positionY)
    {
		super(scene, positionX, positionY, 'BladeTrap');
        this.health = 0;
        this.isVulnerable = false;
        this.damage = 4;
        this.seeRange = 100;
        this.speed = 100;
        this.collided = false;
        this.initPosition = new Phaser.Math.Vector2(positionX, positionY);
        this.targetPosRight = new Phaser.Math.Vector2(this.initPosition.x + 1 * 100, this.initPosition.y);
        this.targetPosLeft = new Phaser.Math.Vector2(this.initPosition.x - 1 * 100, this.initPosition.y);
        this.targetPosDown = new Phaser.Math.Vector2(this.initPosition.x, this.initPosition.y + 1 * 100);
        this.targetPosUp = new Phaser.Math.Vector2(this.initPosition.x, this.initPosition.y - 1 * 100);
        this.returning = false;
        
        this.epsilon = 10;
        this.stopped = true;
    } 
    
    Update()
    {
        var currentPos = new Phaser.Math.Vector2(this.body);
        
        if(currentPos.distance(this.targetPosDown) < this.epsilon && !this.returning){
            this.returning = true;
            this.stopped = false;
        }
        else if(currentPos.distance(this.targetPosRight) < this.epsilon && !this.returning){
            this.returning = true;
            this.stopped = false;
        }
        else if(currentPos.distance(this.targetPosLeft) < this.epsilon && !this.returning){
            this.returning = true;
            this.stopped = false;
        }
        else if(currentPos.distance(this.targetPosUp) < this.epsilon && !this.returning){
            this.returning = true;
            this.stopped = false;
        }
        else if(currentPos.distance(this.initPosition) < this.epsilon && this.returning){
            this.returning = false;
            this.stopped = true;
            this.body.stop();
        }
        
        if(!this.returning && this.stopped)
        {
            
            if(currentPos.distance(this.scene.player.body) < this.seeRange){
                var dir = new Phaser.Math.Vector2(this.scene.player.body.x - currentPos.x,this.scene.player.body.y - currentPos.y);
                if(dir.x > dir.y && dir.x > 0){
                    this.stopped = false;
                    this.MoveTowards(this.targetPosRight, this.speed);
                }
                else if(dir.x < dir.y && dir.y > 0){
                    this.stopped = false;
                    this.MoveTowards(this.targetPosDown, this.speed);
                }
                else if(dir.x < dir.y && dir.y < 0){
                    this.stopped = false;
                    this.MoveTowards(this.targetPosLeft, this.speed);
                }
                else if(dir.x > dir.y && dir.x < 0){
                    this.stopped = false;
                    this.MoveTowards(this.targetPosUp, this.speed);
                }
                
                this.scene.sound.play('bladeTrap_FX')
            }
        }
        else if (this.returning)
        {
            this.MoveTowards(this.initPosition, this.speed/2);
        }
        if(this.collided){
            this.stopped = true;
            this.body.stop();
        }
    }
}