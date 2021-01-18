class EnemyCreation
{
    constructor(posX,posY,_type)
    {
        this.initX = posX;
        this.initY = posY;
        this.type = _type;
    }
}


class CameraManager
{
    
    constructor(_scene)
    {
        this.scene = _scene
        _scene.events.on('update', this.Update, this);
        this.TileX = 3;
        this.TileY = 5;
        
        this.camPosX = 160 * this.TileX;
        this.camPosY = 128 * this.TileY;
        this.changeTile = false;
        this.directionChange = this.scene.Directions;
        
        this.levelEnemies = 
            [
                [new EnemyCreation(50,50,HardHatPrefab)]
            ];
            
        
        
    }
    
    
    
    GenerateEnemies()
    {
        
        this.newEnemy = new this.levelEnemies[0][0].type(this.scene, this.camPosX +this.levelEnemies[0][0].initX, this.camPosY + this.levelEnemies[0][0].initY)
        this.scene.enemies.add(this.newEnemy);     //no quiere hacer clear uwu
       // this.scene.enemies.children.each(function(){this.destroy();}, this);
        //Comprobar sala, generar nuevos enemigos
    }
    
    
    Update()
    {
        
        if(this.changeTile)
        {
            switch(this.directionChange)
            {
               case this.scene.Directions.LEFT:
                    this.camPosX -= 160;
                    this.tileX--;
                break;

            case this.scene.Directions.RIGHT:
                    this.camPosX += 160;
                    this.tileX++;
                break;

            case this.scene.Directions.DOWN:
                    this.camPosY += 128;
                    this.tileY++;
                break;

            case this.scene.Directions.UP:
                    this.camPosY -= 128;
                    this.tileY--;
                break;

            default:
                break;
               
            }
            this.GenerateEnemies();
            this.scene.cameras.main.centerOn(this.camPosX + config.width/2, this.camPosY + config.height/2);
            
            this.changeTile = false;
        }
    }
    
}