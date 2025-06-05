import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private apiUrl = environment.apiUrl + "/cart";
  private checkoutApiUrl = environment.apiUrl + "/checkout";

  constructor(private http: HttpClient) { }

  addToCart(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product); // Sending a Product obj as a Request body
  }

  getCartItems(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  clearItems(): Observable<void> {
    return this.http.delete<void>(this.apiUrl);
  }

  // we have to pass products to server which we want to checkout
  checkoutItems(products: Product[]): Observable<void> {
    return this.http.post<void>(this.checkoutApiUrl, products);
  }
}
