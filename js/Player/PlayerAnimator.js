

class PlayerAnimator extends Phaser.GameObjects.Sprite{
    constructor(scene, positionX, positionY){
        super(scene, positionX, positionY, 'playerMove');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        //scene.events.on('update', this.Update, this);
        this.setOrigin(0).setScale(1);
        this.defaultMargin = new Phaser.Math.Vector2(-4, -8);   //Marge per defecte perque l'animator quedi ben centrat
        this.atkMargin = new Phaser.Math.Vector2(-20, -24);
        this.extraMargin = new Phaser.Math.Vector2(0, 0);       //Marge extra per animacions amb diferents dimensions, com ara la del salt
        this.setDepth(scene.DrawDepths.PLAYER);
        
        this.CreateAnims();
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
        
        
        //PLAYER WITH SHIELD IDLE
        this.scene.anims.create({
            key: 'walkdownSidle',
            frames: this.scene.anims.generateFrameNumbers('playerMoveShield', { start: 0, end: 0 }),
            frameRate: 1,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'walkleftSidle',
            frames: this.scene.anims.generateFrameNumbers('playerMoveShield', { start: 2, end: 2 }),
            frameRate: 1,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'walkrightSidle',
            frames: this.scene.anims.generateFrameNumbers('playerMoveShield', { start: 4, end: 4 }),
            frameRate: 1,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'walkupSidle',
            frames: this.scene.anims.generateFrameNumbers('playerMoveShield', { start: 6, end: 6 }),
            frameRate: 1,
            repeat: 0
        });
        
        
        //PLAYER USE SHIELD
        this.scene.anims.create({
            key: 'shieldDownI',
            frames: this.scene.anims.generateFrameNumbers('playerShieldUp', { start: 0, end: 0 }),
            frameRate: 8,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'shieldLeftI',
            frames: this.scene.anims.generateFrameNumbers('playerShieldUp', { start: 2, end: 2 }),
            frameRate: 8,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'shieldRightI',
            frames: this.scene.anims.generateFrameNumbers('playerShieldUp', { start: 4, end: 4 }),
            frameRate: 8,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'shieldUpI',
            frames: this.scene.anims.generateFrameNumbers('playerShieldUp', { start: 6, end: 6 }),
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
        
        
        //Player Jumping
        this.scene.anims.create({
            key: 'playerJumpDown',
            frames: this.scene.anims.generateFrameNumbers('playerJump', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'playerJumpUp',
            frames: this.scene.anims.generateFrameNumbers('playerJump', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'playerJumpLeft',
            frames: this.scene.anims.generateFrameNumbers('playerJump', { start: 9, end: 11 }),
            frameRate: 10,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'playerJumpRight',
            frames: this.scene.anims.generateFrameNumbers('playerJump', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: 0
        });
        
        this.scene.anims.create({
            key: 'playerPlatformerJumpLeft',
            frames: this.scene.anims.generateFrameNumbers('playerPlatformerJump', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'playerPlatformerJumpRight',
            frames: this.scene.anims.generateFrameNumbers('playerPlatformerJump', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: 0
        });
        
        this.scene.anims.create({
            key: 'playerIdleDown',
            frames: this.scene.anims.generateFrameNumbers('playerMove', { start: 0, end: 0 }),
            frameRate: 1,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'playerIdleUp',
            frames: this.scene.anims.generateFrameNumbers('playerMove', { start: 6, end: 6 }),
            frameRate: 1,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'playerIdleLeft',
            frames: this.scene.anims.generateFrameNumbers('playerMove', { start: 2, end: 2 }),
            frameRate: 1,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'playerIdleRight',
            frames: this.scene.anims.generateFrameNumbers('playerMove', { start: 4, end: 4 }),
            frameRate: 1,
            repeat: 0
        });
        
        
        //Player Sword Basic Attack
        this.scene.anims.create({
            key: 'playerAttackDown',
            frames: this.scene.anims.generateFrameNumbers('playerAttack', { start: 0, end: 2 }),
            frameRate: 12,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'playerAttackUp',
            frames: this.scene.anims.generateFrameNumbers('playerAttack', { start: 3, end: 5 }),
            frameRate: 12,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'playerAttackLeft',
            frames: this.scene.anims.generateFrameNumbers('playerAttack', { start: 6, end: 8 }),
            frameRate: 12,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'playerAttackRight',
            frames: this.scene.anims.generateFrameNumbers('playerAttack', { start: 9, end: 11 }),
            frameRate: 12,
            repeat: 0
        });
        
        
        //Player Sword Spin Attack
        this.scene.anims.create({
            key: 'playerSpin',
            frames: this.scene.anims.generateFrameNumbers('playerSpin', { start: 0, end: 7 }),
            frameRate: 12,
            repeat: 0
        });
        
        
        //Player Sword Charge Attack
        this.scene.anims.create({
            key: 'playerChargeAttackDown',
            frames: this.scene.anims.generateFrameNumbers('playerCharge', { start: 0, end: 3 }),
            frameRate: 9,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'playerChargeAttackUp',
            frames: this.scene.anims.generateFrameNumbers('playerCharge', { start: 4, end: 7 }),
            frameRate: 9,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'playerChargeAttackLeft',
            frames: this.scene.anims.generateFrameNumbers('playerCharge', { start: 8, end: 11 }),
            frameRate: 9,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'playerChargeAttackRight',
            frames: this.scene.anims.generateFrameNumbers('playerCharge', { start: 12, end: 15 }),
            frameRate: 9,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'playerFalling',
            frames: this.scene.anims.generateFrameNumbers('playerFall', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 0
        });
        
    }
    
    
    Update(_father){
        if(!_father.atkCharged)
            {
                this.body.x = _father.body.x + this.defaultMargin.x + this.extraMargin.x;
                this.body.y = _father.body.y + this.defaultMargin.y + this.extraMargin.y;
            }
        else if(_father.atkCharged)
            {
                this.body.x = _father.body.x + this.atkMargin.x + this.extraMargin.x;
                this.body.y = _father.body.y + this.atkMargin.y + this.extraMargin.y;
            }
        
        this.anims.play(_father.currentAnim, true);
    }
    
}
