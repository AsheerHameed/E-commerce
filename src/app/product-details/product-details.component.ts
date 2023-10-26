import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../dataType';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productData: product | undefined;
  productQuantity: number = 1;
  removeCart: boolean = false;
  cartData: product | undefined;
  constructor(
    private activeRoute: ActivatedRoute,
    private products: ProductService
  ) {}

  ngOnInit() {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    productId &&
      this.products.getProduct(productId).subscribe((res) => {
        this.productData = res;
        let cartData = localStorage.getItem('localCart');
        if (productId && cartData) {
          let items = JSON.parse(cartData);
          items = items.filter(
            (item: product) => productId == item.id.toString()
          );
          if (items.length) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
        }
      });

    let user = localStorage.getItem('user');
    if (user) {
      let userId = user && JSON.parse(user).id;
      this.products.getCartList(userId);
      this.products.cartData.subscribe((res) => {
        let item = res.filter(
          (item: product) =>
            productId?.toString() === item.productId?.toString()
        );
        if (item.length) {
          this.removeCart = true;
          this.cartData = item[0];
          this.removeCart = true;
        }
      });
    }
  }

  handleQuantity(value: string) {
    if (this.productQuantity < 20 && value === 'plus') {
      this.productQuantity += 1;
    }
    if (this.productQuantity > 1 && value === 'minus') {
      this.productQuantity -= 1;
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.products.localCart(this.productData);
        this.removeCart = true;
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData: cart = {
          ...this.productData,
          userId,
          productId: this.productData.id,
        };
        delete cartData.id;
        console.log(cartData);
        this.products.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.products.getCartList(userId);
            this.removeCart = true;
          }
        });
      }
    }
  }
  removeFromCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.products.removeItemFromCart(productId);
    } else {
      console.warn(this.cartData);
      this.cartData && this.products.removeToCart(this.cartData.id)
      .subscribe((res)=>{
        if(res){
          let user = localStorage.getItem('user');
          let userId = user && JSON.parse(user).id;
          this.products.getCartList(userId);
        }
      });
    }
    this.removeCart = false;

  }
}
