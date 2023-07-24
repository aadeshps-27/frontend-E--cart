import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {

  constructor(private api: ApiService) { }
  allWishlist: any = []
  ngOnInit(): void {
    this.api.getWishlist().subscribe((result: any) => {
      console.log(result);
      this.allWishlist = result //arry of results

    },
      (result: any) => {
        console.log(result.error);

      }
    )
  }
  // delete wishlsit products

  deleteWishlist(id: any) {
    this.api.deleteWishlist(id).subscribe((result: any) => {
      console.log(result)// remaining wishlist products
      this.allWishlist = result
    })

  }
  AddtoCart(product: any) {

    // add quandity to cart

    Object.assign(product, { quantity: 1 })
console.log(product);

    //api call to add quandity

    this.api.addtoCart(product).subscribe((result: any) => {
      this.api.cartCount()
      this.deleteWishlist(product.id)
      alert(result)
    }, (result: any) => {
      alert(result.error)
    }
    )
  }
}


