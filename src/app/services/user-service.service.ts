import { EventEmitter, Injectable } from '@angular/core';
import { loginType, signUpType } from '../dataType';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  invalidUserAuth = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {}

  addUser(data: signUpType) {
    return this.http
      .post('http://localhost:3000/users', data, { observe: 'response' })
      .subscribe((result) => {
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
        }
      });
  }
  userLogin(result: loginType) {
    return this.http
      .get<signUpType[]>(
        `http://localhost:3000/users?email=${result.email}&password=${result.password}`,
        { observe: 'response' }
      )
      .subscribe((result) => {
        if(result && result.body?.length){
          this.invalidUserAuth.emit(false);
          localStorage.setItem('user', JSON.stringify(result.body[0]));
          this.router.navigate(['/']);
        }
        else{
          this.invalidUserAuth.emit(true);
        }
      });
  }
  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }
}
