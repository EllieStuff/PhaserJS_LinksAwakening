class PowerUpAtk extends ItemsBase{
    constructor(scene, positionX, positionY){
        super(scene, positionX, positionY, 'atkPowerUp');
        
        this.anims.play('atkPowerUpAnim');
    }
    
    CreateAnims(){
        this.scene.anims.create({
            key: 'atkPowerUpAnim',
            frames: this.scene.anims.generateFrameNumbers('atkPowerUp', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
    }
    
    StartEffect(){
        this.scene.player.attack = this.scene.player.initAttack * 2;
        this.scene.player.speed = this.scene.player.initSpeed * 1.5;
        this.scene.player.atkPowerUpBuffer = 3;
        
        this.destroy();
    }
    
}

class PowerUpDef extends ItemsBase{
    constructor(scene, positionX, positionY){
        super(scene, positionX, positionY, 'defPowerUp');
        
    }
    
    StartEffect(){
        this.scene.player.defense = this.scene.player.initDefense * 2;
        this.scene.player.defPowerUpBuffer = 3;
        
        this.destroy();
    }
    
    
}


