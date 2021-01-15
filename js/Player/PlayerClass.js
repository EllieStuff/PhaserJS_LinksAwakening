
//TODO: Averiguar prq collons no detecta quan surt de la fckng colisio de les escales

class PlayerPrefab extends Phaser.GameObjects.Sprite{
    
    constructor(scene, positionX, positionY)
    {
		super(scene, positionX, positionY, 'hitbox');
		scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.events.on('update', this.Update, this);
        this.setOrigin(0.5).setScale(1);
        this.setDepth(scene.DrawDepths.PLAYER);
        //this.hitbox = this.physics.add.sprite(config.width/2,config.height/2,'hitbox').setOrigin(0.5).setScale(1);
        
        this.Directions = this.scene.Directions;
        this.currPhysics = this.scene.PhysicTypes.TOP_DOWN_VIEW;
        this.moveDir = this.Directions.DOWN;
        
        this.maxHearts = 3;
        this.health = this.maxHearts*4;
        this.setOrigin(0.5,0).setScale(1);
        this.initDefense = this.defense = 1;
        this.initAttack = this.attack = 1;
        this.initSpeed = this.speed = 1;
        this.rupies = 0;
        this.assignA = "Sword";
        this.assignB = "Shield";
        this.isJumping = false;
        this.overlapsWithLadder = this.onLadders = false;
        this.atkCharged = false;
        this.defPowerUpBuffer = 0;
        this.atkPowerUpBuffer = 0;
        //this.nave.anims.play('stand');
        //this.anims.play('standEnemy');
        //this.checkWorldBounds = true;
        //this.outOfBoundsKill = true;
        this.hasMasterKey = false;
        this.keyAmmount = 0;
        this.shieldUp = false;
        this.shieldDir = this.moveDir;
        this.currentAnim = 'walkdown';
        this.gravity = 10;
        this.falling = false;
        this.lastSavePosition = new Phaser.Math.Vector2(positionX, positionY)
        this.mustRefreshSavePos = true;
        
        this.animator = new PlayerAnimator(scene, positionX, positionY);
        
        this.ladderColManager = new CollisionManager(scene);
        //this.voidsColManager = new CollisionManager(scene);
        
        this.InitCollisions();
        
    }
    
    InitCollisions(){
        this.scene.physics.add.collider(this, this.scene.walls);
        this.scene.physics.add.collider(this, this.scene.platWalls);
        this.scene.physics.add.collider(this, this.scene.platFloor);
        this.scene.physics.add.overlap(this, this.scene.voids, this.Fall, null, this);
        
    }
    
    
    Fall(){
        //this.voidsColManager.UpdateOnTrigger()
        
        /*if(!this.falling && !this.isJumping){
            this.falling = true
            this.active = false
            this.body.stop()
            this.GetDamaged(2)
            this.currentAnim = "playerFalling"
            
            this.scene.time.addEvent({delay: 500, callback: this.RespawnAfterFalling, callbackScope: this, repeat: 0});
            
        }*/
        
    }
    
    RespawnAfterFalling(){
        this.falling = false; 
        this.active = true; 
        
        if(this.health > 0){
            this.SetIdleAnim();
            this.x = this.lastSavePosition.x
            this.y = this.lastSavePosition.y
        }
        else{
            //ToDo: Fer animació i respawn de mort
            
        }
    }
    
    RefreshLastSavePos(){
        if(this.mustRefreshSavePos && !this.falling){
            this.mustRefreshSavePos = false
            this.lastSavePosition = new Phaser.Math.Vector2(this.x, this.y)
            
            this.scene.time.addEvent({delay: 1000, callback: function(){ this.mustRefreshSavePos = true; }, callbackScope: this, repeat: 0});
        }
    }
    
    GetDamaged(_dmgTaken)
    {
        if(!this.isJumping){
            this.health -= _dmgTaken/this.defense;
            this.RefreshPowerUpBuffers();
            console.log("Player Health: " + this.health);
            
            //Add death      
        }
        
    }
    
    AddMaxHeart()
    {
        this.maxHearts++;
        this.health = this.maxHearts * 4;
    }
    
    Heal()
    {
        this.health+=4;
        if(this.health > this.maxHearts*4)
            this.health = this.maxHearts * 4;
    }
    
