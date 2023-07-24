import { Component, OnInit } from '@angular/core';
import { ApiService } from '../products/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartCount:string=''
  constructor(private api:ApiService){}
  ngOnInit(): void {
    this.api.cartitemCount.subscribe((data:any)=>{
      console.log(data)//4
      this.cartCount = data
      
    })
  }
search(event:any){
  console.log(event.target.value);
  this.api.searchTerm.next( event.target.value)

  // to assing new value to behaviour subjeccts uses next() method
  

}
}
