class HudManager extends Phaser.GameObjects.Sprite{
    
    constructor(scene, bgPosX, bgPosY)
    {
		super(scene, bgPosX, bgPosY, 'bgHUD');
        this.setDepth(5);
        this.setOrigin(0);
        scene.add.existing(this);
        this.rupieImg = scene.add.image(bgPosX + config.width/2, bgPosY, 'rupieHUD').setOrigin(0).setDepth(5);
        this.centDigit = scene.add.sprite(bgPosX + config.width/2, bgPosY + 8, 'numbersUI').setOrigin(0).setDepth(5);
        this.decimalDigit = scene.add.sprite(bgPosX + config.width/2 + 8, bgPosY + 8, 'numbersUI').setOrigin(0).setDepth(5);
        this.unitDigit = scene.add.sprite(bgPosX + config.width/2 + (8*2), bgPosY + 8, 'numbersUI').setOrigin(0).setDepth(5);
        this.hearts = [scene.add.sprite(bgPosX + config.width/2 + (8*3), bgPosY, 'heartsUI').setOrigin(0).setDepth(5), 
                       scene.add.sprite(bgPosX + config.width/2 + (8*4), bgPosY, 'heartsUI').setOrigin(0).setDepth(5), 
                       scene.add.sprite(bgPosX + config.width/2 + (8*5), bgPosY, 'heartsUI').setOrigin(0).setDepth(5), 
                       scene.add.sprite(bgPosX + config.width/2 + (8*6), bgPosY, 'heartsUI').setOrigin(0).setDepth(5),
                       scene.add.sprite(bgPosX + config.width/2 + (8*7), bgPosY, 'heartsUI').setOrigin(0).setDepth(5),
                       scene.add.sprite(bgPosX + config.width/2 + (8*8), bgPosY, 'heartsUI').setOrigin(0).setDepth(5),
                       scene.add.sprite(bgPosX + config.width/2 + (8*9), bgPosY, 'heartsUI').setOrigin(0).setDepth(5),
                       scene.add.sprite(bgPosX + config.width/2 + (8*3), bgPosY + 8, 'heartsUI').setOrigin(0).setDepth(5),
                       scene.add.sprite(bgPosX + config.width/2 + (8*4), bgPosY + 8, 'heartsUI').setOrigin(0).setDepth(5),
                       scene.add.sprite(bgPosX + config.width/2 + (8*5), bgPosY + 8, 'heartsUI').setOrigin(0).setDepth(5),
                       scene.add.sprite(bgPosX + config.width/2 + (8*6), bgPosY + 8, 'heartsUI').setOrigin(0).setDepth(5),
                       scene.add.sprite(bgPosX + config.width/2 + (8*7), bgPosY + 8, 'heartsUI').setOrigin(0).setDepth(5),
                       scene.add.sprite(bgPosX + config.width/2 + (8*8), bgPosY + 8, 'heartsUI').setOrigin(0).setDepth(5),
                       scene.add.sprite(bgPosX + config.width/2 + (8*9), bgPosY + 8, 'heartsUI').setOrigin(0).setDepth(5)];
    }
    
    setMaxHearts(maxHearts){
        var maxI = maxHearts;
        if(maxI > this.hearts.length)
            maxI = this.hearts.length;
        
        for(var i = 0; i < maxI; i++)
            {
                this.hearts[i].setFrame(3);
            }
    }
    
    setHearts(health){
        
    }
}