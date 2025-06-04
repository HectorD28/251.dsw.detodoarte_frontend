
import { ProductsList } from '../../model/products-list';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, tap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsListService {

  public cartItemList: any = []
  public productList !: Observable<ProductsList[]>

  private readonly uriAPI = '../../assets/productsList.json'

  constructor( private http: HttpClient ) { }

  getProduct(){
    return this.http.get<ProductsList[]>(this.uriAPI).pipe(
      first(),
      tap(apiProducts => {return apiProducts})
    )
  }

}
