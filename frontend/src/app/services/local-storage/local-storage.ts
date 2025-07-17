import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorage {
  constructor() {}

  //set an item in local storage
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  //get an item from local storage
  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  //remove a value from local storage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  //clear all items from local storage
  clear(): void {
    localStorage.clear();
  }
}
