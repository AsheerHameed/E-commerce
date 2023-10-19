import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loginType, signUpType } from '../dataType';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, UrlTree } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedin = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  static isSellerLoggedin:
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>;
  constructor(private http: HttpClient, private router: Router) {}

  userSignUp(data: signUpType) {
    this.http
      .post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe((result) => {
        this.isSellerLoggedin.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['/seller-home']);
      });
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedin.next(true);
      this.router.navigate(['/seller-home']);
    }
  }

  userLogIn(data: loginType) {
    this.http
      .get(
        `http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result: any) => {
        if (result && result.body && result.body.length) {
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['/seller-home']);
        } else {
          this.isLoginError.emit(true);
        }
      });
  }
}