    RefreshPowerUpBuffers(){
        if(this.defPowerUpBuffer > 0){
            this.defPowerUpBuffer--;
        } 
        else{
            this.defense = this.initDefense;
        }
            
        if(this.atkPowerUpBuffer > 0){
            this.atkPowerUpBuffer--;
        } 
        else{
            this.attack = this.initAttack;
            this.speed = this.initSpeed;
        }
    }
    
    IsMoving(){
        var v = this.body.velocity;
        
        return v.x > 1 || v.x < -1 || v.y > 1 || v.y < -1;
    }
    
    MoveOnLadders(){
        if(!this.onLadders && this.scene.inputs.GetAnyKey() && !this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.K)){
            this.onLadders = true;
            this.onFloor = this.isJumping = false;
            
        }
        
        if(this.onLadders){
            if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.A))
            {
                this.onLadders = true;
                this.currentAnim = 'walkupS';
                this.body.velocity.x = -64;
            }
            else if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.D))
            {
                this.onLadders = true;
                this.currentAnim = 'walkupS';
                this.moveDir = this.Directions.RIGHT;
                this.body.velocity.x = 64;
            }
            else
            {
                this.body.velocity.x = 0;
            }

            if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.S))
            {
                this.onLadders = true;
                this.currentAnim = 'walkupS';
                //this.moveDir = this.Directions.DOWN;
                this.body.velocity.y = 64;
            }
            else if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.W))
            {
                this.onLadders = true;
                this.currentAnim = 'walkupS';
                //this.moveDir = this.Directions.UP;
                this.body.velocity.y = -64;
            }
            else
            {
                this.body.velocity.y = 0;
            }
        }
        
    }
    
    SetShieldHitbox()
    {
        
        
        switch(this.moveDir)
        {
            case this.Directions.LEFT:
                this.hitboxB = this.scene.physics.add.sprite(this.body.x + 2,this.body.y,'hitboxShield').setOrigin(0.5).setScale(1);
                break;

            case this.Directions.RIGHT:
                this.hitboxB = this.scene.physics.add.sprite(this.body.x + 6,this.body.y,'hitboxShield').setOrigin(0.5).setScale(1);
                break;

            case this.Directions.DOWN:
                this.hitboxB = this.scene.physics.add.sprite(this.body.x + 4,this.body.y + 2,'hitboxShield').setOrigin(0.5).setScale(1);
                break;

            case this.Directions.UP:

                this.hitboxB = this.scene.physics.add.sprite(this.body.x + 4,this.body.y - 2,'hitboxShield').setOrigin(0.5).setScale(1);
                break;

            default:
                break;

        } 
        this.hitboxB.destroy();
        
    }
    
    
    SetIdleAnim()
    {
        switch(this.moveDir){
            case this.Directions.LEFT:
                this.currentAnim = 'playerIdleLeft';
                break;

            case this.Directions.RIGHT:
                this.currentAnim = 'playerIdleRight';
                break;

            case this.Directions.DOWN:
                this.currentAnim = 'playerIdleDown';
                break;

            case this.Directions.UP:
                this.currentAnim = 'playerIdleUp';
                break;

            default:
                break;

        } 
        
    }
    SetIdleAnimS()
    {
        switch(this.moveDir){
            case this.Directions.LEFT:
                this.currentAnim = 'walkleftSidle';
                break;

            case this.Directions.RIGHT:
                this.currentAnim = 'walkrightSidle';
                break;

            case this.Directions.DOWN:
                this.currentAnim = 'walkdownSidle';
                break;

            case this.Directions.UP:
                this.currentAnim = 'walkupSidle';
                break;

            default:
                break;

        } 
        
    }
    SetIdleAnimSUP()
    {
        switch(this.moveDir){
            case this.Directions.LEFT:
                this.currentAnim = 'shieldLeftI';
                break;

            case this.Directions.RIGHT:
                this.currentAnim = 'shieldRightI';
                break;

            case this.Directions.DOWN:
                this.currentAnim = 'shieldDownI';
                break;

            case this.Directions.UP:
                this.currentAnim = 'shieldUpI';
                break;

            default:
                break;

        } 
        
    }
    
    Jump(){
        //this.animator.anims.setTimeScale(0.5);
        this.animator.extraMargin.y = -12;
        switch(this.moveDir){
            case this.Directions.LEFT:
                this.currentAnim = 'playerJumpLeft';
                break;

            case this.Directions.RIGHT:
                this.currentAnim = 'playerJumpRight';
                break;

            case this.Directions.DOWN:
                this.currentAnim = 'playerJumpDown';
                break;

            case this.Directions.UP:
                this.currentAnim = 'playerJumpUp';
                break;

            default:
                break;

        }

        this.scene.time.addEvent({delay: 370, callback: function(){this.isJumping = false; this.animator.extraMargin.y = 0; this.SetIdleAnim();}, callbackScope: this, repeat: 0});
        
    }
    
    Attack()
    {
        //this.animator.anims.setTimeScale(0.5);
        switch(this.moveDir){
            case this.Directions.LEFT:
                this.currentAnim = 'playerAttackLeft';
                this.hitboxA = this.scene.physics.add.sprite(this.body.x - 4,this.body.y - 8,'hitboxAttack').setOrigin(0.5).setScale(1);
                break;

            case this.Directions.RIGHT:
                this.currentAnim = 'playerAttackRight';
                this.hitboxA = this.scene.physics.add.sprite(this.body.x + 12,this.body.y - 8,'hitboxAttack').setOrigin(0.5).setScale(1);
                break;

            case this.Directions.DOWN:
                this.currentAnim = 'playerAttackDown';
                this.hitboxA = this.scene.physics.add.sprite(this.body.x - 4,this.body.y + 8,'hitboxAttack').setOrigin(0.5).setScale(1);
                break;

            case this.Directions.UP:
                this.currentAnim = 'playerAttackUp';
                this.hitboxA = this.scene.physics.add.sprite(this.body.x + 12,this.body.y - 8,'hitboxAttack').setOrigin(0.5).setScale(1);
                break;

            default:
                break;
        }
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.scene.time.addEvent({delay: 250, callback: function(){this.atkCharged = false;this.hitboxA.destroy();}, callbackScope: this, repeat: 0});
            
    }
    
    PlatformerJump(){
        this.isJumping = true;
        this.onFloor = this.onLadders = false;
        //this.body.velocity.y = 0;
        this.body.velocity.y = -200;
        switch(this.moveDir){
            case this.Directions.LEFT:
                this.currentAnim = 'playerPlatformerJumpLeft';
                break;

            case this.Directions.RIGHT:
                this.currentAnim = 'playerPlatformerJumpRight';
                break;

            default:
                break;

        }

        //this.scene.time.addEvent({delay: 370, callback: function(){this.isJumping = false; this.animator.extraMargin.y = 0; this.SetIdleAnim();}, callbackScope: this, repeat: 0});
        
    }
    
    
    
    Update()
    {
        if(this.active){
            switch(this.currPhysics)
            {
                case this.scene.PhysicTypes.TOP_DOWN_VIEW:
                    this.TopDownUpdate();
                    break;

                case this.scene.PhysicTypes.FRONT_VIEW:
                    this.FrontViewUpdate();
                    break;


                default:
                    console.log("something went wrong");
                    break;
            }
        }
        
    }
    
    TopDownUpdate(){
        //Decides respawns position in case of falling
        this.RefreshLastSavePos()
        
        //Jump
        if(this.assignA == "Jump" && !this.isJumping)
            {
                if(this.scene.inputs.GetKeyDown(this.scene.inputs.KeyCodes.K))
                {
                    console.log("in");
                    this.isJumping = true;
                    this.Jump();
            
                }
            }
        
        //MOVEMENT
        if(!this.isJumping)
        {
            
            if(this.assignA == "Sword")
            {
                if(this.scene.inputs.GetKeyDown(this.scene.inputs.KeyCodes.K))
                {
                    console.log("in");
                    this.Attack();
                    this.atkCharged = true;
                }
                else if(this.scene.inputs.GetKeyUp(this.scene.inputs.KeyCodes.K))
                {
                    
                }
            }
            if(!this.atkCharged)
            {
                if(this.assignB == "Shield")
                {
                    if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.L))   //MOVE WITH SHIELD UP
                    {
                        this.shieldUp = true;

                        if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.A))
                        {
                            this.currentAnim = 'shieldLeft';
                            this.moveDir = this.Directions.LEFT;
                            this.body.velocity.x = -64;
                        }
                        else if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.D))
                        {
                            this.currentAnim = 'shieldRight';
                            this.moveDir = this.Directions.RIGHT;
                            this.body.velocity.x = 64;
                        }
                        else
                        {
                            this.body.velocity.x = 0;
                        }

                        if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.S))
                        {
                            this.currentAnim = 'shieldDown';
                            this.moveDir = this.Directions.DOWN;
                            this.body.velocity.y = 64;
                        }
                        else if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.W))
                        {
                            this.currentAnim = 'shieldUp';
                            this.moveDir = this.Directions.UP;
                            this.body.velocity.y = -64;
                        }
                        else
                        {
                            this.body.velocity.y = 0;
                        }
                        if(!this.IsMoving())
                            this.SetIdleAnimSUP();
                        
                        this.SetShieldHitbox();
                    }
                    else                            //MOVE WITH SHIELD DOWN
                    {

                        this.shieldUp = false;

                        if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.A))
                        {
                            this.currentAnim = 'walkleftS';
                            this.moveDir = this.Directions.LEFT;
                            this.body.velocity.x = -64;
                        }
                        else if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.D))
                        {
                            this.currentAnim = 'walkrightS';
                            this.moveDir = this.Directions.RIGHT;
                            this.body.velocity.x = 64;
                        }
                        else
                        {
                            this.body.velocity.x = 0;
                        }

                        if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.S))
                        {
                            this.currentAnim = 'walkdownS';
                            this.moveDir = this.Directions.DOWN;
                            this.body.velocity.y = 64;

                        }
                        else if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.W))
                        {
                            this.currentAnim = 'walkupS';
                            this.moveDir = this.Directions.UP;
                            this.body.velocity.y = -64;
                        }
                        else
                        {
                            this.body.velocity.y = 0;
                           
                        }
                        if(!this.IsMoving())
                            this.SetIdleAnimS();
                         
                    }
                    
                }
                if(this.assignA != "Shield" && this.assignB != "Shield")
                {
                    if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.A))
                    {
                        this.currentAnim = 'walkleft';
                         this.moveDir = this.Directions.LEFT;
                         this.body.velocity.x = -64;
                    }
                    else if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.D))
                    {
                        this.currentAnim = 'walkright';
                        this.moveDir = this.Directions.RIGHT;
                        this.body.velocity.x = 64;
                    }
                    else
                    {
                        this.body.velocity.x = 0;
                    }
                    if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.S))
                    {
                        this.currentAnim = 'walkdown';
                        this.moveDir = this.Directions.DOWN;
                        this.body.velocity.y = 64;
                    }
                    else if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.W))
                    {
                        this.currentAnim = 'walkup';
                        this.moveDir = this.Directions.UP;
                        this.body.velocity.y = -64;
                    }
                    else
                    {
                        this.body.velocity.y = 0;
                    }
                    if (!this.IsMoving())
                        this.SetIdleAnim();
                }
            }
        }
        //Update Animator
        this.animator.Update(this);
        
        
        ////
        
        //ATTACK
        
    }
    
    AddGravity(){
        this.body.velocity.y += this.gravity;
        
    }
    
    FrontViewUpdate(){
        if(this.overlapsWithLadder)
        {
            this.MoveOnLadders();
        }
        if(this.body.onFloor()){
            this.onFloor = true;
        }
        if(!this.onLadders && !this.body.onFloor())
        {
            this.AddGravity();
        }
        
        //Jump
        if(this.scene.inputs.GetKeyDown(this.scene.inputs.KeyCodes.K) && (this.onFloor || this.onLadders))
        {
            this.PlatformerJump();
        }
        
        //MOVEMENT
        if(this.onFloor && !this.onLadders){
            if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.L))   //MOVE WITH SHIELD UP
            {
                this.shieldUp = true;

                if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.A))
                {
                    this.currentAnim = 'shieldLeft';
                    this.moveDir = this.Directions.LEFT;
                    this.body.velocity.x = -64;
                }
                else if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.D))
                {
                    this.currentAnim = 'shieldRight';
                    this.moveDir = this.Directions.RIGHT;
                    this.body.velocity.x = 64;
                }
                else
                {
                    this.body.velocity.x = 0;
                }
            }
            else                            //MOVE WITH SHIELD DOWN
            {
                this.shieldUp = false;

                if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.A))
                {
                    this.currentAnim = 'walkleftS';
                    this.moveDir = this.Directions.LEFT;
                    this.body.velocity.x = -64;
                }
                else if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.D))
                {
                    this.currentAnim = 'walkrightS';
                    this.moveDir = this.Directions.RIGHT;
                    this.body.velocity.x = 64;
                }
                else
                {
                    this.body.velocity.x = 0;
                }
            }
            
            //Decide Idle anim if necessary
            if(!this.IsMoving())
                this.SetIdleAnim();
        }
        
        //Update Animator
        this.animator.Update(this);
    }
    
    
    
}


