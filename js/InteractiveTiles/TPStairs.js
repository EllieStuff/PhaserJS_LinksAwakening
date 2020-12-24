
/*
class TPStairsSet{
    constructor(scene, posX_1, posY_1, posX_2, posY_2)
    {
        this.stairs1 = new TPStairPrefab(scene, posX_1, posY_1);
        this.stairs2 = new TPStairPrefab(scene, posX_2, posY_2);
        
        this.InitCollisions();
        
    }
    
    InitCollisions(){
        this.scene.physics.add.collider(this.stairs1, this.scene.player, function(){}, null, this);
    }
    
    
    Activate(){
        this.active = this.visible = true;
    }
    
    Deactivate(){
        this.active = this.visible = false;
    }
    
}
*/

class TPStairsPair{
    constructor(scene, pos1x, pos1y, pos2x, pos2y){
        this.tpStair1 = new TPStairPrefab(scene, pos1x, pos1y, scene.PhysicTypes.TOP_DOWN_VIEW);
        this.tpStair2 = new TPStairPrefab(scene, pos2x, pos2y, scene.PhysicTypes.FRONT_VIEW);
        
        this.tpStair1.PairWith(this.tpStair2); this.tpStair2.PairWith(this.tpStair1);

        scene.events.on('update', this.Update, this);
    }
    
    Update(){
        if(!this.tpStair2.tpStairs.available){
            this.tpStair1.available = false;
            this.tpStair2.tpStairs.available = true;
        }
        else if(!this.tpStair1.tpStairs.available){
            this.tpStair2.available = false;
            this.tpStair1.tpStairs.available = true;
        }
    }
    
}

//Nota: Recordar aparellar escala
class TPStairPrefab extends Phaser.GameObjects.Sprite{
    constructor(scene, thisPosX, thisPosY, physicsToUse)
    {
		super(scene, thisPosX, thisPosY, 'tpStairs');
		scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0.5,0).setScale(1);
        this.setDepth(scene.DrawDepths.INTERACTIVE_TILES);
        //this.body.setImmovable(true);
        
        this.stairsPos = new Phaser.Math.Vector2(thisPosX, thisPosY);
        this.physicsToUse = physicsToUse;
        if(this.physicsToUse == this.scene.PhysicTypes.FRONT_VIEW)
            this.visible = false;
        
        this.colManager = new CollisionManager(scene);
        this.available = true;
        
        this.CreateAnims();
        this.InitCollisions();
        
    }
    
    InitCollisions(){
        this.scene.physics.add.overlap(this, this.scene.player, this.Trigger, null, this);
    }
    
    PairWith(tpStairs){
        this.tpStairs = tpStairs;
    }
    
    CreateAnims(){}
    
    Trigger(){
        if(this.active){
            this.colManager.UpdateOnTrigger();
            
            var minDist = Utils.GetDiagonal(this) + Utils.GetDiagonal(this.scene.player);
            console.log("Min dist " + minDist);
            console.log("Curr dist " + this.stairsPos.distance(this.scene.player.body));
            if(!this.available && this.colManager.GetCollisionState() == this.colManager.CollisionState.EXIT_COLLISION
              //&& this.stairsPos.distance(this.scene.player.body) >= minDist
              ){
                this.available = true;
            }
            else{
                console.log(this.colManager.GetCollisionState());
            }
            
            console.log(this.available);
            if(this.available && this.colManager.ObjectOverlappingInside(this, this.scene.player)){
                this.scene.player.body.x = this.tpStairs.body.x;
                this.scene.player.body.y = this.tpStairs.body.y;
                this.scene.player.currPhysics = this.tpStairs.physicsToUse;
                //this.tpStairs.colManager.colState = this.colManager.CollisionState.COLLIDING;
                this.tpStairs.available = false;
            }
        }
    }
    
    
}