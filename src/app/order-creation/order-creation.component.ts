import { Utilities } from './../shared/utilities';
import { OrderCreationService } from './order-creation.service';
import { Series, Model, Color, Accessory, SaveData } from './../models/orderSearchSeries.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, NgModule } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';




@Component({
  selector: 'app-order-creation',
  templateUrl: './order-creation.component.html',
  styleUrls: ['./order-creation.component.css']
})
export class OrderCreationComponent implements OnInit {
  public searchForm: FormGroup;
  accessoryDropdownSettings={};
  colorDropdownSettings={};
  public seriesList:Series[] = [];
  public selectedSeries:Series;
  public selectedSeriesId:number;
  public modelList:Model[]=[];
  public selectedModelId:any;
  public colorList:Color[]=[];
  public accossaryList:Accessory[]=[];
  public accessoryIds:Accessory[]=[];
  public accessoryPriceArr = [];
  public arrayAccessories=[];
  public isDeSelectedAccessory:boolean=false;
  public isDeselectedColor:boolean=false;
  public accessorySum:number=0;
  public selectedColorId:any;
  public grandTotal:number=0;
  public modelAmount:number=0;
  public accNameList=[];
  public selectedSeriesName;
  public colorArray=[];
  public colorSum:number=0;
  public colorPriceArray=[];
  public selectedAccyItemRoot=[];
  public selectedColorItemRoot=[];
  public colorObj=[];
  public accyObj=[];
  public accyObjList=[];
  public colorObjList=[];
  public setMessage:boolean=false;
  public errorMessage:boolean=false;

  constructor(private http :HttpClient,public orderService:OrderCreationService,public formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.searchForm =this.formbuilder.group({
      seriesName:['', Validators.required],
      modelName:['', Validators.required],
      accessoryName:['' , Validators.required],
      colorName:['', Validators.required]
    })

    this.accessoryDropdownSettings={
      singleSelection: false,
      idField: 'accessoryId',
      textField: 'accessoryName',
      enableCheckAll:false,
      itemsShowLimit: 5
    }
    this.colorDropdownSettings={
      singleSelection: false,
      idField: 'colorId',
      textField: 'colorName',
      enableCheckAll:false,
      itemsShowLimit: 5
    }
    this.fetchSeriesDetails();
    this.calculateGrandTotal();
  }

public onLoad(){
  this.searchForm.patchValue({
    seriesName:'' ,modelName:'' ,accessoryName:'' ,colorName:''
  });
  this.fetchSeriesDetails();
  this.calculateGrandTotal();
}




  fetchSeriesDetails(){
    this.orderService.getServiceDetails().subscribe((data:Series[])=>{
     this.seriesList=data;
    });
  }


 public getSeriesId(event:any){
  this.selectedSeriesId=event.target.value;
  this.selectedAccyItemRoot=[];
  this.selectedColorItemRoot=[];
  this.accessorySum=0;
  this.colorSum=0
  this.modelAmount=0;
  this.grandTotal=0;
  this.fetchModelDetails();
  this.getSeriesName();
}



fetchModelDetails(){
   let requestParamenters=new Series();
   requestParamenters.seriesId=this.selectedSeriesId;
  this.orderService.getModelDetails(requestParamenters).subscribe((data:Model[])=>{
   this.modelList=data;
  });
}

