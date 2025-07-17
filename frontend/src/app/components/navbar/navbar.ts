import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth/auth';
import { LocalStorage } from '../../services/local-storage/local-storage';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  constructor(
    public auth: Auth,
    private localStorageService: LocalStorage,
  ) {}

  logoutUser() {
    //clear data in local storage
    this.localStorageService.clear();

    //logout user
    this.auth.logout();
  }

  ngOnInit(): void {
    this.logoutUser();
    console.log(this.auth.showStatus());
  }
}
