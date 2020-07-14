import { Series } from './../models/orderSearchSeries.model';
import { map } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs'

@Injectable({
    providedIn:'root'
})
export class OrderCreationService{
    public selectedSeriesDetails:Series;
    constructor(private http:HttpClient){}
    getServiceDetails():Observable<any>{
        let url="http://localhost:8081/series/alldata";
        return this.http.get(url).pipe(map(
            (data:any)=>{
                return data;
            }
        ));
    }

    getModelDetails(requestData):Observable<any>{
    let url="http://localhost:8081/model/getmodels";
    return this.http.post(url,requestData).pipe(map(
        (data:any)=>{
            return data;
        }
    ))
    }

    getAccessoryDetails(requestData){
        let url="http://localhost:8082/accessory/getaccessory";
        return this.http.post(url,requestData).pipe(map(
            (data:any)=>{
                return data;
            }
        ))
    }

    getColorDetails(requestData):Observable<any>{
    let url="http://localhost:8083/color/getcolors";
    return this.http.post(url,requestData).pipe(map(
        (data:any)=>{
            return data;
        }
    ))
    }

}