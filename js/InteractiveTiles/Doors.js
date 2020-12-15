
class DoorsPrefab extends Phaser.GameObjects.Sprite{
    constructor(scene, positionX, positionY, sprite)
    {
		super(scene, positionX, positionY, sprite);
		scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0.5,0).setScale(1);
        this.body.setImmovable(true);
        
        this.CreateAnims();
        this.InitCollisions();
        
    }
    
    InitCollisions(){
        this.scene.physics.add.collider(this, this.scene.player, this.Trigger, null, this);
    }
    
    CreateAnims(){}
    
    Trigger(){}
    
    Activate(){
        this.active = this.visible = true;
    }
    
    Deactivate(){
        this.active = this.visible = false;
    }
    
}


class KeyDoor extends DoorsPrefab{
    
    constructor(scene, positionX, positionY)
    {
        super(scene, positionX, positionY, 'keyDoor');
        
    }
    
    CreateAnims(){
        this.scene.anims.create({
            key: 'keyDoorOpening',
            frames: this.scene.anims.generateFrameNumbers('keyDoor', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: 0
        });
    }
    
    
    Trigger(){
        if(this.active){
            if(this.scene.player.keyAmmount > 0){
                this.scene.player.keyAmmount--;
                this.Deactivate();
                
            }
        }
        
    }
    
}


class MasterKeyDoor extends DoorsPrefab{
    
    constructor(scene, positionX, positionY)
    {
        super(scene, positionX, positionY, 'masterKeyDoor');
        
    }
    
    CreateAnims(){
        this.scene.anims.create({
            key: 'masterKeyDoorOpening',
            frames: this.scene.anims.generateFrameNumbers('masterKeyDoor', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: 0
        });
    }
    
    Trigger(){
        if(this.active){
            if(this.scene.player.hasMasterKey){
                this.scene.player.hasMasterKey = false;
                this.Deactivate();
                
            }
        }
        
    }
    
}

class OneWayDoor extends DoorsPrefab{
    
    constructor(scene, positionX, positionY)
    {
        super(scene, positionX, positionY, 'oneWayDoor');
        
        this.colManager = new CollisionManager(scene);
        this.doorBackwards = new OneWayDoorBackwards(scene, this.body.x, this.body.y + this.body.height);
        this.tpPos = new Phaser.Math.Vector2(this.body.x, this.body.y + this.body.height * 2);
    }
    
    CreateAnims(){
        this.scene.anims.create({
            key: 'oneWayDoorOpening',
            frames: this.scene.anims.generateFrameNumbers('oneWayDoor', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: 0
        });
    }
    
    
    Trigger(){
        if(this.active){
            this.colManager.UpdateOnTrigger();
            
            if(this.colManager.GetCollisionState() == this.colManager.CollisionState.ENTERED_COLLISION
              && this.colManager.GetCollisionDirection() == this.colManager.CollisionDirection.DOWN)
            {
                this.anims.play('oneWayDoorOpening');
                this.scene.player.body.x = tpPos.x;
                this.scene.player.body.y = tpPos.y;
                
                //TODO: Do stuff to change the room
                
                this.scene.time.addEvent({delay: 1000, callback: this.ChangingRoomDelay, callbackScope: this, repeat: 0});  //Delay per deixar temps a que es vegi l'animacio de la porta
            }
        }
        
    }
    
    ChangeRoom(){
        //TODO: Do stuff to change the room
        
    }
    
    ChangingRoomDelay(){
        //Delay per deixar temps a que es vegi l'animacio de la porta
        this.scene.time.addEvent({delay: 1000, callback: this.ChangeRoom, callbackScope: this, repeat: 0});
    }
    
    Activate(){
        this.active = this.visible = true;
        this.colManager.active = true;
    }
    
    Deactivate(){
        this.colManager.active = false;
        
        this.active = this.visible = false;
    }
    
}
class OneWayDoorBackwards extends Phaser.GameObjects.Sprite{
    constructor(scene, positionX, positionY)
    {
        super(scene, positionX, positionY, 'oneWayDoorBackwards');
        
        this.InitCollisions();
        this.CreateAnims();
    }
    
    InitCollisions(){
        this.scene.physics.add.collider(this, this.scene.player);
    }
    CreateAnims(){
        this.scene.anims.create({
            key: 'oneWayDoorBackwardsOpening',
            frames: this.scene.anims.generateFrameNumbers('oneWayDoorBackwards', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'oneWayDoorBackwardsClosing',
            frames: this.scene.anims.generateFrameNumbers('oneWayDoorBackwards', { start: 2, end: 0 }),
            frameRate: 10,
            repeat: 0
        });
    }
    
    Open(){
        this.anims.play('oneWayDoorBackwardsOpening');
        this.active = false;
    }
    Close(){
        this.active = true;
        this.anims.play('oneWayDoorBackwardsClosing');
    }
}


class TriggerDoor extends DoorsPrefab{
    constructor(scene, positionX, positionY, direction, eventFunction)
    {
        super(scene, positionX, positionY, 'eventDoor');
        switch(direction){
            case this.scene.Directions.DOWN:
                this.setFrame(0);
                break;
                
            case this.scene.Directions.UP:
                this.setFrame(3);
                break;
                
            case this.scene.Directions.LEFT:
                this.setFrame(6);
                break;
                
            case this.scene.Directions.RIGHT:
                this.setFrame(9);
                break;
                
            default:
                break;
        }
        
        this.eventFunction = eventFunction;
    }
    
    CreateAnims(){
        this.scene.anims.create({
            key: 'eventDoorOpeningDown',
            frames: this.scene.anims.generateFrameNumbers('eventDoor', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'eventDoorOpeningUp',
            frames: this.scene.anims.generateFrameNumbers('eventDoor', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'eventDoorOpeningLeft',
            frames: this.scene.anims.generateFrameNumbers('eventDoor', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'eventDoorOpeningRight',
            frames: this.scene.anims.generateFrameNumbers('eventDoor', { start: 9, end: 11 }),
            frameRate: 10,
            repeat: 0
        });
    }
    
    
    Trigger(){
        if(this.active){
            if(this.eventFunction() == true){
                switch(direction){
                    case this.scene.Directions.DOWN:
                        this.anims.play('eventDoorOpeningDown');
                        break;

                    case this.scene.Directions.UP:
                        this.anims.play('eventDoorOpeningUp');
                        break;

                    case this.scene.Directions.LEFT:
                        this.anims.play('eventDoorOpeningLeft');
                        break;

                    case this.scene.Directions.RIGHT:
                        this.anims.play('eventDoorOpeningRight');
                        break;

                    default:
                        break;
                }

                this.Deactivate();
            }
            
        }
        
    }
    
}
