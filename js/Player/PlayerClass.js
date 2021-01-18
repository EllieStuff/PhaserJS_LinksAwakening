
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
        
        this.hitboxB = this.scene.physics.add.sprite(this.body.x,this.body.y,'hitboxShield').setOrigin(0.5).setScale(1);
        
        
        this.Directions = this.scene.Directions;
        this.currPhysics = this.scene.PhysicTypes.TOP_DOWN_VIEW;
        this.moveDir = this.Directions.DOWN;
        
        this.maxHearts = 3;
        this.health = this.maxHearts*2;
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
        this.enemiesKilled = 1
        this.beeping = false
        this.canMove = true
        this.isVulnerable = true
        
        
        this.animator = new PlayerAnimator(scene, positionX, positionY);
        this.shield = new PlayerShield(scene);
        this.sword = new PlayerSword(scene);
        
        this.wallsColManager = new CollisionManager(scene);
        this.ladderColManager = new CollisionManager(scene);
        //this.voidsColManager = new CollisionManager(scene);
        
        this.InitCollisions();
        
    }
    
    InitCollisions(){
        this.scene.physics.add.collider(this, this.scene.walls, this.CollideWalls, null, this);
        this.scene.physics.add.collider(this, this.scene.platWalls);
        this.scene.physics.add.collider(this, this.scene.platFloor);
        //this.scene.physics.add.overlap(this, this.scene.voids, this.Fall, null, this);
        
    }
    
    CollideWalls(){
        if(this.active){
            this.wallsColManager.UpdateOnTrigger()
        }
        
    }
    
    SetPushingAnimation(){
        if(this.wallsColManager.GetCollisionState() == this.wallsColManager.CollisionState.COLLIDING){
            if(this.moveDir == this.scene.Directions.DOWN && this.body.blocked.down){
                this.currentAnim = 'pushDown'
            }
            else if(this.moveDir == this.scene.Directions.LEFT && this.body.blocked.left){
                this.currentAnim = 'pushLeft'
            }
            else if(this.moveDir == this.scene.Directions.RIGHT && this.body.blocked.right){
                this.currentAnim = 'pushRight'
            }
            else if(this.moveDir == this.scene.Directions.UP && this.body.blocked.up){
                this.currentAnim = 'pushUp'
            }
        }
        
    }
    
    
    Fall(){
        //this.voidsColManager.UpdateOnTrigger()
        
        if(!this.falling && !this.isJumping){
            this.falling = true
            this.active = false
            this.body.stop()
            this.GetDamaged(2)
            this.currentAnim = "playerFalling"
            this.animator.Update(this);
            this.scene.soundManager.PlayFX('linkFall_FX')
            
            this.scene.time.addEvent({delay: 1500, callback: this.RespawnAfterFalling, callbackScope: this, repeat: 0});
            
        }
        
    }
    
    FallToPlatformerRoom(_roomIdX, _roomIdY){
        if(!this.falling && !this.isJumping){
            this.falling = true
            this.active = false
            this.body.stop()
            this.GetDamaged(2)
            this.currentAnim = "playerFalling"
            this.animator.Update(this);
            this.scene.soundManager.PlayFX('linkFall_FX')
            
            this.scene.time.addEvent({delay: 1500, callback: this.RespawnAfterFallingToPlatformerRoom, callbackScope: this, repeat: 0});
            
        }
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
    
    RespawnAfterFallingToPlatformerRoom(){
        this.falling = false; 
        this.active = true; 
        
        if(this.health > 0){
            this.currPhysics = this.scene.PhysicTypes.FRONT_VIEW;
            
            //ToDo: Respawn a l'habitacio que toqui
            /*this.SetIdleAnim();
            this.x = this.lastSavePosition.x
            this.y = this.lastSavePosition.y*/
        }
        else{
            //ToDo: Fer animació i respawn de mort
            
        }
    }
    
    RefreshLastSavePos(){
        if(this.mustRefreshSavePos && !this.falling && !this.isJumping){
            this.mustRefreshSavePos = false
            this.lastSavePosition = new Phaser.Math.Vector2(this.x, this.y)
            
            this.scene.time.addEvent({delay: 1000, callback: function(){ this.mustRefreshSavePos = true; }, callbackScope: this, repeat: 0});
        }
    }
    
    GetDamaged(_dmgTaken, _enemyX, _enemyY)
    {
        if(!this.isJumping){
            this.health -= _dmgTaken/this.defense;
            this.RefreshPowerUpBuffers();
            if(!this.beeping){
                this.beeping = true
                this.LowHealthBeep()
            }
            this.scene.hudBG.setHearts(this.health);
            //this.scene.soundManager.PlayFX('linkHurt_FX')
            //console.log("Player Health: " + this.health);
            
            // ToDo: Add death      
        }
        
    }
    
    LowHealthBeep(){
        if(this.health <= 4){
            this.scene.soundManager.PlayFX('linkLowHealth_FX')
            this.scene.time.addEvent({delay: 1000, callback: this.LowHealthBeep, callbackScope: this, repeat: 0});
        }
        else{
            this.beeping = false
        }
    }
    
    Die(){
        
        
        this.scene.soundManager.PlayFX('linkDying_FX')
    }
    
    AddMaxHeart()
    {
        this.maxHearts++;
        this.health = this.maxHearts * 2;
        this.scene.hudBG.setMaxHearts(this.maxHearts);
        this.scene.hudBG.setHearts(this.health);
    }
    
    Heal()
    {
        this.health+=2;
        if(this.health > this.maxHearts*2)
            this.health = this.maxHearts * 2;
        this.scene.hudBG.setHearts(this.health);
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
                //this.hitboxB = this.scene.physics.add.sprite(this.body.x + 2,this.body.y,'hitboxShield').setOrigin(0.5).setScale(1);
                this.shield.Update(this.x - 2, this.y)
                break;

            case this.Directions.RIGHT:
                //this.hitboxB = this.scene.physics.add.sprite(this.body.x + 6,this.body.y,'hitboxShield').setOrigin(0.5).setScale(1);
                this.shield.Update(this.x + 6, this.y)
                break;

            case this.Directions.DOWN:
                //this.hitboxB = this.scene.physics.add.sprite(this.body.x + 4,this.body.y + 2,'hitboxShield').setOrigin(0.5).setScale(1);
                this.shield.Update(this.x - 2, this.y + 2)
                break;

            case this.Directions.UP:
                //this.hitboxB = this.scene.physics.add.sprite(this.body.x + 4,this.body.y - 2,'hitboxShield').setOrigin(0.5).setScale(1);
                this.shield.Update(this.x + 2, this.y - 2)
                break;

            default:
                break;

        } 
        //this.hitboxB.destroy();
            
        
        
        //this.hitboxB.destroy();
        
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
        this.isJumping = true;
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
        this.scene.soundManager.PlayFX('linkJump_FX')

        this.scene.time.addEvent({delay: 370, callback: function(){this.isJumping = false; this.animator.extraMargin.y = 0; this.SetIdleAnim();}, callbackScope: this, repeat: 0});
        
    }
    
    Attack()
    {
        //this.animator.anims.setTimeScale(0.5);
        this.sword.Attack()
        
        console.log(this.moveDir)
        switch(this.moveDir){
            case this.Directions.LEFT:
                this.currentAnim = 'playerAttackLeft';
                this.sword.Update(this.x - 4, this.y - 8)
                //this.hitboxA = this.scene.physics.add.sprite(this.body.x - 4,this.body.y - 8,'hitboxAttack').setOrigin(0.5).setScale(1);
                break;

            case this.Directions.RIGHT:
                this.currentAnim = 'playerAttackRight';
                this.sword.Update(this.x + 12, this.y - 8)
                //this.hitboxA = this.scene.physics.add.sprite(this.body.x + 12,this.body.y - 8,'hitboxAttack').setOrigin(0.5).setScale(1);
                break;

            case this.Directions.DOWN:
                this.currentAnim = 'playerAttackDown';
                this.sword.Update(this.body.x - 4, this.y + 8)
                //this.hitboxA = this.scene.physics.add.sprite(this.body.x - 4,this.body.y + 8,'hitboxAttack').setOrigin(0.5).setScale(1);
                break;

            case this.Directions.UP:
                this.currentAnim = 'playerAttackUp';
                this.sword.Update(this.body.x + 12, this.y - 8)
                //this.hitboxA = this.scene.physics.add.sprite(this.body.x + 12,this.body.y - 8,'hitboxAttack').setOrigin(0.5).setScale(1);
                break;

            default:
                console.log("smth went wrong")
                break;
        }
        
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        var rnd = Phaser.Math.Between(1, 4)
        if(rnd == 1) this.scene.soundManager.PlayFX('swordSlash1_FX')
        else if(rnd == 2) this.scene.soundManager.PlayFX('swordSlash2_FX')
        else if(rnd == 3) this.scene.soundManager.PlayFX('swordSlash3_FX')
        else if(rnd == 4) this.scene.soundManager.PlayFX('swordSlash4_FX')
        this.scene.time.addEvent({delay: 250, callback: function(){this.atkCharged = false;this.sword.ChargedAttack;/*ToDo: playAnim*/}, callbackScope: this, repeat: 0});
            
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
        this.scene.soundManager.PlayFX('linkJump_FX')

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
        this.hitboxB.body.x = this.body.x - 2;
        this.hitboxB.body.y = this.body.y - 6;
        //Jump
        if(this.assignA == "Jump" && !this.isJumping)
            {
                if(this.scene.inputs.GetKeyDown(this.scene.inputs.KeyCodes.K))
                {
                    console.log("in");
                    this.Jump();
            
                }
            }
        
        //MOVEMENT
        if(!this.isJumping && this.canMove)
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
                        if(!this.shieldUp){
                            this.shieldUp = true;
                            this.isVulnerable = false;
                            this.shield.Enable()
                            this.scene.soundManager.PlayFX('shield_FX')
                        }

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
                        if(this.shieldUp){
                            this.shieldUp = false;
                            this.isVulnerable = true;
                            this.shield.Disable()
                        }
                        
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
                        
                        this.SetPushingAnimation()
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
                if(!this.shieldUp){
                    this.shieldUp = true;
                    this.isVulnerable = false;
                    this.shield.Enable()
                    this.scene.soundManager.PlayFX('shield_FX')
                }

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
                if(this.shieldUp){
                    this.shieldUp = false;
                    this.isVulnerable = true;
                    this.shield.Disable()
                }

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



class PlayerShield extends Phaser.GameObjects.Sprite{
    
    constructor(scene)
    {
		super(scene, 0, 0, 'hitbox');
		scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0.5).setScale(1);
        this.setDepth(scene.DrawDepths.PLAYER);
        this.enabled = false
        
    }
    
    Enable(){
        if(!this.enabled){
            this.enabled = true
            this.visible = true
            this.active = true
        }
    }
    
    Disable(){
        if(this.enabled){
            this.active = false
            this.visible = false
            this.enabled = false
            this.x = this.y = 0
        }
    }
    
    Update(_posX, _posY){
        if(this.active && this.enabled){
            this.x = _posX
            this.y = _posY
        }
    }
    
}

class PlayerSword extends Phaser.GameObjects.Sprite{
    
    constructor(scene)
    {
		super(scene, 0, 0, 'hitboxAttack');
		scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0.5).setScale(1);
        this.setDepth(scene.DrawDepths.PLAYER);
        this.enabled = false
        this.buffer = 0
        
    }
    
    Attack(){
        this.enabled = true
        this.visible = true
        this.active = true
        this.buffer++
        this.scene.time.addEvent({delay: 250, callback: this.Disable, callbackScope: this, repeat: 0});
    }
    
    Disable(){
        this.buffer--
        
        if(this.buffer == 0 && this.enabled
          /*&& !this.scene.player.atkCharged*/){
            this.active = false
            this.visible = false
            this.enabled = false
            this.x = this.y = 0
        }
    }
    
    ChargedAttack(){
        //ToDo
    }
    
    Update(_posX, _posY){
        if(this.active && this.enabled){
            this.x = _posX
            this.y = _posY
        }
    }
    
}
    
    
