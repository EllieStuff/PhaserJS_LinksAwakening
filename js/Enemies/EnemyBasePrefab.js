class EnemyBase extends Phaser.GameObjects.Sprite{
    
    constructor(scene, positionX, positionY, sprite)
    {
		super(scene, positionX, positionY, sprite);
		scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.events.on('updateEnemy', this.Update, this);
        this.setOrigin(0.5,0);
        this.damage = 1;
        this.repulsionForce = 1;
        this.health = 1;
        this.isVulnerable = true;
        this.speed = 1;
    }  
    preUpdate(){
		/*if(this.y <= 0){
            this.active = false;
        }*/
	}
    
    GetRepeled(_enemy, _shield){
        var dir = new Vector2(_enemy.body.x - scene.player.body.x, _enemy.body.y - scene.player.body.y).Normalize();
        dir *= repulsionForce;
        
        _enemy.body.velocity.x += dir.x;
        _enemy.body.velocity.y += dir.y;
    }
    
    GetDamaged(_enemy, _sword)
    {
        heatlh -= _dmg;
    }
    Update(){}
}

//export default EnemyBase;
