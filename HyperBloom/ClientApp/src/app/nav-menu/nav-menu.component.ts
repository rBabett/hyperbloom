import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  isLoggedIn = false;

  constructor(private userService: UserService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.checkIfUserIsLoggedIn();
  }

  private checkIfUserIsLoggedIn() {
    this.userService.getCurrentUser().subscribe(
      (currentUser) => {
        console.log(currentUser);
        if (currentUser != null) {
          this.isLoggedIn = true;
        }
      },
      (error) => {
        this.isLoggedIn = false;
      }
    );
  }

  logout() {
    this.userService.logoutUser();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
