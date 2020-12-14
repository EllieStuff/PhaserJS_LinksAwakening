class PokerPrefab extends EnemyBase{
    
    constructor(scene, positionX, positionY)
    {
		super(scene, positionX, positionY, 'pokerEnemy');
        this.health = 2;
        this.isVulnerable = false;
        this.damage = 1;
        this.seeRange = 100;
        this.speed = 30;
        this.collided = false;
        this.Endeffect = ' ';
        this.matchtype = false;
        
    }  
    
    
    Update()
    {
        
        if((this.scene.inputs.GetKeyDown(this.scene.inputs.KeyCodes.K) || this.scene.inputs.GetKeyDown(this.scene.inputs.KeyCodes.L)) && !this.collided)
        {
            this.collided = true;
            this.anims.play('pokerEnemy', true);
        }
        else if (this.collided)
        {
            this.anims.play('pokerEnemy', false);
        }
        
        
        if(this.matchtype)
        {
            if(this.Endeffect == 'Heart')
            {
                //Drop Diamond
            }
            else if(this.Endeffect == 'Diamond')
            {
                //Drop Rupee
            }
            
        }
        
        //CHECK IF ALL HAVE SAME FRAME OF ANIMATION, ASK RICHARD
    }
    
    CreateAnims()
    {
        this.scene.anims.create({
            key: 'PokerMove',
            frames: this.scene.anims.generateFrameNumbers('pokerEnemy', { start: 0, end: 3 }),
            frameRate: 3,
            repeat: -1
        });
    }
    
}