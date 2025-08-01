import { inject, Injectable } from '@angular/core';
import { LocalStorage } from '../local-storage/local-storage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private localStorageService: LocalStorage) {}

  // private to prevent modifications
  private isLoggedIn = false;
  private router = inject(Router);

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
    //clear storage and logout entirely
    this.localStorageService.clear();
    this.router.navigate(['/auth/login']);
  }

  // call this to know status
  showStatus() {
    return this.isLoggedIn;
  }
}
