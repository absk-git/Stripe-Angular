import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http:HttpClient) { }

  makePayment(token:any):Observable<any>{
    let url = "http://localhost:3000/checkout"
    return this.http.post<any>(url,{token:token})
  }
}
