
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // to hold cart count

  cartitemCount = new BehaviorSubject(0)

  searchTerm = new BehaviorSubject('')

  constructor(private http: HttpClient) {
    this.cartCount()
  }

  BASE_URL = 'https://backend-e-carts.onrender.com'

  //get all products

  getAllProducts() {
    return this.http.get(`${this.BASE_URL}/products/allProducts`)

  }
  // view particular products from mongo db
  viewProducts(id: any) {
    return this.http.get(`${this.BASE_URL}/products/viewProducts/${id}`)
  }
  //add to wishlist

  addtoWishlist(id: any, title: any, price: any, image: any) {

    const body = {
      id, title, price, image
    }
    return this.http.post(`${this.BASE_URL}/products/addtoWishlist`, body)

  }

  //get all products from wishlist
  getWishlist() {
    return this.http.get(`${this.BASE_URL}/products/getWishlist`)
  }

  // delete wishlist product from the wishlist

  deleteWishlist(id: any) {
    return this.http.delete(`${this.BASE_URL}/products/deleteWishlist/${id}`)
  }

  addtoCart(product: any) {

    const body = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: product.quantity
    }
    return this.http.post(`${this.BASE_URL}/products/addtocart`, body)


  }

  getcart() {
    return this.http.get(`${this.BASE_URL}/products/getcart`)
  }


  cartCount() {

    return this.getcart().subscribe((result: any) => {

      this.cartitemCount.next(result.length) //3

    })
  }

  deleteItems(id: any) {
    return this.http.delete(`${this.BASE_URL}/products/delete/${id}`)
  }

  incCartCount(id: any) {
    return this.http.get(`${this.BASE_URL}/products/increment/${id}`)
  }
  decCartCount(id: any) {
    return this.http.get(`${this.BASE_URL}/products/decrement/${id}`)
  }

}
