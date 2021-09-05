import { Component, HostListener, OnInit } from '@angular/core';
import { ProductListData, QueryParams } from './product-list.model';
import { ProductListService } from './product-list.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  /** list of product date */
  public productList: ProductListData[];
  /** Page Number for Pagination*/
  public pageNo: number;
  /** page Limit  for Pagination*/
  public pageLimit: number;
  /** sorting the data */
  public sort: string;
  /** store query parameter value*/
  public queryParams: QueryParams;
  /** Hide/show loader */
  public showLoader:boolean;

  public showMesage:boolean;

  constructor(private productListService: ProductListService) {
    this.showLoader = true;
    this.showMesage =false;
    this.productList = [];
    this.pageNo = 0;
    this.pageLimit = 20;
    this.sort = 'id';
    this.queryParams = { pageNo: this.pageNo, pageLimit: this.pageLimit, sort: this.sort };
  }

  ngOnInit(): void {
    this.getProductListData();
  }

  /**
   * Get Product list data
   */
  public getProductListData(): void {
    this.productListService.getProductList(this.queryParams).subscribe((res: ProductListData[]) => {
      if (res.length>0) {
        this.productList = this.productList.concat(res);
        this.showLoader =false;
      } else {
        this.showMesage =true;
        this.showLoader =false;
      }
    })
  }

  /** Used for performance optimization. */
  public trackBy(index: number, testcase:ProductListData): number {
    return index;
  }

 /** Listen the events of host element */
  @HostListener("window:scroll", [])

/**
 * this method execute when window scroll event fired
 */
  public onScroll(): void {
    if (this.bottomReached()) {
      this.showLoader=true;
      this.pageNo++
      this.queryParams = { ... this.queryParams, pageNo: this.pageNo };
      this.getProductListData();
    }
  }

  /**
   * This method return true if scroll reached to the end of scroll
   * @returns 
   */
  private bottomReached(): boolean {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
  }

  /**
   * This method is responsuble for sort the data
   * @param columnName 
   */
  public sortColumn(columnName: string) {
    this.showLoader=true;
    this.productList = [];
    this.queryParams = { ... this.queryParams, sort: columnName, pageNo: 0 };
    this.getProductListData();
  }

}
