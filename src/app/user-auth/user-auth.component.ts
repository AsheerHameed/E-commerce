import { Component, OnInit } from '@angular/core';
import { cart, loginType, product, signUpType } from '../dataType';
import { UserService } from '../services/user-service.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true;
  authError: string = '';
  constructor(private user: UserService, private products: ProductService) {}
  ngOnInit(): void {
    this.user.userAuthReload();
  }
  signUp(data: signUpType) {
    this.user.addUser(data);
  }
  login(data: loginType) {
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((err) => {
      console.warn(err);
      if (err) {
        this.authError = 'Invalid Credentials';
      } else {
        this.localCartToRemoteCart();
      }
    });
  }

  openSignUpForm() {
    this.showLogin = false;
  }
  openLoginForm() {
    this.showLogin = true;
  }
  localCartToRemoteCart() {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    let data = localStorage.getItem('localCart');
    if (data) {
      let cartDataList: product[] = JSON.parse(data);

      cartDataList.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId,
        };

        delete cartData.id;
        setTimeout(() => {
          this.products.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.warn(result);
            }
          });
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart');
          }
        }, 500);
      });
    }
    setTimeout(() => {
      this.products.getCartList(userId);
    }, 2000);
  }
}
