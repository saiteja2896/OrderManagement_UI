

export class Series{
    seriesId:number;
    seriesName:String;
    seriesCode:String;
    isActice:String;
}


export class Model{
    modelId:number;
    modelName:String;
    price:number;
}

export class Accessory{
   accessoryId:number;
   accessoryName:String;
   price:number;
   
}


export class Color{
    colorId : number;
    colorName:String;
    price:number;
    available:number;
}

export class SaveData{
    public series:number;
    public model:number;
    public accessory:Accessory[]=[];
    public color:Color[]=[];
    public price:number;
}

