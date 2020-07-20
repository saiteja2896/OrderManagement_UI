

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

export class AccessoryMapper{
    accessoryId:number;
    accessoryName:String;

}

export class ColorMapper{
    colorId :number;
    colorName:String;

}
export class SaveData{
    public orderId:number;
    public series:number;
    public model:number;
    public accessory:AccessoryMapper[]=[];
    public color:ColorMapper[]=[];
    public price:number;

    public constructor(init?:Partial<SaveData>){
        Object.assign(this,init)
    }
}

