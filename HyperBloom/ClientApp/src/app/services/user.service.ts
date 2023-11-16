import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {getBaseUrl} from "../../main";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private Http: HttpClient;
  constructor(http: HttpClient,
              @Inject('BASE_URL') baseUrl: string,
              private router: Router) {
    this.Http = http;
  }

  loginUser(formData: { Username: string | null | undefined; Password: string | null | undefined }) :string{
    this.Http.post<LoginModel>(getBaseUrl() + 'api/user/login', formData).subscribe(
      (data) => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/']);
          window.location.reload();
        });
      },
      (error) => {
        console.error('There was an error!', error);
        return error.message.split("//");
      }
    )
    return "";
  }

  logoutUser() {
    this.Http.post(getBaseUrl() + 'api/user/logout', {}).subscribe(
      (data) => {
        document.cookie.split(";")
          .forEach(function(c) {
            document.cookie = c.replace(/^ +/, "")
              .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        this.router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
          this.router.navigate(['/login']);
          window.location.reload();
        });
      },
      (error) => {
        console.error('There was an error!', error);
        return error.message.split("//");
      }
    )
  }

  getCurrentUser() : Observable<User> {
    return this.Http.get<User>(getBaseUrl() + 'api/user/current_user');
  }

  registerUser(formData: {
    Username: string | null | undefined;
    PasswordConfirmation: string | null | undefined;
    EmailAddress: string | null | undefined;
    Password: string | null | undefined
  }) :string {
    this.Http.post<RegisterModel>(getBaseUrl() + 'api/user/registration', formData).subscribe(
      (data) => {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate(['/']);
        });
      },
      (error) => {
        console.error('There was an error!', error);
        return error.message.split("//");
      }
    )
    return "";
  }

}

export interface LoginModel {
  username: string,
  password: string,
}

export interface RegisterModel {
  username: string,
  password: string,
  passwordConfirmation: string,
  emailAddress: string,
}

export interface User {
  username: string,
  emailAddress: string,
  role: string,
  amountOfPlants: number,
  badge: string
}
