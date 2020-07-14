export class Utilities{


    static convertObjectToArray(object){
        let covtArray=[];
        Object.keys(object).map(function(key){
          covtArray.push({[key]:object[key]})
        })
        return covtArray;
      }

      
}