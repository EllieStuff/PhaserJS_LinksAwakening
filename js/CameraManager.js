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
            
        this.GenerateEnemies();
        
    }
    
    
    
    GenerateEnemies()
    {
        
        //this.newEnemy = new HardHatPrefab(this.scene, 160 * 2 + 48 + 8 , 128 * 5 + 32);
        //this.newEnemy = new HardHatPrefab(this.scene, 160 * 2 + 96 + 8 , 128 * 5 + 32);
        this.scene.enemies.add(new HardHatPrefab(this.scene, 160 * 2 + 48 + 8 , 128 * 5 + 32));
        this.scene.enemies.add(new HardHatPrefab(this.scene, 160 * 2 + 96 + 8 , 128 * 5 + 32));
        
        this.scene.enemies.add(new GreenZolPrefab(this.scene, 160 * 1 + 32 + 8 , 128 * 5 + 48));
        this.scene.enemies.add(new GreenZolPrefab(this.scene, 160 * 1 + 32 + 8 , 128 * 5 + 64));
        this.scene.enemies.add(new GreenZolPrefab(this.scene, 160 * 1 + 64 + 8 , 128 * 5 + 48));
        this.scene.enemies.add(new GreenZolPrefab(this.scene, 160 * 1 + 64 + 8 , 128 * 5 + 64));
        
        this.scene.enemies.add(new RedZolPrefab(this.scene, 160 * 3 + 32 + 8 , 128 * 4 + 80));
        this.scene.enemies.add(new RedZolPrefab(this.scene, 160 * 3 + 112 + 8 , 128 * 4 + 80));
        this.scene.enemies.add(new HardHatPrefab(this.scene, 160 * 3 + 64 + 8 , 128 * 4 + 16));
        
        this.scene.enemies.add(new BatPrefab(this.scene, 160 * 4 + 64 + 8 , 128 * 4 + 80));
        this.scene.enemies.add(new BatPrefab(this.scene, 160 * 4 + 80 + 8 , 128 * 4 + 80));
        this.scene.enemies.add(new SkeletonPrefab(this.scene, 160 * 4 + 48 + 8 , 128 * 4 + 64));
        this.scene.enemies.add(new SkeletonPrefab(this.scene, 160 * 4 + 96 + 8 , 128 * 4 + 64));
        
        this.scene.enemies.add(new BatPrefab(this.scene, 160 * 2 + 64 + 8 , 128 * 4 + 48));
        this.scene.enemies.add(new BatPrefab(this.scene, 160 * 2 + 80 + 8 , 128 * 4 + 48));
        this.scene.enemies.add(new BatPrefab(this.scene, 160 * 2 + 64 + 8 , 128 * 4 + 64));
        this.scene.enemies.add(new BatPrefab(this.scene, 160 * 2 + 80 + 8 , 128 * 4 + 64));
        
        this.scene.enemies.add(new miniMoldormPrefab(this.scene, 160 * 2 + 64 + 8 , 128 * 3 + 32));
        
        this.scene.enemies.add(new miniMoldormPrefab(this.scene, 160 * 3 + 80 + 8 , 128 * 3 + 48));
        this.scene.enemies.add(new SparkPrefab(this.scene, 160 * 3 + 64 + 8 , 128 * 3 + 16 + 8));
        this.scene.enemies.add(new SparkPrefab(this.scene, 160 * 3 + 112 + 8 , 128 * 3 + 96 + 8));
        
        this.scene.enemies.add(new BatPrefab(this.scene, 160 * 2 + 80 + 8 , 128 * 2 + 64));
        this.scene.enemies.add(new BladePrefab(this.scene, 160 * 2 + 16 + 8 , 128 * 2 + 32));
        
        this.scene.enemies.add(new SparkPrefab(this.scene, 160 * 2 + 64 + 8 , 128 * 1 + 16 + 8));
        
        this.scene.enemies.add(new SparkPrefab(this.scene, 160 * 3 + 48 + 8 , 128 * 1 + 16 + 8));
        this.scene.enemies.add(new SparkPrefab(this.scene, 160 * 3 + 96 + 8 , 128 * 1 + 96 + 8));
        this.scene.enemies.add(new RedZolPrefab(this.scene, 160 * 3 + 80 + 8 , 128 * 1 + 16));
        this.scene.enemies.add(new RedZolPrefab(this.scene, 160 * 3 + 48 + 8 , 128 * 1 + 48));
        
        //this.scene.enemies.add(new SpikedPrefab(this.scene, 160 * 1 + 32 + 8 , 128 * 1 + 48 + 8));
        //this.scene.enemies.add(new SpikedPrefab(this.scene, 160 * 1 + 80 + 8 , 128 * 1 + 80 + 8));
        
        this.scene.enemies.add(new GoombaPrefab(this.scene, 160 * 1 + 32 + 8 , 128 * 0 + 48 + 8));
        this.scene.enemies.add(new GoombaPrefab(this.scene, 160 * 1 + 80 + 8 , 128 * 0 + 48 + 8));
        
        this.scene.enemies.add(new GoombaPrefab(this.scene, 160 * 0 + 90 + 8 , 128 * 0 + 80));
        
        this.scene.enemies.add(new BladePrefab(this.scene, 160 * 0 + 16 + 8 , 128 * 2 + 80));
        this.scene.enemies.add(new BladePrefab(this.scene, 160 * 0 + 128 + 8 , 128 * 2 + 80));
        
        this.scene.enemies.add(new BatPrefab(this.scene, 160 * 4 + 96 + 8 , 128 * 3 + 32));
        this.scene.enemies.add(new BatPrefab(this.scene, 160 * 4 + 80 + 8 , 128 * 3 + 48));
        this.scene.enemies.add(new SkeletonPrefab(this.scene, 160 * 4 + 64 + 8 , 128 * 3 + 64));
        
        this.scene.enemies.add(new HardHatPrefab(this.scene, 160 * 4 + 112 + 8 , 128 * 2 + 32));
        
        this.scene.enemies.add(new BatPrefab(this.scene, 160 * 5 + 48 + 8 , 128 * 3 + 32));
        this.scene.enemies.add(new SparkPrefab(this.scene, 160 * 5 + 80 + 8 , 128 * 3 + 80 + 8));
        this.scene.enemies.add(new SparkPrefab(this.scene, 160 * 5 + 112 + 8 , 128 * 3 + 96 + 8));
        
        this.scene.enemies.add(new BladePrefab(this.scene, 160 * 6 + 128 + 8 , 128 * 2 + 16));
        this.scene.enemies.add(new BladePrefab(this.scene, 160 * 6 + 16 + 8 , 128 * 2 + 16));
        this.scene.enemies.add(new BladePrefab(this.scene, 160 * 6 + 128 + 8 , 128 * 2 + 96));
        this.scene.enemies.add(new BladePrefab(this.scene, 160 * 6 + 16 + 8 , 128 * 2 + 96));
        
        this.scene.enemies.add(new MoldormBossPrefab(this.scene, 160 * 6 + 48 , 128 * 1 + 32));
        //this.scene.enemies.children.each(function(){this.destroy();}, this);
        //Comprobar sala, generar nuevos enemigos
    }
    
    
    Update()
    {
        if(this.scene.enemies.size <= 0)
        {
            
        }
        
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
            this.scene.cameras.main.centerOn(this.camPosX + config.width/2, this.camPosY + config.height/2);
            
            this.changeTile = false;
        }
        
    }
    
}