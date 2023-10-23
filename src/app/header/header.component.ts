import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../dataType';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuType: string = '';
  sellerName: string = '';
  searchResult: undefined | product[];
  constructor(private router: Router, private product: ProductService) {}
  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event.url) {
        if (localStorage.getItem('seller') && event.url.includes('seller')) {
          this.menuType = 'seller';
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }
        } else {
          this.menuType = 'default';
        }
      }
    });
  }
  logout() {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const productQuery = query.target as HTMLInputElement;
      this.product.searchProducts(productQuery.value).subscribe((res) => {
        this.searchResult = res;
        if(res.length>5){
          res.length = 5;
        }
      });
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }
  searchedText(value: string){
this.router.navigate([`search/${value}`]);
  }
  redirectToDetailsPage(id:number){
    this.router.navigate([`details/${id}`]);
  }
}
