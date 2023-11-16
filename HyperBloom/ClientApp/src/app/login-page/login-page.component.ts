import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{
  backgroundImageUrl: string;

  ngOnInit() {
    this.setRandomBackground();
  }

  setRandomBackground() {
    const numberOfImages = 20;
    const randomIndex = Math.floor(Math.random() * numberOfImages) + 1;

    this.backgroundImageUrl = `url('/assets/${randomIndex}.png')`;
  }

}
