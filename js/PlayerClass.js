class Player extends Phaser.GameObjects.Sprite{
    
    constructor(scene, positionX, positionY){
		super(scene, positionX, positionY, 'player');
		scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.events.on('updatePlayer', this.Update, this);
        this.setOrigin(0.5,0);
        this.maxHearts = 3;
        this.health = this.maxHearts*4;
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
    UpdateMovement(){}
    
    CreateAnims()
    {
        //PLAYER WITHOUT SHIELD
        this.anims.create({
            key: 'walkdown',
            frames: this.anims.generateFrameNumbers('playerMove', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'walkleft',
            frames: this.anims.generateFrameNumbers('playerMove', { start: 2, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'walkright',
            frames: this.anims.generateFrameNumbers('playerMove', { start: 4, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'walkup',
            frames: this.anims.generateFrameNumbers('playerMove', { start: 6, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        
        //PLAYER WITH SHIELD
        this.anims.create({
            key: 'walkdownS',
            frames: this.anims.generateFrameNumbers('playerMoveShield', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'walkleftS',
            frames: this.anims.generateFrameNumbers('playerMoveShield', { start: 2, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'walkrightS',
            frames: this.anims.generateFrameNumbers('playerMoveShield', { start: 4, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'walkupS',
            frames: this.anims.generateFrameNumbers('playerMoveShield', { start: 6, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        
        //PLAYER USE SHIELD
        this.anims.create({
            key: 'shieldDown',
            frames: this.anims.generateFrameNumbers('playerMoveShield', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'shieldLeft',
            frames: this.anims.generateFrameNumbers('playerMoveShield', { start: 2, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'shieldRight',
            frames: this.anims.generateFrameNumbers('playerMoveShield', { start: 4, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'shieldUp',
            frames: this.anims.generateFrameNumbers('playerMoveShield', { start: 6, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
    }
    
    UpdateMovement(_player,_cursor)
    {
        //MOVEMENT
        
        if(this.cursors.left.isDown)
        {
            this.player.anims.play('walkleft',true);
            this.player.body.velocity.x = -64;
            this.player.body.velocity.y = 0;
        }
        else if(this.cursors.right.isDown)
        {
            this.player.anims.play('walkright',true);
            this.player.body.velocity.x = 64;
            this.player.body.velocity.y = 0;
        }
        else if(this.cursors.down.isDown)
        {
            this.player.anims.play('walkdown',true);
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = 64;
        }
        else if(this.cursors.up.isDown)
        {
            this.player.anims.play('walkup',true);
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = -64;
        }
        else
        {
            this.player.anims.play();
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = 0;
        }
        ////
        
        //ATTACK
    }
    
}
