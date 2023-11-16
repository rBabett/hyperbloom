import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{
  backgroundImageUrl: string;

  constructor(http: HttpClient,
              @Inject('BASE_URL') baseUrl: string,
              private Router: Router,
              private formBuilder: FormBuilder,
              public userService: UserService) {
  }

  ngOnInit() {
    this.setRandomBackground();
  }
  setRandomBackground() {
    const numberOfImages = 20;
    const randomIndex = Math.floor(Math.random() * numberOfImages) + 1;

    this.backgroundImageUrl = `url('/assets/${randomIndex}.png')`;
  }

  newUserForm = this.formBuilder.group({
    username: '',
    password: '',
    passwordConfirmation: '',
    emailAddress: ''
  });

  loginUser() {
    const formData = {
      Username: this.newUserForm.get('username')?.value,
      Password: this.newUserForm.get('password')?.value,
    }

    let messages = this.userService.loginUser(formData);
    console.log(messages);
  }

  registerUser() {
    const formData = {
      Username: this.newUserForm.get('username')?.value,
      Password: this.newUserForm.get('password')?.value,
      PasswordConfirmation: this.newUserForm.get('passwordConfirmation')?.value,
      EmailAddress: this.newUserForm.get('emailAddress')?.value,
    }

    let messages = this.userService.registerUser(formData);
    console.log(messages);
  }
}
