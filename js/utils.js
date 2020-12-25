/*class Vector2{
    constructor(positionX, positionY){
        this.x = positionX;
        this.y = positionY;
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
    
    Distance(v1, v2){
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
    
}*/

class Utils{
    static GetDiagonal(object){
        
        return Math.sqrt(Math.pow(object.width / 2, 2) + Math.pow(object.height / 2, 2));
    }
    
}