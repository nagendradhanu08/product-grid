import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductListData, QueryParams } from './product-list.model';

@Injectable()
export class ProductListService {

   /** Base url of API */
   private baseUrl: string

  constructor(private http: HttpClient) { 
    this.baseUrl = environment.baseUrl;
  }

  /**
   * Get Product List Data 
   * @param queryParams 
   * @returns 
   */
  public getProductList(queryParams:QueryParams): Observable<ProductListData[]> {
    let params = new HttpParams();
    params = params.append("_page", queryParams.pageNo); 
    params = params.append("_limit", queryParams.pageLimit);
    params = params.append("_sort", queryParams.sort);
    const url: string = this.baseUrl + 'products';
    return this.http.get<ProductListData[]>(url,{params: params})
  }
}
