import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {getBaseUrl} from "../../main";

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

  loginUser(formData: {
    Username: string;
    Password: string;
  }){
    this.Http.post<LoginModel>(getBaseUrl() + 'api/user/login', formData).subscribe(
      (data) => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/']);
        });
      },
      (error) => {
        console.error('There was an error!', error);
      }
    )
  }

  logoutUser() {
    this.Http.post(getBaseUrl() + 'api/user/logout', {}).subscribe(
      (data) => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/']);
        });
      },
      (error) => {
        console.error('There was an error!', error);
      }
    )
  }

  registrateUser(formData: {
    Username: string,
    Password: string,
    PasswordConfirmation: string,
    EmailAddress: string,
  }) {
    this.Http.post<RegisterModel>(getBaseUrl() + 'api/user/registration', formData).subscribe(
      (data) => {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate(['/']);
        });
      },
      (error) => {
        console.error('There was an error!', error);
      }
    )
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
