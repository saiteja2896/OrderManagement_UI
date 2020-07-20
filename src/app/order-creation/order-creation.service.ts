import { operationsConstants } from './../shared/operationsConstants';
import { Series } from './../models/orderSearchSeries.model';
import { map } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs'


@Injectable({
    providedIn:'root'
})
export class OrderCreationService{

    constructor(private http:HttpClient){}

    
    getServiceDetails():Observable<any>{
        return this.http.get(operationsConstants.seriesUrl).pipe(map(
            (data:any)=>{
                return data;
            }
        ));
    }

    getModelDetails(requestData):Observable<any>{
    return this.http.post(operationsConstants.modelUrl,requestData).pipe(map(
        (data:any)=>{
            return data;
        }
    ))
    }

    getAccessoryDetails(requestData){
        return this.http.post(operationsConstants.accessoryUrl,requestData).pipe(map(
            (data:any)=>{
                return data;
            }
        ))
    }

    getColorDetails(requestData):Observable<any>{
    return this.http.post(operationsConstants.colorUrl,requestData).pipe(map(
        (data:any)=>{
            return data;
        }
    ))
    }

    setRequestData(requestData):Observable<any>{
        return this.http.post(operationsConstants.saveDataUrl,requestData).pipe(map(
            (data:any)=>{
                return data;
            }
        ))
    }

}