  public getModelId(event:any){
    this.selectedModelId=event.target.value;
    this.setArraysToNull();
    this.fetchColorDetails();
    this.fetchAccessoryDetails();
    this.calculateModelPrice();
    
}

fetchAccessoryDetails(){
  let requestParamenters=new Model();
  requestParamenters.modelId=this.selectedModelId;
  this.orderService.getAccessoryDetails(requestParamenters).subscribe((data:Accessory[])=>{
    this.accossaryList=data;
  });
}



fetchColorDetails(){
  let requestParamenters=new Model();
  requestParamenters.modelId=this.selectedModelId;
  this.orderService.getColorDetails(requestParamenters).subscribe((data:Color[])=>{
   this.colorList=data;
  });
}
  


onSave(){
  let requestParamenters =new SaveData();
  requestParamenters.series=this.selectedSeriesId;
  requestParamenters.model=this.selectedModelId;
  requestParamenters.accessory=this.accyObjList;
  requestParamenters.color=this.colorObjList;
  requestParamenters.price=this.grandTotal;
  console.log(requestParamenters);
this.orderService.setRequestData(requestParamenters).subscribe(data=>{
if(data){
  this.setMessage=true;
  this.onReset();
}
else{
   this.errorMessage=true;
}
});
}

closeMessage(){
  if(this.setMessage){
  this.setMessage=false;
  }
  else{
    this.errorMessage=false;
  }
}



public onReset(){
  this.searchForm.reset({
    seriesName:'',
    modelName:'',
    colorName:'',
    accessoryName:''
  })
  this.seriesList=[];
  this.modelList=[];
  this.colorList=[];
  this.accNameList=[];
  this.accossaryList=[];
  this.setArraysToNull();
  this.onLoad();
  console.log("reset");
}

/*public onReset(){
  this.searchForm.reset();
 
  
}*/



public onSelectColornumber(event){
  this.colorObj=event
  console.log('onSelectColorItem',event);
  this.colorArray=Utilities.convertObjectToArray(event);
  this.setColorDto();
  this.calculateColorCalucualtions();
} 



/*public onSelectColornumber(event){
  console.log('onSelectnumber',event.target.value);
  this.selectedColorQuantity=event.target.value;
 this.getcolorCalucualtions();
}*/

public onDeSelectColornumber(event){
  console.log('onDeSelectnumber',event);
  this.colorArray=Utilities.convertObjectToArray(event);
  this.isDeselectedColor=true;
  this.setColorDto();
  this.calculateColorCalucualtions();
}



public onSelectAccessoryItem(event:any){
  console.log('onSelectAccessortItem',event);
  this.accyObj =event;
  this.arrayAccessories=Utilities.convertObjectToArray(event);
  this.setAccessoryDto();
  this.calculateAccessoryPrice();
}

onDeSelectAccessoryItem(event:any){
  console.log('onDeSelectAccessortItem',event);
  this.accyObj =event;
  this.isDeSelectedAccessory=true;
  this.arrayAccessories=Utilities.convertObjectToArray(event);
  this.setAccessoryDto();
  this.calculateAccessoryPrice();
}

setAccessoryDto(){
  if(this.isDeSelectedAccessory){
    const index = this.accyObjList.indexOf(this.accyObj); 
    this.accyObjList.splice(index,1);
  }
  else{
    this.accyObjList.push(this.accyObj);
  }
  console.log(this.accyObjList);
}

setColorDto(){
  if(this.isDeselectedColor){
   let index=this.colorObjList.indexOf(this.colorObj);
   this.colorObjList.splice(index,1);
  }
  else{
    this.colorObjList.push(this.colorObj);
  }
  console.log(this.colorObjList);
}

setArraysToNull(){
  this.selectedAccyItemRoot=[];
  this.selectedColorItemRoot=[];
  this.accessoryPriceArr=[];
  this.colorPriceArray=[];
  this.grandTotal=0;
  this.colorSum =0;
  this.modelAmount=0;
  this.accessorySum=0;
}

getSeriesName(){
for(let i=0;i<this.seriesList.length;i++){
  if(this.selectedSeriesId==this.seriesList[i].seriesId){
    this.selectedSeriesName=this.seriesList[i].seriesName;
  }
}
this.searchForm.controls['seriesName'].setValue(this.selectedSeriesName);
}

calculateAccessoryPrice(){
  
  this.accessorySum=0;
  for(let i=0;i<this.accossaryList.length ;i++){
    if(this.arrayAccessories[0].accessoryId === this.accossaryList[i].accessoryId){
      var accPrice;
      var accyName;
      accPrice=this.accossaryList[i].price;
      accyName =this.accossaryList[i].accessoryName
    }
  }
      if(!this.isDeSelectedAccessory)
      {
        this.accessoryPriceArr.push(accPrice);
        this.accNameList.push(accyName)

      }
      else if(this.isDeSelectedAccessory){
        const index = this.accessoryPriceArr.indexOf(accPrice); 
        this.accessoryPriceArr.splice(index,1);
        this.isDeSelectedAccessory=false;
       }
  for(let i=0;i<this.accessoryPriceArr.length;i++){
   this.accessorySum=this.accessorySum+this.accessoryPriceArr[i]
  }
 this.calculateGrandTotal()
}

calculateModelPrice(){
  if(this.selectedModelId !=''){
    for(let i=0;i<this.modelList.length;i++){
      if(this.selectedModelId == this.modelList[i].modelId){
        this.modelAmount=this.modelList[i].price;
      }
    }
    
  }
  else{
    this.modelAmount=0;
  }
  this.calculateGrandTotal();
}




calculateColorCalucualtions(){
  this.colorSum=0;
  for(let i=0;i<this.colorList.length;i++){
    if(this.colorArray[0].colorId==this.colorList[i].colorId){
      var colorPrice;
      colorPrice=this.colorList[i].price;
    }
  }
  if(!this.isDeselectedColor){
    this.colorPriceArray.push(colorPrice);
  }
  else if(this.isDeselectedColor){
         const index = this.colorPriceArray.indexOf(colorPrice); 
        this.colorPriceArray.splice(index,1);
        this.isDeselectedColor=false;
  }
  console.log(this.colorPriceArray)
  for(let i=0;i<this.colorPriceArray.length;i++){
    this.colorSum=this.colorSum+this.colorPriceArray[i]
   }
  this.calculateGrandTotal()
}

calculateGrandTotal(){
  this.grandTotal=this.modelAmount + this.accessorySum + this.colorSum ;
  console.log(this.grandTotal)
}
}
