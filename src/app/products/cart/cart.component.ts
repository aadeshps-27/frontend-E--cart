import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators, } from '@angular/forms';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { flatMap } from 'rxjs';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;
  showPaypalStatus:boolean=false
  showSuccess: boolean = false
  discountClicked: boolean = false
  offerClicked: boolean = false;
  paymentStatus: boolean = false;

  username: string = ''
  houseno: string = ''
  street: string = ''
  state: string = ''
  phoneno: string = ''

  totalPrice = 0 //hold total price
  cartCount: string = '';
  //to hold cart products
  allcart: any = []
  constructor(private api: ApiService, private fb: FormBuilder) { }

  adderssForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    houseno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    street: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    state: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    phoneno: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })

  ngOnInit(): void {

    this.initConfig();

    this.api.cartitemCount.subscribe((data: any) => {
      console.log(data) //4
      this.cartCount = data

    })
    this.api.getcart().subscribe((result: any) => {
      console.log(result);
      this.api.cartCount()
      this.allcart = result
      this.getCartTotal() //call cart total function



    }, (result: any) => {
      console.log(result.error);

    }
    )
  }




  removecart(id: any) {

    this.api.deleteItems(id).subscribe((result: any) => {
      this.allcart = result
      this.api.cartCount()

    },
      (result: any) => {
        alert(result.error)
      })
  }

  //  get cart total

  getCartTotal() {
    let total = 0;
    this.allcart.forEach((result: any) => {
      total += result.grandTotal
      this.totalPrice = Math.ceil(total)

    });
  }

  incrementCart(id: any) {
    this.api.incCartCount(id).subscribe((result: any) => {
      this.allcart = result
      this.getCartTotal()
    },
      (result: any) => {
        alert(result.error)
      }
    )
  }
  decrementCart(id: any) {
    this.api.decCartCount(id).subscribe((result: any) => {
      this.allcart = result
      this.getCartTotal()
    },
      (result: any) => {
        alert(result.error)
      }
    )
  }
  submitPay() {
    if (this.adderssForm.valid) {

      this.username = this.adderssForm.value.username || '';
      this.houseno = this.adderssForm.value.houseno || '';
      this.street = this.adderssForm.value.street || '';
      this.state = this.adderssForm.value.state || '';
      this.phoneno = this.adderssForm.value.phoneno || '';
      this.paymentStatus = true

    }
    else {
      alert('invalid form')
    }
  }
  offerClick() {
    this.offerClicked = true
    this.discountClicked = true
  }
  discount(value: any) {
    this.totalPrice = this.totalPrice * (100 - value) / 100
    this.offerClicked = false

  }


  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: '9.99',
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value: '9.99'
                }
              }
            },
            items: [
              {
                name: 'Enterprise Subscription',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'EUR',
                  value: '9.99',
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

  paypalPay(){
    this.showPaypalStatus=true
  }
  modalClick(){
    this.adderssForm.reset()
    this.showPaypalStatus=false
    this.showSuccess=false
    this.paymentStatus=false
  }
}
