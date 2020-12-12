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
        this.initPositionX = positionX;
        this.initPositionY = positionY;
    } 
    
    Update()
    {
        var currentPos = new Phaser.Math.Vector2(this.body);
        var dir = this.scene.player.body - currentPos;
        
        var isInLine = (dir.normalize == Phaser.Math.Vector2(1,0)) || (dir.normalize == Phaser.Math.Vector2(-1,0)) || (dir.normalize == Phaser.Math.Vector2(0,1)) || (dir.normalize == Phaser.Math.Vector2(0,-1));
        
        
        if(currentPos.distance(this.scene.player.body) < this.seeRange && !this.collided && isInLine)
        {
            //this.MoveTowards(this.scene.player, this.speed);
            this.body.setVelocity(dir.x*this.speed, dir.y*this.speed);
        }
        else if (!this.collided)
        {
            this.body.stop();
        }
        
    }
}