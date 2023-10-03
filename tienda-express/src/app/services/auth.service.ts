import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, map, tap } from 'rxjs';
import { TokenData } from './classes/tokendata';
import jwt_decode from 'jwt-decode';

const apiLink = "http://localhost:4201/users/";

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  private _isLoggedIn = new BehaviorSubject<boolean>(false)

  isLoggedIn = this._isLoggedIn.asObservable()

  userData!: TokenData | null;
  tokenInfo!: any;

  username!: string;
  email!: string;

  constructor(private http: HttpClient) 
  {    

  }

  getAuthenticationState()
  {
    let token: string | null;

    token = localStorage.getItem('token');

    console.log(token);

    if(token != null)
    {
      this._isLoggedIn.next(true);

      this.tokenInfo = this.getDecodedAccessToken(token);

      this.username = this.tokenInfo.foundUser.username;
      this.email = this.tokenInfo.foundUser.email;
    }
  }

  getHttpRequestLink(uri: string)
  {
      return apiLink + uri;
  }

  Login(email: string, password: string) {

    const user: any = {email: email, password: password };

    return this.http.post(this.getHttpRequestLink("login"), user).pipe(
        tap((response: any) => {
            localStorage.setItem('token', response.token);
            this._isLoggedIn.next(true);

            this.tokenInfo = this.getDecodedAccessToken(response.token);

            this.username = this.tokenInfo.foundUser.username;
            this.email = this.tokenInfo.foundUser.email;
            console.log(this.tokenInfo)
        }),
        catchError((error) => {
            throw error;
        }));
  }

  Logout()
  {
    localStorage.setItem('token', '');
    this.userData = null;
    this._isLoggedIn.next(false);
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
  
}

