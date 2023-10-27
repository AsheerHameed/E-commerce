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
  userName: string = '';
  cartValue :  number = 0
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
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.username;
          this.menuType = 'user';
          this.product.getCartList(userData.id)
        } else {
          this.menuType = 'default';
        }
      }
    });

    let cartData  = localStorage.getItem('localCart') 
    if(cartData){
      this.cartValue = JSON.parse(cartData).length
    }
    this.product.cartData.subscribe((items)=>{
      this.cartValue = items.length
    })
  }
  sellerLogout() {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }
  userLogout() {
    localStorage.removeItem('user');
    this.router.navigate(['/auth']);
    this.product.cartData.emit([])
  }
  searchProduct(query: KeyboardEvent) {
    if (query) {
      const productQuery = query.target as HTMLInputElement;
      this.product.searchProducts(productQuery.value).subscribe((res) => {
        this.searchResult = res;
        if (res.length > 5) {
          res.length = 5;
        }
      });
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }
  searchedText(value: string) {
    this.router.navigate([`search/${value}`]);
  }
  redirectToDetailsPage(id: number) {
    this.router.navigate([`details/${id}`]);
  }
}
