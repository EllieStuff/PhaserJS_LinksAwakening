

class PlayerPrefab extends Phaser.GameObjects.Sprite{
    
    constructor(scene, positionX, positionY)
    {
		super(scene, positionX, positionY, 'hitbox');
		scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.events.on('update', this.Update, this);
        this.setOrigin(0.5).setScale(1);
        //this.hitbox = this.physics.add.sprite(config.width/2,config.height/2,'hitbox').setOrigin(0.5).setScale(1);
        
        this.Directions = { RIGHT: 0, LEFT: 1, UP: 2, DOWN: 3 };
        this.moveDir = this.Directions.DOWN;
        
        this.maxHearts = 3;
        this.health = this.maxHearts*4;
        this.setOrigin(0.5,0).setScale(1);
        this.initDefense = this.defense = 1;
        this.initAttack = this.attack = 1;
        this.initSpeed = this.speed = 1;
        this.rupies = 0;
        this.assignA = "";
        this.assignB = "";
        this.isJumping = false;
        this.atkCharged = false;
        this.defPowerUpBuffer = 0;
        this.atkPowerUpBuffer = 0;
        //this.nave.anims.play('stand');
        //this.anims.play('standEnemy');
        //this.checkWorldBounds = true;
        //this.outOfBoundsKill = true;
        this.shieldUp = false;
        this.currentAnim = 'walkdown';
        
        this.animator = new PlayerAnimator(scene, positionX, positionY);
        
        this.InitCollisions();
        
    }
    
    InitCollisions(){
        this.scene.physics.add.collider(this, this.scene.walls);
        
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
    
    SetIdleAnim(){
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
    
    
    
    Update()
    {
        //Jump
        if(!this.isJumping && this.scene.inputs.GetKeyDown(this.scene.inputs.KeyCodes.K))
        {
            this.isJumping = true;
            this.Jump();
            
        }
        
        //MOVEMENT
        if(!this.isJumping){
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
                    //this.currentAnim = 'idleDown';
                    //this.player.anims.play('idleDown');
                    this.body.velocity.y = 0;
                }
                /*
                //NOTA: Per acabar l'animacio i que es quedi mirant on vulguis crec que el millor seria algo aixi amb totes les direccions
                if(this.scene.inputs.GetKeyUp(this.scene.inputs.KeyCodes.S)){
                    this.scene.player.anims.play('idleDown');
                }
                */

            }
            
            //Decide Idle anim if necessary
            if(this.IsMoving())
                this.SetIdleAnim();
        }
        
        //Update Animator
        this.animator.Update(this);
        
        
        ////
        
        //ATTACK
        
        
    }
    
}


