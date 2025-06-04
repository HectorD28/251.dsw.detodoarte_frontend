import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  public cartItemList: any = []
  public productList = new BehaviorSubject<any>([])

  private readonly uriAPI = '../../assets/productsList.json'

  constructor(
    private http: HttpClient) { }

   getProduct(){
    return this.productList.asObservable()
  }

  setProduct(item: any){
    this.cartItemList.push(...item); // será incluso todo produto no cartItemList
    this.productList.next(item)
  }

  addItem(item: any){
    this.cartItemList.push(item)
    this.productList.next(this.cartItemList)
    this.getTotalAmount()
    console.log(this.cartItemList)
  }

  getTotalAmount(): number {
    let cartTotal = 0;
    this.cartItemList.map((prod: any) => {
      cartTotal += (prod.price * prod.qnt)
    })
    return cartTotal;
  }

  removeCartItem(item: any){
    this.cartItemList.map((prod: any, index: any)=>{
      if(item.id === prod.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList)
  }

  removeAllProducts(){
    this.cartItemList = []
    this.productList.next(this.cartItemList)
  }
}
