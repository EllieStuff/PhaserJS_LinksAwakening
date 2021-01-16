class CameraManager
{
    
    constructor(_scene)
    {
        this.scene = _scene
        _scene.events.on('update', this.Update, this);
        _scene.cameras.main.setBounds(0, 0, config.width, config.height);
        
        
        this.TileX = 3;
        this.TileY = 5;
        
        
        this.camPosX = 160 * this.TileX;
        this.camPosY = 128 * this.TileY;
        this.scene.cameras.main
        this.scene.cameras.main.centerOn(this.camPosX + config.width/2, this.camPosY + config.height/2);
        
    }
    
    
    
    GenerateEnemies()
    {
        //this.scene.enemies.clear();
        
        //Comprobar sala, generar nuevos enemigos
    }
    
    
    Update()
    {
        /*
        if(this.scene.player.body.position.x < this.camPosX)
        {
            this.camPosX -= 160;
            this.scene.cameras.main.centerOn(this.camPosX + config.width/2,this.camPosY + config.height/2);
            this.TileX--;
            this.GenerateEnemies();
        }
        else if(this.scene.player.body.position.x > this.camPosX + 160)
        {
           this.camPosX += 160;
           this.scene.cameras.main.centerOn(this.camPosX + config.width/2,this.camPosY + config.height/2);
            this.TileX++;
            this.GenerateEnemies();
        }
        else if(this.scene.player.body.position.y < this.camPosY)
        {
            this.camPosY -= 128;
            this.scene.cameras.main.centerOn(this.camPosX + config.width/2,this.camPosY + config.height/2);
            this.TileY--;
            this.GenerateEnemies();
        }
        else if(this.scene.player.body.position.y > this.camPosY + 128)
        {
            this.camPosY += 128;
            this.scene.cameras.main.centerOn(this.camPosX + config.width/2,this.camPosY + config.height/2);
            this.TileY++;
            this.GenerateEnemies();
        }   
        */
    }
    
}