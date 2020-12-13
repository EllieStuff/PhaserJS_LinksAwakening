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
        this.returning = false;
        
        this.epsilon = 7;
        this.stopped = true;
    } 
    
    Update()
    {
        var currentPos = new Phaser.Math.Vector2(this.body);
        var dir = new Phaser.Math.Vector2(1,0/*this.scene.player.body.x - currentPos.x,this.scene.player.body.y - currentPos.y*/);
        var dist = 10;
        //var isInLine = (dir.normalize == Phaser.Math.Vector2(1,0)) || (dir.normalize == Phaser.Math.Vector2(-1,0)) || (dir.normalize == Phaser.Math.Vector2(0,1)) || (dir.normalize == Phaser.Math.Vector2(0,-1));
        
        if(currentPos.distance(this.targetPosRight) < this.epsilon && !this.returning){
            this.returning = true;
            this.stopped = false;
        }
        else if(currentPos.distance(this.initPosition) < this.epsilon && this.returning){
            this.returning = false;
            this.body.stop();
        }
        
        if(!this.returning && this.stopped)
        {
            this.MoveTowards(this.targetPosRight, this.speed);
        }
        else if (this.returning)
        {
            this.MoveTowards(this.initPosition, this.speed/2);
        }
        if(this.collided){
            this.body.stop();
        }
    }
}