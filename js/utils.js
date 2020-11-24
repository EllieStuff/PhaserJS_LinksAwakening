class Vector2{
    constructor(){
        this.x = 0;
        this.y = 0;
    }
    constructor(positionX, positionY){
        this.x = positionX;
        this.y = positionY;
    }  
    constructor(vector2){
        this.x = vector2.x;
        this.y = vector2.y;
    }
    
    Module()
    {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
    
    Normalize()
    {
        var module = Module();
        return new Vector2(this.x / module, this.y / module);
    }
}