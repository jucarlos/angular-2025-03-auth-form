import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Product, ProductsReponse } from '../interface/product-reponse.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private http = inject( HttpClient );
  private baseUrl = environment.baseUrl;

  constructor() { }

  public getProducts(): Observable<ProductsReponse> {

    const url = `${this.baseUrl}/api/products`;
    return this.http.get<ProductsReponse>(url);

  }

  public getProductById(id: string ): Observable<Product> {

    const url = `${this.baseUrl}/api/products/${id}`;
    return this.http.get<Product>(url);

  }


}
