
class InputManager extends Phaser.GameObjects.Sprite {
    constructor(_scene, _sprite){
        super(_scene, 0, 0, _sprite);
        //this.phaserInputManager = _phaserInputManager;
        
        this.KeyCodes = { 
            K: 0, L: 1, 
            W: 2, A: 3, S: 4, D: 5 
        };
        
        this.Inputs = [
            //Actions
            _scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K),
            _scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L),
            //Movement
            _scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            _scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            _scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            _scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        ];
        
        //this.ourInputs[this.ourKeyCodes.K].isDown
        //Phaser.Input.Keyboard.JustDown(this.ourInputs[this.ourKeyCodes.K])
        
    }
    
    
    GetKeyDown(_keyCode){
        
        return Phaser.Input.Keyboard.JustDown(this.Inputs[_keyCode]);
    }
    
    GetKeyUp(_keyCode){
        
        return Phaser.Input.Keyboard.JustUp(this.Inputs[_keyCode]);
    }
    
    GetKeyPressed(_keyCode){
        
        return this.Inputs[_keyCode].isDown;
    }
    
}