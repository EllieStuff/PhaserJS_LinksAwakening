

class PlayerPrefab extends Phaser.GameObjects.Sprite{
    
    constructor(scene, positionX, positionY)
    {
		super(scene, positionX, positionY, 'hitbox');
		scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.events.on('update', this.Update, this);
        this.setOrigin(0.5).setScale(1);
        //this.hitbox = this.physics.add.sprite(config.width/2,config.height/2,'hitbox').setOrigin(0.5).setScale(1);
        
        this.maxHearts = 3;
        this.health = this.maxHearts*4;
        this.setOrigin(0.5,0).setScale(1);
        this.initDefense = this.defense = 1;
        this.initAttack = this.attack = 1;
        this.initSpeed = this.speed = 64;
        this.rupies = 0;
        this.assignA = "";
        this.assignB = "";
        this.isJumping = false;
        this.atkCharged = false;
        this.defPowerUpBuffer = 0;
        this.atkPowerUpBuffer = 0;
        this.keyAmmount = 0;
        this.hasMasterKey = false;
        //this.nave.anims.play('stand');
        //this.anims.play('standEnemy');
        //this.checkWorldBounds = true;
        //this.outOfBoundsKill = true;
        this.shieldUp = false;
        this.currentAnim = 'walkdown';
        
        this.animator = new PlayerAnimator(scene, positionX, positionY);
        
    }  
    
    
    GetDamaged(_player, _enemy)
    {
        if(!this.isJumping){
            this.health -= _enemy.attack/this.defense;
            this.RefreshPowerUpBuffers();
            
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
    
    Update()
    {

        
        //MOVEMENT
        if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.L))   //MOVE WITH SHIELD UP
        {
            this.shieldUp = true;
            
            if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.A))
            {
                this.currentAnim = 'shieldLeft';
                this.body.velocity.x = -this.speed;
            }
            else if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.D))
            {
                this.currentAnim = 'shieldRight';
                this.body.velocity.x = this.speed;
            }
            else
            {
                this.body.velocity.x = 0;
            }
            
            if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.S))
            {
                this.currentAnim = 'shieldDown';
                this.body.velocity.y = this.speed;
            }
            else if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.W))
            {
                this.currentAnim = 'shieldUp';
                this.body.velocity.y = -this.speed;
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
                this.body.velocity.x = -this.speed;
            }
            else if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.D))
            {
                this.currentAnim = 'walkrightS';
                this.body.velocity.x = this.speed;
            }
            else
            {
                this.body.velocity.x = 0;
            }
            
            if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.S))
            {
                this.currentAnim = 'walkdownS';
                this.body.velocity.y = this.speed;
                
            }
            else if(this.scene.inputs.GetKeyPressed(this.scene.inputs.KeyCodes.W))
            {
                this.currentAnim = 'walkupS';
                this.body.velocity.y = -this.speed;
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
        //Update Animator
        this.animator.Update(this);
        
        
        ////
        
        //ATTACK
        
        
    }
    
}

