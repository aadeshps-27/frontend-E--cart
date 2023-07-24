import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {
  //to hold particular id of the products
  productId:any
  //to hold particular details of the products
  product:any=[]

  constructor(private viewActivatedRoute:ActivatedRoute,private api:ApiService){}
  // activated route is to get path parameter from route
  
  ngOnInit(): void {
    this.viewActivatedRoute.params.subscribe((data:any)=>{
      console.log(data);// id:4
      console.log(data.id); // 4
      this.productId = data.id
      // view particular product details
this.api.viewProducts(this.productId).subscribe((result:any)=>{
  console.log(result); //array of products
  this.product =result
  
})
      
      
    })
  }
  // wishlist calling
  addtoWishlist(){
  
   const {id,title,price,image} = this.product
   //api calll
   this.api.addtoWishlist(id,title,price,image).subscribe((result:any)=>{
    alert(result)

   },
   (result:any)=>{
alert(result.error)
   })

  }

  // add to cart

  addtocart(product:any){
    Object.assign(product,{quantity:1})
    console.log(product);
    this.api.addtoCart(product).subscribe((result:any)=>{
      alert(result)
      this.api.cartCount()
    },
    (result:any)=>{
      alert(result.error)
    }
    )

    
  }
}
