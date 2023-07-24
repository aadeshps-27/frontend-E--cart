import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {


  transform(allProducts:any[],searchTerm:string,properttName:string): any[] {

    const result :any[] = []

    if(!allProducts || searchTerm =="" || properttName =="" ){
      return allProducts;
    }
    allProducts.forEach((item:any)=>{
      if(item[properttName].trim().toLowerCase().includes(searchTerm.trim().toLowerCase())){
        result.push(item)
      }
    })
    return result
    
  }

}
