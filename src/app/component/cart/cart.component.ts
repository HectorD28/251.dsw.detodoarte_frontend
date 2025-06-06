import { CartService } from '../../service/cart/cart.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faMinusSquare, faPlusSquare, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  iconBag = faShoppingBag
  iconTrash = faTrashAlt
  iconPlus = faPlusSquare
  iconMinus = faMinusSquare
  imgHeight = "80"
  imgWidth =" 80"
  imgEmptyCart = './img/empty_cart.jpg'
  imgEmptyCartW = "300"

  public cartTotal !: number;
  public cartList: any = []

  constructor(
    private cartService: CartService,
    @Inject(MAT_DIALOG_DATA) public content: string
    ) {

    }

  ngOnInit(): void {
    this.cartService.getProduct().subscribe(result => {
      this.cartList = result;
      this.cartTotal = this.cartService.getTotalAmount()
    })

  }

  removeItem(item: any){
    this.cartService.removeCartItem(item)
  }

  cleanCart(){
    this.cartService.removeAllProducts()
  }

  subtract(item: any){
    item.qnt -= 1
    this.cartTotal = this.cartService.getTotalAmount()
  }

  add(item: any){
    item.qnt += 1
    this.cartTotal = this.cartService.getTotalAmount()
  }

}
