class RollingBonePrefab extends EnemyBase
{
    constructor(scene, positionX, positionY, sprite)
    {
		super(scene, positionX, positionY, sprite);
		scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.collideWorldBounds = true;
        scene.events.on('update', this.Update, this);
        this.setOrigin(0.5,0).setScale(1);
        this.setDepth(scene.DrawDepths.ENEMIES);
        
        this.initPositionX = this.body.x;
        this.initPositionY = this.body.y;
        this.attack = 2;
        this.repulsionForce = 1;
        this.initHealth = 10;
        this.health = this.initHealth;
        this.speed = 1;
        
    }  
    
    //
    
    update()
    {
        
    }
    
    
    goToSpike()
    {
        
    }
    
}