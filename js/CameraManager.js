class CameraManager extends Phaser.GameObjects.Sprite
{
    
    constructor(_scene)
    {
        _scene.events.on('update', this.Update, this);
        
        this.TileX = 3;
        this.TileY = 5;
        
        this._scene.cameras.main.setBounds(0, 0, this.scene.width, this.scene.height);
        this.camPosX = 160 * TileX;
        this.camPosY = 128 * TileY;
        this._scene.cameras.main.centerOn(this.camPosX + this.scene.width/2,this.camPosY + this.scene.height/2);
        
    }
    
    
    
    GenerateEnemies()
    {
        this.scene.enemies.clear();
        
        //Comprobar sala, generar nuevos enemigos
    }
    
    
    Update()
    {
        if(this.scene.player.body.position.x < this.camPosX)
        {
            this.camPosX -= 160;
            this.scene.cameras.main.centerOn(this.camPosX + this.scene.width/2,this.camPosY + this.scene.height/2);
            this.TileX--;
            this.GenerateEnemies();
        }
        else if(this.scene.player.body.position.x > this.camPosX + 160)
        {
           this.camPosX += 160;
           this.scene.cameras.main.centerOn(this.camPosX + this.scene.width/2,this.camPosY + this.scene.height/2);
            this.TileX++;
            this.GenerateEnemies();
        }
        else if(this.scene.player.body.position.y < this.camPosY)
        {
            this.camPosY -= 128;
            this.scene.cameras.main.centerOn(this.camPosX + this.scene.width/2,this.camPosY + this.scene.height/2);
            this.TileY--;
            this.GenerateEnemies();
        }
        else if(this.scene.player.body.position.y > this.camPosY + 128)
        {
            this.camPosY += 128;
            this.scene.cameras.main.centerOn(this.camPosX + this.scene.width/2,this.camPosY + this.scene.height/2);
            this.TileY++;
            this.GenerateEnemies();
        }   
    }
    
}