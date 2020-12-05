

class PlayerAnimator extends Phaser.GameObjects.Sprite{
    constructor(scene, positionX, positionY){
        super(scene, positionX, positionY, 'playerMove');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        //scene.events.on('update', this.Update, this);
        this.setOrigin(0.5).setScale(1);
        
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
    
    
    Update(_father){
        this.body.x = _father.body.x - 4;
        this.body.y = _father.body.y - 8;
        
        this.anims.play(_father.currentAnim, true);
    }
    
}
