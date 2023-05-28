import { Component, OnInit} from '@angular/core';
import { CheckoutService } from './checkout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-app';
  paymentHandler:any;

  constructor(private service:CheckoutService) { }


  ngOnInit(): void {
    this.invokeStripe()
  }

  forPayment(val:number){
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key:'##Stripe key##',
      local:'auto',
      token: function (token:any) {
        console.log(token);
        paymentGo(token)
      }
    })
    const paymentGo = (token:any)=>{
      this.service.makePayment(token).subscribe((res:any) =>{
        console.log(res);
      })
    }
    paymentHandler.open({
      name:"Demo",
      description:"A Demo Payment",
      amount: val * 100
    })
  }

  invokeStripe(){
    if(!window.document.getElementById('stripe-script')){
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload=()=>{
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key:'##Stripe key##',
          local:'auto',
          token: function(token:any){
            console.log(token);
          }
        })
      };
      window.document.body.appendChild(script)
    }
  }
}
