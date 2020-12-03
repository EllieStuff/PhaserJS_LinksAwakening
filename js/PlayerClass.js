class PlayerPrefab extends Phaser.GameObjects.Sprite{
    
    constructor(scene, positionX, positionY)
    {
		super(scene, positionX, positionY, 'playerMove');
		scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.events.on('update', this.Update, this);
        this.setOrigin(0.5).setScale(1);
        this.maxHearts = 3;
        this.health = this.maxHearts*4;
        this.setOrigin(0.5,0).setScale(1);
        this.defense = 1;
        this.attack = 1;
        this.speed = 1;
        this.rupies = 0;
        this.assignA = "";
        this.assignB = "";
        this.isJumping = false;
        this.atkCharged = false;
        //this.nave.anims.play('stand');
        //this.anims.play('standEnemy');
        //this.checkWorldBounds = true;
        //this.outOfBoundsKill = true;
        this.shieldUp = false;
        
        this.CreateAnims();
    }  
    
    
    GetDamaged(_player, _enemy)
    {
        if(!_player.isJumping){
            _player.health -= _enemy.attack/this.defense;       //Add death          
        }
        
    }
    
    AddMaxHeart()
    {
        this.maxHearts++;
        this.health = this.maxHearts * 4;
    }
    
    Heal()
    {
        this.health+=4;
        if(this.health > this.maxHearts*4)
            this.health = this.maxHearts * 4;
    }
    
    CreateAnims()
    {
        //PLAYER WITHOUT SHIELD
        this.scene.anims.create({
            key: 'walkdown',
            frames: this.scene.anims.generateFrameNumbers('playerMove', { start: 0, end: 1 }),
            frameRate: 8,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'walkleft',
            frames: this.scene.anims.generateFrameNumbers('playerMove', { start: 2, end: 3 }),
            frameRate: 8,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'walkright',
            frames: this.scene.anims.generateFrameNumbers('playerMove', { start: 4, end: 5 }),
            frameRate: 8,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'walkup',
            frames: this.scene.anims.generateFrameNumbers('playerMove', { start: 6, end: 7 }),
            frameRate: 8,
            repeat: 0
        });
        
        //PLAYER WITH SHIELD
        this.scene.anims.create({
            key: 'walkdownS',
            frames: this.scene.anims.generateFrameNumbers('playerMoveShield', { start: 0, end: 1 }),
            frameRate: 8,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'walkleftS',
            frames: this.scene.anims.generateFrameNumbers('playerMoveShield', { start: 2, end: 3 }),
            frameRate: 8,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'walkrightS',
            frames: this.scene.anims.generateFrameNumbers('playerMoveShield', { start: 4, end: 5 }),
            frameRate: 8,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'walkupS',
            frames: this.scene.anims.generateFrameNumbers('playerMoveShield', { start: 6, end: 7 }),
            frameRate: 8,
            repeat: 0
        });
        
        //PLAYER USE SHIELD
        this.scene.anims.create({
            key: 'shieldDown',
            frames: this.scene.anims.generateFrameNumbers('playerShieldUp', { start: 0, end: 1 }),
            frameRate: 8,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'shieldLeft',
            frames: this.scene.anims.generateFrameNumbers('playerShieldUp', { start: 2, end: 3 }),
            frameRate: 8,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'shieldRight',
            frames: this.scene.anims.generateFrameNumbers('playerShieldUp', { start: 4, end: 5 }),
            frameRate: 8,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'shieldUp',
            frames: this.scene.anims.generateFrameNumbers('playerShieldUp', { start: 6, end: 7 }),
            frameRate: 8,
            repeat: 0
        });
    }
    
    Update()
    {

        
        //MOVEMENT
        if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.L))   //MOVE WITH SHIELD UP
        {
            this.shieldUp = true;
            
            if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.A))
            {
                this.anims.play('shieldLeft',true);
                this.scene.hitboxPlayer.body.velocity.x = -64;
            }
            else if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.D))
            {
                this.anims.play('shieldRight',true);
                this.scene.hitboxPlayer.body.velocity.x = 64;
            }
            else
            {
                this.scene.hitboxPlayer.body.velocity.x = 0;
            }
            
            if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.S))
            {
                this.anims.play('shieldDown',true);
                this.scene.hitboxPlayer.body.velocity.y = 64;
            }
            else if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.W))
            {
                this.anims.play('shieldUp',true);
                this.scene.hitboxPlayer.body.velocity.y = -64;
            }
            else
            {
                this.scene.hitboxPlayer.body.velocity.y = 0;
            }
        }
        else                            //MOVE WITH SHIELD DOWN
        {
            
            this.shieldUp = false;
            
            if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.A))
            {
            
                this.anims.play('walkleftS',true);
                this.scene.hitboxPlayer.body.velocity.x = -64;
            }
            else if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.D))
            {
                this.anims.play('walkrightS',true);
                this.scene.hitboxPlayer.body.velocity.x = 64;
            }
            else
            {
                this.scene.hitboxPlayer.body.velocity.x = 0;
            }
            
            if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.S))
            {
                this.anims.play('walkdownS',true);
                this.scene.hitboxPlayer.body.velocity.y = 64;
                
            }
            else if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.W))
            {
                this.anims.play('walkupS',true);
                this.scene.hitboxPlayer.body.velocity.y = -64;
            }
            else
            {
                //this.player.anims.play('idleDown');
                this.scene.hitboxPlayer.body.velocity.y = 0;
            }
            /*
            //NOTA: Per acabar l'animacio i que es quedi mirant on vulguis crec que el millor seria algo aixi amb totes les direccions
            if(this.scene.inputs.GetKeyUp(this.scene.inputs.KeyCodes.S)){
                this.scene.player.anims.play('idleDown');
            }
            */
            
        }
        this.body.x = this.scene.hitboxPlayer.body.x - 4;
        this.body.y = this.scene.hitboxPlayer.body.y - 8;
        ////
        
        //ATTACK
    }
    
}
