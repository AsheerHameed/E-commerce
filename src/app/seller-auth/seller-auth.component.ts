import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { signUpType, loginType } from './sellerSignUpType';
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent implements OnInit {
  isLogin = false;
  authError: string = '';
  constructor(private seller: SellerService, private router: Router) {}
  ngOnInit(): void {
    this.seller.reloadSeller();
  }
  submitSignUpForm(data: signUpType): void {
    this.seller.userSignUp(data);
  }
  submitLogInForm(data: loginType) {
    this.authError = '';
    this.seller.userLogIn(data);
    this.seller.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = 'Invalid email or password';
      }
    });
  }
  openLoginForm() {
    this.isLogin = true;
  }
  openSignUpForm() {
    this.isLogin = false;
  }
}
