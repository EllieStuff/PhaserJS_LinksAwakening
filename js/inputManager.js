
class InputManager extends Phaser.GameObjects.Sprite {
    constructor(_scene){
        super(_scene, 0, 0, 'emptySprite');
        _scene.events.on('update', this.Update, this);
        //this.phaserInputManager = _phaserInputManager;
        
        this.KeyCodes = { 
            K: 0, L: 1, 
            W: 2, A: 3, S: 4, D: 5, SPACE: 6
        };
        
        this.Inputs = [
            //Actions
            _scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K),
            _scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L),
            //Movement
            _scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            _scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            _scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            _scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            _scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        ];
        
        this.hasCopiedKeyDown = false;
        this.keyDownCopy = [
            //Actions
            false,
            false,
            //Movement
            false,
            false,
            false,
            false,
            false
        ];
        
        this.hasCopiedKeyUp = false;
        this.keyUpCopy = [
            //Actions
            false,
            false,
            //Movement
            false,
            false,
            false,
            false,
            false
        ];
        
        
        //this.ourInputs[this.ourKeyCodes.K].isDown
        //Phaser.Input.Keyboard.JustDown(this.ourInputs[this.ourKeyCodes.K])
        
    }
    
    Update(){
        this.hasCopiedKeyDown = false;
        this.hasCopiedKeyUp = false;
    }
    
    
    GetKeyDown(_keyCode){
        if(!this.hasCopiedKeyDown){
            this.hasCopiedKeyDown = true;
            this.keyDownCopy = [
                //Actions
                Phaser.Input.Keyboard.JustDown(this.Inputs[this.KeyCodes.K]),
                Phaser.Input.Keyboard.JustDown(this.Inputs[this.KeyCodes.L]),
                //Movement
                Phaser.Input.Keyboard.JustDown(this.Inputs[this.KeyCodes.W]),
                Phaser.Input.Keyboard.JustDown(this.Inputs[this.KeyCodes.A]),
                Phaser.Input.Keyboard.JustDown(this.Inputs[this.KeyCodes.S]),
                Phaser.Input.Keyboard.JustDown(this.Inputs[this.KeyCodes.D]),
                Phaser.Input.Keyboard.JustDown(this.Inputs[this.KeyCodes.SPACE])
            ];
        }
        
        return this.keyDownCopy[_keyCode];
    }
    
    
    GetKeyUp(_keyCode){
        if(!this.hasCopiedKeyUp){
            this.hasCopiedKeyUp = false;
            this.keyUpCopy = [
                //Actions
                Phaser.Input.Keyboard.JustUp(this.Inputs[this.KeyCodes.K]),
                Phaser.Input.Keyboard.JustUp(this.Inputs[this.KeyCodes.L]),
                //Movement
                Phaser.Input.Keyboard.JustUp(this.Inputs[this.KeyCodes.W]),
                Phaser.Input.Keyboard.JustUp(this.Inputs[this.KeyCodes.A]),
                Phaser.Input.Keyboard.JustUp(this.Inputs[this.KeyCodes.S]),
                Phaser.Input.Keyboard.JustUp(this.Inputs[this.KeyCodes.D]),
                Phaser.Input.Keyboard.JustUp(this.Inputs[this.KeyCodes.SPACE])
            ];
        }
        
        return this.keyUpCopy[_keyCode];
    }
    
    GetKeyPressed(_keyCode){
        
        return this.Inputs[_keyCode].isDown;
    }
    
}