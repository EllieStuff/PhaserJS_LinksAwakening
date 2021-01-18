class HudManager extends Phaser.GameObjects.Sprite{
    
    constructor(scene, bgPosX, bgPosY){
		super(scene, bgPosX, bgPosY, 'bgHUD');
        this.setDepth(5);
        this.setOrigin(0);
        scene.add.existing(this);
        this.objectA = scene.add.sprite(bgPosX + 48,bgPosY,'ObjectHUD').setOrigin(0).setDepth(5);
        this.objectB = scene.add.sprite(bgPosX + 8,bgPosY,'ObjectHUD').setOrigin(0).setDepth(5);
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
        this.maxHearts = 0;
    }
    
    movePosition(bgPosX, bgPosY){
        this.setPosition(bgPosX,bgPosY);
        this.objectB.setPosition(bgPosX + 8,bgPosY);
        this.objectA.setPosition(bgPosX + 48,bgPosY);
        this.rupieImg.setPosition(bgPosX + config.width/2, bgPosY);
        this.centDigit.setPosition(bgPosX + config.width/2, bgPosY + 8);
        this.decimalDigit.setPosition(bgPosX + config.width/2 + 8, bgPosY + 8);
        this.unitDigit.setPosition(bgPosX + config.width/2 + (8*2), bgPosY + 8);
        this.hearts[0].setPosition(bgPosX + config.width/2 + (8*3), bgPosY);
        this.hearts[1].setPosition(bgPosX + config.width/2 + (8*4), bgPosY);
        this.hearts[2].setPosition(bgPosX + config.width/2 + (8*5), bgPosY);
        this.hearts[3].setPosition(bgPosX + config.width/2 + (8*6), bgPosY);
        this.hearts[4].setPosition(bgPosX + config.width/2 + (8*7), bgPosY);
        this.hearts[5].setPosition(bgPosX + config.width/2 + (8*8), bgPosY);
        this.hearts[6].setPosition(bgPosX + config.width/2 + (8*9), bgPosY);
        this.hearts[7].setPosition(bgPosX + config.width/2 + (8*3), bgPosY + 8);
        this.hearts[8].setPosition(bgPosX + config.width/2 + (8*4), bgPosY + 8);
        this.hearts[9].setPosition(bgPosX + config.width/2 + (8*5), bgPosY + 8);
        this.hearts[10].setPosition(bgPosX + config.width/2 + (8*6), bgPosY + 8);
        this.hearts[11].setPosition(bgPosX + config.width/2 + (8*7), bgPosY + 8);
        this.hearts[12].setPosition(bgPosX + config.width/2 + (8*8), bgPosY + 8);
        this.hearts[13].setPosition(bgPosX + config.width/2 + (8*9), bgPosY + 8);
    }
    
    setObjects(objectA, objectB){
        
        switch(objectA){
            case "Espada":
                this.objectA.setFrame(0);
                break;
            case "Escudo":
                this.objectA.setFrame(1);
                break;
            case "Pluma":
                this.objectA.setFrame(2);
                break;
        }
        
        switch(objectB){
            case "Espada":
                this.objectB.setFrame(0);
                break;
            case "Escudo":
                this.objectB.setFrame(1);
                break;
            case "Pluma":
                this.objectB.setFrame(2);
                break;
        }
    }
    
    setMaxHearts(maxHearts){
        var maxI = maxHearts;
        if(maxI > this.hearts.length)
            maxI = this.hearts.length;
        
        for(var i = 0; i < maxI; i++)
            {
                this.hearts[i].setFrame(3);
            }
        this.maxHearts = maxI;
    }
    
    setHearts(health){
        if(!(health/2 > this.maxHearts))
        {
            if((health/2) < this.maxHearts)
            {
                for(var i = (health/2); i < this.maxHearts; i++)
                {
                    if(i%2 != 0 && i%2 != 1)
                        this.hearts[i-0.5].setFrame(1);
                    else
                        this.hearts[i].setFrame(1);
                }
            }
            if(health%2 != 0)
            {
                this.hearts[((health/2) - 0.5)].setFrame(2);
            }
        }
    }
    
    setRupies(rupies){
        var units = rupies%10;
        var decimals = ((rupies-units)/10)%10;
        var centimals = ((rupies-(units+(decimals*10)))/100)%10;
        this.unitDigit.setFrame(units);
        this.decimalDigit.setFrame(decimals);
        this.centDigit.setFrame(centimals);
    }
    
}